'use client';

import SignupPage from '@/components/Auth/SignupPage';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] translate-x-1/2"></div>
            </div>

            <SignupPage
                onSuccess={() => router.push('/')}
                onSwitchToLogin={() => router.push('/login')}
            />
        </div>
    );
}
