# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**X Dub** - An X (formerly Twitter) dubbing automation platform that enables influencers to automatically dub their videos, clips, recorded Spaces, and post-event livestreams into multiple languages, then publish replies/posts linking the localized media to grow reach and engagement.

### Key Capabilities
- **Auto-dubbing**: Automatic detection and dubbing of new X content into 20+ languages
- **X Space Summaries**: AI-generated summaries of Spaces posted in multiple languages (optional feature)
- **Zero-friction**: Connect X account, select languages, and let the agent handle everything
- **Smart Publishing**: Auto-reply or create new posts with dubbed content
- **Freemium Model**: 30 free minutes/month, then $29.99 for 43 minutes/month + $0.85/additional minute

## Technology Stack

### Core Stack
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Next.js 14+ (App Router)
- **Package Manager**: Yarn (NOT npm)
- **Hosting**: Vercel (web + API routes + Cron/Background Functions)
- **Database**: Supabase (Postgres + Auth metadata + Storage)
- **Authentication**: Privy (email/passkey/social login)
- **Billing**: Stripe (subscriptions + usage tracking)
- **Dubbing API**: SpeechLab API
- **Social Platform**: X (Twitter) API v2

### Development Tools
- **Testing**: Vitest (unit), Playwright (E2E)
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

## Project Structure

```
twitter-dubbing-agent/
├── apps/
│   ├── web/                    # Next.js app (landing + dashboard + API)
│   │   ├── app/                # App Router pages
│   │   │   ├── (marketing)/    # Public landing pages
│   │   │   ├── (app)/         # Authenticated app pages
│   │   │   ├── api/           # API routes
│   │   │   └── admin/         # Admin console
│   │   ├── components/         # React components
│   │   ├── lib/               # Utilities and helpers
│   │   └── public/            # Static assets
│   └── agent/                  # Background worker for polling/processing
│       ├── workers/           # Individual worker tasks
│       └── lib/               # Shared utilities
├── packages/
│   ├── db/                    # Database schema and client
│   │   ├── schema/            # Supabase table definitions
│   │   ├── migrations/        # Database migrations
│   │   └── client.ts          # Supabase client wrapper
│   ├── ui/                    # Shared UI components
│   └── types/                 # Shared TypeScript types
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── playwright/            # E2E tests
├── config/                    # Configuration files
├── docs/                      # Documentation
└── scripts/                   # Build and deployment scripts
```

## Development Commands

```bash
# Initial Setup
yarn install                    # Install dependencies
yarn db:migrate                # Run database migrations
yarn db:generate               # Generate TypeScript types from DB schema

# Development
yarn dev                       # Start development server
yarn dev:agent                 # Start agent in dev mode
yarn build                     # Build for production
yarn start                     # Start production server

# Testing
yarn test                      # Run all tests
yarn test:unit                 # Run unit tests only
yarn test:e2e                  # Run Playwright E2E tests
yarn test:integration          # Run integration tests
yarn test:watch               # Run tests in watch mode

# Code Quality
yarn lint                      # Run ESLint
yarn typecheck                 # Run TypeScript type checking
yarn format                    # Format code with Prettier
yarn validate                  # Run all checks (lint + typecheck + test)

# Database
yarn db:push                   # Push schema changes to Supabase
yarn db:pull                   # Pull schema from Supabase
yarn db:reset                  # Reset database (dev only)
yarn db:seed                   # Seed test data

# Deployment
yarn deploy:preview            # Deploy to Vercel preview
yarn deploy:production         # Deploy to production
```

## Implementation Phases

### Phase 1: Marketing Landing Page + Early Access ⭐ CURRENT PRIORITY
**Goal**: Launch persuasive landing page with early access email capture

#### Tasks:
1. **Project Setup**
   - Initialize Next.js 14+ with App Router
   - Configure Yarn workspace monorepo structure
   - Set up Vercel project with environment variables
   - Create Supabase project and early_access table

2. **Landing Page Components**
   - Hero section with headline: "Turn every post into every language"
   - Email capture form with validation and spam protection
   - 3-step "How it works" visual explainer
   - Benefits/proof points section
   - Footer with legal links

3. **Backend API**
   - `POST /api/early-access` endpoint
   - Supabase integration for storing emails
   - Basic analytics event tracking
   - hCaptcha or honeypot for spam prevention

4. **Testing & Deployment**
   - Unit tests for form logic
   - Playwright E2E test for signup flow
   - Lighthouse performance optimization (target: 90+)
   - Deploy to Vercel with production environment

