'use client';

import { useState, useEffect } from 'react';
import { Users, BarChart3, Activity, ShieldAlert } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                if (data.totalUsers !== undefined) {
                    setStats(data);
                }
            } catch (e) {
                console.error("Failed to fetch admin stats");
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="text-white">Loading Admin Panel...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">System Overview</h1>
                <p className="text-zinc-400">Welcome back, Admin.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || '-'}
                    icon={<Users className="text-blue-400" />}
                    trend="+12%"
                />
                <StatCard
                    title="Total Leads"
                    value={stats?.totalLeads || '-'}
                    icon={<BarChart3 className="text-emerald-400" />}
                    trend="+854 today"
                />
                <StatCard
                    title="Active Integrations"
                    value={stats?.activeSubs || '-'}
                    icon={<Activity className="text-purple-400" />}
                    trend="Stable"
                />
                <StatCard
                    title="System Health"
                    value={stats?.systemHealth || 'Good'}
                    icon={<ShieldAlert className="text-pink-400" />}
                    trend="100% Uptime"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Lead Ingestion Volume</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Mon', leads: 400 },
                                { name: 'Tue', leads: 300 },
                                { name: 'Wed', leads: 550 },
                                { name: 'Thu', leads: 480 },
                                { name: 'Fri', leads: 600 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                                <Bar dataKey="leads" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity Logs</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm border-b border-zinc-800 pb-2 last:border-0">
                                <span className="text-zinc-500">10:4{i} AM</span>
                                <span className="text-white">New user signup: rohit{i}@example.com</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend }: any) {
    return (
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-zinc-800">{icon}</div>
                <span className={`text-xs px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>{trend}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <p className="text-sm text-zinc-500">{title}</p>
        </div>
    )
}
