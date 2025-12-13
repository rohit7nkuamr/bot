'use client';

import LoginPage from '@/components/Auth/LoginPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
                <LoginPage
                    onSuccess={() => router.push('/dashboard')}
                    onSwitchToSignup={() => router.push('/signup')}
                />
            </main>
            <Footer />
        </div>
    );
}