#### Acceptance Criteria:
- [ ] Email submissions successfully stored in Supabase
- [ ] Landing page Lighthouse score ≥ 90
- [ ] Spam protection implemented
- [ ] Analytics events tracking
- [ ] Production deployment live

### Phase 2: Auth, Dashboard & Settings
**Goal**: User authentication, X account connection, and configuration dashboard

#### Tasks:
1. **Authentication Setup**
   - Integrate Privy for login (email/passkey/social)
   - User session management
   - Protected route middleware
   - User profile in Supabase

2. **X Account Connection**
   - OAuth 2.0 flow implementation
   - Secure token storage (encrypted)
   - Account status display
   - Disconnect functionality

3. **Dashboard Settings**
   - Content type selection (videos, clips, spaces, livestreams)
   - Language multi-select (20+ languages)
   - Publishing behavior options
   - Settings persistence to database

4. **Billing Integration**
   - Stripe customer creation
   - Subscription management UI
   - Usage tracking display
   - Plan selection (Free → Creator)

### Phase 3: Agent & Dub Pipeline
**Goal**: Automated content discovery, dubbing, and tracking

#### Tasks:
1. **Agent Architecture**
   - Vercel Cron job configuration
   - Per-account polling system
   - Rate limit handling
   - Error recovery and retries

2. **Content Discovery**
   - X API timeline polling
   - Eligible post detection
   - Media URL resolution
   - Deduplication logic

3. **Dubbing Pipeline**
   - SpeechLab API integration
   - Project creation per source
   - Per-language job submission
   - Status polling and updates

4. **Data Management**
   - Job status tracking
   - Output URL storage
   - Usage ledger updates
   - Dashboard list rendering

### Phase 4: Auto-Publishing & Admin Console
**Goal**: Automated content publishing and administrative oversight

#### Tasks:
1. **Publishing System**
   - Manual publish buttons
   - Auto-reply implementation
   - New post creation
   - Template customization

2. **Admin Console**
   - Role-based access (X handle gating)
   - User management interface
   - Usage analytics dashboard
   - Dub history with filters

3. **Monitoring & Alerts**
   - Failure tracking
   - Webhook logging
   - Retry mechanisms
   - Alert notifications

### Phase 5+: Enhancements
- Content safety checks
- Automatic captions
- A/B testing for reply text
- Multi-account management
- Additional platforms (YouTube, TikTok)

## API Endpoints

### Public API Routes
```typescript
// Early Access
POST /api/early-access          // Email signup

// Authentication
GET  /api/me                    // Current user profile
POST /api/auth/logout           // Logout

// X Connection
POST /api/connect/x/start       // Start OAuth flow
GET  /api/connect/x/callback    // OAuth callback
POST /api/connect/x/disconnect  // Disconnect account

// Settings
GET  /api/settings              // Get user settings
POST /api/settings              // Update settings

// Dubbing
GET  /api/dubs                  // List user's dubs
POST /api/dubs/test             // Test dub with URL
POST /api/dubs/:id/publish     // Manually publish

// Billing
GET  /api/billing/usage         // Current usage
POST /api/billing/checkout      // Create checkout session
POST /api/billing/portal        // Customer portal
```

### Webhook Endpoints
```typescript
POST /api/webhooks/stripe       // Stripe events
POST /api/webhooks/speechlab    // SpeechLab callbacks
POST /api/webhooks/x            // X webhooks (future)
```

### Agent Endpoints (Internal)
```typescript
POST /api/agent/scan            // Discover new posts
POST /api/agent/process         // Process dubbing jobs
POST /api/agent/poll            // Check job statuses
POST /api/agent/publish         // Execute auto-publishing
```

## Database Schema (Supabase)

### Core Tables
- `early_access` - Email signups
- `users` - User accounts
- `twitter_accounts` - Connected X accounts
- `influencer_settings` - User preferences
- `sources` - Original posts to dub
- `speechlab_projects` - Dubbing projects
- `dubs` - Individual language dubs
- `usage_ledger` - Usage tracking
- `subscriptions` - Stripe subscriptions
- `webhooks` - Webhook event log
- `admin_users` - Admin access control
- `audit_log` - Admin action tracking

### Key Relationships
- User → TwitterAccount (1:many)
- User → Settings (1:1)
- Source → Dubs (1:many)
- Source → SpeechLabProject (1:1)
- User → Subscription (1:1)

