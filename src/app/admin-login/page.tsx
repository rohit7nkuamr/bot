'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Client-side Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Send magic link
            const { error: authError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/admin`,
                },
            });

            if (authError) throw authError;

            setSent(true);
        } catch (err: any) {
            setError(err?.message || 'Failed to send login link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <CheckCircle className="text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Check Your Inbox</h1>
                    <p className="text-zinc-400 mb-6">
                        We sent a login link to <span className="text-white font-medium">{email}</span>.
                        Click the link in the email to access the Admin Panel.
                    </p>
                    <p className="text-xs text-zinc-600">
                        Didn't receive it? Check spam or <button onClick={() => setSent(false)} className="text-cyan-400 hover:underline">try again</button>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Admin Access
                    </h1>
                    <p className="text-zinc-500 mt-2">Enter your admin email to receive a login link</p>
                </div>

                {/* Form Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Admin Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-zinc-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@yourcompany.com"
                                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                                    required
                                />
                            </div>
                            <p className="text-xs text-zinc-600 mt-2">
                                Only emails in the authorized admin list can access this panel.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Send Login Link <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-500">
                        <Link href="/" className="text-zinc-400 hover:text-white">
                            ← Back to Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
