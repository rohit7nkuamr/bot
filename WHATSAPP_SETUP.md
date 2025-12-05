# WhatsApp & GPT Integration Setup

## ✅ Completed Setup

### 1. WhatsApp Integration Library
- ✅ Created `src/lib/whatsapp.ts` with functions:
  - `sendWhatsAppMessage()` - Send text messages
  - `sendLeadQualificationMessage()` - Send qualification messages
  - `parseWhatsAppWebhook()` - Parse incoming messages
  - `verifyWebhookToken()` - Verify webhook authenticity

### 2. GPT-4o-mini Integration Library
- ✅ Created `src/lib/gpt.ts` with functions:
  - `parseLeadData()` - Extract lead info using GPT
  - `generateQualificationResponse()` - Generate smart responses
  - `calculateQualificationScore()` - Score leads

### 3. WhatsApp Webhook Route
- ✅ Updated `/api/webhooks/whatsapp` with:
  - Webhook verification (GET)
  - Message processing (POST)
  - Lead creation and qualification
  - Conversation storage

### 4. Dependencies
- ✅ Installed `axios` for HTTP requests
- ✅ Installed `openai` for GPT integration

---

## 🚀 Setup Steps

### Step 1: Create Meta Business Account

1. Go to https://business.facebook.com
2. Click **"Create Account"**
3. Fill in your business details
4. Verify your email

### Step 2: Create WhatsApp Business App

1. Go to https://developers.facebook.com
2. Click **"My Apps"** → **"Create App"**
3. Choose **"Business"** as app type
4. Fill in app details:
   - **App Name**: `LeadFilter`
   - **App Purpose**: Business
5. Click **"Create App"**

### Step 3: Add WhatsApp Product

1. In your app dashboard, click **"Add Product"**
2. Search for **"WhatsApp"**
3. Click **"Set Up"**
4. Choose **"WhatsApp Business Account"**
5. Select your business account

### Step 4: Get Your Credentials

In WhatsApp Product Settings:

**Find these values:**
- **Business Account ID** → `NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID`
- **Phone Number ID** → (for sending messages)
- **Access Token** → `META_WHATSAPP_API_TOKEN`
- **Webhook Verify Token** → `META_WEBHOOK_VERIFY_TOKEN` (create any random string)

**Update `.env.local`:**
```env
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=your_business_account_id
META_WHATSAPP_API_TOKEN=your_access_token
META_WEBHOOK_VERIFY_TOKEN=your_random_verify_token
```

### Step 5: Set Up Webhook

1. In WhatsApp Settings, go to **"Webhooks"**
2. Click **"Edit"**
3. Enter your webhook URL:
   ```
   https://your-app.vercel.app/api/webhooks/whatsapp
   ```
4. Enter your **Webhook Verify Token** (from `.env.local`)
5. Click **"Verify and Save"**

### Step 6: Subscribe to Webhook Events

1. In Webhooks section, click **"Manage"**
2. Subscribe to these events:
   - ✅ `messages`
   - ✅ `message_status`
   - ✅ `message_template_status_update`

### Step 7: Add OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key
4. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your_key_here
   ```

### Step 8: Test Webhook Locally

For local testing, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3000

# Copy the URL (e.g., https://abc123.ngrok.io)
# Use this in webhook settings instead of Vercel URL
```

---

## 📱 How It Works

### Incoming Message Flow

```
1. User sends WhatsApp message
   ↓
2. Meta sends webhook POST to /api/webhooks/whatsapp
   ↓
3. System parses message
   ↓
4. GPT-4o-mini extracts lead data
   ↓
5. Lead created/updated in Supabase
   ↓
6. GPT generates smart response
   ↓
7. Response sent back via WhatsApp
   ↓
8. Conversation stored in database
```

### Lead Qualification Process

```
Raw Message
   ↓
GPT Analysis
   ├─ Extract name
   ├─ Extract budget
   ├─ Extract requirements
   ├─ Extract timeline
   └─ Calculate qualification score (0-100)
   ↓
Lead Created with Status: "pending"
   ↓
Conversation Started
   ↓
Follow-up Questions Asked
   ↓
Final Score Calculated
   ↓
Status Updated: "qualified" or "rejected"
```

