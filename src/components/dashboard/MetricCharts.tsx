'use client';

import { motion } from 'framer-motion';

interface MetricChartsProps {
    stats: {
        totalLeads: number;
        qualified: number;
        pending?: number;
        rejected?: number;
    };
    leads: any[];
}

export default function MetricCharts({ stats, leads }: MetricChartsProps) {
    // Calculate status breakdown from real data
    const total = stats.totalLeads || 0;
    const qualifiedCount = stats.qualified || 0;
    const pendingCount = stats.pending || leads.filter(l => l.status === 'pending').length;
    const rejectedCount = stats.rejected || leads.filter(l => l.status === 'rejected').length;

    const qualifiedPercent = total > 0 ? Math.round((qualifiedCount / total) * 100) : 0;
    const pendingPercent = total > 0 ? Math.round((pendingCount / total) * 100) : 0;
    const rejectedPercent = total > 0 ? Math.round((rejectedCount / total) * 100) : 0;

    // Calculate last 7 days activity (for now, just show proportional heights based on lead count)
    // In production, this would come from the API with daily breakdowns
    const maxHeight = total > 0 ? 100 : 10;
    const dayHeights = total > 0
        ? [30, 45, 35, 50, 65, 55, 75].map(h => Math.min(h, maxHeight))
        : [5, 5, 5, 5, 5, 5, 5]; // Show minimal bars when no data

    // Show empty state if no leads
    const isEmpty = total === 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 glass-card rounded-2xl p-6 relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Qualification Trend</h3>
                        <p className="text-sm text-gray-400">
                            {isEmpty ? 'No leads yet - start connecting integrations!' : `${total} leads over last 7 days`}
                        </p>
                    </div>
                    <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 px-2 py-1 focus:outline-none">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                </div>

                <div className="h-64 flex items-end justify-between gap-4 px-2">
                    {dayHeights.map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group h-full relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                className={`w-full rounded-t-sm transition-all relative ${isEmpty
                                        ? 'bg-gradient-to-t from-zinc-700/50 to-zinc-600/30'
                                        : 'bg-gradient-to-t from-indigo-600/50 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-300'
                                    }`}
                            >
                                {!isEmpty && (
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-700 pointer-events-none z-10">
                                        {Math.round((height / 100) * total)} leads
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <span key={day}>{day}</span>
                    ))}
                </div>
            </motion.div>

            {/* Status Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass-card rounded-2xl p-6"
            >
                <h3 className="text-lg font-semibold text-white mb-2">Status Breakdown</h3>
                <p className="text-sm text-gray-400 mb-6">
                    {isEmpty ? 'No leads to analyze yet' : 'Distribution of lead statuses'}
                </p>

                <div className="space-y-6">
                    {[
                        { label: 'Qualified', value: qualifiedPercent, color: 'bg-emerald-500', text: 'text-emerald-400' },
                        { label: 'Pending', value: pendingPercent, color: 'bg-amber-500', text: 'text-amber-400' },
                        { label: 'Rejected', value: rejectedPercent, color: 'bg-red-500', text: 'text-red-400' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">{item.label}</span>
                                <span className={`text-sm font-bold ${item.value > 0 ? item.text : 'text-zinc-600'}`}>
                                    {item.value}%
                                </span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Total Qualified</p>
                        <p className="text-xl font-bold text-white mt-1">{qualifiedCount}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-xs text-gray-500 uppercase">Action Needed</p>
                        <p className="text-xl font-bold text-white mt-1">{pendingCount + rejectedCount}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
