# LeadFilter - Quick Start Guide

## 🚀 Start Development Server

```bash
npm run dev
```

Open: http://localhost:3000

---

## 📋 Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier (if configured)

# Testing (when implemented)
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
```

---

## 🔑 Environment Variables

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Meta WhatsApp API
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=your_business_account_id
META_WHATSAPP_API_TOKEN=your_api_token
META_WEBHOOK_VERIFY_TOKEN=your_verify_token

# OpenAI
OPENAI_API_KEY=your_openai_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
└── components/                 # React components
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── Features.tsx
    ├── Pricing.tsx
    ├── Dashboard.tsx
    └── Footer.tsx
```

---

## 🎨 UI Components

### Navbar
- Navigation menu
- Mobile responsive
- Active page indicator

### Hero
- Landing page hero
- CTA buttons
- Animated stats

### Features
- 6 feature cards
- Icon + description
- Hover animations

### Pricing
- 3 pricing tiers
- Feature lists
- CTA buttons

### Dashboard
- 4 stat cards
- Trend chart
- Status breakdown
- Recent leads table

### Footer
- Links sections
- Social icons
- Copyright

---

## 🔗 Page Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/dashboard` | Dashboard | Analytics dashboard |

---

## 🎯 Navigation

- **Navbar**: Click logo to go home
- **Hero**: "Get Started" button → Dashboard
- **Pricing**: "Start Free Trial" button → Dashboard
- **Dashboard**: "Home" in navbar → Landing page

---

## 🛠️ Customization

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: #6366f1;      /* Indigo */
  --accent: #10b981;       /* Emerald */
}
```

### Change Fonts
Edit `src/app/layout.tsx`:
```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

### Add New Components
1. Create file in `src/components/`
2. Import in `src/app/page.tsx`
3. Add to JSX

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "16.0.7",
    "react": "19",
    "react-dom": "19",
    "framer-motion": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "5",
    "tailwindcss": "latest",
    "@types/react": "19",
    "@types/node": "latest"
  }
}
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🎬 Animation Libraries

### Framer Motion
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Tailwind CSS
```html
<div className="hover:scale-105 transition-transform">
  Hover me
</div>
```

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy
```

Or connect GitHub repo directly to Vercel dashboard.

---

## 📊 Performance Tips

1. **Use Next.js Image Component**
   ```typescript
   import Image from 'next/image';
   ```

2. **Code Splitting**
   - Next.js does automatic code splitting

3. **Lazy Loading**
   ```typescript
   import dynamic from 'next/dynamic';
   const Component = dynamic(() => import('./Component'));
   ```

4. **Optimize Animations**
   - Use `will-change` CSS property
   - Reduce animation complexity

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

## 💡 Tips

1. **Use Tailwind Classes**: Avoid inline styles
2. **Component Reusability**: Create small, reusable components
3. **Type Safety**: Always use TypeScript types
4. **Performance**: Monitor bundle size with `npm run build`
5. **Accessibility**: Use semantic HTML and ARIA labels

---

## 🎓 Learning Resources

- [Next.js Tutorial](https://nextjs.org/learn)
- [React Documentation](https://react.dev)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)

---

## ✅ Checklist

- [ ] Environment variables configured
- [ ] Dev server running
- [ ] All pages accessible
- [ ] Responsive design tested
- [ ] Animations working
- [ ] No console errors
- [ ] Build successful

---

**Happy Coding! 🚀**
