/**
 * Razorpay Integration
 * Handles payment processing and subscriptions
 */

export interface Plan {
  id: string;
  name: 'starter' | 'professional' | 'enterprise';
  price: number;
  leads: number;
  features: string[];
}

export const PLANS: Record<string, Plan> = {
  starter: {
    id: 'plan_starter_2499',
    name: 'starter',
    price: 2499,
    leads: 100,
    features: [
      'Up to 100 leads/month',
      'AI-powered qualification',
      'WhatsApp integration',
      'Email support',
      'Basic analytics',
      '14-day free trial',
    ],
  },
  professional: {
    id: 'plan_professional_9999',
    name: 'professional',
    price: 9999,
    leads: 1000,
    features: [
      'Up to 1,000 leads/month',
      'Advanced AI qualification',
      'WhatsApp + SMS',
      'Priority support',
      'Advanced analytics',
      'Custom workflows',
      'Team collaboration',
      '14-day free trial',
    ],
  },
  enterprise: {
    id: 'plan_enterprise_24999',
    name: 'enterprise',
    price: 24999,
    leads: 999999,
    features: [
      'Unlimited leads',
      'Custom AI models',
      'Multi-channel integration',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
    ],
  },
};

/**
 * Initialize Razorpay
 */
export function initializeRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Create subscription
 */
export async function createSubscription(
  planName: 'starter' | 'professional' | 'enterprise',
  userId: string,
  userEmail: string
) {
  try {
    const plan = PLANS[planName];
    if (!plan) {
      throw new Error('Invalid plan');
    }

    // Initialize Razorpay
    const isLoaded = await initializeRazorpay();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay');
    }

    // Get Razorpay key
    const keyResponse = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ action: 'get-key' }),
    });
    const keyData = await keyResponse.json();

    if (!keyData.key) {
      throw new Error('Failed to get Razorpay key');
    }

    // Create Razorpay options
    const options = {
      key: keyData.key,
      amount: plan.price * 100, // Convert to paise
      currency: 'INR',
      name: 'LeadFilter',
      description: `${plan.name} Plan - ${plan.leads} leads/month`,
      prefill: {
        email: userEmail,
      },
      handler: async (response: any) => {
        // Verify payment on backend
        const verifyResponse = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'verify-payment',
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            planName,
            userId,
          }),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          return {
            success: true,
            message: 'Payment successful',
            plan: planName,
          };
        } else {
          throw new Error('Payment verification failed');
        }
      },
      theme: {
        color: '#6366f1',
      },
    };

    // Open Razorpay checkout
    const razorpay = (window as any).Razorpay;
    const checkout = new razorpay(options);
    checkout.open();

    return new Promise((resolve, reject) => {
      checkout.on('payment.failed', (response: any) => {
        reject(new Error(response.error.description));
      });
    });
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}

/**
 * Get plan details
 */
export function getPlan(planName: string): Plan | null {
  return PLANS[planName] || null;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
}
