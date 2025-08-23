# Phase 1: Marketing Landing Page + Early Access
## Implementation Checklist

### ⚡ Quick Start Commands
```bash
# Initialize the project
yarn create next-app@latest apps/web --typescript --app --tailwind --eslint
cd apps/web
yarn add @supabase/supabase-js @supabase/ssr posthog-js react-hook-form zod
yarn add -D @types/node vitest @vitest/ui @playwright/test prettier

# Set up monorepo structure
cd ../..
yarn init -y
yarn add -D turbo
```

### 📋 Task Breakdown

## 1. Project Initialization (Day 1)

### 1.1 Setup Monorepo Structure
- [ ] Create root `package.json` with workspaces configuration
- [ ] Set up Turbo configuration (`turbo.json`)
- [ ] Create `apps/web` directory for Next.js app
- [ ] Create `packages/db` for database utilities
- [ ] Create `packages/ui` for shared components
- [ ] Create `packages/types` for TypeScript types

**Files to create:**
```
/package.json
/turbo.json
/apps/web/package.json
/packages/db/package.json
/packages/ui/package.json
/packages/types/package.json
```

### 1.2 Initialize Next.js Application
- [ ] Create Next.js 14+ app with App Router
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Set up ESLint configuration
- [ ] Configure Prettier
- [ ] Set up Tailwind CSS
- [ ] Create `.env.local` file template

**Commands:**
```bash
yarn create next-app@latest apps/web \
  --typescript \
  --app \
  --tailwind \
  --eslint \
  --import-alias "@/*"
```

### 1.3 Supabase Setup
- [ ] Create Supabase project at https://supabase.com
- [ ] Note down project URL and anon key
- [ ] Create `early_access` table with schema:
  ```sql
  CREATE TABLE early_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_medium VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  
  CREATE INDEX idx_early_access_email ON early_access(email);
  CREATE INDEX idx_early_access_created_at ON early_access(created_at DESC);
  ```

