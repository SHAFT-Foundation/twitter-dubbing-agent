# Phase 2: Authentication, Dashboard & Settings
## Implementation Checklist

### ⚡ Quick Start Commands
```bash
# Install Phase 2 dependencies
cd apps/web
yarn add @privy-io/react-auth @privy-io/server-auth
yarn add @stripe/stripe-js stripe
yarn add react-twitter-embed twitter-api-v2
yarn add @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-switch
yarn add lucide-react clsx tailwind-merge
```

### 📋 Task Breakdown

## 1. Authentication Setup (Day 1-2)

### 1.1 Privy Integration
- [ ] Create Privy account and application
- [ ] Configure allowed login methods:
  - [ ] Email
  - [ ] Passkey
  - [ ] Social providers (Google, GitHub)
- [ ] Set up redirect URLs
- [ ] Configure JWT settings
- [ ] Add environment variables:
  ```env
  NEXT_PUBLIC_PRIVY_APP_ID=
  PRIVY_APP_SECRET=
  ```

### 1.2 Auth Provider Setup
- [ ] Create `providers/PrivyProvider.tsx`
- [ ] Wrap app with PrivyProvider
- [ ] Configure appearance settings
- [ ] Set up onSuccess callbacks

**Provider implementation:**
```typescript
// providers/PrivyProvider.tsx
import { PrivyProvider } from '@privy-io/react-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#1DA1F2', // Twitter blue
        },
        loginMethods: ['email', 'google', 'github'],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
```

### 1.3 Authentication Hooks
- [ ] Create `hooks/useAuth.ts`
- [ ] Implement user session management
- [ ] Add logout functionality
- [ ] Handle authentication errors

### 1.4 Protected Routes
- [ ] Create middleware for auth checking
- [ ] Implement `app/(app)/layout.tsx` for protected pages
- [ ] Add loading states during auth check
- [ ] Redirect unauthenticated users

**Middleware implementation:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('privy-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

### 1.5 User Profile in Database
- [ ] Update Supabase schema:
  ```sql
  CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    privy_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Create user sync function
- [ ] Handle user creation on first login

## 2. X (Twitter) OAuth Integration (Day 2-3)

### 2.1 X App Configuration
- [ ] Create X Developer account
- [ ] Create new app with OAuth 2.0
- [ ] Configure callback URLs
- [ ] Note Client ID and Secret
- [ ] Set required scopes:
  - `tweet.read`
  - `tweet.write`
  - `users.read`
  - `offline.access`

### 2.2 OAuth Flow Implementation
- [ ] Create `app/api/connect/x/start/route.ts`
- [ ] Create `app/api/connect/x/callback/route.ts`
- [ ] Implement PKCE flow
- [ ] Store tokens securely

**OAuth start route:**
```typescript
// app/api/connect/x/start/route.ts
import { generateCodeVerifier, generateCodeChallenge } from './oauth-utils';

export async function GET() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  // Store codeVerifier in session
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.X_CLIENT_ID!,
    redirect_uri: process.env.X_REDIRECT_URI!,
    scope: 'tweet.read tweet.write users.read offline.access',
    state: generateState(),
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  
  return NextResponse.redirect(
    `https://twitter.com/i/oauth2/authorize?${params}`
  );
}
```

### 2.3 Token Management
- [ ] Create token encryption utilities
- [ ] Store encrypted tokens in database:
  ```sql
  CREATE TABLE twitter_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    handle VARCHAR(255),
    twitter_user_id VARCHAR(255) UNIQUE,
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    scopes TEXT[],
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active'
  );
  ```
- [ ] Implement token refresh logic
- [ ] Handle token expiration

### 2.4 Account Connection UI
- [ ] Create `components/ConnectTwitter.tsx`
- [ ] Show connection status
- [ ] Display connected handle
- [ ] Add disconnect button
- [ ] Handle connection errors

## 3. Dashboard Implementation (Day 3-4)

### 3.1 Dashboard Layout
- [ ] Create `app/(app)/dashboard/page.tsx`
- [ ] Create navigation sidebar
- [ ] Implement responsive design
- [ ] Add user profile dropdown

**Dashboard structure:**
```typescript
// app/(app)/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TopNav />
        {children}
      </main>
    </div>
  );
}
```

### 3.2 Settings Page
- [ ] Create `app/(app)/dashboard/settings/page.tsx`
- [ ] Design settings form layout
- [ ] Implement form state management
- [ ] Add save functionality

### 3.3 Content Type Selection
- [ ] Create multi-select component
- [ ] Options:
  - [ ] Videos
  - [ ] Clips
  - [ ] Recorded Spaces
  - [ ] Livestream VODs
- [ ] Persist selections to database

**Content type selector:**
```typescript
// components/settings/ContentTypeSelector.tsx
const contentTypes = [
  { id: 'video', label: 'Videos', icon: VideoIcon },
  { id: 'clip', label: 'Clips', icon: FilmIcon },
  { id: 'space', label: 'Recorded Spaces', icon: MicIcon },
  { id: 'livestream', label: 'Livestream VODs', icon: StreamIcon },
];
```

### 3.4 Language Selection
- [ ] Create language multi-select
- [ ] Implement search/filter
- [ ] Show language flags/icons
- [ ] Group by region (optional)
- [ ] Support 20+ languages:
  ```typescript
  const languages = [
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'pt_br', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
    { code: 'es_la', name: 'Spanish (LatAm)', flag: '🇲🇽' },
    // ... more languages
  ];
  ```

### 3.5 Publishing Options
- [ ] Create publishing mode selector
- [ ] Options:
  - [ ] Auto-reply to original
  - [ ] Create new post
  - [ ] Manual only
- [ ] Add explanatory text for each option
- [ ] Implement preview of post format

### 3.6 Settings Persistence
- [ ] Create settings API endpoints
- [ ] Database schema:
  ```sql
  CREATE TABLE influencer_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    content_types TEXT[],
    languages TEXT[],
    publish_mode VARCHAR(50),
    auto_publish BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Implement optimistic updates
