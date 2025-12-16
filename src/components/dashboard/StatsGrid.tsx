'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    change?: string;
    icon: LucideIcon;
    color: string; // Expecting gradient classes like 'from-blue-500 to-cyan-500'
}

interface StatsGridProps {
    stats?: StatItem[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function StatsGrid({ stats = [] }: StatsGridProps) {
    if (!stats.length) return null;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={i}
                        variants={item}
                        className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-white/5"
                    >
                        {/* Background Glow */}
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 blur-2xl transition-all duration-500`} />

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} p-[1px]`}>
                                <div className="w-full h-full bg-zinc-900 rounded-[7px] flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            {stat.change && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5`}>
                                    {stat.change}
                                </span>
                            )}
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-zinc-500 text-sm font-medium mb-1">{stat.label}</h3>
                            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
