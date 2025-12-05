import { supabase, supabaseServer } from './supabase';
import type { User } from './supabase';

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabaseServer
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          subscription_plan: 'starter',
          monthly_lead_limit: 100,
        });

      if (profileError) throw profileError;
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, session: data.session };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getCurrentSession();
    if (!session?.user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) throw error;
    return data as User;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Update user subscription plan
 */
export async function updateSubscriptionPlan(
  userId: string,
  plan: 'starter' | 'professional' | 'enterprise'
) {
  try {
    const planLimits = {
      starter: 100,
      professional: 1000,
      enterprise: 999999,
    };

    const { data, error } = await supabaseServer
      .from('users')
      .update({
        subscription_plan: plan,
        monthly_lead_limit: planLimits[plan],
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  } catch (error) {
    console.error('Update subscription error:', error);
    throw error;
  }
}

/**
 * Check if user has reached lead limit
 */
export async function hasReachedLeadLimit(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('leads_used, monthly_lead_limit')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.leads_used >= data.monthly_lead_limit;
  } catch (error) {
    console.error('Check lead limit error:', error);
    return true; // Default to true for safety
  }
}

/**
 * Increment leads used count
 */
export async function incrementLeadsUsed(userId: string) {
  try {
    const { error } = await supabaseServer.rpc('increment_leads_used', {
      user_id: userId,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Increment leads error:', error);
    throw error;
  }
}
