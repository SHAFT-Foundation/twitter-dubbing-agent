# 🚀 Deploy X Dub to Vercel - Quick Steps

## ✅ Pre-Deployment Status
- **Build**: ✅ Successful (no errors)
- **Git**: ✅ All changes committed
- **GitHub**: ✅ Pushed to `main` branch
- **Ready**: ✅ Let's deploy!

## 📱 Deploy to Vercel (2 minutes)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click **"Add New Project"**

2. **Import GitHub Repository**
   - Select: `SHAFT-Foundation/twitter-dubbing-agent`
   - Click **"Import"**

3. **Configure Project** ⚠️ IMPORTANT
   ```
   Framework Preset: Next.js
   Root Directory: apps/web    ← CRUCIAL!
   Build Command: yarn build
   Output Directory: .next
   Install Command: yarn install
   ```

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   NEXT_PUBLIC_APP_NAME=X Dub
   ```

5. **Click "Deploy"**
   - Wait ~2-3 minutes for deployment
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy from the web app directory
cd apps/web
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project name? x-dub
# - In which directory is your code? ./
# - Want to override settings? No
```

## 🔧 Supabase Setup (if not done)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard

2. **Run SQL for early_access table**
   ```sql
   CREATE TABLE IF NOT EXISTS early_access (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       utm_source VARCHAR(100),
       utm_campaign VARCHAR(100),
       utm_medium VARCHAR(100),
       created_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_early_access_email ON early_access(email);
   CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access(created_at DESC);
   ```

3. **Get your credentials**
   - Settings → API
   - Copy: Project URL and anon key

## ✨ After Deployment

### Your URLs:
- **Production**: `https://x-dub.vercel.app` (or custom domain)
- **Preview**: Each PR gets a preview URL

### Test the deployment:
1. ✅ Visit your Vercel URL
2. ✅ Test email signup form
3. ✅ Check Supabase for email entries
4. ✅ Test responsive on mobile

### Custom Domain (Optional):
1. Go to Vercel project settings
2. Domains → Add Domain
3. Add `xdub.app` or your domain
4. Follow DNS instructions

## 🎉 Success Checklist

- [ ] Site loads with dark crypto theme
- [ ] "X Dub" branding everywhere
- [ ] Email form works (test with your email)
- [ ] Emails save to Supabase
- [ ] Mobile responsive works
- [ ] Footer shows SHAFT Foundation
- [ ] Space summaries feature visible
- [ ] Terms and Privacy pages work

## 🔥 Features Live

- **Dark Mode**: Crypto-native design
- **65 KOLs**: Realistic numbers
- **Space Summaries**: NEW feature highlighted
- **Allowlist**: Web3 signup style
- **Animations**: Gradients and floating orbs

## 📊 Monitor Performance

After deployment, check:
- Vercel Analytics (automatic)
- Lighthouse score (should be 90+)
- Supabase dashboard for signups

---

**Repository**: https://github.com/SHAFT-Foundation/twitter-dubbing-agent
**Root Directory**: `apps/web` ⚠️ Don't forget this!
**Support**: argos@shaft.finance

The landing page is production-ready and will look amazing! 🚀