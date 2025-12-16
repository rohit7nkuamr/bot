'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Save, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AISettings {
    agent_name: string;
    business_name: string;
    business_type: string;
    products_services: string;
    response_tone: 'formal' | 'friendly' | 'professional';
    greeting_message: string;
}

const defaultSettings: AISettings = {
    agent_name: 'Riya',
    business_name: '',
    business_type: '',
    products_services: '',
    response_tone: 'professional',
    greeting_message: '',
};

const toneOptions = [
    { value: 'formal', label: 'Formal', description: 'Professional and business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'professional', label: 'Professional', description: 'Balanced and helpful' },
];

export default function EditAISettings() {
    const { session } = useAuth();
    const [settings, setSettings] = useState<AISettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch existing settings
    useEffect(() => {
        async function fetchSettings() {
            if (!session?.access_token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/ai-settings', {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.settings) {
                        setSettings({ ...defaultSettings, ...data.settings });
                    }
                }
            } catch (err) {
                console.error('Failed to fetch AI settings:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, [session]);

    const handleSave = async () => {
        if (!session?.access_token) return;

        setSaving(true);
        setError(null);
        setSaved(false);

        try {
            const response = await fetch('/api/ai-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to save settings');
            }
        } catch (err) {
            setError('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof AISettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">AI Agent Settings</h3>
                    <p className="text-sm text-zinc-500">Customize how your AI assistant talks to leads</p>
                </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
                {/* Agent Name */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Agent Name
                    </label>
                    <input
                        type="text"
                        value={settings.agent_name}
                        onChange={(e) => updateField('agent_name', e.target.value)}
                        placeholder="Riya"
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                    />
                    <p className="text-xs text-zinc-500 mt-1">This is how your AI introduces itself to leads</p>
                </div>

                {/* Business Name */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Your Business Name
                    </label>
                    <input
                        type="text"
                        value={settings.business_name}
                        onChange={(e) => updateField('business_name', e.target.value)}
                        placeholder="ABC Industries Pvt. Ltd."
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                    />
                </div>

                {/* Business Type */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        What does your business do?
                    </label>
                    <input
                        type="text"
                        value={settings.business_type}
                        onChange={(e) => updateField('business_type', e.target.value)}
                        placeholder="Manufacturing of industrial pumps and machinery"
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                    />
                </div>

                {/* Products/Services */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Products/Services to Highlight
                    </label>
                    <textarea
                        value={settings.products_services}
                        onChange={(e) => updateField('products_services', e.target.value)}
                        placeholder="Water pumps (X500, X700 models), Industrial motors, Spare parts..."
                        rows={3}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                    <p className="text-xs text-zinc-500 mt-1">The AI will mention these when relevant</p>
                </div>

                {/* Response Tone */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-3">
                        Response Tone
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {toneOptions.map((tone) => (
                            <button
                                key={tone.value}
                                onClick={() => updateField('response_tone', tone.value)}
                                className={`p-4 rounded-xl border text-left transition-all ${settings.response_tone === tone.value
                                        ? 'border-cyan-500/50 bg-cyan-500/10'
                                        : 'border-white/10 hover:border-white/20 bg-black/20'
                                    }`}
                            >
                                <div className="text-sm font-medium text-white">{tone.label}</div>
                                <div className="text-xs text-zinc-500 mt-1">{tone.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Greeting Message */}
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Custom Greeting (Optional)
                    </label>
                    <textarea
                        value={settings.greeting_message}
                        onChange={(e) => updateField('greeting_message', e.target.value)}
                        placeholder="Hello! Thank you for your interest. How can I help you today?"
                        rows={2}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${saved
                                ? 'bg-green-500 text-white'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                            } disabled:opacity-50`}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : saved ? (
                            <>
                                <Check className="w-4 h-4" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Settings
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