## External Service Integration

### X (Twitter) API v2
- **Authentication**: OAuth 2.0 with PKCE
- **Scopes**: tweet.read, tweet.write, users.read
- **Rate Limits**: Implement exponential backoff
- **Media Upload**: Use chunked upload for videos

### SpeechLab API
```typescript
// Create project
POST /projects
// Submit dubbing job
POST /projects/:id/dubs { language, mediaUrl }
// Check job status
GET /jobs/:jobId
```

### Stripe
- **Products**: FREE (30 minutes), CREATOR ($29.99/43 minutes), then $0.85/min
- **Webhooks**: invoice.paid, subscription.updated/deleted
- **Usage**: Internal tracking, not Stripe metered billing

### Privy
- **Login Methods**: Email, passkey, social
- **Session Management**: JWT with refresh tokens
- **User Metadata**: Store in Supabase

## API Integration Implementation Examples

### Twitter Media Download Process
Based on reference implementation in `exampleONLY/speechlab-twitter-spaces-translator/`:

#### 1. Downloading Twitter Space Audio (M3U8 Streams)
```javascript
// Using ffmpeg to download M3U8 streams
const ffmpegArgs = [
    '-protocol_whitelist', 'file,http,https,tcp,tls,crypto',
    '-i', m3u8Url,
    '-c', 'copy', 
    '-bsf:a', 'aac_adtstoasc',
    '-y',
    outputFilePath
];

// Execute with progress tracking
spawn('ffmpeg', ffmpegArgs);
```

#### 2. Upload to S3 for Public Access
```javascript
// Upload downloaded audio to S3
const uploadParams = {
    Bucket: AWS_S3_BUCKET,
    Key: `twitter-space-audio/${filename}`,
    Body: fileBuffer,
    ContentType: 'audio/aac'
};

// Returns public URL like:
// https://bucket.s3.region.amazonaws.com/twitter-space-audio/file.aac
```

### SpeechLab API Integration

#### 1. Authentication
```javascript
// Login to get JWT token
POST https://translate-api.speechlab.ai/v1/auth/login
{
    "email": "your-email",
    "password": "your-password"
}

// Response contains JWT token
response.data.tokens.accessToken.jwtToken
```

#### 2. Create Dubbing Project
```javascript
// Create project and start dubbing
POST https://translate-api.speechlab.ai/v1/projects/createProjectAndDub
Headers: { 'Authorization': `Bearer ${token}` }
{
    "name": "Space Name - Target Language",
    "sourceLanguage": "en",
    "targetLanguage": "es_la", // Map 'es' to 'es_la' for API
    "dubAccent": "es_la",
    "unitType": "whiteGlove",
    "mediaFileURI": "https://s3-public-url.aac",
    "voiceMatchingMode": "source",
    "thirdPartyID": "unique-identifier"
}

// Returns projectId for tracking
```

#### 3. Check Project Status
```javascript
// Poll for completion using thirdPartyID
GET https://translate-api.speechlab.ai/v1/projects
    ?thirdPartyIDs=${thirdPartyID}
    &expand=true

// Status values: PROCESSING, COMPLETE, FAILED
// Poll every 30 seconds until COMPLETE
```

#### 4. Get Dubbed Media URLs
```javascript
// Once COMPLETE, extract dubbed media URLs from response
project.translations[0].dub[0].medias
// Each media object contains:
{
    "uri": "dubbed-file-url",
    "presignedURL": "temporary-download-url",
    "format": "mp3",
    "operationType": "OUTPUT"
}
```

### Complete Dubbing Pipeline Flow

1. **Extract Media URL from Twitter**
   - Get M3U8 playlist URL from Twitter Space/Video
   - Parse manifest for audio stream

2. **Download & Upload**
   - Download with ffmpeg to local temp file
   - Upload to S3 for public access
   - Clean up temp file

3. **Submit to SpeechLab**
   - Authenticate and get JWT token
   - Create dubbing project with S3 URL
   - Store thirdPartyID for tracking

4. **Monitor Progress**
   - Poll project status every 30 seconds
   - Typical completion: 5-30 minutes
   - Handle FAILED status gracefully

5. **Retrieve Dubbed Content**
   - Extract presigned URLs from completed project
   - Download dubbed audio files
   - Post back to Twitter as replies

### Important Implementation Notes

