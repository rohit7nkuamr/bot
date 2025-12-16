'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPlanConfig } from '@/lib/planLimits';

export interface UsageData {
    leadsUsed: number;
    leadsLimit: number;
    aiConversationsUsed: number;
    aiConversationsLimit: number;
    plan: string;
    resetDate: string | null;
}

export function useUsage() {
    const { session, user } = useAuth();
    const [usage, setUsage] = useState<UsageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsage() {
            if (!session?.access_token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/usage', {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsage(data.usage);
                } else {
                    // Fallback to default usage if API not ready
                    const plan = user?.subscription_plan || 'starter';
                    const config = getPlanConfig(plan);
                    setUsage({
                        leadsUsed: 0,
                        leadsLimit: config.leads,
                        aiConversationsUsed: 0,
                        aiConversationsLimit: config.aiConversations,
                        plan,
                        resetDate: null,
                    });
                }
            } catch (err) {
                console.error('Failed to fetch usage:', err);
                setError('Failed to load usage data');
            } finally {
                setLoading(false);
            }
        }

        fetchUsage();
    }, [session, user]);

    const isAtLeadLimit = usage ? usage.leadsUsed >= usage.leadsLimit && usage.leadsLimit !== Infinity : false;
    const isAtAILimit = usage ? usage.aiConversationsUsed >= usage.aiConversationsLimit && usage.aiConversationsLimit !== Infinity : false;

    return {
        usage,
        loading,
        error,
        isAtLeadLimit,
        isAtAILimit,
    };
}
