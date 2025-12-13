import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface DashboardStats {
    totalLeads: number;
    qualified: number;
    conversionRate: string;
    responseTime: string;
}

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

    useEffect(() => {
        async function fetchData() {
            if (!isAuthenticated || !session) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Get access token from session
                const accessToken = session.access_token;

                // Fetch leads with auth token
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
                        setStats(data.stats);
                    }
                } else {
                    throw new Error(data.error || 'Failed to fetch leads');
                }

            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
                setError("Could not load dashboard data.");

                // Show empty state instead of mock data
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
        }

        fetchData();
    }, [isAuthenticated, session]);

    return { stats, leads, loading, error, userPlan: user?.subscription_plan || 'starter' };
}
