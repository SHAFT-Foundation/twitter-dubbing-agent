# Phase 4: Auto-Publishing & Admin Console
## Implementation Checklist

### ⚡ Quick Start Commands
```bash
# Install Phase 4 dependencies
cd apps/web
yarn add recharts react-table @tanstack/react-table
yarn add date-fns date-fns-tz
yarn add react-hot-toast sonner
yarn add @sentry/nextjs
```

### 📋 Task Breakdown

## 1. Publishing System (Day 1-2)

### 1.1 Manual Publishing
- [ ] Create publish API endpoints
- [ ] Add publish buttons to dashboard
- [ ] Implement confirmation dialogs
- [ ] Track publish history

**Manual publish endpoint:**
```typescript
// app/api/dubs/[id]/publish/route.ts
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { publishMode } = await request.json();
  const dub = await getDub(params.id);
  
  if (publishMode === 'reply') {
    await publishAsReply(dub);
  } else if (publishMode === 'new_post') {
    await publishAsNewPost(dub);
  }
  
  await updateDub(params.id, {
    publishedAt: new Date(),
    publishMode,
  });
  
  return NextResponse.json({ success: true });
}
```

### 1.2 Auto-Reply Implementation
- [ ] Create reply with dubbed video
- [ ] Upload video to X
- [ ] Add language label
- [ ] Thread multiple languages

**Reply implementation:**
```typescript
// lib/twitter/publisher.ts
export async function publishAsReply(dub: Dub) {
  const { mediaId } = await uploadVideo(dub.outputUrl);
  
  const replyText = generateReplyText(dub.language);
  
  const tweet = await twitterClient.v2.reply(
    replyText,
    dub.source.twitterPostId,
    {
      media: { media_ids: [mediaId] },
    }
  );
  
  await storePublishRecord({
    dubId: dub.id,
    tweetId: tweet.data.id,
    type: 'reply',
  });
}
```

### 1.3 New Post Creation
- [ ] Create standalone post
- [ ] Quote original tweet
- [ ] Include dubbed media
- [ ] Add context and language

**New post implementation:**
```typescript
// lib/twitter/publisher.ts
export async function publishAsNewPost(dub: Dub) {
  const { mediaId } = await uploadVideo(dub.outputUrl);
  
  const postText = generateNewPostText(
    dub.source.authorHandle,
    dub.source.twitterPostId,
    dub.language
  );
  
  const tweet = await twitterClient.v2.tweet({
    text: postText,
    media: { media_ids: [mediaId] },
  });
  
  await storePublishRecord({
    dubId: dub.id,
    tweetId: tweet.data.id,
    type: 'new_post',
  });
}
```

### 1.4 Video Upload to X
- [ ] Implement chunked upload
- [ ] Handle large files
- [ ] Add progress tracking
- [ ] Manage upload errors

**Chunked upload:**
```typescript
// lib/twitter/media.ts
export async function uploadVideo(videoUrl: string) {
  const videoBuffer = await downloadVideo(videoUrl);
  const totalBytes = videoBuffer.length;
  
  // INIT
  const mediaId = await twitterClient.v1.uploadMedia(videoBuffer, {
    mimeType: 'video/mp4',
    target: 'tweet',
    shared: false,
    longVideo: totalBytes > 15 * 1024 * 1024,
  });
  
  // Wait for processing
  await waitForMediaProcessing(mediaId);
  
  return { mediaId };
}
```

### 1.5 Template System
- [ ] Create text templates
- [ ] Support variable substitution
- [ ] Allow per-user customization
- [ ] A/B testing support

**Template configuration:**
```typescript
// config/templates.ts
export const publishTemplates = {
  reply: {
    default: "Dubbed in {language} 🎬 {languageEmoji}",
    withHashtags: "Dubbed in {language} 🎬 {languageEmoji}\n\n#{language} #Dubbing",
  },
  newPost: {
    default: "Check out @{author}'s video dubbed in {language}! {languageEmoji}\n\n{originalUrl}",
    withContext: "@{author} shared this in {originalLanguage}, now available in {language}! {languageEmoji}\n\n{originalUrl}",
  },
};
```

## 2. Auto-Publishing Logic (Day 2-3)

### 2.1 Publishing Queue
- [ ] Create publishing queue
- [ ] Implement scheduling logic
- [ ] Add rate limiting
- [ ] Handle failures

**Publishing worker:**
```typescript
// workers/publisher.ts
export async function processPublishingQueue() {
  const completedDubs = await getCompletedUnpublishedDubs();
  
  for (const dub of completedDubs) {
    const settings = await getUserSettings(dub.userId);
    
    if (settings.autoPublish) {
      await publishQueue.add('publish-dub', {
        dubId: dub.id,
        mode: settings.publishMode,
      });
    }
  }
}
```

### 2.2 Publishing Rules
- [ ] Check user settings
- [ ] Verify usage limits
- [ ] Apply time windows
- [ ] Respect rate limits

