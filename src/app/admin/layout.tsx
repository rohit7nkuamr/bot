import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar'; // Reusing dashboard Sidebar for now, or create AdminSidebar

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/admin-login');
    }

    // Security Check: simple email whitelist
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    if (!adminEmails.includes(user.email)) {
        redirect('/dashboard'); // Kick non-admins back to dashboard
    }

    return (
        <div className="flex min-h-screen bg-black">
            {/* 
        Ideally, create a dedicated AdminSidebar with specific admin links. 
        For MVP, we can perform a quick inline check or just render the children if we want a separate layout entirely.
        Let's assume we want a distinct look.
      */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="/admin" className="block px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg">Overview</a>
                    <a href="/admin/users" className="block px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg">Users</a>
                    <a href="/dashboard" className="block px-4 py-2 text-zinc-500 hover:text-zinc-300 mt-8 text-sm">← Back to App</a>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