### 1.4 Vercel Project Setup
- [ ] Create Vercel project
- [ ] Link to GitHub repository
- [ ] Configure environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_POSTHOG_KEY` (optional)

## 2. Landing Page Components (Day 2-3)

### 2.1 Create Landing Page Structure
- [ ] Create `app/(marketing)/page.tsx` - Main landing page
- [ ] Create `app/(marketing)/layout.tsx` - Marketing layout
- [ ] Create `app/layout.tsx` - Root layout with metadata

### 2.2 Hero Section Component
- [ ] Create `components/landing/HeroSection.tsx`
- [ ] Implement headline: "Turn every post into every language"
- [ ] Add subheadline with value proposition
- [ ] Create CTA button linking to email form
- [ ] Add background gradient or visual element

**Component structure:**
```typescript
// components/landing/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="hero">
      <h1>Turn every post into every language</h1>
      <p>Auto-dub your videos and Spaces into 20+ languages...</p>
      <Button>Sign up for Early Access</Button>
    </section>
  );
}
```

### 2.3 Email Capture Form
- [ ] Create `components/landing/EmailCaptureForm.tsx`
- [ ] Implement form with react-hook-form
- [ ] Add Zod schema validation
- [ ] Add honeypot field for spam prevention
- [ ] Implement loading and success states
- [ ] Add error handling

**Form implementation:**
```typescript
// components/landing/EmailCaptureForm.tsx
const schema = z.object({
  email: z.string().email(),
  hp_email: z.string().optional(), // honeypot
});
```

### 2.4 How It Works Section
- [ ] Create `components/landing/HowItWorks.tsx`
- [ ] Design 3-step visual process
- [ ] Add icons for each step
- [ ] Implement responsive grid layout

### 2.5 Benefits Section
- [ ] Create `components/landing/BenefitsSection.tsx`
- [ ] List key benefits with icons
- [ ] Add social proof elements
- [ ] Include trust badges

### 2.6 Footer Component
- [ ] Create `components/landing/Footer.tsx`
- [ ] Add Terms of Service link
- [ ] Add Privacy Policy link
- [ ] Add "Powered by SpeechLab" badge
- [ ] Include copyright notice

## 3. API Implementation (Day 3)

### 3.1 Early Access API Route
- [ ] Create `app/api/early-access/route.ts`
- [ ] Implement POST handler
- [ ] Add input validation
- [ ] Integrate Supabase client
- [ ] Add rate limiting
- [ ] Implement error handling

**API implementation:**
```typescript
// app/api/early-access/route.ts
export async function POST(request: Request) {
  // 1. Parse and validate request body
  // 2. Check honeypot field
  // 3. Check for existing email
  // 4. Insert into Supabase
  // 5. Track analytics event
  // 6. Return success response
}
```

### 3.2 Supabase Client Setup
- [ ] Create `lib/supabase/client.ts` for browser
- [ ] Create `lib/supabase/server.ts` for server
- [ ] Configure proper authentication
- [ ] Add type generation script

### 3.3 Analytics Integration
- [ ] Set up PostHog or similar
- [ ] Track page views
- [ ] Track CTA clicks
- [ ] Track form submissions
- [ ] Track conversion funnel

## 4. Testing (Day 4)

### 4.1 Unit Tests Setup
- [ ] Configure Vitest
- [ ] Create test utilities
- [ ] Set up test environment variables

### 4.2 Component Tests
- [ ] Test EmailCaptureForm validation
- [ ] Test form submission flow
- [ ] Test error states
- [ ] Test success states

### 4.3 API Route Tests
- [ ] Test successful email submission
- [ ] Test duplicate email handling
- [ ] Test validation errors
- [ ] Test rate limiting
- [ ] Test honeypot spam prevention

### 4.4 E2E Tests with Playwright
- [ ] Set up Playwright configuration
- [ ] Test complete signup flow
- [ ] Test form validation
- [ ] Test mobile responsiveness
- [ ] Test cross-browser compatibility

**E2E test example:**
```typescript
// tests/e2e/signup.spec.ts
test('user can sign up for early access', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Sign up for Early Access');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=You\'re on the list')).toBeVisible();
});
```

## 5. Performance Optimization (Day 4)

### 5.1 Lighthouse Optimization
- [ ] Run Lighthouse audit
- [ ] Optimize images (use next/image)
- [ ] Implement lazy loading
- [ ] Minimize JavaScript bundle
- [ ] Optimize fonts loading
- [ ] Add meta tags for SEO

### 5.2 Performance Targets
- [ ] Achieve Lighthouse score ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

## 6. Deployment (Day 5)

### 6.1 Pre-deployment Checklist
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SEO meta tags added
- [ ] OpenGraph tags configured
- [ ] Favicon and app icons added

### 6.2 Vercel Deployment
- [ ] Deploy to preview environment
- [ ] Test all functionality
- [ ] Verify analytics tracking
- [ ] Check responsive design
- [ ] Deploy to production

### 6.3 Post-deployment
- [ ] Verify production deployment
- [ ] Test form submission in production
- [ ] Monitor error tracking
- [ ] Check analytics data flow
- [ ] Set up uptime monitoring

## 7. Documentation

### 7.1 Create Documentation
- [ ] Write README.md with setup instructions
- [ ] Document environment variables
- [ ] Create CONTRIBUTING.md
- [ ] Document API endpoints
- [ ] Add inline code comments

### 7.2 Legal Pages (Basic)
- [ ] Create basic Terms of Service page
- [ ] Create basic Privacy Policy page
- [ ] Add cookie notice if needed

## File Structure After Phase 1

```
twitter-dubbing-agent/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (marketing)/
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── api/
│       │   │   └── early-access/
│       │   │       └── route.ts
│       │   ├── layout.tsx
│       │   └── globals.css
│       ├── components/
│       │   └── landing/
│       │       ├── HeroSection.tsx
│       │       ├── EmailCaptureForm.tsx
│       │       ├── HowItWorks.tsx
│       │       ├── BenefitsSection.tsx
│       │       └── Footer.tsx
│       ├── lib/
│       │   ├── supabase/
│       │   │   ├── client.ts
│       │   │   └── server.ts
│       │   └── analytics.ts
│       ├── public/
│       │   └── (assets)
│       └── package.json
├── packages/
│   ├── db/
│   ├── ui/
│   └── types/
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.local.example
├── package.json
├── turbo.json
└── README.md
```

## Success Criteria ✅

- [ ] Landing page live at production URL
- [ ] Email signups being captured in Supabase
- [ ] Lighthouse score ≥ 90 on mobile and desktop
- [ ] All tests passing (unit + E2E)
- [ ] Analytics tracking working
- [ ] No console errors in production
- [ ] Mobile responsive design working
- [ ] Form validation and spam protection active
- [ ] Legal pages accessible

## Time Estimate: 5 Days

- Day 1: Project setup and configuration
- Day 2-3: Landing page implementation
- Day 3: API and backend integration
- Day 4: Testing and optimization
- Day 5: Deployment and documentation

## Next Phase Preview
After Phase 1 completion, Phase 2 will add:
- Privy authentication
- X (Twitter) OAuth connection
- User dashboard
- Settings management
- Stripe billing integration