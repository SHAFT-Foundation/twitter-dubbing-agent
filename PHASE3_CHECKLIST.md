# Phase 3: Agent & Dub Pipeline
## Implementation Checklist

### ⚡ Quick Start Commands
```bash
# Install Phase 3 dependencies
cd apps/web
yarn add bull ioredis p-queue p-retry
yarn add ffmpeg-static fluent-ffmpeg
yarn add node-cron
yarn add -D @types/fluent-ffmpeg

# Create agent app
cd ../..
mkdir -p apps/agent
cd apps/agent
yarn init -y
yarn add twitter-api-v2 axios p-queue p-retry
yarn add -D typescript @types/node tsx
```

### 📋 Task Breakdown

## 1. Agent Architecture (Day 1-2)

### 1.1 Agent Application Setup
- [ ] Create `apps/agent` directory
- [ ] Initialize TypeScript configuration
- [ ] Set up build scripts
- [ ] Configure environment variables

**Agent structure:**
```
apps/agent/
├── src/
│   ├── workers/
│   │   ├── scanner.ts       # Scan for new posts
│   │   ├── processor.ts     # Process media
│   │   ├── poller.ts        # Poll job status
│   │   └── publisher.ts     # Publish results
│   ├── lib/
│   │   ├── twitter.ts       # X API client
│   │   ├── speechlab.ts     # SpeechLab client
│   │   ├── media.ts         # Media processing
│   │   └── queue.ts         # Job queue
│   ├── types/
│   └── index.ts
├── package.json
└── tsconfig.json
```

### 1.2 Vercel Cron Configuration
- [ ] Create cron job endpoints:
  ```typescript
  // app/api/agent/scan/route.ts
  export async function POST(request: Request) {
    // Verify internal secret
    const secret = request.headers.get('x-internal-secret');
    if (secret !== process.env.INTERNAL_JOB_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Trigger scan worker
    await scanForNewPosts();
    return new Response('OK');
  }
  ```

- [ ] Configure `vercel.json`:
  ```json
  {
    "crons": [
      {
        "path": "/api/agent/scan",
        "schedule": "*/10 * * * *"
      },
      {
        "path": "/api/agent/poll",
        "schedule": "*/5 * * * *"
      }
    ]
  }
  ```

### 1.3 Job Queue Setup
- [ ] Implement job queue with Bull or similar
- [ ] Configure Redis connection (if using Bull)
- [ ] Define job types:
  - `scan-account`
  - `process-media`
  - `submit-dub`
  - `poll-status`
  - `publish-result`

**Queue implementation:**
```typescript
// lib/queue.ts
import Queue from 'bull';

export const dubQueue = new Queue('dubs', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});

dubQueue.process('scan-account', async (job) => {
  const { userId, twitterAccountId } = job.data;
  // Scan logic
});
```

### 1.4 Rate Limiting & Retries
- [ ] Implement rate limiter for X API
- [ ] Add exponential backoff for retries
- [ ] Configure per-endpoint rate limits
- [ ] Handle 429 responses gracefully

**Rate limiter:**
```typescript
// lib/rateLimiter.ts
import pQueue from 'p-queue';

export const twitterQueue = new pQueue({
  concurrency: 1,
  interval: 1000,
  intervalCap: 15, // 15 requests per second
});

export const speechLabQueue = new pQueue({
  concurrency: 5,
  interval: 1000,
  intervalCap: 10,
});
```

## 2. X (Twitter) API Integration (Day 2-3)

### 2.1 Twitter Client Setup
- [ ] Create authenticated client wrapper
- [ ] Implement token refresh logic
- [ ] Add request logging
- [ ] Handle API errors

**Twitter client:**
```typescript
// lib/twitter.ts
import { TwitterApi } from 'twitter-api-v2';

export class TwitterClient {
  private client: TwitterApi;
  
  constructor(accessToken: string, refreshToken: string) {
    this.client = new TwitterApi({
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
    });
  }
  
  async getUserTimeline(userId: string, sinceId?: string) {
    return this.client.v2.userTimeline(userId, {
      exclude: ['retweets', 'replies'],
      'media.fields': ['url', 'duration_ms', 'type'],
      'tweet.fields': ['created_at', 'attachments'],
      since_id: sinceId,
      max_results: 10,
    });
  }
}
```

### 2.2 Content Discovery
- [ ] Implement timeline polling
- [ ] Filter for eligible media:
  - Videos
  - Clips
  - Recorded Spaces
  - Livestream VODs
- [ ] Extract media URLs
- [ ] Store discovered posts

**Scanner implementation:**
```typescript
// workers/scanner.ts
export async function scanForNewPosts(userId: string) {
  const lastScanId = await getLastScanId(userId);
  const timeline = await twitterClient.getUserTimeline(userId, lastScanId);
  
  for (const tweet of timeline.data) {
    if (hasEligibleMedia(tweet)) {
      await createSource({
        userId,
        twitterPostId: tweet.id,
        type: getMediaType(tweet),
        mediaUrl: extractMediaUrl(tweet),
      });
    }
  }
  
  await updateLastScanId(userId, timeline.meta.newest_id);
}
```

