import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getCurrentSession } from '@/lib/auth';
import { updateSubscriptionPlan } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';

/**
 * Payments API Routes
 * POST: Get Razorpay key, verify payment, handle webhooks
 */

// Verify Razorpay signature
function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error('Razorpay secret not configured');
    return false;
  }

  const message = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');

  return expectedSignature === signature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'get-key') {
      // Return Razorpay public key
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) {
        return NextResponse.json(
          { error: 'Razorpay key not configured' },
          { status: 500 }
        );
      }
      return NextResponse.json({ key }, { status: 200 });
    }

    if (action === 'verify-payment') {
      const { paymentId, orderId, signature, planName, userId } = body;

      // Verify Razorpay signature
      if (!verifyRazorpaySignature(orderId, paymentId, signature)) {
        return NextResponse.json(
          { error: 'Payment verification failed' },
          { status: 400 }
        );
      }

      // Update user subscription plan
      await updateSubscriptionPlan(userId, planName);

      // Create subscription record
      const { error: insertError } = await supabaseServer
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan: planName,
          status: 'active',
          renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
        });

      if (insertError) {
        console.error('Subscription insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to create subscription' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Payment verified and subscription activated',
          plan: planName,
        },
        { status: 200 }
      );
    }

    if (action === 'webhook') {
      // Handle Razorpay webhook
      const { event, payload } = body;

      if (event === 'payment.authorized') {
        // Payment successful
        const { payment } = payload;
        console.log('Payment authorized:', payment.id);
      } else if (event === 'payment.failed') {
        // Payment failed
        const { payment } = payload;
        console.log('Payment failed:', payment.id);
      } else if (event === 'subscription.activated') {
        // Subscription activated
        const { subscription } = payload;
        console.log('Subscription activated:', subscription.id);
      }

      return NextResponse.json(
        { success: true, message: 'Webhook processed' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}
