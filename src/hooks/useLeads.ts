'use client';

import { useState, useEffect } from 'react';
import { leadsAPI } from '@/lib/api';

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

export interface LeadStats {
  total: number;
  qualified: number;
  pending: number;
  rejected: number;
  conversionRate: string;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'qualified' | 'rejected'>('all');

  // Fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = filter === 'all' ? undefined : filter;
      const response = await leadsAPI.getLeads(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch leads');
      }

      setLeads((response.data as any)?.data || []);
      setStats((response.data as any)?.stats || null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads on mount and when filter changes
  useEffect(() => {
    fetchLeads();
  }, [filter]);

  // Create lead
  const createLead = async (
    phone: string,
    name: string,
    budget?: number,
    raw_data?: any
  ) => {
    try {
      const response = await leadsAPI.createLead(phone, name, budget, raw_data);

      if (!response.success) {
        throw new Error(response.error || 'Failed to create lead');
      }

      // Refresh leads
      await fetchLeads();
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create lead';
      setError(message);
      throw err;
    }
  };

  return {
    leads,
    stats,
    loading,
    error,
    filter,
    setFilter,
    fetchLeads,
    createLead,
  };
}
