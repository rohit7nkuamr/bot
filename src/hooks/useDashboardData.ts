import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface DashboardStats {
    totalLeads: number;
    qualified: number;
    conversionRate: string;
    responseTime: string;
}

const REFRESH_INTERVAL = 30000; // 30 seconds

export function useDashboardData() {
    const { user, isAuthenticated, session } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        totalLeads: 0,
        qualified: 0,
        conversionRate: '0%',
        responseTime: '-',
    });
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async (showLoading = true) => {
        if (!isAuthenticated || !session) {
            setLoading(false);
            return;
        }

        try {
            if (showLoading) setLoading(true);
            setError(null);

            const accessToken = session.access_token;

            const response = await fetch('/api/leads', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setLeads(data.data || []);
                if (data.stats) {
                    setStats({
                        totalLeads: data.stats.total || 0,
                        qualified: data.stats.qualified || 0,
                        conversionRate: `${data.stats.conversionRate || 0}%`,
                        responseTime: '< 2s', // AI responds fast
                    });
                }
                setLastUpdated(new Date());
            } else {
                throw new Error(data.error || 'Failed to fetch leads');
            }

        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
            setError("Could not load dashboard data.");
            setStats({
                totalLeads: 0,
                qualified: 0,
                conversionRate: '0%',
                responseTime: '-'
            });
            setLeads([]);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, session]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Auto-refresh polling
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            fetchData(false); // Don't show loading spinner on auto-refresh
        }, REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [isAuthenticated, fetchData]);

    const refresh = useCallback(() => {
        fetchData(true);
    }, [fetchData]);

    return {
        stats,
        leads,
        loading,
        error,
        userPlan: user?.subscription_plan || 'starter',
        lastUpdated,
        refresh,
    };
}