### 2.3 Multi-Language Handling
- [ ] Group languages per post
- [ ] Create thread for multiple
- [ ] Or single post with links
- [ ] Language picker page

**Language picker page:**
```typescript
// app/dubs/[id]/languages/page.tsx
export default function LanguagePickerPage({ params }) {
  const dubs = await getDubsBySourceId(params.id);
  
  return (
    <div>
      <h1>Choose Your Language</h1>
      {dubs.map(dub => (
        <LanguageOption
          key={dub.id}
          language={dub.language}
          url={dub.outputUrl}
        />
      ))}
    </div>
  );
}
```

### 2.4 Publish Tracking
- [ ] Store publish records:
  ```sql
  CREATE TABLE publish_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dub_id UUID REFERENCES dubs(id) ON DELETE CASCADE,
    tweet_id VARCHAR(255),
    type VARCHAR(50), -- reply, new_post
    published_at TIMESTAMPTZ DEFAULT NOW(),
    metrics JSONB -- likes, retweets, etc
  );
  ```

## 3. Admin Console (Day 3-4)

### 3.1 Admin Authentication
- [ ] Check X handle for admin access
- [ ] Create admin middleware
- [ ] Add role-based permissions
- [ ] Audit admin actions

**Admin middleware:**
```typescript
// middleware/admin.ts
export async function isAdmin(request: Request) {
  const user = await getCurrentUser(request);
  const adminHandles = process.env.ADMIN_TWITTER_HANDLES?.split(',') || [];
  
  if (!adminHandles.includes(user.twitterHandle)) {
    return new Response('Unauthorized', { status: 403 });
  }
  
  await logAdminAccess(user.id, request.url);
}
```

### 3.2 Admin Dashboard
- [ ] Create `app/admin/page.tsx`
- [ ] Show system statistics
- [ ] Display active jobs
- [ ] Recent activity feed

**Admin layout:**
```typescript
// app/admin/layout.tsx
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
}
```

### 3.3 User Management
- [ ] Create users list page
- [ ] Search by email/handle
- [ ] View user details
- [ ] Manage subscriptions

**Users table component:**
```typescript
// components/admin/UsersTable.tsx
export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users } = useAdminUsers(searchTerm);
  
  return (
    <DataTable
      columns={[
        { header: 'Email', accessor: 'email' },
        { header: 'Twitter', accessor: 'twitterHandle' },
        { header: 'Plan', accessor: 'plan' },
        { header: 'Usage', accessor: 'currentUsage' },
        { header: 'Actions', cell: UserActions },
      ]}
      data={users}
    />
  );
}
```

### 3.4 Usage Analytics
- [ ] Create analytics dashboard
- [ ] Show usage trends
- [ ] Language distribution
- [ ] Success/failure rates

**Analytics charts:**
```typescript
// components/admin/Analytics.tsx
import { LineChart, BarChart, PieChart } from 'recharts';

export function AnalyticsDashboard() {
  const { usage, languages, success } = useAnalytics();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <LineChart data={usage} title="Daily Usage" />
      <PieChart data={languages} title="Language Distribution" />
      <BarChart data={success} title="Success Rate" />
    </div>
  );
}
```

### 3.5 Dubs Management
- [ ] List all dubs
- [ ] Filter by status/user
- [ ] Retry failed jobs
- [ ] Download reports

**Dubs admin page:**
```typescript
// app/admin/dubs/page.tsx
export default function AdminDubsPage() {
  return (
    <div>
      <DubsFilters />
      <DubsTable
        columns={[
          'User',
          'Post',
          'Language',
          'Status',
          'Created',
          'Actions',
        ]}
      />
      <ExportButton />
    </div>
  );
}
```

## 4. Monitoring & Alerts (Day 4-5)

### 4.1 Error Tracking
- [ ] Integrate Sentry
- [ ] Configure error boundaries
- [ ] Add context to errors
- [ ] Set up alerts

