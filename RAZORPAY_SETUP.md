# 💳 Razorpay Setup Guide

## ✅ Why Razorpay?

- ✅ **Best for India** - Supports UPI, Cards, Wallets
- ✅ **Easy integration** - Simple API
- ✅ **No setup fees** - Pay only per transaction
- ✅ **Fast payouts** - Money in your account in 2 days
- ✅ **Great support** - 24/7 help

---

## 🚀 Setup Steps (10 minutes)

### **Step 1: Create Razorpay Account**

1. Go to: https://razorpay.com
2. Click **"Sign Up"** (top right)
3. Fill in:
   - Email: your email
   - Password: strong password
   - Phone: your phone number
   - Country: India
4. Click **"Create Account"**
5. Verify your email

---

### **Step 2: Complete KYC (Know Your Customer)**

1. Log in to Razorpay Dashboard
2. Go to **"Settings"** → **"Account"**
3. Fill in:
   - Business name: LeadFilter
   - Business type: SaaS
   - Website: (leave blank for now)
   - PAN number: your PAN
   - GST number: (if you have one)
4. Upload documents:
   - PAN card
   - Aadhar card
5. Click **"Submit"**

**Note:** KYC usually takes 1-2 hours to verify

---

### **Step 3: Get Your API Keys**

1. Log in to Razorpay Dashboard
2. Go to **"Settings"** → **"API Keys"**
3. You'll see two keys:
   - **Key ID** (public key) - starts with `rzp_live_`
   - **Key Secret** (private key) - keep this secret!

**Copy both keys**

---

### **Step 4: Update `.env.local`**

Add these lines to your `.env.local`:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Example:**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_1234567890abcdef
RAZORPAY_KEY_SECRET=abcdef1234567890ghijkl
```

---

### **Step 5: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
# Then run:
npm run dev
```

---

## 💰 Pricing

### **Transaction Fees**
- **Cards**: 2% + ₹0 (Visa/Mastercard)
- **UPI**: 0% (free!)
- **Wallets**: 2%
- **Bank Transfer**: 0% (free!)

### **Example Costs**
- Customer pays ₹2,499 (Starter)
  - Your cost: ₹0 (UPI) or ₹50 (Card)
  - You keep: ₹2,499 or ₹2,449

---

## 🧪 Testing

### **Test Mode (Before Going Live)**

Razorpay gives you test keys automatically. Use these to test:

1. Go to **"Settings"** → **"API Keys"**
2. Toggle **"Test Mode"** (top right)
3. You'll see test keys
4. Use test card: `4111 1111 1111 1111`

### **Test Payment Flow**

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click **"Sign Up"** and create account
4. Click on a pricing plan
5. Click **"Start Free Trial"** or **"Subscribe"**
6. Use test card: `4111 1111 1111 1111`
7. Any future date for expiry
8. Any 3-digit CVV

---

## 🔐 Security Best Practices

1. **Never share Key Secret** - Only use in backend
2. **Use HTTPS** - Always in production
3. **Verify signatures** - Already implemented! ✅
4. **Store securely** - Use `.env.local` (not in code)
5. **Rotate keys** - Every 6 months

---

## 📊 Dashboard Features

### **Payments**
- View all transactions
- Filter by date, status, amount
- Download reports
- Refund payments

### **Customers**
- View customer information
- Track subscription status
- Send invoices
- Manage refunds

### **Analytics**
- Revenue charts
- Transaction trends
- Customer metrics
- Payment methods breakdown

---

## 🎯 Integration Points

### **1. Payment Creation**
```javascript
// Frontend sends payment request
POST /api/payments
{
  action: 'create-subscription',
  planId: 'starter',
  userId: 'user_123'
}
```

### **2. Payment Verification**
```javascript
// After payment, verify signature
POST /api/payments
{
  action: 'verify-payment',
  paymentId: 'pay_123',
  orderId: 'order_123',
  signature: 'signature_hash',
  planName: 'starter',
  userId: 'user_123'
}
```

### **3. Webhook Handling**
```javascript
// Razorpay sends webhook for events
POST /api/payments
{
  action: 'webhook',
  event: 'payment.authorized',
  payload: { payment: {...} }
}
```

---

## ✅ Verification Checklist

- [ ] Razorpay account created
- [ ] KYC submitted
- [ ] API keys copied
- [ ] `.env.local` updated
- [ ] Dev server restarted
- [ ] Test payment successful
- [ ] Subscription created in database
- [ ] User plan updated

---

## 🚀 Next Steps

### **After Razorpay Setup:**

1. **Test Payment Flow**
   - Create test account
   - Subscribe to plan
   - Verify subscription in database

2. **Deploy to Vercel**
   - Push code to GitHub
   - Deploy to Vercel
   - Add environment variables
   - Test in production

3. **Record Video Ads**
   - Use scripts from VIDEO_AD_SCRIPTS.md
   - Record 3 variations
   - Edit and optimize

4. **Launch Ad Campaigns**
   - Start with Google Ads
   - Target IndiaMART sellers
   - Track conversions
   - Scale based on ROI

---

## 🐛 Troubleshooting

### **"Razorpay key not configured"**
```
Solution:
1. Check NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local
2. Restart dev server
3. Check Razorpay dashboard for correct key
```

### **"Payment verification failed"**
```
Solution:
1. Check RAZORPAY_KEY_SECRET is correct
2. Verify signature calculation
3. Check order ID and payment ID match
```

### **"Subscription not created"**
```
Solution:
1. Check Supabase subscriptions table exists
2. Check user ID is valid
3. Check database permissions
4. Check Supabase logs for errors
```

---

## 📚 Resources

- [Razorpay Dashboard](https://dashboard.razorpay.com)
- [Razorpay Docs](https://razorpay.com/docs)
- [Payment Gateway API](https://razorpay.com/docs/api/payments)
- [Webhooks](https://razorpay.com/docs/webhooks)
- [Pricing](https://razorpay.com/pricing)

---

## 💡 Pro Tips

1. **Use UPI** - 0% fees, customers prefer it
2. **Enable all payment methods** - More conversions
3. **Set up webhooks** - For real-time updates
4. **Monitor dashboard** - Check daily for issues
5. **Test thoroughly** - Use test mode first

---

## 🎯 Success Indicators

You'll know it's working when:

1. ✅ Test payment goes through
2. ✅ Subscription created in database
3. ✅ User plan updated to "professional"
4. ✅ Lead limit increased
5. ✅ Payment appears in Razorpay dashboard

---

**Ready to set up Razorpay?** 💳

Start with Step 1 now!
