'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, HelpCircle, X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import BillingForm from '@/components/settings/BillingForm';

// Mock Integration Data
const integrations = [
    {
        id: 'indiamart',
        name: 'IndiaMART',
        description: 'Auto-fetch leads from your IndiaMART seller account.',
        status: 'disconnected',
        color: 'from-red-500 to-orange-500',
        icon: 'IM',
        guideImage: '/images/indiamart-key-guide.png' // Placeholder
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        description: 'Send automated replies to new leads instantly.',
        status: 'connected',
        connectedAs: '+91 97XXX XXXXX',
        color: 'from-green-500 to-emerald-600',
        icon: 'WA'
    },
    {
        id: 'zoho',
        name: 'Zoho CRM',
        description: 'Push qualified leads directly to your Zoho pipeline.',
        status: 'disconnected',
        color: 'from-blue-500 to-yellow-500',
        icon: 'ZH'
    }
];

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state
    const [selectedIntegration, setSelectedIntegration] = useState<typeof integrations[0] | null>(null);
    const [apiKey, setApiKey] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    const handleConnect = async () => {
        if (!apiKey || !selectedIntegration) return;

        setIsConnecting(true);
        setConnectionError(null);

        try {
            const response = await fetch(`/api/integrations/${selectedIntegration.id}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ apiKey }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Connection failed');
            }

            // On success, close modal and refresh UI (in a real app, you'd update state)
            alert('Successfully connected!');
            setSelectedIntegration(null);
            // Here you would refetch the integrations status to update the UI

        } catch (error) {
            setConnectionError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 overflow-y-auto lg:ml-64 transition-all duration-300">
                <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Connect Your Business</h1>
                        <p className="text-zinc-400">Link your accounts to start automating lead qualification.</p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {integrations.map((app) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`relative p-6 rounded-2xl border transition-all ${app.status === 'connected'
                                        ? 'bg-emerald-500/5 border-emerald-500/20'
                                        : 'glass-card border-white/5 hover:border-white/20'
                                    }`}
                            >
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    {app.status === 'connected' ? (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                            <Check size={12} /> Connected
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-zinc-500 text-xs font-medium border border-white/5">
                                            Not Linked
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                        {app.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                                        <p className="text-sm text-zinc-500 leading-snug max-w-xs">{app.description}</p>
                                    </div>
                                </div>

                                {app.status === 'connected' ? (
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">Linked as <span className="text-white">{app.connectedAs}</span></span>
                                        <button className="text-xs text-red-400 hover:text-red-300">Disconnect</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setSelectedIntegration(app)}
                                        className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Connect Account <ChevronRight size={16} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Billing Form */}
                    <BillingForm />

                    {/* Help / Support */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-indigo-500/20 text-center">
                        <h3 className="font-semibold text-white mb-2">Need help connecting?</h3>
                        <p className="text-sm text-zinc-400 mb-4">Our support team can help you set this up via a Zoom call.</p>
                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                            Schedule Setup Call
                        </button>
                    </div>

                </div>
            </main>

            {/* Connection Modal */}
            <AnimatePresence>
                {selectedIntegration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="w-full max-w-lg bg-[#0A0A0A] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedIntegration.color} flex items-center justify-center text-white font-bold`}>
                                        {selectedIntegration.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Connect {selectedIntegration.name}</h3>
                                        <p className="text-xs text-zinc-400">Step 1 of 2</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedIntegration(null)}
                                    className="p-2 bg-white/5 rounded-full text-zinc-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">

                                {/* Visual Guide (Placeholder) */}
                                <div className="relative aspect-video rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-zinc-950/50 flex flex-col items-center justify-center text-zinc-500 gap-2">
                                        <ImageIcon size={32} />
                                        <span className="text-xs">Visual Guide: Where to find your Key</span>
                                    </div>
                                    {/* Actual image would go here */}
                                    {/* <img src={selectedIntegration.guideImage} alt="Guide" className="w-full h-full object-cover" /> */}

                                    <div className="absolute bottom-3 right-3">
                                        <button className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                                            <ExternalLink size={12} /> Open {selectedIntegration.name} Login
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Paste your Key here
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: gl_78d6f87..."
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                    />
                                    <p className="text-xs text-zinc-500 mt-2 flex items-start gap-1.5">
                                        <HelpCircle size={14} className="mt-0.5 shrink-0" />
                                        Don't worry, this is encrypted and stored securely. We only use it to fetch leads.
                                    </p>
                                </div>

                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedIntegration(null)}
                                    className="px-5 py-2.5 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    className="px-6 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isConnecting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                                            Connecting...
                                        </>
                                    ) : 'Verify & Connect'}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
