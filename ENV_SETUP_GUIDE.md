# 🔐 Environment Variables Setup Guide

## Required API Keys

### 1. OpenAI API Key (CRITICAL - Required for AI features)

**Get it from:** https://platform.openai.com/api-keys

**Steps:**
1. Go to https://platform.openai.com/signup
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)

**Add to `.env.local`:**
```env
OPENAI_API_KEY=sk-your-key-here
```

**Cost:** ~₹0.15 per lead (very cheap with GPT-4o-mini)

---

### 2. Razorpay Keys (CRITICAL - Required for payments)

**Get it from:** https://dashboard.razorpay.com

**Steps:**
1. Go to https://razorpay.com
2. Sign up for account
3. Complete KYC (takes 1-2 days)
4. Go to Settings → API Keys
5. Generate Test Keys first
6. Copy both Key ID and Secret

**Add to `.env.local`:**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
```

**For Production:**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_secret
```

**Cost:** 2% per transaction (standard)

---

### 3. Meta WhatsApp API (OPTIONAL - You're using Twilio)

**Note:** You already have Twilio configured, so this is optional.

**Get it from:** https://developers.facebook.com

**Steps:**
1. Create Meta Business Account
2. Create WhatsApp Business App
3. Get Phone Number ID
4. Generate Access Token
5. Create Webhook Verify Token

**Add to `.env.local`:**
```env
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=your_business_id
META_WHATSAPP_API_TOKEN=your_access_token
META_WEBHOOK_VERIFY_TOKEN=your_custom_token
```

**Cost:** Free tier available, then pay-per-message

---

## Current Configuration Status

### ✅ Already Configured:
```env
# Supabase - WORKING ✅
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Twilio WhatsApp - WORKING ✅
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890

# App URL - WORKING ✅
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ❌ Missing (Need to Add):
```env
# OpenAI - REQUIRED ❌
OPENAI_API_KEY=

# Razorpay - REQUIRED ❌
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Meta WhatsApp - OPTIONAL ⚠️
NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID=
META_WHATSAPP_API_TOKEN=
META_WEBHOOK_VERIFY_TOKEN=
```

---

## Quick Setup Checklist

### Step 1: OpenAI (15 minutes)
- [ ] Go to https://platform.openai.com/api-keys
- [ ] Create account
- [ ] Generate API key
- [ ] Add to `.env.local`
- [ ] Restart dev server
- [ ] Test lead parsing

### Step 2: Razorpay (1-2 days for KYC)
- [ ] Go to https://razorpay.com
- [ ] Sign up
- [ ] Complete KYC
- [ ] Generate Test Keys
- [ ] Add to `.env.local`
- [ ] Test payment flow
- [ ] Generate Live Keys (after testing)

### Step 3: Test Everything
- [ ] Test authentication
- [ ] Test lead creation
- [ ] Test WhatsApp webhook
- [ ] Test payment flow
- [ ] Test dashboard

---

## Testing Your Setup

### Test OpenAI Integration:
```bash
# In your terminal
curl http://localhost:3000/api/test-openai
```

### Test Razorpay Integration:
```bash
# In your terminal
curl http://localhost:3000/api/test-razorpay
```

### Test Twilio WhatsApp:
```bash
# Send test message
curl -X POST http://localhost:3000/api/test-whatsapp
```

---

## Production Deployment (Vercel)

When deploying to Vercel, add these environment variables:

### Required for Production:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ewuwwksfcjqdilmwsqeg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your-production-key

# Razorpay (LIVE keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key
RAZORPAY_KEY_SECRET=your_live_secret

# Twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=your_number

# App URL (Update after deployment)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore`
- Use different keys for test/production
- Rotate keys regularly
- Use Vercel's encrypted environment variables
- Enable Supabase RLS (Row Level Security)

### ❌ DON'T:
- Commit `.env.local` to git
- Share keys in public
- Use production keys in development
- Hardcode keys in code
- Use same keys across projects

---

## Cost Breakdown (Monthly)

### For 100 Customers:

| Service | Cost | Notes |
|---------|------|-------|
| **Supabase** | ₹0 | Free tier (500MB) |
| **OpenAI** | ~₹1,500 | ~100 leads/customer |
| **Twilio** | ~₹5,000 | ~10 messages/customer |
| **Razorpay** | 2% | Of revenue |
| **Vercel** | ₹0 | Free tier |

**Total:** ~₹6,500/month + 2% of revenue

**Revenue (100 customers @ ₹2,499):** ₹2,49,900/month  
**Profit Margin:** ~97% 🚀

---

## Troubleshooting

### OpenAI Not Working?
```bash
# Check if key is set
echo $OPENAI_API_KEY

# Test API call
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Razorpay Not Working?
```bash
# Check if keys are set
echo $NEXT_PUBLIC_RAZORPAY_KEY_ID
echo $RAZORPAY_KEY_SECRET

# Test in browser console
console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
```

### Twilio Not Working?
```bash
# Check if credentials are set
echo $TWILIO_ACCOUNT_SID
echo $TWILIO_AUTH_TOKEN

# Test webhook
curl -X POST http://localhost:3000/api/webhooks/whatsapp
```

---

## Need Help?

### Resources:
- **OpenAI Docs:** https://platform.openai.com/docs
- **Razorpay Docs:** https://razorpay.com/docs
- **Twilio Docs:** https://www.twilio.com/docs/whatsapp
- **Supabase Docs:** https://supabase.com/docs

### Common Issues:
1. **"Invalid API Key"** - Check if key is correct and not expired
2. **"Rate Limit Exceeded"** - Upgrade your plan or wait
3. **"Webhook Failed"** - Check if URL is correct and accessible
4. **"Payment Failed"** - Check if Razorpay keys are correct

---

## ✅ Ready to Launch Checklist

Before going live:

- [ ] All API keys added
- [ ] All tests passing
- [ ] Database tables created
- [ ] Webhooks configured
- [ ] Payment flow tested
- [ ] Error handling tested
- [ ] Production keys ready
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Monitoring set up

---

**You're almost there! Just add the API keys and you're ready to launch! 🚀**