### 2.3 Media URL Resolution
- [ ] Handle different media types
- [ ] Extract highest quality URLs
- [ ] Support m3u8 streams
- [ ] Handle protected content

### 2.4 Deduplication
- [ ] Check for existing sources
- [ ] Implement idempotency keys
- [ ] Handle duplicate submissions
- [ ] Clean up old records

**Database schema:**
```sql
CREATE TABLE sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  twitter_post_id VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50), -- video, clip, space, livestream
  media_url TEXT,
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB
);

CREATE INDEX idx_sources_user_status ON sources(user_id, status);
CREATE INDEX idx_sources_twitter_post ON sources(twitter_post_id);
```

## 3. SpeechLab API Integration (Day 3-4)

### 3.1 SpeechLab Client
- [ ] Create API client wrapper
- [ ] Implement authentication
- [ ] Add request/response logging
- [ ] Handle API errors

**SpeechLab client:**
```typescript
// lib/speechlab.ts
export class SpeechLabClient {
  private apiKey: string;
  private baseUrl: string;
  
  constructor() {
    this.apiKey = process.env.SPEECHLAB_API_KEY!;
    this.baseUrl = process.env.SPEECHLAB_API_URL!;
  }
  
  async createProject(name: string) {
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    
    return response.json();
  }
  
  async submitDub(projectId: string, language: string, mediaUrl: string) {
    // Submit dubbing job
  }
  
  async getJobStatus(jobId: string) {
    // Check job status
  }
}
```

### 3.2 Project Creation
- [ ] Create project per source
- [ ] Store project metadata
- [ ] Handle creation errors
- [ ] Link to source record

**Database schema:**
```sql
CREATE TABLE speechlab_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  project_id VARCHAR(255) UNIQUE NOT NULL,
  dashboard_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.3 Job Submission
- [ ] Submit job per language
- [ ] Handle submission errors
- [ ] Store job IDs
- [ ] Track submission time

**Job submission:**
```typescript
// workers/processor.ts
export async function submitDubbingJobs(sourceId: string) {
  const source = await getSource(sourceId);
  const settings = await getUserSettings(source.userId);
  const project = await speechLabClient.createProject(`Dub-${source.id}`);
  
  await storeSpeechLabProject({
    sourceId,
    projectId: project.id,
    dashboardUrl: project.dashboardUrl,
  });
  
  for (const language of settings.languages) {
    const job = await speechLabClient.submitDub(
      project.id,
      language,
      source.mediaUrl
    );
    
    await createDub({
      sourceId,
      language,
      speechLabJobId: job.id,
      status: 'processing',
    });
  }
}
```

### 3.4 Status Polling
- [ ] Poll active jobs periodically
- [ ] Update job status
- [ ] Download completed results
- [ ] Handle failures/retries

**Polling implementation:**
```typescript
// workers/poller.ts
export async function pollDubbingJobs() {
  const activeDubs = await getActiveDubs();
  
  for (const dub of activeDubs) {
    const status = await speechLabClient.getJobStatus(dub.speechLabJobId);
    
    if (status.status === 'completed') {
      await updateDub(dub.id, {
        status: 'completed',
        outputUrl: status.outputUrl,
        completedAt: new Date(),
      });
      
      await updateUsageLedger(dub.userId);
    } else if (status.status === 'failed') {
      await updateDub(dub.id, {
        status: 'failed',
        error: status.error,
      });
    }
  }
}
```

## 4. Media Processing (Day 4)

### 4.1 Media Download
- [ ] Download source media
- [ ] Handle large files
- [ ] Support streaming
- [ ] Temporary storage management

**Download implementation:**
```typescript
// lib/media.ts
import fs from 'fs';
import axios from 'axios';

export async function downloadMedia(url: string): Promise<string> {
  const tempPath = `/tmp/${Date.now()}.mp4`;
  const writer = fs.createWriteStream(tempPath);
  
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  
  response.data.pipe(writer);
  
  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(tempPath));
    writer.on('error', reject);
  });
}
```

### 4.2 Format Validation
- [ ] Check media format
- [ ] Validate duration limits
- [ ] Check file size
- [ ] Handle unsupported formats

### 4.3 Media Conversion
- [ ] Convert to supported formats
- [ ] Optimize for dubbing
- [ ] Handle audio extraction
- [ ] Maintain quality

**FFmpeg integration:**
```typescript
// lib/ffmpeg.ts
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

