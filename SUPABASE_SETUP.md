# Supabase Setup Guide

## ✅ Completed Setup

### 1. Supabase Client Library
- ✅ Created `src/lib/supabase.ts` with browser and server clients
- ✅ Installed `@supabase/supabase-js` package
- ✅ Type definitions for User, Lead, Conversation, Subscription

### 2. Authentication Library
- ✅ Created `src/lib/auth.ts` with functions:
  - `signUp()` - Register new user
  - `signIn()` - Login user
  - `signOut()` - Logout user
  - `getCurrentSession()` - Get current session
  - `getCurrentUser()` - Get user profile
  - `updateSubscriptionPlan()` - Update plan
  - `hasReachedLeadLimit()` - Check lead limit
  - `incrementLeadsUsed()` - Increment lead count

### 3. Leads Management Library
- ✅ Created `src/lib/leads.ts` with functions:
  - `getUserLeads()` - Get all leads
  - `getLeadsByStatus()` - Filter by status
  - `createLead()` - Create new lead
  - `updateLeadStatus()` - Update status
  - `updateLeadParsedData()` - Update parsed data
  - `getLeadStats()` - Get statistics
  - `deleteLead()` - Delete lead

### 4. API Routes
- ✅ Updated `/api/auth` - Authentication endpoints
- ✅ Updated `/api/leads` - Lead management endpoints

---

## 🚀 Next Steps

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `leadfilter`
   - **Database Password**: Create strong password
   - **Region**: Singapore or closest to India
4. Wait 2-3 minutes for project creation

### Step 2: Get Credentials

Once project is created:
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Add to Environment

Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 4: Create Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the SQL from below
4. Click **"Run"**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  subscription_plan VARCHAR DEFAULT 'starter',
  monthly_lead_limit INT DEFAULT 100,
  leads_used INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  phone VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  raw_data JSONB,
  parsed_data JSONB,
  status VARCHAR DEFAULT 'pending',
  budget INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  messages JSONB,
  qualification_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'active',
  renewal_date DATE,
  razorpay_subscription_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### Step 5: Enable Row Level Security (RLS)

In SQL Editor, create a new query and paste:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Leads policies
CREATE POLICY "Users can view their own leads" ON leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" ON leads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" ON leads
  FOR DELETE USING (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view conversations for their leads" ON conversations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM leads WHERE leads.id = conversations.lead_id 
      AND leads.user_id = auth.uid()
    )
  );

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

### Step 6: Enable Email Authentication

1. Go to **Authentication → Providers**
2. Find **Email**
3. Toggle **Enable Email Provider** ON
4. Configure email settings if needed

### Step 7: Test Connection

Run your dev server:

```bash
npm run dev
```

Test the API:

```bash
# Test signup
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"action":"signup","email":"test@example.com","password":"password123"}'

# Test get leads
curl http://localhost:3000/api/leads
```

---

## 📊 Database Schema

### Users Table
- `id` - UUID primary key
- `email` - User email (unique)
- `subscription_plan` - starter/professional/enterprise
- `monthly_lead_limit` - Leads allowed per month
- `leads_used` - Current month leads used
- `created_at` - Account creation date
- `updated_at` - Last update date

### Leads Table
- `id` - UUID primary key
- `user_id` - Reference to users
- `phone` - Lead phone number
- `name` - Lead name
- `raw_data` - Original data (JSON)
- `parsed_data` - Parsed data (JSON)
- `status` - pending/qualified/rejected
- `budget` - Lead budget
- `created_at` - Lead creation date
- `updated_at` - Last update date

### Conversations Table
- `id` - UUID primary key
- `lead_id` - Reference to leads
- `messages` - Chat messages (JSON array)
- `qualification_score` - AI qualification score
- `created_at` - Conversation start date
- `updated_at` - Last update date

### Subscriptions Table
- `id` - UUID primary key
- `user_id` - Reference to users
- `plan` - Subscription plan
- `status` - active/cancelled/expired
- `renewal_date` - Next renewal date
- `razorpay_subscription_id` - Razorpay ID
- `created_at` - Subscription start date
- `updated_at` - Last update date

---

## 🔑 API Endpoints

### Authentication
```
POST /api/auth
- action: "signup" | "login" | "logout" | "get-user"
- email: string (for signup/login)
- password: string (for signup/login)
```

### Leads
```
GET /api/leads?status=qualified
- Returns user's leads with stats

POST /api/leads
- phone: string (required)
- name: string (required)
- budget: number (optional)
- raw_data: object (optional)
```

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Credentials added to `.env.local`
- [ ] Database schema created
- [ ] RLS policies enabled
- [ ] Email authentication enabled
- [ ] API endpoints tested
- [ ] Dev server running without errors

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` has correct values
- Restart dev server after adding env vars

### "Unauthorized" error
- Make sure user is logged in
- Check session token is valid

### Database connection error
- Verify Supabase project is active
- Check credentials are correct
- Ensure RLS policies are set

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
