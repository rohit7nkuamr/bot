'use client';

import { motion } from 'framer-motion';
import { Zap, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useUsage } from '@/hooks/useUsage';

export default function UsageMeter() {
    const { usage, loading } = useUsage();

    if (loading) {
        return (
            <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-1/3 mb-4" />
                <div className="h-2 bg-zinc-800 rounded w-full mb-2" />
                <div className="h-2 bg-zinc-800 rounded w-full" />
            </div>
        );
    }

    if (!usage) return null;

    const leadsPercent = usage.leadsLimit === Infinity
        ? 0
        : Math.min(100, (usage.leadsUsed / usage.leadsLimit) * 100);

    const aiPercent = usage.aiConversationsLimit === Infinity
        ? 0
        : Math.min(100, (usage.aiConversationsUsed / usage.aiConversationsLimit) * 100);

    const isLowOnLeads = leadsPercent >= 80;
    const isLowOnAI = aiPercent >= 80;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Usage This Month</h3>
                <span className="px-2 py-1 rounded text-xs font-medium uppercase tracking-wider bg-zinc-800 text-zinc-400">
                    {usage.plan} Plan
                </span>
            </div>

            {/* Leads Usage */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-zinc-300">Leads</span>
                    </div>
                    <span className={`text-sm font-medium ${isLowOnLeads ? 'text-orange-400' : 'text-zinc-400'}`}>
                        {usage.leadsUsed.toLocaleString()} / {usage.leadsLimit === Infinity ? '∞' : usage.leadsLimit.toLocaleString()}
                    </span>
                </div>
                {usage.leadsLimit !== Infinity && (
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${leadsPercent}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full rounded-full ${leadsPercent >= 100 ? 'bg-red-500' :
                                    leadsPercent >= 80 ? 'bg-orange-500' :
                                        'bg-cyan-500'
                                }`}
                        />
                    </div>
                )}
                {usage.leadsLimit === Infinity && (
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3" /> Unlimited
                    </div>
                )}
            </div>

            {/* AI Conversations Usage */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-zinc-300">AI Conversations</span>
                    </div>
                    <span className={`text-sm font-medium ${isLowOnAI ? 'text-orange-400' : 'text-zinc-400'}`}>
                        {usage.aiConversationsUsed.toLocaleString()} / {usage.aiConversationsLimit === Infinity ? '∞' : usage.aiConversationsLimit.toLocaleString()}
                    </span>
                </div>
                {usage.aiConversationsLimit !== Infinity && (
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${aiPercent}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`h-full rounded-full ${aiPercent >= 100 ? 'bg-red-500' :
                                    aiPercent >= 80 ? 'bg-orange-500' :
                                        'bg-purple-500'
                                }`}
                        />
                    </div>
                )}
                {usage.aiConversationsLimit === Infinity && (
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3" /> Unlimited
                    </div>
                )}
            </div>

            {/* Upgrade CTA if low on usage */}
            {(isLowOnLeads || isLowOnAI) && (
                <Link
                    href="/pricing"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                    <TrendingUp className="w-4 h-4" />
                    Upgrade for More
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            )}

            {/* Reset Date */}
            {usage.resetDate && (
                <p className="text-xs text-zinc-500 text-center mt-4">
                    Resets on {new Date(usage.resetDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
            )}
        </motion.div>
    );
}