#### Language Code Mapping
- Twitter uses standard ISO codes (e.g., 'es')
- SpeechLab may require specific variants (e.g., 'es_la' for Latin American Spanish)
- Implement mapping layer for compatibility

#### Error Handling
- Implement retry logic with exponential backoff
- Handle 401 errors by refreshing auth token
- Log all API responses for debugging

#### Rate Limiting
- SpeechLab: No explicit limits documented, use reasonable polling intervals
- Twitter API: Respect rate limits, implement backoff
- S3: Use multipart upload for large files

#### Security
- Never store Twitter passwords - use OAuth only
- Encrypt all tokens at rest in database
- Use presigned URLs for temporary access
- Implement request signing for webhooks

### Webhook Integration

#### SpeechLab Webhooks (if available)
```javascript
POST /api/webhooks/speechlab
// Verify signature
// Update job status in database
// Trigger next steps in pipeline
```

#### Process Completion Handling
```javascript
// On dubbing completion:
1. Update database with dubbed URLs
2. Queue for Twitter posting
3. Send notification to user
4. Update usage metrics
```

## Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=https://xdub.app
NEXT_PUBLIC_APP_NAME="X Dub"

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Privy
PRIVY_APP_ID=
PRIVY_APP_SECRET=

# X (Twitter)
X_CLIENT_ID=
X_CLIENT_SECRET=
X_REDIRECT_URI=
X_SCOPES="tweet.read tweet.write users.read"

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_FREE=
STRIPE_PRICE_CREATOR=

# SpeechLab
SPEECHLAB_API_KEY=
SPEECHLAB_API_URL=

# Internal
INTERNAL_JOB_SECRET=
ADMIN_TWITTER_HANDLES="handle1,handle2"

# Analytics (optional)
POSTHOG_KEY=
SENTRY_DSN=
```

## Vercel Configuration

### Cron Jobs
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
    },
    {
      "path": "/api/agent/publish",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

### Function Configuration
```json
{
  "functions": {
    "api/agent/*": {
      "maxDuration": 60
    },
    "api/webhooks/*": {
      "maxDuration": 30
    }
  }
}
```

## Security Best Practices

1. **Token Security**
   - Encrypt OAuth tokens at rest
   - Use Supabase RLS for data isolation
   - Rotate internal secrets regularly

2. **API Security**
   - Validate all inputs
   - Rate limit public endpoints
   - Sign internal webhook calls

3. **Content Policy**
   - Process only authenticated user's content
   - Implement content safety checks
   - Audit log all admin actions

## Testing Strategy

### Unit Tests (Vitest)
- Form validation logic
- API route handlers
- Utility functions
- React component logic

### Integration Tests
- Database operations
- External API mocking
- Webhook processing
- Job pipeline flow

### E2E Tests (Playwright)
- Landing page signup flow
- OAuth connection flow
- Settings configuration
- Dashboard interactions
- Billing flow

## Performance Targets

- Landing page: Lighthouse 90+ (mobile & desktop)
- Dashboard FCP: < 2s on 4G
- API response: < 200ms p95
- Background jobs: < 60s execution
- Dubbing pipeline: < 5min per language

## Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Security review completed

### Deployment
- [ ] Deploy to preview environment
- [ ] Smoke test critical paths
- [ ] Deploy to production
- [ ] Verify cron jobs running

### Post-deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify webhook delivery
- [ ] Test billing flow

## Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Write tests first (TDD)
   - Implement feature
   - Run `yarn validate`
   - Create PR with description

2. **Code Review**
   - Automated checks must pass
   - Manual review required
   - Update documentation
   - Merge to main

3. **Release Process**
   - Automatic deployment on merge
   - Monitor deployment metrics
   - Rollback if issues detected

## Troubleshooting

### Common Issues

**X API Rate Limits**
- Check rate limit headers
- Implement exponential backoff
- Use cursor-based pagination

**SpeechLab Job Failures**
- Verify media format compatibility
- Check language code mapping
- Retry with exponential backoff

**Stripe Webhook Failures**
- Verify webhook signature
- Check event idempotency
- Log raw payload for debugging

**Database Connection Issues**
- Check connection pool limits
- Verify RLS policies
- Monitor query performance

## Support Resources

- SpeechLab API Docs: [Internal documentation]
- X API Reference: https://developer.twitter.com/en/docs
- Stripe Docs: https://stripe.com/docs
- Supabase Docs: https://supabase.com/docs
- Privy Docs: https://docs.privy.io/