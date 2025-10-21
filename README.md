# X Dub - AI Video Dubbing for Social Media

**X Dub** is an AI-powered video dubbing platform that automatically translates and dubs X (Twitter) videos, clips, Spaces, and livestreams into 30+ languages. Built for influencers and content creators to grow their global reach with zero friction.

🌐 **Live Site:** [https://xdub.app](https://xdub.app)
🎙️ **Powered by:** [SpeechLab](https://speechlab.ai)
🏢 **Built by:** SHAFT Foundation

---

## 🚀 Features

- **Automatic Video Dubbing**: AI detects and dubs new X content automatically
- **30+ Languages**: Expand your reach to global audiences
- **Voice Cloning Technology**: Preserves your unique voice characteristics
- **Lip-Sync Dubbing**: Natural-looking dubbed videos
- **Auto-Publishing**: Posts dubbed content as replies or new posts
- **X Space Summaries**: AI-generated multilingual summaries (optional)
- **Freemium Model**: 10 free minutes/month, then $29.99 for 60 minutes + $0.85/min

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Runtime**: Node.js 18+
- **Package Manager**: Yarn
- **Hosting**: Vercel (web + API + cron jobs)
- **Database**: Supabase (Postgres + Auth + Storage)
- **Authentication**: Privy (email/passkey/social)
- **Billing**: Stripe
- **Dubbing API**: SpeechLab API
- **Social Platform**: X (Twitter) API v2

---

## 📁 Project Structure

```
twitter-dubbing-agent/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/                # App Router pages
│       │   ├── (app)/         # Authenticated pages
│       │   ├── api/           # API routes
│       │   ├── blog/          # Blog posts
│       │   └── page.tsx       # Landing page
│       ├── components/         # React components
│       │   └── landing/       # Landing page components
│       ├── lib/               # Utilities
│       └── public/            # Static assets
├── packages/
│   ├── db/                    # Database schema
│   ├── ui/                    # Shared UI components
│   └── types/                 # TypeScript types
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── playwright/            # E2E tests
└── CLAUDE.md                  # Claude Code instructions
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn package manager
- Supabase account
- Vercel account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/twitter-dubbing-agent.git
cd twitter-dubbing-agent

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
yarn db:migrate

# Start development server
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🎯 Development with Claude Code

This project includes comprehensive Claude Code instructions for AI-assisted development. Here are real examples from this project:

### Example 1: Adding SpeechLab Branding

**User prompt:**
```
please update the landing page site with the early access signup in multiple key places
and say "Powered by" with this logo next to it and its linked to https://speechlab.ai
apps/web/public/speechlablogo.png
```

**Claude Code response:**
1. Created reusable `PoweredBySpeechLab.tsx` component
2. Added Next.js Image optimization
3. Placed component in 6 strategic locations:
   - Hero section (2 places)
   - Benefits section
   - Pricing section (2 places)
   - Footer

**Key files created/modified:**
- `/apps/web/components/landing/PoweredBySpeechLab.tsx`
- `/apps/web/components/landing/HeroSection.tsx`
- `/apps/web/components/landing/Footer.tsx`

### Example 2: SEO/AEO Optimization

**User prompt:**
```
add these keywords for AEO and SEO to the landing page the goal is to show up in
chat AI reference links and search engine results!
1. AI video dubbing
2. multilingual video dubbing
3. social media dubbing service
[... 7 more keywords]

make sure the landing page content still flows well to the primary goal of getting
early access signups don't clutter the page with these words making the text content weird
```

**Claude Code response:**
1. Updated H1 with primary keywords naturally
2. Enhanced meta tags and descriptions
3. Created FAQ section with structured data
4. Added blog posts with real industry examples
5. Created comprehensive sitemap and robots.txt

**Key files created:**
- `/apps/web/app/sitemap.ts` - Dynamic sitemap
- `/apps/web/app/robots.txt` - Crawler permissions
- `/apps/web/components/landing/FAQSection.tsx` - Schema markup
- `/apps/web/app/blog/*` - 5 SEO-optimized blog posts

### Example 3: Blog System with Case Studies

**User prompt:**
```
Create blog posts or landing pages explaining concepts like voice cloning and
lip-sync technology and showing how AI dubbing improves SEO and engagement,
citing industry examples. can u do the blog post part 5 blog posts maybe
linked off landing page?
```

**Claude Code response:**
Created complete blog system with:
1. Blog infrastructure (layout, navigation)
2. 5 comprehensive posts with real examples:
   - Netflix case studies (Squid Game: 1.65B hours)
   - MrBeast growth data (10M subs in 6 months)
   - Detailed ROI case studies (average 3,089% ROI)
3. BlogPosting schema markup on each post
4. Featured blog section on landing page
5. Footer links to all posts

**Key files created:**
- `/apps/web/app/blog/layout.tsx`
- `/apps/web/app/blog/page.tsx`
- `/apps/web/app/blog/[5 detailed posts]/page.tsx`
- `/apps/web/components/landing/BlogSection.tsx`

---

## 🚀 Deploying to Vercel

### Method 1: Deploy from Git (Recommended)

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: `Next.js`
     - Root Directory: `apps/web`
     - Build Command: `yarn build`
     - Output Directory: `.next`

3. **Add Environment Variables:**
```env
NEXT_PUBLIC_APP_URL=https://xdub.app
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
STRIPE_SECRET_KEY=your_stripe_secret
SPEECHLAB_API_KEY=your_speechlab_key
```

4. **Deploy:**
   - Click "Deploy"
   - Vercel automatically builds and deploys your app
   - Custom domain setup available after deployment

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Quick Deploy Button

Add this to your README for one-click deployment:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/twitter-dubbing-agent)
```

### Vercel Configuration

The project includes a `vercel.json` for cron jobs:

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

**Post-Deployment Checklist:**
- ✅ Environment variables configured
- ✅ Custom domain connected (optional)
- ✅ Cron jobs running (check Vercel dashboard)
- ✅ Database migrations applied
- ✅ Webhooks configured (Stripe, SpeechLab)
- ✅ Submit sitemap to Google Search Console

---

## 📦 Available Commands

```bash
# Development
yarn dev                       # Start development server
yarn build                     # Build for production
yarn start                     # Start production server
yarn lint                      # Run ESLint
yarn typecheck                 # Run TypeScript checks
yarn validate                  # Run all checks (lint + typecheck + test)

# Testing
yarn test                      # Run all tests
yarn test:unit                 # Unit tests only
yarn test:e2e                  # Playwright E2E tests
yarn test:watch               # Watch mode

# Database
yarn db:migrate                # Run migrations
yarn db:push                   # Push schema changes
yarn db:pull                   # Pull schema from Supabase
yarn db:generate               # Generate TypeScript types

# Deployment
yarn deploy:preview            # Deploy to Vercel preview
yarn deploy:production         # Deploy to production
```

---

## 🔒 Environment Variables

Create a `.env.local` file in `apps/web/`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="X Dub"

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Privy Auth
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret

# X (Twitter) API
X_CLIENT_ID=your_x_client_id
X_CLIENT_SECRET=your_x_client_secret
X_REDIRECT_URI=http://localhost:3000/api/connect/x/callback

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_PRICE_FREE=price_xxx
STRIPE_PRICE_CREATOR=price_xxx

# SpeechLab
SPEECHLAB_API_KEY=your_speechlab_api_key
SPEECHLAB_API_URL=https://translate-api.speechlab.ai/v1

# Internal
INTERNAL_JOB_SECRET=generate_random_string
ADMIN_TWITTER_HANDLES="handle1,handle2"

# Analytics (optional)
LOGROCKET_APP_ID=o1pgml/xdub
POSTHOG_KEY=your_posthog_key
```

---

## 📊 SEO & Analytics

### Current SEO Score: 85/100

**Implemented:**
- ✅ Comprehensive meta tags with keywords
- ✅ Structured data (SoftwareApplication, FAQPage, BlogPosting)
- ✅ Dynamic sitemap.xml with all pages
- ✅ Robots.txt with AI crawler permissions
- ✅ Open Graph & Twitter Card metadata
- ✅ Canonical URLs
- ✅ 5 SEO-optimized blog posts with real case studies
- ✅ Internal linking structure
- ✅ Featured blog section on landing page

**Analytics Tools:**
- LogRocket (session recording)
- PostHog (optional)
- Sentry (optional)

---

## 🔗 API Integration Examples

### SpeechLab API Integration

```javascript
// Create dubbing project
POST https://translate-api.speechlab.ai/v1/projects/createProjectAndDub
Headers: { 'Authorization': `Bearer ${token}` }
{
  "name": "Space Name - Target Language",
  "sourceLanguage": "en",
  "targetLanguage": "es_la",
  "mediaFileURI": "https://s3-url.aac",
  "voiceMatchingMode": "source"
}
```

### Twitter Media Download

```javascript
// Download M3U8 streams with ffmpeg
const ffmpegArgs = [
  '-protocol_whitelist', 'file,http,https,tcp,tls,crypto',
  '-i', m3u8Url,
  '-c', 'copy',
  outputFilePath
];
```

See `exampleONLY/speechlab-twitter-spaces-translator/` for complete reference implementation.

---

## 🧪 Testing

```bash
# Run all tests
yarn test

# Unit tests with Vitest
yarn test:unit

# E2E tests with Playwright
yarn test:e2e

# Watch mode for development
yarn test:watch
```

**Test Coverage Goals:**
- Unit tests: >90%
- Integration tests: Critical paths
- E2E tests: Core user flows

---

## 📝 Documentation

- **CLAUDE.md** - Claude Code project instructions
- **ARCHITECTURE.md** - System design and technical specs (coming soon)
- **API Docs** - OpenAPI/Swagger documentation (coming soon)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Quality Requirements:**
- All tests must pass
- ESLint warnings/errors must be resolved
- TypeScript strict mode compliance
- Maintain >90% test coverage

---

## 📄 License

Copyright © 2024 SHAFT Foundation. All rights reserved.

---

## 🔗 Links

- **Website:** [https://xdub.app](https://xdub.app)
- **SpeechLab:** [https://speechlab.ai](https://speechlab.ai)
- **DAIAA Partner:** [https://www.daiaa.org](https://www.daiaa.org)
- **Support:** argos@shaft.finance

---

## 🙏 Acknowledgments

- **SpeechLab** - AI dubbing technology
- **Vercel** - Hosting and deployment
- **Supabase** - Backend infrastructure
- **DAIAA** - Partnership and support

---

**Built with ❤️ by SHAFT Foundation**
