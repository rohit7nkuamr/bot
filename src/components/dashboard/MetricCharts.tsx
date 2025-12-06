'use client';

import { motion } from 'framer-motion';

export default function MetricCharts() {
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
                        <p className="text-sm text-gray-400">Daily qualified leads over last 7 days</p>
                    </div>
                    <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 px-2 py-1 focus:outline-none">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                </div>

                <div className="h-64 flex items-end justify-between gap-4 px-2">
                    {[65, 78, 72, 85, 92, 88, 95].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group h-full relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                className="w-full bg-gradient-to-t from-indigo-600/50 to-indigo-400 rounded-t-sm group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all relative"
                            >
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-700 pointer-events-none z-10">
                                    {height} leads
                                </div>
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
                <p className="text-sm text-gray-400 mb-6">Distribution of lead statuses</p>

                <div className="space-y-6">
                    {[
                        { label: 'Qualified', value: 79, color: 'bg-emerald-500', text: 'text-emerald-400' },
                        { label: 'Pending', value: 15, color: 'bg-amber-500', text: 'text-amber-400' },
                        { label: 'Rejected', value: 6, color: 'bg-red-500', text: 'text-red-400' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">{item.label}</span>
                                <span className={`text-sm font-bold ${item.text}`}>{item.value}%</span>
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
                        <p className="text-xl font-bold text-white mt-1">987</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-xs text-gray-500 uppercase">Action Needed</p>
                        <p className="text-xl font-bold text-white mt-1">142</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
