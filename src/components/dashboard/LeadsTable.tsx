'use client';

import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Lead {
    id: string | number;
    name: string;
    phone: string;
    status: string;
    budget?: string | number;
    created_at: string;
    business?: string;
    platform?: string;
}

interface LeadsTableProps {
    leads: Lead[];
}

export default function LeadsTable({ leads = [] }: LeadsTableProps) {
    if (!leads || leads.length === 0) {
        return (
            <div className="glass-card rounded-2xl border border-white/5 p-8 text-center">
                <p className="text-zinc-500">No leads found. Waiting for new inquiries...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl border border-white/5 overflow-hidden"
        >
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">Recent Leads</h3>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/5/50 border-b border-white/5">
                            <th className="table-header">Contact Name</th>
                            <th className="table-header">Platform</th>
                            <th className="table-header">Status</th>
                            <th className="table-header">Budget</th>
                            <th className="table-header text-right">Date</th>
                            <th className="table-header w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, i) => (
                            <motion.tr
                                key={lead.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.05) }}
                                className="table-row group"
                            >
                                <td className="table-cell">
                                    <div>
                                        <div className="font-medium text-white">{lead.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500 mt-1">{lead.phone}</div>
                                    </div>
                                </td>
                                <td className="table-cell text-gray-400">
                                    {lead.platform || lead.business || 'Direct'}
                                </td>
                                <td className="table-cell">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${(lead.status || 'pending') === 'qualified'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : (lead.status || 'pending') === 'pending'
                                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {(lead.status || 'pending').charAt(0).toUpperCase() + (lead.status || 'pending').slice(1)}
                                    </span>
                                </td>
                                <td className="table-cell font-medium text-white">
                                    {lead.budget ? (typeof lead.budget === 'number' ? `₹${lead.budget}` : lead.budget) : '-'}
                                </td>
                                <td className="table-cell text-right text-gray-500">
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                                <td className="table-cell">
                                    <button className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-white transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-xs text-gray-500">Showing {leads.length} results</div>
                <div className="flex gap-1">
                    <button className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 disabled:opacity-50">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-white/5 text-gray-400">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
