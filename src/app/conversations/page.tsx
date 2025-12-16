'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Menu, Bot, User, Clock, Search } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function ConversationsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { leads, loading, lastUpdated } = useDashboardData();

    // Mock conversations based on leads
    const conversations = leads.map(lead => ({
        id: lead.id,
        name: lead.name || 'Unknown',
        phone: lead.phone,
        lastMessage: lead.status === 'qualified'
            ? 'Yes, I am interested in your products. What is the price?'
            : lead.status === 'pending'
                ? 'Can you tell me more about the specifications?'
                : 'I will think about it and get back to you.',
        timestamp: lead.created_at,
        unread: lead.status === 'pending' ? 2 : 0,
        status: lead.status,
    }));

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone?.includes(searchQuery)
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 overflow-y-auto lg:ml-64 transition-all duration-300">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
                            >
                                <Menu size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                    <MessageSquare className="w-7 h-7 text-cyan-400" />
                                    Conversations
                                </h1>
                                <p className="text-zinc-500 mt-1">
                                    {filteredConversations.length} active conversations with AI Riya
                                    {lastUpdated && (
                                        <span className="ml-2 text-xs">
                                            • Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="relative flex-1 md:w-64 md:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                    </header>

                    {/* Conversations List */}
                    {filteredConversations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
                                <MessageSquare className="w-8 h-8 text-zinc-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No conversations yet</h3>
                            <p className="text-zinc-500">AI Riya will start chatting with leads once they&apos;re connected</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-2">
                            {filteredConversations.map((conv, index) => (
                                <motion.div
                                    key={conv.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {conv.name[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                                                <span className="text-xs text-zinc-500 flex-shrink-0">
                                                    {conv.timestamp ? new Date(conv.timestamp).toLocaleDateString() : ''}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Bot className="w-3 h-3 text-cyan-400" />
                                                </div>
                                                <p className="text-sm text-zinc-400 truncate">{conv.lastMessage}</p>
                                            </div>
                                        </div>
                                        {conv.unread > 0 && (
                                            <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
