# LeadFilter - Setup & Development Guide

## Project Overview

**LeadFilter** is a micro-SaaS platform that automates lead qualification for Indian businesses using an AI-powered WhatsApp bot. It filters junk leads from platforms like IndiaMART, saving business owners 2+ hours daily.

### Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Next.js 16 + React + Tailwind CSS | Fast, SEO-friendly dashboard |
| **Backend** | Next.js API Routes (Node.js) | Webhook handling & business logic |
| **Database & Auth** | Supabase (PostgreSQL) | User authentication & lead storage |
| **WhatsApp API** | Meta Cloud API (Direct) | Lead qualification via WhatsApp |
| **Lead Parsing** | GPT-4o-mini | Extract phone numbers & names |
| **Payment** | Razorpay | Recurring subscriptions (UPI/Cards) |
| **Hosting** | Vercel | One-click Next.js deployment |

---

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)
- Meta Business Account (for WhatsApp API)
- Razorpay account (for payments)
- OpenAI API key (for GPT-4o-mini)

### 1. Clone & Install Dependencies

```bash
cd indiamart-filter
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Meta WhatsApp API
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=your_business_account_id
META_WHATSAPP_API_TOKEN=your_whatsapp_api_token
META_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup (Supabase)

Run migrations to set up the database schema:

```bash
npm run db:migrate
```

**Database Schema:**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  subscription_plan VARCHAR DEFAULT 'starter',
  monthly_lead_limit INT DEFAULT 100,
  leads_used INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  phone VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  raw_data JSONB,
  parsed_data JSONB,
  status VARCHAR DEFAULT 'pending', -- pending, qualified, rejected
  budget INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  messages JSONB,
  qualification_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'active',
  renewal_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## Project Structure

```
indiamart-filter/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   │   ├── api/
│   │   │   ├── webhooks/       # WhatsApp webhook
│   │   │   ├── leads/          # Lead API routes
│   │   │   ├── auth/           # Auth routes
│   │   │   └── payments/       # Razorpay routes
│   │   └── dashboard/          # Dashboard pages
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Pricing.tsx
│       ├── Dashboard.tsx
│       └── Footer.tsx
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Key Features

### 1. **AI-Powered Lead Qualification**
- Uses GPT-4o-mini to analyze lead data
- Extracts phone numbers, names, budget from IndiaMART emails
- Qualification score based on budget match & buyer type

### 2. **WhatsApp Bot Integration**
- Sends automated qualification messages
- Collects buyer information (budget, requirements)
- Forwards only genuine leads to business owner

### 3. **Real-Time Dashboard**
- Live lead statistics
- Qualification trends
- Conversion rate tracking
- Lead management interface

### 4. **Subscription Management**
- Starter: 100 leads/month (₹999)
- Professional: 1,000 leads/month (₹4,999)
- Enterprise: Unlimited (Custom pricing)

---

## API Endpoints

### Webhooks
- `POST /api/webhooks/whatsapp` - WhatsApp message webhook

### Leads
- `GET /api/leads` - Get user's leads
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead status

### Auth
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Payments
- `POST /api/payments/create-subscription` - Create Razorpay subscription
- `POST /api/payments/webhook` - Razorpay webhook

---

## Development Workflow

### Build for Production
```bash
npm run build
npm run start
```

### Run Tests
```bash
npm run test
```

### Format Code
```bash
npm run format
```

### Lint
```bash
npm run lint
```

---

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

```bash
vercel deploy
```

---

## Cost Estimation (First Year)

| Service | Cost | Notes |
|---------|------|-------|
| Supabase | $0-100 | Free tier + pay-as-you-go |
| Meta WhatsApp API | $0.0463/msg | ~₹3.50 per qualified lead |
| OpenAI (GPT-4o-mini) | $0.15/lead | Parsing cost |
| Razorpay | 2% + ₹3 | Payment processing |
| Vercel | $0-20 | Hobby tier free |
| **Total/Lead** | ~₹0.50-1 | Very cost-effective |

---

## Next Steps

1. ✅ Frontend UI (Complete)
2. ⏳ Supabase integration
3. ⏳ WhatsApp webhook setup
4. ⏳ GPT-4o-mini integration
5. ⏳ Razorpay payment integration
6. ⏳ Authentication system
7. ⏳ Lead management API
8. ⏳ Dashboard functionality
9. ⏳ Testing & QA
10. ⏳ Deployment to Vercel

---

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Meta WhatsApp API](https://developers.facebook.com/docs/whatsapp)
- [Razorpay Integration](https://razorpay.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

---

## License

MIT License - Feel free to use this for your business!
