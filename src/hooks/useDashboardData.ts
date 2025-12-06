import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { leadsAPI } from '@/lib/api';
import { Users, CheckCircle, TrendingUp, Clock } from 'lucide-react';

export interface DashboardStats {
    totalLeads: number;
    qualified: number;
    conversionRate: string;
    responseTime: string;
}

export function useDashboardData() {
    const { user, isAuthenticated } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        totalLeads: 0,
        qualified: 0,
        conversionRate: '0%',
        responseTime: '-',
    });
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!isAuthenticated) return;

            try {
                setLoading(true);
                // Fetch stats and leads in parallel
                const [statsRes, leadsRes] = await Promise.all([
                    leadsAPI.getLeads(),
                    leadsAPI.getLeads()
                ]);

                // Explicitly check if data is an array to satisfy TS
                if (leadsRes.success && Array.isArray(leadsRes.data)) {
                    const allLeads = leadsRes.data as any[];
                    setLeads(allLeads);

                    // Calculate stats from leads for now
                    const qualifiedCount = allLeads.filter((l: any) => l.status === 'qualified').length;
                    const conversion = allLeads.length > 0 ? ((qualifiedCount / allLeads.length) * 100).toFixed(1) + '%' : '0%';

                    setStats({
                        totalLeads: allLeads.length,
                        qualified: qualifiedCount,
                        conversionRate: conversion,
                        responseTime: '2.4s'
                    });
                }

            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
                setError("Could not load dashboard data. Using offline mode.");

                // Fallback to mock data
                setStats({
                    totalLeads: 124,
                    qualified: 45,
                    conversionRate: '36%',
                    responseTime: '1.2s'
                });
                setLeads([
                    { id: '1', name: 'Amit Kumar', phone: '+91 98765 43210', status: 'qualified', created_at: new Date().toISOString(), platform: 'WhatsApp' },
                    { id: '2', name: 'Rahul Singh', phone: '+91 98123 45678', status: 'pending', created_at: new Date(Date.now() - 3600000).toISOString(), platform: 'Indiamart' },
                    { id: '3', name: 'Priya Sharma', phone: '+91 99999 88888', status: 'rejected', created_at: new Date(Date.now() - 7200000).toISOString(), platform: 'Website' },
                ]);

            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [isAuthenticated]);

    return { stats, leads, loading, error, userPlan: user?.subscription_plan || 'starter' };
}
