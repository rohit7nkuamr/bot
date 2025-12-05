# LeadFilter - AI-Powered Lead Qualification Bot

> **"A Bouncer for Your Business"** - Automate lead qualification with AI-powered WhatsApp bot

![LeadFilter](https://img.shields.io/badge/Status-In%20Development-yellow) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Problem Statement

- **90% of daily leads are junk** - Window shoppers and competitors
- **2 hours wasted daily** - Manually filtering and calling unqualified leads
- **₹50,000/year cost** - Paying platforms for low-quality leads
- **Low conversion rate** - Time spent on wrong prospects

## ✨ Solution

**LeadFilter** is an automated WhatsApp bot that:
- ✅ Instantly qualifies leads via WhatsApp
- ✅ Asks budget & buyer type questions
- ✅ Forwards only genuine opportunities
- ✅ Saves 2+ hours daily
- ✅ Reduces lead cost by 90%

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd indiamart-filter

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📊 Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS | Fast, SEO-friendly, beautiful dashboards |
| **Backend** | Next.js API Routes (Node.js) | No separate server needed |
| **Database** | Supabase (PostgreSQL) | Auth + lead storage, generous free tier |
| **WhatsApp** | Meta Cloud API (Direct) | Cheapest official way (₹3.50/msg) |
| **AI** | GPT-4o-mini | Lead parsing & qualification |
| **Payments** | Razorpay | Indian SaaS standard (UPI/Cards) |
| **Hosting** | Vercel | One-click Next.js deployment |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── webhooks/whatsapp/    # WhatsApp message handler
│   │   ├── leads/                # Lead CRUD operations
│   │   ├── auth/                 # Authentication
│   │   └── payments/             # Razorpay integration
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
└── components/
    ├── Navbar.tsx                # Navigation
    ├── Hero.tsx                  # Landing hero
    ├── Features.tsx              # Feature showcase
    ├── Pricing.tsx               # Pricing plans
    ├── Dashboard.tsx             # Main dashboard
    └── Footer.tsx                # Footer
```

---

## 🎨 Features

### 1. **Futuristic UI/UX**
- Dark theme with glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design (mobile-first)
- Real-time data visualization

### 2. **AI-Powered Qualification**
- GPT-4o-mini analyzes lead data
- Extracts phone numbers, names, budget
- Qualification score calculation
- Multi-turn conversation support

### 3. **WhatsApp Integration**
- Direct Meta Cloud API connection
- Automated qualification messages
- Real-time message delivery
- Webhook handling

### 4. **Dashboard Analytics**
- Live lead statistics
- Qualification trends
- Conversion rate tracking
- Lead management interface

### 5. **Subscription Management**
- **Starter**: 100 leads/month (₹999)
- **Professional**: 1,000 leads/month (₹4,999)
- **Enterprise**: Unlimited (Custom)

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

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

## 📚 API Documentation

### WhatsApp Webhook
```
POST /api/webhooks/whatsapp
```
Receives and processes incoming WhatsApp messages.

### Leads API
```
GET  /api/leads              # Get user's leads
POST /api/leads              # Create new lead
PUT  /api/leads/:id          # Update lead status
```

### Auth API
```
POST /api/auth               # Signup/Login/Logout
```

### Payments API
```
POST /api/payments           # Create subscription
```

---

## 💰 Pricing Model

### Cost Per Lead
- GPT-4o-mini parsing: ₹0.11
- WhatsApp message: ₹3.50
- **Total: ₹3.61 per qualified lead**

### Revenue Model
- **Starter (₹999)**: 100 leads = ₹9.99 per lead (Margin: 63%)
- **Professional (₹4,999)**: 1,000 leads = ₹4.99 per lead (Margin: 27%)
- **Enterprise**: Custom pricing

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy
```

Or connect your GitHub repository directly to Vercel dashboard.

### Environment Variables on Vercel
1. Go to Project Settings → Environment Variables
2. Add all `.env.local` variables
3. Redeploy

---

## 📈 Roadmap

- [x] Futuristic UI/Dashboard
- [ ] Supabase integration
- [ ] WhatsApp webhook setup
- [ ] GPT-4o-mini integration
- [ ] Razorpay payment integration
- [ ] User authentication
- [ ] Lead management system
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Bulk lead import
- [ ] Custom workflows
- [ ] Team collaboration
- [ ] Advanced reporting

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

- 📧 Email: support@leadfilter.in
- 💬 WhatsApp: +91 XXXXX XXXXX
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/leadfilter/issues)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Made with ❤️ for Indian Business Owners**
