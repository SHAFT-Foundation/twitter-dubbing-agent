# 🚀 Local Development Guide

## Quick Start (2 minutes)

### 1. Install Dependencies
```bash
cd /Users/ryanmedlin/shaft/twitter-dubbing-agent
yarn install
```

### 2. Set Up Environment Variables
```bash
cd apps/web
cp .env.local.example .env.local
```

### 3. Edit `.env.local` with your Supabase credentials:
```env
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# For local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Claude Code"
```

### 4. Run the Development Server
```bash
# From the root directory
yarn dev

# OR from the web app directory
cd apps/web
yarn dev
```

### 5. Open in Browser
Visit: **http://localhost:3000**

## 🎨 Making Changes

### Live Reload
The app automatically refreshes when you save changes to any file.

### Key Files to Edit:

**Landing Page Components:**
- `apps/web/components/landing/HeroSection.tsx` - Hero banner
- `apps/web/components/landing/EmailCaptureForm.tsx` - Email signup form
- `apps/web/components/landing/HowItWorks.tsx` - 3-step process
- `apps/web/components/landing/BenefitsSection.tsx` - Benefits grid
- `apps/web/components/landing/Footer.tsx` - Footer

**Main Page:**
- `apps/web/app/page.tsx` - Homepage layout

**Styling:**
- `apps/web/app/globals.css` - Global styles
- Components use Tailwind CSS classes inline

**API:**
- `apps/web/app/api/early-access/route.ts` - Email signup endpoint

## 🛠 Common Development Tasks

### Change Hero Text
Edit `apps/web/components/landing/HeroSection.tsx`:
```tsx
<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
  Your New Headline Here
</h1>
```

### Modify Colors
The gradient colors are in multiple places:
- Hero section background
- Button gradients (blue-600 to purple-600)
- Icon backgrounds

### Add New Sections
1. Create new component in `apps/web/components/landing/`
2. Import in `apps/web/app/page.tsx`
3. Add to the page layout

### Test Email Signup
1. Enter an email in the form
2. Check browser console for any errors
3. Check Supabase dashboard to see if email was saved

## 🔍 Viewing Without Supabase

If you just want to see the UI without setting up Supabase:

1. Skip the `.env.local` setup
2. Run `yarn dev`
3. View the site (email form won't save but UI works)

## 📝 Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Run production build locally
yarn start

# Check for TypeScript errors
yarn typecheck

# Run linter
yarn lint

# Format code
yarn format
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules
yarn install
```

### Port 3000 already in use
```bash
# Run on different port
PORT=3001 yarn dev
```

### Supabase connection errors
- Verify your SUPABASE_URL and ANON_KEY are correct
- Check if your Supabase project is active
- Ensure the early_access table exists

## 🔥 Hot Tips

1. **Browser DevTools**: Press F12 to inspect elements and see console logs
2. **VS Code**: Install Tailwind CSS IntelliSense extension for better autocomplete
3. **React DevTools**: Install browser extension for component inspection

## 📱 Testing Responsive Design

1. Open Chrome DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select different device sizes
4. Test all breakpoints:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1024px+

## 💾 Saving Your Changes

After making changes:
```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

---

**Need help?** The app is set up with clear component structure. Each component is self-contained and easy to modify. Start with small changes and refresh to see results instantly!