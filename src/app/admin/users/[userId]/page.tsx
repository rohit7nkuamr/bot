'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, User, Mail, Calendar, Crown, Activity, Edit, Save, X,
    AlertTriangle, Check, Loader2
} from 'lucide-react';

interface UserDetail {
    id: string;
    email: string;
    subscription_plan: string;
    monthly_lead_limit: number;
    leads_used: number;
    created_at: string;
    updated_at: string;
}

export default function UserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.userId as string;

    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        subscription_plan: '',
        monthly_lead_limit: 0,
    });

    useEffect(() => {
        fetchUser();
    }, [userId]);

    async function fetchUser() {
        try {
            const res = await fetch(`/api/admin/users/${userId}`);
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
                setFormData({
                    subscription_plan: data.user.subscription_plan || 'starter',
                    monthly_lead_limit: data.user.monthly_lead_limit || 100,
                });
            }
        } catch (e) {
            console.error('Failed to fetch user', e);
        } finally {
            setLoading(false);
        }
    }

    async function saveChanges() {
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/users/${userId}/plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: formData.subscription_plan })
            });

            if (res.ok) {
                setUser(prev => prev ? { ...prev, ...formData } : null);
                setEditMode(false);
            }
        } catch (e) {
            console.error('Failed to save', e);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-16">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-zinc-400">User not found</p>
                <Link href="/admin" className="text-cyan-400 hover:underline mt-2 inline-block">
                    Back to Admin
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin"
                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">User Details</h1>
                    <p className="text-sm text-zinc-500 font-mono">{user.id}</p>
                </div>
                {!editMode ? (
                    <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <Edit size={16} />
                        Edit User
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setEditMode(false)}
                            className="flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={saveChanges}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-lg text-black font-medium hover:bg-cyan-400 transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* User Profile Card */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30">
                <div className="p-6 border-b border-zinc-800 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.email}</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${user.subscription_plan === 'enterprise' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                    user.subscription_plan === 'professional' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                        'bg-zinc-800 text-zinc-400 border-zinc-700'
                                }`}>
                                {user.subscription_plan === 'enterprise' && <Crown className="inline w-3 h-3 mr-1" />}
                                {(user.subscription_plan || 'starter').toUpperCase()} Plan
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Account Info</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                                <Mail className="text-zinc-500" size={18} />
                                <div>
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="text-white">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                                <Calendar className="text-zinc-500" size={18} />
                                <div>
                                    <p className="text-xs text-zinc-500">Joined</p>
                                    <p className="text-white">
                                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', {
                                            day: 'numeric', month: 'long', year: 'numeric'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Subscription</h3>

                        {editMode ? (
                            <div className="space-y-3">
                                <div className="p-3 bg-black/30 rounded-lg">
                                    <label className="text-xs text-zinc-500 block mb-2">Plan</label>
                                    <select
                                        value={formData.subscription_plan}
                                        onChange={(e) => setFormData({ ...formData, subscription_plan: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                                    >
                                        <option value="starter">Starter (100 leads)</option>
                                        <option value="professional">Professional (1,000 leads)</option>
                                        <option value="enterprise">Enterprise (Unlimited)</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                                    <Crown className="text-zinc-500" size={18} />
                                    <div>
                                        <p className="text-xs text-zinc-500">Current Plan</p>
                                        <p className="text-white capitalize">{user.subscription_plan || 'Starter'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                                    <Activity className="text-zinc-500" size={18} />
                                    <div>
                                        <p className="text-xs text-zinc-500">Usage</p>
                                        <p className="text-white">{user.leads_used || 0} / {user.monthly_lead_limit || 100} leads</p>
                                        <div className="w-32 h-1.5 bg-zinc-800 rounded-full mt-2">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                                                style={{ width: `${Math.min(((user.leads_used || 0) / (user.monthly_lead_limit || 100)) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
