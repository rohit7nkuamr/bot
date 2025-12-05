# LeadFilter - Implementation Guide

## Phase 1: Backend Setup (Week 1)

### 1.1 Supabase Configuration

**Step 1: Create Supabase Project**
```bash
# Go to https://supabase.com and create a new project
# Get your credentials:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

**Step 2: Database Schema**
Run these SQL queries in Supabase SQL Editor:

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
  status VARCHAR DEFAULT 'pending', -- pending, qualified, rejected
  budget INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  messages JSONB, -- Array of {role, content, timestamp}
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

-- Create indexes for performance
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

**Step 3: Enable Row Level Security (RLS)**
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for users to access their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view their own leads" ON leads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their leads" ON leads
  FOR UPDATE USING (auth.uid() = user_id);
```

### 1.2 Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations
export const supabaseServer = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## Phase 2: WhatsApp Integration (Week 1)

### 2.1 Meta Cloud API Setup

**Step 1: Create Meta Business Account**
- Go to https://business.facebook.com
- Create a Business Account
- Create a WhatsApp Business Account

**Step 2: Get API Credentials**
- Business Account ID
- WhatsApp API Token
- Webhook Verify Token (generate a random string)

**Step 3: Implement Webhook Handler**

Update `src/app/api/webhooks/whatsapp/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];

        for (const change of changes) {
          if (change.field === 'messages') {
            const messages = change.value.messages || [];

            for (const message of messages) {
              // Extract lead info
              const phoneNumber = message.from;
              const messageText = message.text?.body || '';

              // Store in database
              await supabaseServer
                .from('leads')
                .insert({
                  phone: phoneNumber,
                  name: 'From WhatsApp', // Extract from message if possible
                  raw_data: { message: messageText },
                  status: 'pending',
                });

              // Send qualification message
              await sendQualificationMessage(phoneNumber);
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

async function sendQualificationMessage(phoneNumber: string) {
  const token = process.env.META_WHATSAPP_API_TOKEN;
  const businessAccountId = process.env.NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID;

  const response = await fetch(
    `https://graph.instagram.com/v18.0/${businessAccountId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: 'lead_qualification',
          language: { code: 'en' },
        },
      }),
    }
  );

  return response.json();
}
```

---

## Phase 3: AI Integration (Week 2)

### 3.1 GPT-4o-mini Setup

Create `src/lib/openai.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseLeadData(rawData: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a lead parsing expert. Extract the following from the given text:
        - Phone number
        - Name
        - Budget (if mentioned)
        - Business type
        - Requirements
        
        Return as JSON.`,
      },
      {
        role: 'user',
        content: rawData,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function qualifyLead(leadData: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a lead qualification expert. Based on the lead information, provide:
        - Qualification score (0-100)
        - Reason for score
        - Recommended next steps
        
        Return as JSON.`,
      },
      {
        role: 'user',
        content: JSON.stringify(leadData),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}
```

---

## Phase 4: Authentication (Week 2)

### 4.1 Supabase Auth Setup

Update `src/app/api/auth/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (action === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create user profile
      await supabase.from('users').insert({
        id: data.user?.id,
        email,
      });

      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (action === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return NextResponse.json({
        success: true,
        session: data.session,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
```

---

## Phase 5: Razorpay Integration (Week 3)

### 5.1 Razorpay Setup

Create `src/lib/razorpay.ts`:

```typescript
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const PLANS = {
  starter: {
    id: 'plan_starter',
    amount: 99900, // ₹999 in paise
    interval: 1,
    period: 'monthly',
  },
  professional: {
    id: 'plan_professional',
    amount: 499900, // ₹4,999 in paise
    interval: 1,
    period: 'monthly',
  },
};
```

Update `src/app/api/payments/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, planId, userId } = body;

    if (action === 'create-subscription') {
      const subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        quantity: 1,
        total_count: 12,
      });

      // Store in database
      await supabaseServer.from('subscriptions').insert({
        user_id: userId,
        plan: planId,
        razorpay_subscription_id: subscription.id,
      });

      return NextResponse.json({ success: true, data: subscription });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
```

---

## Testing Checklist

- [ ] Supabase connection working
- [ ] WhatsApp webhook receiving messages
- [ ] GPT-4o-mini parsing leads correctly
- [ ] Authentication signup/login working
- [ ] Razorpay subscription creation working
- [ ] Dashboard displaying real data
- [ ] Lead qualification flow end-to-end

---

## Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations run
- [ ] WhatsApp webhook URL configured
- [ ] Razorpay production keys set
- [ ] OpenAI API key configured
- [ ] Supabase RLS policies enabled
- [ ] Error logging configured
- [ ] Monitoring setup

---

## Cost Estimation (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Supabase | $0-50 | Free tier + usage |
| OpenAI | $0.15/lead | GPT-4o-mini |
| WhatsApp | $0.0463/msg | Meta API |
| Razorpay | 2% + ₹3 | Payment processing |
| Vercel | $0-20 | Hobby tier free |

---

## Support Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Meta WhatsApp API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Razorpay Subscriptions](https://razorpay.com/docs/subscriptions)
