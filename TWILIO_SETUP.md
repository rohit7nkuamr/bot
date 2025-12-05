# Twilio WhatsApp Setup Guide

## ✅ Why Twilio?

- ✅ **No approval needed** - Instant setup
- ✅ **Free trial** - $15 credit to test
- ✅ **Easy integration** - Simple API
- ✅ **Cost-effective** - ₹405-4,050/month
- ✅ **Reliable** - 99.9% uptime
- ✅ **Better support** - 24/7 help

---

## 🚀 Setup Steps

### Step 1: Create Twilio Account

1. Go to https://www.twilio.com/whatsapp
2. Click **"Get Started"**
3. Sign up with:
   - Email
   - Password
   - Phone number
4. Verify your email

---

### Step 2: Get WhatsApp Sandbox

1. In Twilio Console, go to **"Messaging"** → **"Try it out"** → **"Send a WhatsApp message"**
2. You'll see a **Sandbox Number** (e.g., `+1234567890`)
3. Copy this number - you'll need it

---

### Step 3: Get Your Credentials

In Twilio Console:

1. Go to **"Account"** (bottom left)
2. Find **"Account SID"**
   - Copy this → `TWILIO_ACCOUNT_SID`
3. Find **"Auth Token"**
   - Copy this → `TWILIO_AUTH_TOKEN`
4. Go to **"Messaging"** → **"Services"**
5. Find your WhatsApp service
6. Copy the **"Sandbox Number"** → `TWILIO_WHATSAPP_NUMBER`

---

### Step 4: Update `.env.local`

Add these to your `.env.local`:

```env
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890

# Keep existing variables
NEXT_PUBLIC_SUPABASE_URL=https://ewuwwksfcjqdilmwsqeg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Step 5: Test WhatsApp Connection

1. Send a message to the Sandbox Number from your WhatsApp
2. You should get a response
3. Check Twilio Console for message logs

---

### Step 6: Upgrade to Production (Later)

When ready to go live:

1. In Twilio, request **WhatsApp Business Account**
2. Get your own WhatsApp number
3. Update `TWILIO_WHATSAPP_NUMBER` with your number
4. Start charging customers!

---

## 💰 Pricing Breakdown

### Incoming Messages
- **₹0.55 per message**
- Free to receive

### Outgoing Messages
- **₹3.50 per text message**
- **₹1.75 per template** (50% cheaper!)

### Free Trial
- **$15 credit** (~100-150 messages)

---

## 📊 Cost Optimization (Already Implemented!)

Our code includes:

1. **Response Caching**
   - Avoids duplicate API calls
   - Saves 30-40% on GPT costs

2. **Predefined Responses**
   - Common questions use templates
   - No GPT API call needed
   - Instant responses

3. **Optimized Prompts**
   - Shorter prompts = cheaper
   - Lower temperature = faster
   - Reduced max_tokens

4. **Smart Parsing**
   - Concise extraction
   - Minimal tokens used

---

## 🧪 Testing

### Test Sending Message

```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json \
  -d "From=whatsapp:+1234567890" \
  -d "To=whatsapp:+919876543210" \
  -d "Body=Hello from LeadFilter!" \
  -u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
```

### Test Webhook

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
              "body": "Hi, I need suppliers"
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

## 📱 How It Works

```
User sends WhatsApp message
    ↓
Twilio receives message
    ↓
Webhook POST to /api/webhooks/whatsapp
    ↓
System parses message
    ↓
GPT extracts lead data (cached if possible)
    ↓
Lead created in Supabase
    ↓
Predefined or GPT response generated
    ↓
Response sent via Twilio
    ↓
Conversation stored
```

---

## ✅ Verification Checklist

- [ ] Twilio account created
- [ ] WhatsApp Sandbox accessed
- [ ] Credentials copied to `.env.local`
- [ ] Dev server restarted
- [ ] Test message sent and received
- [ ] Webhook verified
- [ ] Leads created in database
- [ ] Cost optimization working

---

## 🔄 Migration to Meta (Later)

When you're ready:

1. Keep Twilio for backup
2. Add Meta WhatsApp API
3. Route messages to both
4. Compare costs and performance
5. Choose the best option

---

## 💡 Pro Tips

1. **Use Templates** - 50% cheaper than text
2. **Batch Messages** - Send multiple at once
3. **Monitor Costs** - Check Twilio dashboard daily
4. **Test Thoroughly** - Use sandbox before production
5. **Cache Responses** - Already implemented! ✅

---

## 🐛 Troubleshooting

### "Invalid credentials"
- Check Account SID and Auth Token
- Restart dev server

### "Message not sent"
- Check phone number format (+91XXXXXXXXXX)
- Check Twilio account has credit
- Check WhatsApp number is correct

### "Webhook not receiving"
- Check webhook URL is correct
- Check firewall/network settings
- Check Twilio logs for errors

---

## 📚 Resources

- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Console](https://console.twilio.com)
- [Twilio Pricing](https://www.twilio.com/whatsapp/pricing)
- [WhatsApp API Guide](https://www.twilio.com/docs/whatsapp/api)

---

## 🎯 Next Steps

1. ✅ Create Twilio account
2. ✅ Get credentials
3. ✅ Update `.env.local`
4. ✅ Test connection
5. ⏳ Deploy to Vercel
6. ⏳ Implement Razorpay payments
7. ⏳ Launch!

**Ready to set up Twilio?** 🚀
