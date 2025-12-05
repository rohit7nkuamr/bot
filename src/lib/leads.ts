import { supabase, supabaseServer } from './supabase';
import type { Lead } from './supabase';

/**
 * Get all leads for a user
 */
export async function getUserLeads(userId: string) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Lead[];
  } catch (error) {
    console.error('Get leads error:', error);
    throw error;
  }
}

/**
 * Get leads by status
 */
export async function getLeadsByStatus(
  userId: string,
  status: 'pending' | 'qualified' | 'rejected'
) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Lead[];
  } catch (error) {
    console.error('Get leads by status error:', error);
    throw error;
  }
}

/**
 * Create a new lead
 */
export async function createLead(
  userId: string,
  leadData: {
    phone: string;
    name: string;
    raw_data?: Record<string, any>;
    budget?: number;
  }
) {
  try {
    const { data, error } = await supabaseServer
      .from('leads')
      .insert({
        user_id: userId,
        phone: leadData.phone,
        name: leadData.name,
        raw_data: leadData.raw_data || null,
        budget: leadData.budget || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data as Lead;
  } catch (error) {
    console.error('Create lead error:', error);
    throw error;
  }
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  leadId: string,
  status: 'pending' | 'qualified' | 'rejected'
) {
  try {
    const { data, error } = await supabaseServer
      .from('leads')
      .update({ status })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;
    return data as Lead;
  } catch (error) {
    console.error('Update lead status error:', error);
    throw error;
  }
}

/**
 * Update lead with parsed data
 */
export async function updateLeadParsedData(
  leadId: string,
  parsedData: Record<string, any>
) {
  try {
    const { data, error } = await supabaseServer
      .from('leads')
      .update({ parsed_data: parsedData })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;
    return data as Lead;
  } catch (error) {
    console.error('Update lead parsed data error:', error);
    throw error;
  }
}

/**
 * Get lead statistics
 */
export async function getLeadStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('status')
      .eq('user_id', userId);

    if (error) throw error;

    const stats = {
      total: data.length,
      qualified: data.filter((l: any) => l.status === 'qualified').length,
      pending: data.filter((l: any) => l.status === 'pending').length,
      rejected: data.filter((l: any) => l.status === 'rejected').length,
      conversionRate:
        data.length > 0
          ? (
              (data.filter((l: any) => l.status === 'qualified').length /
                data.length) *
              100
            ).toFixed(2)
          : '0',
    };

    return stats;
  } catch (error) {
    console.error('Get lead stats error:', error);
    throw error;
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId: string) {
  try {
    const { error } = await supabaseServer
      .from('leads')
      .delete()
      .eq('id', leadId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete lead error:', error);
    throw error;
  }
}
