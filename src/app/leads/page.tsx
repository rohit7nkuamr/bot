'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, ArrowLeft, Phone, Mail, Calendar, DollarSign, MoreVertical, Menu } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useRouter } from 'next/navigation';

export default function LeadsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { leads, loading, error } = useDashboardData();

    // Filter leads
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone?.includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'qualified':
                return <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400">Qualified</span>;
            case 'pending':
                return <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400">Pending</span>;
            case 'rejected':
                return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">Rejected</span>;
            default:
                return <span className="px-2 py-1 text-xs rounded-full bg-zinc-500/20 text-zinc-400">{status}</span>;
        }
    };

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
                <div className="p-4 md:p-8 max-w-7xl mx-auto">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">All Leads</h1>
                                <p className="text-zinc-500 mt-1">{filteredLeads.length} total leads</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="qualified">Qualified</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </header>

                    {/* Leads List */}
                    {filteredLeads.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
                                <Phone className="w-8 h-8 text-zinc-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No leads yet</h3>
                            <p className="text-zinc-500 mb-6">Connect your integrations to start capturing leads</p>
                            <button
                                onClick={() => router.push('/settings')}
                                className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                            >
                                Connect Integrations
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-3">
                            {filteredLeads.map((lead, index) => (
                                <motion.div
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                {lead.name?.[0]?.toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{lead.name || 'Unknown'}</h3>
                                                <div className="flex items-center gap-3 text-sm text-zinc-500">
                                                    <span className="flex items-center gap-1">
                                                        <Phone size={12} />
                                                        {lead.phone || 'N/A'}
                                                    </span>
                                                    {lead.created_at && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            {new Date(lead.created_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {lead.budget && (
                                                <span className="text-sm text-zinc-400 flex items-center gap-1">
                                                    <DollarSign size={14} />
                                                    ₹{lead.budget.toLocaleString()}
                                                </span>
                                            )}
                                            {getStatusBadge(lead.status)}
                                            <button className="p-1 text-zinc-500 hover:text-white">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
