# Claude Code - Twitter Dubbing Agent Deployment Guide

## 🚀 Phase 1 Complete - Landing Page with Early Access

### What's Been Built
- ✅ Next.js 14+ application with App Router
- ✅ Responsive landing page with hero, benefits, and how-it-works sections
- ✅ Email capture form with spam protection (honeypot)
- ✅ Supabase integration for storing emails
- ✅ API endpoint for early access signups
- ✅ Terms of Service and Privacy Policy pages
- ✅ Optimized for performance (Tailwind CSS, Next.js optimizations)

## 📋 Deployment Steps

### Step 1: Set Up Supabase

1. **Log in to your Supabase account** at https://supabase.com

2. **Create a new project** (if you haven't already)
   - Choose a project name (e.g., "claude-code-prod")
   - Set a strong database password
   - Select your region (choose closest to your users)

3. **Run the database setup**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-setup.sql`
   - Click "Run" to create the early_access table

4. **Get your credentials**
   - Go to Settings → API
   - Copy your:
     - `Project URL` (this is your NEXT_PUBLIC_SUPABASE_URL)
     - `anon public` key (this is your NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Step 2: Configure Environment Variables

1. **Create `.env.local` file** in `apps/web/`:
```bash
cd apps/web
cp .env.local.example .env.local
```

2. **Edit `.env.local`** with your actual values:
```env
# Supabase (from Step 1)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Claude Code"
```

### Step 3: Test Locally

1. **Install dependencies**:
```bash
cd /Users/ryanmedlin/shaft/twitter-dubbing-agent
yarn install
```

2. **Run the development server**:
```bash
yarn dev
```

3. **Open browser** to http://localhost:3000

4. **Test the signup flow**:
   - Enter an email address
   - Submit the form
   - Check Supabase dashboard → Table Editor → early_access table
   - Verify the email was saved

### Step 4: Deploy to Vercel

1. **Push to GitHub** (if not already):
```bash
git add .
git commit -m "Phase 1: Landing page with early access"
git push origin main
```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `twitter-dubbing-agent` repository

3. **Configure Vercel Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `yarn build`
   - **Output Directory**: `.next`
   - **Install Command**: `yarn install`

4. **Add Environment Variables in Vercel**:
   - Go to Settings → Environment Variables
   - Add all variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL` (use your Vercel domain)
     - `NEXT_PUBLIC_APP_NAME`

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

### Step 5: Verify Production Deployment

1. **Visit your Vercel URL** (e.g., `your-project.vercel.app`)

2. **Test the signup flow**:
   - Submit an email
   - Check Supabase dashboard for the new entry

3. **Check performance**:
   - Run Lighthouse audit (should be 90+)
   - Test on mobile devices
   - Verify all links work

## 🔧 Troubleshooting

### Common Issues

**"Failed to add email to waitlist"**
- Check Supabase connection in environment variables
- Verify the early_access table exists
- Check Supabase RLS policies are enabled

**Build fails on Vercel**
- Ensure Root Directory is set to `apps/web`
- Check all environment variables are set
- Review build logs for specific errors

**Email not saving to database**
- Check browser console for errors
- Verify API endpoint is accessible
- Check Supabase table permissions

## 📊 Monitoring

### Track Signups
1. Go to Supabase Dashboard → Table Editor → early_access
2. You can export to CSV for analysis
3. Monitor growth rate and UTM parameters

### Analytics (Optional)
To add analytics:
1. Sign up for PostHog or similar
2. Add tracking code to `app/layout.tsx`
3. Track page views and form submissions

## ✅ Phase 1 Checklist

Before considering Phase 1 complete:
- [ ] Landing page loads correctly
- [ ] Email signup works
- [ ] Emails are saved to Supabase
- [ ] Mobile responsive design works
- [ ] Lighthouse score is 90+
- [ ] Terms and Privacy pages accessible
- [ ] Production deployment is live
- [ ] No console errors

## 🎉 Next Steps

Once Phase 1 is verified and working:

1. **Monitor early access signups** for 1-2 weeks
2. **Gather feedback** from early users
3. **Adjust messaging** based on response
4. **Plan Phase 2**: Authentication, Dashboard, and X Integration

## 📞 Support

If you encounter issues:
1. Check the build logs in Vercel
2. Review Supabase logs for database errors
3. Ensure all environment variables are correctly set
4. Test locally first before deploying

---

**Current Status**: Phase 1 Complete - Ready for deployment
**Next Phase**: Phase 2 - Authentication & Dashboard (After validation)