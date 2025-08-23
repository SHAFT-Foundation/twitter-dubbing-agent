# Local Testing Setup Guide

## 1. Setup Supabase Database

First, run the migration in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run it in the SQL Editor
5. You should see all tables created successfully

## 2. Configure Environment Variables

1. Copy the example env file:
```bash
cp apps/web/.env.local.example apps/web/.env.local
```

2. Edit `apps/web/.env.local` and add your REAL values:

### Required for Basic Testing:
```env
# From Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Use this generated encryption key:
ENCRYPTION_KEY=c7fbbf15eaabea8fe5771fb364feb2612a3166556fca03e35fb2b53f34b7ada9

# For internal cron job protection (any random string)
INTERNAL_JOB_SECRET=xdub-secret-2024
```

### Optional for Full Testing:
- **X/Twitter API**: Get from https://developer.twitter.com
- **SpeechLab**: Get credentials from SpeechLab
- **AWS S3**: For media storage (can skip for basic testing)
- **Stripe**: Use test keys from Stripe dashboard

## 3. Run the Development Server

```bash
# Install dependencies (if not already done)
yarn install

# Run the development server
yarn dev
```

The app will be available at: http://localhost:3003

## 4. Test the Application

### Landing Page (http://localhost:3003)
- ✅ View the landing page
- ✅ Sign up for early access (emails saved to Supabase)
- ✅ Check Supabase to see if email was saved

### Dashboard (http://localhost:3003/dashboard)
- ✅ View dashboard (currently no auth required)
- ✅ Navigate to Settings
- ✅ Navigate to Billing
- ✅ Navigate to Dubs (shows mock data)

### Settings Page (http://localhost:3003/dashboard/settings)
- ⚠️ X/Twitter connection requires valid API credentials
- ✅ View language selector
- ✅ View content type options
- ✅ View publishing options

### Dubs Page (http://localhost:3003/dashboard/dubs)
- ✅ View mock dubbing data
- ✅ Filter by status
- ✅ See publish buttons (requires X API to actually work)

## 5. API Endpoints You Can Test

### Early Access Signup
```bash
curl -X POST http://localhost:3003/api/early-access \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Get Dubs (returns mock data)
```bash
curl http://localhost:3003/api/dubs
```

## 6. Features That Need Configuration

To fully test these features, you'll need:

1. **X/Twitter OAuth Flow**: 
   - Valid X API credentials
   - Callback URL: `http://localhost:3003/api/connect/x/callback`

2. **Dubbing Pipeline**:
   - SpeechLab credentials
   - AWS S3 bucket (or modify to use local storage)

3. **Cron Jobs** (for automation):
   - These are configured in `vercel.json`
   - For local testing, you can manually trigger:
     - `/api/agent/scan` - Discover new content
     - `/api/agent/process` - Process discovered content
     - `/api/agent/poll` - Check dubbing status
     - `/api/agent/publish` - Auto-publish completed dubs

## 7. Quick Fixes for Common Issues

### If Privy login doesn't work:
- The auth is currently mocked, so you can access dashboard directly
- Full Privy integration needs valid Privy credentials

### If X/Twitter connection fails:
- Check your X API credentials are correct
- Ensure callback URL is whitelisted in Twitter app settings

### If database queries fail:
- Check Supabase connection settings
- Verify tables were created successfully
- Check RLS policies aren't blocking access

## 8. Monitor Your Supabase

Go to your Supabase dashboard to:
- View data in tables
- Monitor API requests
- Check logs for errors
- Test SQL queries

## Ready to Test! 🚀

Start with the landing page, then explore the dashboard.
Most UI features work without full configuration.
Add real API credentials as needed for specific features.