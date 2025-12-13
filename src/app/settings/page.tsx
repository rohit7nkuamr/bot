'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, X, Menu, Loader2 } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import BillingForm from '@/components/settings/BillingForm';
import { useIntegrations } from '@/hooks/useIntegrations';

// Static integration config (UI only)
const integrationConfig = [
    {
        id: 'indiamart' as const,
        name: 'IndiaMART',
        description: 'Auto-fetch leads from your IndiaMART seller account.',
        color: 'from-red-500 to-orange-500',
        icon: 'IM',
        inputLabel: 'IndiaMART API Key',
        inputPlaceholder: 'Enter your IndiaMART Lead Manager API Key',
    },
    {
        id: 'whatsapp' as const,
        name: 'WhatsApp Business',
        description: 'Managed by LeadFilter. Enter your WhatsApp Business number.',
        color: 'from-green-500 to-emerald-600',
        icon: 'WA',
        inputLabel: 'WhatsApp Phone Number',
        inputPlaceholder: '+91 98765 43210',
    },
    {
        id: 'zoho' as const,
        name: 'Zoho CRM',
        description: 'Push qualified leads directly to your Zoho pipeline.',
        color: 'from-blue-500 to-cyan-500',
        icon: 'ZH',
        inputLabel: 'Zoho API Key',
        inputPlaceholder: 'Enter your Zoho CRM API Key',
    }
];

type Platform = 'whatsapp' | 'indiamart' | 'zoho';

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState<typeof integrationConfig[0] | null>(null);
    const [apiKey, setApiKey] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [disconnectingPlatform, setDisconnectingPlatform] = useState<string | null>(null);

    const { integrations, loading, connect, disconnect, refresh } = useIntegrations();

    const handleConnect = async () => {
        if (!apiKey || !selectedIntegration) return;

        setIsConnecting(true);
        setConnectionError(null);

        try {
            await connect(selectedIntegration.id as Platform, apiKey);
            setSelectedIntegration(null);
            setApiKey('');
        } catch (error) {
            setConnectionError(error instanceof Error ? error.message : 'Connection failed');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async (platform: Platform) => {
        setDisconnectingPlatform(platform);
        try {
            await disconnect(platform);
        } catch (error) {
            console.error('Disconnect error:', error);
        } finally {
            setDisconnectingPlatform(null);
        }
    };

    const getIntegrationStatus = (id: string) => {
        return integrations[id as Platform] || { connected: false, connectedAs: null };
    };

    return (
        <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 overflow-y-auto lg:ml-64 transition-all duration-300">
                <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <header className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
                            <p className="text-zinc-500 mt-1">Manage integrations and billing</p>
                        </div>
                    </header>

                    {/* Integrations Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            Integrations
                            {loading && <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrationConfig.map((app) => {
                                const status = getIntegrationStatus(app.id);
                                const isDisconnecting = disconnectingPlatform === app.id;

                                return (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`glass-card rounded-2xl p-6 border transition-all ${status.connected
                                                ? 'border-emerald-500/30 bg-emerald-500/5'
                                                : 'border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                                {app.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                                                    {status.connected && (
                                                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                                                            <Check size={12} />
                                                            Connected
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-zinc-500 leading-snug">{app.description}</p>
                                            </div>
                                        </div>

                                        {status.connected ? (
                                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-sm text-zinc-400">
                                                    {status.connectedAs || 'Connected'}
                                                </span>
                                                <button
                                                    onClick={() => handleDisconnect(app.id as Platform)}
                                                    disabled={isDisconnecting}
                                                    className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 flex items-center gap-1"
                                                >
                                                    {isDisconnecting && <Loader2 size={12} className="animate-spin" />}
                                                    Disconnect
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedIntegration(app)}
                                                className="w-full mt-2 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                Connect Account <ChevronRight size={16} />
                                            </button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Billing Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-6">Billing & Subscription</h2>
                        <BillingForm />
                    </section>

                </div>
            </main>

            {/* Connection Modal */}
            <AnimatePresence>
                {selectedIntegration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedIntegration(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 rounded-2xl border border-white/10 p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">
                                    Connect {selectedIntegration.name}
                                </h3>
                                <button
                                    onClick={() => setSelectedIntegration(null)}
                                    className="text-zinc-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                                        {selectedIntegration.inputLabel}
                                    </label>
                                    <input
                                        type="text"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder={selectedIntegration.inputPlaceholder}
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>

                                {connectionError && (
                                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                        {connectionError}
                                    </div>
                                )}

                                <button
                                    onClick={handleConnect}
                                    disabled={!apiKey || isConnecting}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isConnecting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={16} />
                                            Connect {selectedIntegration.name}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
