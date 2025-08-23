# Prompt for Phase 3 Continuation

Copy and paste this entire prompt into a new Claude Code session:

---

## Continue X Dub Implementation - Phase 3: Agent & Dub Pipeline

I need you to continue implementing the X Dub project (Twitter dubbing automation platform). Phases 1 & 2 are complete and deployed. Now implement Phase 3.

### Project Context
- **Repository**: /Users/ryanmedlin/shaft/twitter-dubbing-agent
- **Live URL**: https://web-f5bj53fm7-ryanmmmmms-projects.vercel.app
- **Tech Stack**: Next.js 14, TypeScript, Supabase, Vercel
- **Package Manager**: Yarn (NOT npm)

### Current Status
✅ **Phase 1**: Landing page with email capture (COMPLETE)
✅ **Phase 2**: Dashboard, settings, authentication UI (COMPLETE)
⏳ **Phase 3**: Backend implementation (TO DO)

### Important Project Rules
1. **Security**: We can ONLY post replies to existing content, NEVER create new standalone posts
2. **Billing**: Per-minute billing at $0.85/min after included minutes (10 free, 60 for Creator plan)
3. **Reference Code**: Use examples in `exampleONLY/speechlab-twitter-spaces-translator/` but DON'T add to git
4. **Documentation**: Check CLAUDE.md and PROJECT_STATUS.md for complete context

### Phase 3 Requirements

#### 1. Implement X OAuth Flow
Create API routes in `apps/web/app/api/connect/x/`:
- `start/route.ts` - Initiate OAuth 2.0 with PKCE
- `callback/route.ts` - Handle callback and store tokens (encrypted)
- `disconnect/route.ts` - Revoke access

#### 2. Create Dubbing Pipeline
Implement in `apps/web/app/api/dubs/`:
- Extract M3U8 URL from Twitter video/space
- Download with ffmpeg and upload to S3
- Create SpeechLab project with proper language mapping
- Poll for completion (30-second intervals)
- Store dubbed media URLs in database

#### 3. Agent System
Create in `apps/web/app/api/agent/`:
- `scan/route.ts` - Discover new content from connected accounts
- `process/route.ts` - Submit dubbing jobs to SpeechLab
- `poll/route.ts` - Check job statuses
- `publish/route.ts` - Post replies to Twitter (manual mode respects user control)

#### 4. Vercel Cron Jobs
Configure in `vercel.json`:
```json
{
  "crons": [
    {"path": "/api/agent/scan", "schedule": "*/10 * * * *"},
    {"path": "/api/agent/poll", "schedule": "*/5 * * * *"}
  ]
}
```

#### 5. Database Integration
Implement Supabase client operations for:
- Storing Twitter tokens (encrypted with ENCRYPTION_KEY)
- Creating dub records with status tracking
- Updating usage_ledger for billing
- Managing job queue

### Key Implementation Details

#### SpeechLab API Integration
```javascript
// Language mapping required
const languageMap = {
  'es': 'es_la',  // Spanish to Latin American Spanish
  // Add other mappings as needed
}

// API endpoints
POST https://translate-api.speechlab.ai/v1/auth/login
POST https://translate-api.speechlab.ai/v1/projects/createProjectAndDub
GET https://translate-api.speechlab.ai/v1/projects?thirdPartyIDs={id}
```

#### Media Processing
```javascript
// ffmpeg command for M3U8 download
const ffmpegArgs = [
  '-protocol_whitelist', 'file,http,https,tcp,tls,crypto',
  '-i', m3u8Url,
  '-c', 'copy',
  '-bsf:a', 'aac_adtstoasc',
  '-y', outputPath
]
```

#### Security Requirements
- Encrypt all OAuth tokens before database storage
- Implement webhook signature verification
- Rate limit all public endpoints
- Log all dubbing actions for audit trail

### Testing Checklist
- [ ] X OAuth flow completes successfully
- [ ] Media downloads from Twitter
- [ ] SpeechLab project creates and completes
- [ ] Dubbed content posts as reply (not new post)
- [ ] Usage tracking updates correctly
- [ ] Manual review mode blocks auto-posting

### Environment Variables to Add
Create `.env.local` with:
```
ENCRYPTION_KEY=<32-character-random-string>
X_CLIENT_ID=<from-twitter-developer-portal>
X_CLIENT_SECRET=<from-twitter-developer-portal>
SPEECHLAB_EMAIL=<your-speechlab-email>
SPEECHLAB_PASSWORD=<your-speechlab-password>
AWS_S3_BUCKET=<your-bucket-name>
AWS_ACCESS_KEY_ID=<your-aws-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret>
```

### Success Criteria
1. User can connect X account via OAuth
2. System discovers and dubs new content automatically
3. Dubbed content posts as replies to original tweets
4. Usage tracking and billing work correctly
5. Manual review mode gives user full control

Start by reviewing CLAUDE.md for API examples and PROJECT_STATUS.md for current state, then implement the X OAuth flow first.

---

End of prompt. This will give the new session full context to continue Phase 3.