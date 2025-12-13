import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface IntegrationStatus {
    connected: boolean;
    connectedAs: string | null;
}

interface IntegrationsState {
    whatsapp: IntegrationStatus;
    indiamart: IntegrationStatus;
    zoho: IntegrationStatus;
}

const defaultState: IntegrationsState = {
    whatsapp: { connected: false, connectedAs: null },
    indiamart: { connected: false, connectedAs: null },
    zoho: { connected: false, connectedAs: null },
};

export function useIntegrations() {
    const { session, isAuthenticated } = useAuth();
    const [integrations, setIntegrations] = useState<IntegrationsState>(defaultState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIntegrations = useCallback(async () => {
        if (!isAuthenticated || !session?.access_token) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/integrations', {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIntegrations(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch integrations');
            }
        } catch (err) {
            console.error('Fetch integrations error:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, session?.access_token]);

    useEffect(() => {
        fetchIntegrations();
    }, [fetchIntegrations]);

    const connect = async (platform: 'whatsapp' | 'indiamart' | 'zoho', apiKey: string) => {
        if (!session?.access_token) throw new Error('Not authenticated');

        const response = await fetch('/api/integrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ platform, apiKey }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to connect');
        }

        // Refresh integrations after connecting
        await fetchIntegrations();
        return data;
    };

    const disconnect = async (platform: 'whatsapp' | 'indiamart' | 'zoho') => {
        if (!session?.access_token) throw new Error('Not authenticated');

        const response = await fetch('/api/integrations', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ platform }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to disconnect');
        }

        // Refresh integrations after disconnecting
        await fetchIntegrations();
        return data;
    };

    return {
        integrations,
        loading,
        error,
        connect,
        disconnect,
        refresh: fetchIntegrations,
    };
}
