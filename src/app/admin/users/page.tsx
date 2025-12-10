'use client';

import { useState, useEffect } from 'react';
import { Search, MoreVertical, Shield } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('/api/admin/users');
                const data = await res.json();
                if (data.users) setUsers(data.users);
            } catch (e) {
                console.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.id.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-zinc-400">View and manage all registered users.</p>
                </div>
                <button className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
                    Invite User
                </button>
            </div>

            {/* Control Bar */}
            <div className="flex gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by email or ID..."
                        className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-indigo-500 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-900 text-zinc-400 text-sm font-medium">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Last Active</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-black">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Loading users...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No users found.</td></tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-zinc-900/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{user.email}</div>
                                                <div className="text-xs text-zinc-500 font-mono">{user.id.slice(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${user.plan === 'enterprise' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                user.plan === 'pro' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                                    'bg-zinc-800 text-zinc-400 border-zinc-700'
                                            }`}>
                                            {user.plan.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-zinc-400">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-sm text-zinc-400">
                                        {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
