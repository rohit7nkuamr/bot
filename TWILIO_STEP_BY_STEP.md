# 🚀 Twilio Setup - Step by Step (Visual Guide)

## ⏱️ Time Required: 10-15 minutes

---

## 📋 Step 1: Create Twilio Account (2 minutes)

### **Action:**
1. Go to: https://www.twilio.com/whatsapp
2. Click **"Get Started"** (red button)

### **What you'll see:**
```
┌─────────────────────────────────┐
│  Twilio WhatsApp                │
│  Get Started                    │
│  [Red Button]                   │
└─────────────────────────────────┘
```

### **Fill in:**
- Email: your@email.com
- Password: strong password
- Phone number: your phone number
- Country: India

### **Verify:**
- Check your email for verification link
- Click the link
- You're in! ✅

---

## 🔑 Step 2: Get Your Credentials (3 minutes)

### **Where to find them:**

#### **A. Account SID & Auth Token**

1. Log in to Twilio Console: https://console.twilio.com
2. Look at **bottom left** - you'll see:

```
┌──────────────────────────┐
│ Account                  │
│                          │
│ Account SID              │
│ ACxxxxxxxxxxxxxxxx...    │ ← COPY THIS
│                          │
│ Auth Token               │
│ your_token_here...       │ ← COPY THIS
└──────────────────────────┘
```

**Copy both and save them temporarily**

#### **B. WhatsApp Sandbox Number**

1. In Twilio Console, click **"Messaging"** (left menu)
2. Click **"Try it out"**
3. Click **"Send a WhatsApp message"**

```
┌──────────────────────────┐
│ Messaging                │
│ ├─ Try it out           │
│ │  ├─ Send WhatsApp     │
│ │  │  Sandbox Number:   │
│ │  │  +1234567890       │ ← COPY THIS
│ │  │                    │
└──────────────────────────┘
```

**Copy the Sandbox Number**

---

## 📝 Step 3: Update `.env.local` (2 minutes)

### **Open your `.env.local` file:**

Location: `c:\Users\rohit\OneDrive\Desktop\Bot\indiamart-filter\.env.local`

### **Add these lines:**

```env
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890
```

### **Example (with placeholder values):**

```env
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890

# Existing variables (keep these!)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Save the file** ✅

---

## 🔄 Step 4: Restart Dev Server (1 minute)

### **In your terminal:**

1. Stop current server (Ctrl+C)
2. Run: `npm run dev`
3. Wait for it to start

```bash
$ npm run dev

> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

---

## 📱 Step 5: Test WhatsApp Connection (3 minutes)

### **A. Send Test Message from Your Phone**

1. Open WhatsApp on your phone
2. Search for the Sandbox Number: `+1234567890` (the one you copied)
3. Send a message: **"hello"**

### **What happens:**
```
You:  "hello"
Bot:  "Hi! 👋 Thanks for reaching out. What are you looking for?"
```

You should get an **automatic response** ✅

### **B. Check Twilio Logs**

1. Go to Twilio Console
2. Click **"Messaging"** → **"Logs"**
3. You should see your message there ✅

---

## ✅ Verification Checklist

- [ ] Twilio account created
- [ ] Account SID copied
- [ ] Auth Token copied
- [ ] Sandbox Number copied
- [ ] `.env.local` updated
- [ ] Dev server restarted
- [ ] Test message sent
- [ ] Response received
- [ ] Message appears in Twilio logs

---

## 🎯 What Happens Next?

### **When someone sends a message:**

```
1. Message arrives on WhatsApp
   ↓
2. Twilio receives it
   ↓
3. Webhook sends to your app
   ↓
4. GPT analyzes the message
   ↓
5. Lead is created in database
   ↓
6. Automatic response sent back
   ↓
7. You see it in your dashboard
```

---

## 💰 Cost Check

### **Free Trial:**
- You get **$15 credit** (~100-150 messages)
- Perfect for testing!

### **When you go live:**
- Incoming: ₹0.55/message
- Outgoing: ₹3.50/message
- Templates: ₹1.75/message (50% cheaper)

---

## 🐛 Troubleshooting

### **Problem: "Invalid credentials"**
```
Solution:
1. Check Account SID - copy exactly (no spaces)
2. Check Auth Token - copy exactly (no spaces)
3. Restart dev server
4. Try again
```

### **Problem: "Message not sent"**
```
Solution:
1. Check phone number format: +91XXXXXXXXXX
2. Check Twilio account has credit
3. Check WhatsApp number is correct
4. Check internet connection
```

### **Problem: "No response from bot"**
```
Solution:
1. Check `.env.local` is saved
2. Check dev server is running
3. Check Twilio logs for errors
4. Check webhook URL is correct
```

### **Problem: "Webhook not receiving"**
```
Solution:
1. Make sure dev server is running
2. Check firewall settings
3. Try sending message again
4. Check Twilio logs
```

---

## 📊 Testing Different Messages

### **Test 1: Simple Greeting**
```
You: "hello"
Expected: "Hi! 👋 Thanks for reaching out. What are you looking for?"
```

### **Test 2: Lead Information**
```
You: "I need suppliers for electronics. Budget: 50000. Timeline: 2 weeks"
Expected: Bot analyzes and creates lead
```

### **Test 3: Budget Question**
```
You: "What's your budget?"
Expected: "Got it! What's your budget range?"
```

### **Test 4: Timeline Question**
```
You: "When do you need this?"
Expected: "When do you need this?"
```

---

## 🚀 Next Steps After Twilio Setup

### **Immediate (Today):**
- ✅ Complete Twilio setup
- ✅ Test WhatsApp connection
- ✅ Send a few test messages

### **Tomorrow:**
- [ ] Deploy to Vercel
- [ ] Update Vercel environment variables
- [ ] Test in production

### **This Week:**
- [ ] Set up Razorpay
- [ ] Create landing page
- [ ] Record video ads
- [ ] Launch first ad campaign

---

## 📚 Quick Reference

### **Twilio Console Links**
- Main: https://console.twilio.com
- Messaging: https://console.twilio.com/messaging
- Logs: https://console.twilio.com/messaging/logs
- Pricing: https://www.twilio.com/whatsapp/pricing

### **Your Credentials Location**
- Account SID: Bottom left of console
- Auth Token: Bottom left of console
- Sandbox Number: Messaging → Try it out → Send WhatsApp

### **Your `.env.local` Location**
- File: `indiamart-filter/.env.local`
- Add 3 lines: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER

---

## ✨ Success Indicators

You'll know it's working when:

1. ✅ You can send a message from WhatsApp
2. ✅ You get an automatic response
3. ✅ Message appears in Twilio logs
4. ✅ Lead appears in your database
5. ✅ Dashboard shows the new lead

---

## 🎉 Congratulations!

Once you complete these steps, you have:
- ✅ WhatsApp integration working
- ✅ Automatic lead qualification
- ✅ Database storing leads
- ✅ Real-time bot responses

**You're 95% ready to launch!** 🚀

---

## 📞 Need Help?

If you get stuck:
1. Check the troubleshooting section above
2. Check Twilio logs for error messages
3. Verify all credentials are correct
4. Restart dev server
5. Try again

---

**Ready to set up Twilio?** Let's go! 🚀

Start with Step 1 now!
