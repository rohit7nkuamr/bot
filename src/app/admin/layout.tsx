'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldAlert, LayoutDashboard, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Admin email whitelist - should match .env.local ADMIN_EMAILS
const ADMIN_EMAILS = [
    'rohit7ngod@gmail.com',
    'junedisindha299@gmail.com',
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, isAuthenticated, loading } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        if (loading) return;

        if (!isAuthenticated || !user) {
            router.push('/admin-login');
            return;
        }

        // Check if user is admin
        const userIsAdmin = ADMIN_EMAILS.includes(user.email);
        setIsAdmin(userIsAdmin);

        if (!userIsAdmin) {
            router.push('/dashboard');
        }
    }, [loading, isAuthenticated, user, router]);

    // Show loading state
    if (loading || isAdmin === null) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
                    <p className="text-zinc-500">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    // Not admin - will redirect
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-zinc-400">Access denied. Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-orange-500" />
                        Admin Panel
                    </h1>
                    <p className="text-xs text-zinc-600 mt-1">{user?.email}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <LayoutDashboard size={18} />
                        Overview
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Users size={18} />
                        Users
                    </Link>
                    <div className="pt-8">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to App
                        </Link>
                    </div>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
