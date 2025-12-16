'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Menu, TrendingUp, Users, MessageCircle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useUsage } from '@/hooks/useUsage';

export default function AnalyticsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { stats, leads, loading, lastUpdated } = useDashboardData();
    const { usage } = useUsage();

    // Calculate analytics
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
    const pendingLeads = leads.filter(l => l.status === 'pending').length;
    const rejectedLeads = leads.filter(l => l.status === 'rejected').length;

    const conversionRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : '0';

    // Weekly trend (mock for now - would need historical data)
    const weeklyLeads = [
        { day: 'Mon', count: Math.floor(totalLeads * 0.1) },
        { day: 'Tue', count: Math.floor(totalLeads * 0.15) },
        { day: 'Wed', count: Math.floor(totalLeads * 0.2) },
        { day: 'Thu', count: Math.floor(totalLeads * 0.18) },
        { day: 'Fri', count: Math.floor(totalLeads * 0.22) },
        { day: 'Sat', count: Math.floor(totalLeads * 0.1) },
        { day: 'Sun', count: Math.floor(totalLeads * 0.05) },
    ];

    const maxCount = Math.max(...weeklyLeads.map(d => d.count), 1);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 overflow-y-auto lg:ml-64 transition-all duration-300">
                <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                    <BarChart2 className="w-7 h-7 text-purple-400" />
                                    Analytics
                                </h1>
                                <p className="text-zinc-500 mt-1">
                                    Track your lead performance and AI metrics
                                    {lastUpdated && (
                                        <span className="ml-2 text-xs">
                                            • Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <ArrowUpRight size={12} /> +12%
                                </span>
                            </div>
                            <p className="text-sm text-zinc-500 mb-1">Total Leads</p>
                            <p className="text-2xl font-bold text-white">{totalLeads}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <ArrowUpRight size={12} /> +5%
                                </span>
                            </div>
                            <p className="text-sm text-zinc-500 mb-1">Conversion Rate</p>
                            <p className="text-2xl font-bold text-white">{conversionRate}%</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                                </div>
                            </div>
                            <p className="text-sm text-zinc-500 mb-1">AI Conversations</p>
                            <p className="text-2xl font-bold text-white">
                                {usage?.aiConversationsUsed || 0}
                                <span className="text-sm font-normal text-zinc-500">
                                    /{usage?.aiConversationsLimit === Infinity ? '∞' : usage?.aiConversationsLimit || 100}
                                </span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-orange-400" />
                                </div>
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                    <ArrowDownRight size={12} /> -15%
                                </span>
                            </div>
                            <p className="text-sm text-zinc-500 mb-1">Avg Response Time</p>
                            <p className="text-2xl font-bold text-white">&lt; 2s</p>
                        </motion.div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Weekly Leads Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <h3 className="text-lg font-semibold text-white mb-6">Leads This Week</h3>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {weeklyLeads.map((day, i) => (
                                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${(day.count / maxCount) * 100}%`, minHeight: '8px' }}
                                        />
                                        <span className="text-xs text-zinc-500">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Lead Status Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card rounded-2xl p-6 border border-white/5"
                        >
                            <h3 className="text-lg font-semibold text-white mb-6">Lead Status Breakdown</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-zinc-400">🔥 Hot (Qualified)</span>
                                        <span className="text-sm font-medium text-white">{qualifiedLeads}</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                                            style={{ width: `${totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-zinc-400">🌡️ Warm (Pending)</span>
                                        <span className="text-sm font-medium text-white">{pendingLeads}</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: `${totalLeads > 0 ? (pendingLeads / totalLeads) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-zinc-400">❄️ Cold (Rejected)</span>
                                        <span className="text-sm font-medium text-white">{rejectedLeads}</span>
                                    </div>
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${totalLeads > 0 ? (rejectedLeads / totalLeads) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
