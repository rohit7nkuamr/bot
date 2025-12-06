import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for browser (use anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for server-side operations (use service role key)
export const supabaseServer = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey
);

// Type definitions
export interface User {
  id: string;
  email: string;
  subscription_plan: 'starter' | 'professional' | 'enterprise';
  monthly_lead_limit: number;
  leads_used: number;
  indiamart_api_key?: string; // Encrypted
  zoho_api_key?: string;      // Encrypted
  hubspot_api_key?: string;   // Encrypted
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  phone: string;
  name: string;
  raw_data: Record<string, any> | null;
  parsed_data: Record<string, any> | null;
  status: 'pending' | 'qualified' | 'rejected';
  budget: number | null;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  lead_id: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  qualification_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  renewal_date: string | null;
  razorpay_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}