**Sentry setup:**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  },
});
```

### 4.2 Webhook Monitoring
- [ ] Log all webhooks:
  ```sql
  CREATE TABLE webhooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider VARCHAR(50),
    event_type VARCHAR(100),
    payload JSONB,
    headers JSONB,
    received_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    status VARCHAR(50),
    error TEXT
  );
  ```
- [ ] Display webhook history
- [ ] Retry failed webhooks
- [ ] Verify signatures

### 4.3 System Health
- [ ] Create health check endpoint
- [ ] Monitor queue depth
- [ ] Check API availability
- [ ] Database connection pool

**Health check:**
```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    twitter: await checkTwitterAPI(),
    speechlab: await checkSpeechLabAPI(),
    stripe: await checkStripe(),
  };
  
  const healthy = Object.values(checks).every(c => c.status === 'ok');
  
  return NextResponse.json({
    status: healthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
}
```

### 4.4 Performance Metrics
- [ ] Track response times
- [ ] Monitor job duration
- [ ] Queue processing speed
- [ ] API call latency

### 4.5 Alert Configuration
- [ ] Set up email alerts
- [ ] Configure thresholds
- [ ] Implement escalation
- [ ] Create runbooks

**Alert rules:**
```typescript
// config/alerts.ts
export const alertRules = [
  {
    name: 'High Error Rate',
    condition: 'error_rate > 0.05',
    action: 'email',
    recipients: ['admin@example.com'],
  },
  {
    name: 'Queue Backup',
    condition: 'queue_depth > 100',
    action: 'slack',
    channel: '#alerts',
  },
  {
    name: 'API Down',
    condition: 'api_availability < 0.95',
    action: 'pagerduty',
    severity: 'critical',
  },
];
```

## 5. Admin Features (Day 5)

### 5.1 Manual Overrides
- [ ] Force retry jobs
- [ ] Cancel stuck jobs
- [ ] Adjust user limits
- [ ] Grant credits

### 5.2 Bulk Operations
- [ ] Batch retry failures
- [ ] Export user data
- [ ] Send notifications
- [ ] Update settings

### 5.3 Audit Logging
- [ ] Log admin actions:
  ```sql
  CREATE TABLE audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_user_id UUID REFERENCES users(id),
    action VARCHAR(100),
    entity_type VARCHAR(50),
    entity_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Display audit trail
- [ ] Search capabilities
- [ ] Export logs

### 5.4 Support Tools
- [ ] User impersonation
- [ ] Debug mode
- [ ] Test job submission
- [ ] API playground

## 6. Testing & Documentation (Day 6)

### 6.1 Unit Tests
- [ ] Test publishing logic
- [ ] Test admin functions
- [ ] Test alert rules
- [ ] Test templates

### 6.2 Integration Tests
- [ ] Test full publish flow
- [ ] Test admin workflows
- [ ] Test monitoring
- [ ] Test webhooks

### 6.3 Load Testing
- [ ] Test publishing queue
- [ ] Test admin queries
- [ ] Test concurrent users
- [ ] Monitor resources

### 6.4 Documentation
- [ ] Admin user guide
- [ ] Troubleshooting guide
- [ ] API documentation
- [ ] Runbook for incidents

## File Structure After Phase 4

```
apps/web/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── dubs/
│   │   ├── analytics/
│   │   ├── webhooks/
│   │   └── settings/
│   ├── api/
│   │   ├── dubs/
│   │   │   └── [id]/
│   │   │       └── publish/
│   │   ├── admin/
│   │   └── health/
│   └── dubs/
│       └── [id]/
│           └── languages/
├── components/
│   ├── admin/
│   │   ├── UsersTable.tsx
│   │   ├── Analytics.tsx
│   │   ├── DubsManager.tsx
│   │   └── AuditLog.tsx
│   └── publishing/
│       ├── PublishButton.tsx
│       └── TemplateEditor.tsx
├── lib/
│   ├── twitter/
│   │   ├── publisher.ts
│   │   └── media.ts
│   ├── monitoring/
│   └── alerts/
└── workers/
    └── publisher.ts
```

## Success Criteria ✅

- [ ] Manual publishing working
- [ ] Auto-publishing functioning
- [ ] Video upload to X successful
- [ ] Admin console accessible
- [ ] User management operational
- [ ] Analytics displaying correctly
- [ ] Monitoring and alerts active
- [ ] Audit logging complete
- [ ] All tests passing
- [ ] Documentation complete

## Time Estimate: 6 Days

- Day 1-2: Publishing system
- Day 2-3: Auto-publishing logic
- Day 3-4: Admin console
- Day 4-5: Monitoring & alerts
- Day 5: Admin features
- Day 6: Testing & documentation

## Production Readiness Checklist

### Security
- [ ] All tokens encrypted
- [ ] Admin access restricted
- [ ] Input validation complete
- [ ] SQL injection prevention
- [ ] XSS protection enabled

### Performance
- [ ] Database indexes created
- [ ] Caching implemented
- [ ] CDN configured
- [ ] Image optimization
- [ ] Code splitting

### Reliability
- [ ] Error handling comprehensive
- [ ] Retry logic implemented
- [ ] Graceful degradation
- [ ] Circuit breakers
- [ ] Health checks

### Observability
- [ ] Logging configured
- [ ] Metrics collected
- [ ] Alerts configured
- [ ] Dashboards created
- [ ] Documentation complete

## Launch Preparation

1. **Soft Launch**
   - Beta users only
   - Monitor closely
   - Gather feedback
   - Fix issues

2. **Gradual Rollout**
   - Increase user limits
   - Monitor performance
   - Scale infrastructure
   - Optimize costs

3. **Full Launch**
   - Marketing campaign
   - Support ready
   - Monitoring active
   - Scaling prepared