export async function convertToMP4(inputPath: string): Promise<string> {
  const outputPath = inputPath.replace(/\.\w+$/, '.mp4');
  
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}
```

### 4.4 Cleanup
- [ ] Delete temporary files
- [ ] Implement TTL for storage
- [ ] Schedule cleanup jobs
- [ ] Monitor disk usage

## 5. Data Management (Day 5)

### 5.1 Dub Records
- [ ] Create dub records:
  ```sql
  CREATE TABLE dubs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
    language_code VARCHAR(10),
    status VARCHAR(50) DEFAULT 'pending',
    output_url TEXT,
    speechlab_job_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    error TEXT
  );
  
  CREATE INDEX idx_dubs_status ON dubs(status);
  CREATE INDEX idx_dubs_source ON dubs(source_id);
  ```

### 5.2 Usage Tracking
- [ ] Update usage on completion
- [ ] Track per month
- [ ] Handle billing cycle
- [ ] Enforce limits

**Usage tracking:**
```typescript
// lib/usage.ts
export async function updateUsageLedger(userId: string) {
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  
  await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_month: month,
  });
  
  const usage = await getCurrentUsage(userId);
  const limit = await getUserLimit(userId);
  
  if (usage >= limit) {
    await disableAutomation(userId);
    await sendLimitNotification(userId);
  }
}
```

### 5.3 Dashboard Integration
- [ ] Create dubs list API
- [ ] Add filtering/sorting
- [ ] Include status badges
- [ ] Show progress indicators

**Dubs list endpoint:**
```typescript
// app/api/dubs/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const language = searchParams.get('language');
  
  const dubs = await supabase
    .from('dubs')
    .select(`
      *,
      source:sources(
        twitter_post_id,
        type,
        metadata
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return NextResponse.json(dubs);
}
```

### 5.4 Error Handling
- [ ] Log all errors
- [ ] Implement retry logic
- [ ] Send failure notifications
- [ ] Provide error details

## 6. Dashboard Updates (Day 5)

### 6.1 Dubs List Page
- [ ] Create `app/(app)/dashboard/dubs/page.tsx`
- [ ] Display dubs table
- [ ] Add status filters
- [ ] Show progress bars
- [ ] Include action buttons

**Dubs list component:**
```typescript
// components/dubs/DubsList.tsx
export function DubsList() {
  const { data: dubs, isLoading } = useDubs();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Post</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dubs?.map((dub) => (
          <DubRow key={dub.id} dub={dub} />
        ))}
      </TableBody>
    </Table>
  );
}
```

### 6.2 Status Indicators
- [ ] Create status badge component
- [ ] Add progress animations
- [ ] Show completion time
- [ ] Display error messages

### 6.3 Manual Actions
- [ ] Add "View in SpeechLab" link
- [ ] Download dubbed file
- [ ] Retry failed jobs
- [ ] Cancel pending jobs

### 6.4 Test Mode
- [ ] URL input for testing
- [ ] Manual job trigger
- [ ] Real-time status updates
- [ ] Debug information display

## 7. Testing (Day 6)

### 7.1 Unit Tests
- [ ] Test scanner logic
- [ ] Test media processing
- [ ] Test API clients
- [ ] Test queue operations

### 7.2 Integration Tests
- [ ] Test full pipeline flow
- [ ] Mock external APIs
- [ ] Test error scenarios
- [ ] Test retry logic

### 7.3 Load Testing
- [ ] Test concurrent processing
- [ ] Test rate limiting
- [ ] Test queue performance
- [ ] Monitor resource usage

### 7.4 E2E Tests
- [ ] Test content discovery
- [ ] Test job submission
- [ ] Test status updates
- [ ] Test dashboard display

## File Structure After Phase 3

```
apps/
├── web/
│   └── app/
│       ├── api/
│       │   ├── agent/
│       │   │   ├── scan/
│       │   │   ├── process/
│       │   │   ├── poll/
│       │   │   └── publish/
│       │   └── dubs/
│       └── (app)/
│           └── dashboard/
│               └── dubs/
└── agent/
    └── src/
        ├── workers/
        │   ├── scanner.ts
        │   ├── processor.ts
        │   ├── poller.ts
        │   └── publisher.ts
        ├── lib/
        │   ├── twitter.ts
        │   ├── speechlab.ts
        │   ├── media.ts
        │   ├── queue.ts
        │   └── rateLimiter.ts
        └── types/
```

## Success Criteria ✅

- [ ] Content discovery working for all media types
- [ ] SpeechLab integration functional
- [ ] Jobs processing successfully
- [ ] Status polling and updates working
- [ ] Usage tracking accurate
- [ ] Dashboard showing dub status
- [ ] Error handling robust
- [ ] All tests passing
- [ ] Performance within targets

## Time Estimate: 6 Days

- Day 1-2: Agent architecture setup
- Day 2-3: X API integration
- Day 3-4: SpeechLab integration
- Day 4: Media processing
- Day 5: Data management and dashboard
- Day 6: Testing and optimization

## Next Phase Preview
Phase 4 will add:
- Automated publishing to X
- Admin console for monitoring
- Advanced error handling
- Performance optimization