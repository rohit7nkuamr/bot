'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function ProfilePage() {
    const router = useRouter();
    const { user, logout, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setLoggingOut(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 overflow-y-auto lg:ml-64 transition-all duration-300">
                <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
                        <p className="text-zinc-400">Manage your account settings</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white">
                                {user.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{user.email}</h2>
                                <p className="text-zinc-400 mt-1 flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${user.subscription_plan === 'enterprise' ? 'bg-indigo-500/20 text-indigo-400' :
                                            user.subscription_plan === 'professional' ? 'bg-cyan-500/20 text-cyan-400' :
                                                'bg-zinc-800 text-zinc-400'
                                        }`}>
                                        {user.subscription_plan || 'Starter'} Plan
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-black/30 border border-zinc-800 rounded-xl p-4">
                                <p className="text-zinc-500 text-sm">Leads Used</p>
                                <p className="text-2xl font-bold text-white">{user.leads_used || 0}</p>
                            </div>
                            <div className="bg-black/30 border border-zinc-800 rounded-xl p-4">
                                <p className="text-zinc-500 text-sm">Monthly Limit</p>
                                <p className="text-2xl font-bold text-white">{user.monthly_lead_limit || 100}</p>
                            </div>
                            <div className="bg-black/30 border border-zinc-800 rounded-xl p-4">
                                <p className="text-zinc-500 text-sm">Member Since</p>
                                <p className="text-2xl font-bold text-white">
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <button
                                onClick={() => router.push('/settings')}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-zinc-800 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Settings className="text-zinc-400" size={20} />
                                    <span className="text-white">Account Settings</span>
                                </div>
                                <ChevronDown className="text-zinc-500 rotate-[-90deg]" size={20} />
                            </button>

                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="text-red-400" size={20} />
                                    <span className="text-red-400">{loggingOut ? 'Logging out...' : 'Sign Out'}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