- [ ] Add success/error notifications

## 4. Billing Integration (Day 4-5)

### 4.1 Stripe Setup
- [ ] Create Stripe account
- [ ] Set up products and prices:
  - [ ] FREE: 3 dubs/month (no card)
  - [ ] CREATOR: $29.99 for 10 dubs/month
- [ ] Configure webhooks
- [ ] Add environment variables:
  ```env
  STRIPE_SECRET_KEY=
  STRIPE_WEBHOOK_SECRET=
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
  STRIPE_PRICE_CREATOR=
  ```

### 4.2 Checkout Integration
- [ ] Create `app/api/billing/checkout/route.ts`
- [ ] Implement Stripe Checkout session
- [ ] Handle success/cancel URLs
- [ ] Track checkout analytics

**Checkout implementation:**
```typescript
// app/api/billing/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_CREATOR,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });
  
  return NextResponse.json({ url: session.url });
}
```

### 4.3 Subscription Management
- [ ] Create subscriptions table:
  ```sql
  CREATE TABLE subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    plan_id VARCHAR(50),
    status VARCHAR(50),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Handle subscription lifecycle
- [ ] Implement customer portal link

### 4.4 Usage Tracking
- [ ] Create usage ledger:
  ```sql
  CREATE TABLE usage_ledger (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    month VARCHAR(7), -- YYYY-MM
    quantity INTEGER DEFAULT 0,
    source_id UUID,
    dub_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, month)
  );
  ```
- [ ] Display usage meter in dashboard
- [ ] Show remaining dubs
- [ ] Handle overage scenarios

### 4.5 Webhook Handling
- [ ] Create `app/api/webhooks/stripe/route.ts`
- [ ] Handle events:
  - [ ] `invoice.paid`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
- [ ] Verify webhook signatures
- [ ] Update subscription status

## 5. Dashboard Pages (Day 5)

### 5.1 Overview Page
- [ ] Show connection status
- [ ] Display current plan
- [ ] Show usage statistics
- [ ] Recent activity feed
- [ ] Quick actions

### 5.2 Billing Page
- [ ] Create `app/(app)/dashboard/billing/page.tsx`
- [ ] Show current plan details
- [ ] Display usage meter
- [ ] Upgrade/downgrade buttons
- [ ] Invoice history
- [ ] Payment method management

### 5.3 Test Mode
- [ ] Add test URL input
- [ ] Manual dubbing trigger
- [ ] Show processing status
- [ ] Display results

## 6. Testing (Day 6)

### 6.1 Unit Tests
- [ ] Test auth hooks
- [ ] Test settings validation
- [ ] Test API routes
- [ ] Test utility functions

### 6.2 Integration Tests
- [ ] Test OAuth flow
- [ ] Test settings persistence
- [ ] Test subscription creation
- [ ] Test webhook processing

### 6.3 E2E Tests
- [ ] Test complete onboarding flow
- [ ] Test X account connection
- [ ] Test settings configuration
- [ ] Test billing flow
- [ ] Test dashboard navigation

## File Structure After Phase 2

```
apps/web/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx
│   ├── (app)/
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── settings/
│   │       │   └── page.tsx
│   │       └── billing/
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── connect/
│   │   │   └── x/
│   │   ├── settings/
│   │   ├── billing/
│   │   └── webhooks/
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   ├── settings/
│   └── billing/
├── hooks/
│   ├── useAuth.ts
│   ├── useSettings.ts
│   └── useBilling.ts
├── lib/
│   ├── stripe/
│   ├── twitter/
│   └── encryption/
└── providers/
    └── PrivyProvider.tsx
```

## Success Criteria ✅

- [ ] Users can sign up and log in via Privy
- [ ] X account connection working
- [ ] Settings saved and retrieved correctly
- [ ] Stripe checkout and subscriptions working
- [ ] Usage tracking accurate
- [ ] Dashboard responsive and functional
- [ ] All tests passing
- [ ] No console errors
- [ ] Secure token storage

## Time Estimate: 6 Days

- Day 1-2: Authentication setup
- Day 2-3: X OAuth integration
- Day 3-4: Dashboard and settings
- Day 4-5: Billing integration
- Day 5: Additional dashboard pages
- Day 6: Testing and refinement

## Next Phase Preview
Phase 3 will add the core dubbing functionality:
- Background agent for content discovery
- SpeechLab API integration
- Job processing pipeline
- Dubbing status tracking