---

## 🔑 Environment Variables

```env
# WhatsApp
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=123456789
META_WHATSAPP_API_TOKEN=EAABs...
META_WEBHOOK_VERIFY_TOKEN=my_random_token_123

# OpenAI
OPENAI_API_KEY=sk-proj-...
```

---

## 🧪 Testing

### Test Webhook Verification

```bash
curl "http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.challenge=test_challenge&hub.verify_token=my_random_token_123"
```

Expected response: `test_challenge`

### Test Message Processing

```bash
curl -X POST http://localhost:3000/api/webhooks/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "id": "msg_123",
            "from": "919876543210",
            "timestamp": "1234567890",
            "type": "text",
            "text": {
              "body": "Hi, I am looking for suppliers"
            }
          }],
          "contacts": [{
            "profile": {
              "name": "Rajesh Kumar"
            },
            "wa_id": "919876543210"
          }]
        }
      }]
    }]
  }'
```

---

## 📊 Database Schema

### Leads Table
- `id` - UUID
- `user_id` - Reference to user
- `phone` - WhatsApp phone number
- `name` - Lead name
- `raw_data` - Original message (JSON)
- `parsed_data` - Extracted data (JSON)
  - `name` - Lead name
  - `budget` - Budget in INR
  - `requirements` - What they need
  - `timeline` - Expected timeline
  - `qualification_score` - 0-100 score
- `status` - pending/qualified/rejected
- `budget` - Lead budget
- `created_at` - When lead was created
- `updated_at` - Last update

### Conversations Table
- `id` - UUID
- `lead_id` - Reference to lead
- `messages` - Array of messages (JSON)
  - `role` - "user" or "assistant"
  - `content` - Message text
  - `timestamp` - When sent
- `qualification_score` - Final score
- `created_at` - Conversation start
- `updated_at` - Last update

---

## 🎯 Qualification Scoring

The system scores leads 0-100 based on:

| Factor | Weight | Notes |
|--------|--------|-------|
| Budget Clarity | 25% | Clear budget = higher score |
| Requirements | 25% | Specific needs = higher score |
| Timeline | 20% | Urgent timeline = higher score |
| Engagement | 20% | Active participation = higher score |
| Fit | 10% | Matches typical buyers = higher score |

**Score Interpretation:**
- **80-100**: Highly qualified ✅
- **60-79**: Moderately qualified ⚠️
- **40-59**: Low qualification ❌
- **0-39**: Not qualified ❌

---

## 🔐 Security

### Webhook Verification
- All incoming webhooks are verified using Meta's signature
- Verify token must match `META_WEBHOOK_VERIFY_TOKEN`

### API Security
- All endpoints require authentication
- Row Level Security (RLS) enforced in Supabase
- API tokens stored in environment variables (never in code)

### Rate Limiting
- Implement rate limiting to prevent abuse
- Max 100 messages per minute per user

---

## 🐛 Troubleshooting

### "Webhook verification failed"
- Check `META_WEBHOOK_VERIFY_TOKEN` matches in settings
- Verify webhook URL is correct and accessible

### "No response from GPT"
- Check `OPENAI_API_KEY` is valid
- Check API key has sufficient credits
- Check rate limits aren't exceeded

### "Lead not created"
- Check Supabase connection
- Check user exists in database
- Check RLS policies allow inserts

### "WhatsApp message not sent"
- Check `META_WHATSAPP_API_TOKEN` is valid
- Check phone number format (include country code)
- Check business account is active

---

## 📚 Resources

- [Meta WhatsApp API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Webhook Testing with ngrok](https://ngrok.com)
- [WhatsApp Message Types](https://developers.facebook.com/docs/whatsapp/cloud-api/messages)

---

## ✅ Verification Checklist

- [ ] Meta Business Account created
- [ ] WhatsApp Business App created
- [ ] Credentials added to `.env.local`
- [ ] Webhook URL configured in Meta
- [ ] Webhook events subscribed
- [ ] OpenAI API key added
- [ ] Webhook verification tested
- [ ] Message processing tested
- [ ] Leads created in database
- [ ] Conversations stored
- [ ] GPT responses working
