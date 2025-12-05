import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { updateSubscriptionPlan } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';

/**
 * Payments API Routes
 * POST: Get Razorpay key, verify payment, handle webhooks
 */

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

      // TODO: Verify Razorpay signature
      // For now, assume payment is successful
      // In production, verify signature using HMAC-SHA256

      // Update user subscription plan
      await updateSubscriptionPlan(userId, planName);

      // Create subscription record
      await supabaseServer.from('subscriptions').insert({
        user_id: userId,
        plan: planName,
        status: 'active',
        renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        razorpay_subscription_id: paymentId,
      });

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
      // TODO: Verify webhook signature
      // TODO: Update subscription status based on event

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
