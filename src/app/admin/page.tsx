'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Users, BarChart3, Activity, ShieldAlert, Search, MoreVertical,
    Edit, Trash2, ChevronUp, ChevronDown, RefreshCw, Plus, Filter,
    UserCheck, UserX, Crown, Check, X
} from 'lucide-react';

interface AdminUser {
    id: string;
    email: string;
    subscription_plan: string;
    monthly_lead_limit: number;
    leads_used: number;
    created_at: string;
    last_sign_in_at?: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<string>('created_at');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [editingPlan, setEditingPlan] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);
            const [statsRes, usersRes] = await Promise.all([
                fetch('/api/admin/stats'),
                fetch('/api/admin/users')
            ]);

            const statsData = await statsRes.json();
            const usersData = await usersRes.json();

            if (statsData.totalUsers !== undefined) setStats(statsData);
            if (usersData.users) setUsers(usersData.users);
        } catch (e) {
            console.error("Failed to fetch admin data", e);
        } finally {
            setLoading(false);
        }
    }

    async function refreshData() {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    async function updateUserPlan(userId: string, newPlan: string) {
        try {
            const res = await fetch(`/api/admin/users/${userId}/plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: newPlan })
            });

            if (res.ok) {
                setUsers(users.map(u =>
                    u.id === userId ? { ...u, subscription_plan: newPlan } : u
                ));
                setEditingPlan(null);
            }
        } catch (e) {
            console.error("Failed to update user plan", e);
        }
    }

    const filteredUsers = users
        .filter(u => u.email?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const aVal = a[sortField as keyof AdminUser] || '';
            const bVal = b[sortField as keyof AdminUser] || '';
            if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
            return aVal < bVal ? 1 : -1;
        });

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('desc');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-zinc-400 mt-1">Manage users, view analytics, and control your platform.</p>
                </div>
                <button
                    onClick={refreshData}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={<Users className="text-blue-400" />}
                    subtitle="Registered accounts"
                />
                <StatCard
                    title="Total Leads"
                    value={stats?.totalLeads || 0}
                    icon={<BarChart3 className="text-emerald-400" />}
                    subtitle="Processed leads"
                />
                <StatCard
                    title="Active Integrations"
                    value={stats?.activeSubs || 0}
                    icon={<Activity className="text-purple-400" />}
                    subtitle="Connected services"
                />
                <StatCard
                    title="System Status"
                    value={stats?.systemHealth || 'Online'}
                    icon={<ShieldAlert className="text-green-400" />}
                    subtitle="All systems operational"
                />
            </div>

            {/* Users Table */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30">
                {/* Table Header */}
                <div className="p-4 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">User Management</h2>
                        <p className="text-sm text-zinc-500">{filteredUsers.length} users total</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-black border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 outline-none w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-zinc-900/50 text-zinc-400 text-sm">
                                <th className="text-left p-4 font-medium">
                                    <button onClick={() => handleSort('email')} className="flex items-center gap-1 hover:text-white">
                                        User
                                        {sortField === 'email' && (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                    </button>
                                </th>
                                <th className="text-left p-4 font-medium">Plan</th>
                                <th className="text-left p-4 font-medium">Usage</th>
                                <th className="text-left p-4 font-medium">
                                    <button onClick={() => handleSort('created_at')} className="flex items-center gap-1 hover:text-white">
                                        Joined
                                        {sortField === 'created_at' && (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                    </button>
                                </th>
                                <th className="text-right p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
                                                    {user.email?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{user.email}</p>
                                                    <p className="text-xs text-zinc-500 font-mono">{user.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {editingPlan === user.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        defaultValue={user.subscription_plan}
                                                        onChange={(e) => updateUserPlan(user.id, e.target.value)}
                                                        className="bg-black border border-zinc-700 rounded px-2 py-1 text-sm text-white"
                                                    >
                                                        <option value="starter">Starter</option>
                                                        <option value="professional">Professional</option>
                                                        <option value="enterprise">Enterprise</option>
                                                    </select>
                                                    <button onClick={() => setEditingPlan(null)} className="text-zinc-500 hover:text-white">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setEditingPlan(user.id)}
                                                    className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1 hover:opacity-80 ${user.subscription_plan === 'enterprise' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                            user.subscription_plan === 'professional' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                                                'bg-zinc-800 text-zinc-400 border-zinc-700'
                                                        }`}
                                                >
                                                    {user.subscription_plan === 'enterprise' && <Crown size={12} />}
                                                    {(user.subscription_plan || 'starter').toUpperCase()}
                                                    <Edit size={10} className="ml-1 opacity-50" />
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm">
                                                <span className="text-white">{user.leads_used || 0}</span>
                                                <span className="text-zinc-500"> / {user.monthly_lead_limit || 100}</span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                                                    style={{ width: `${Math.min(((user.leads_used || 0) / (user.monthly_lead_limit || 100)) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-zinc-400">
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/admin/users/${user.id}`)}
                                                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, subtitle }: { title: string; value: string | number; icon: React.ReactNode; subtitle?: string }) {
    return (
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-zinc-800">{icon}</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            <p className="text-sm text-zinc-500">{title}</p>
            {subtitle && <p className="text-xs text-zinc-600 mt-1">{subtitle}</p>}
        </div>
    );
}
