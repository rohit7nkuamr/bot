'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, User } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { signup, error: authError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            await signup(email, password);
            router.push('/dashboard');
        } catch (err: any) {
            const message = err?.message || 'Signup failed. Please try again.';
            // Handle duplicate email error with a friendly message
            if (message.toLowerCase().includes('duplicate') || message.toLowerCase().includes('already')) {
                setError('This email is already registered. Please login instead.');
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            LeadFilter
                        </h1>
                    </Link>
                    <p className="text-zinc-500 mt-2">Create your account</p>
                </div>

                {/* Form Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {(error || authError) && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error || authError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-zinc-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Create Account <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
