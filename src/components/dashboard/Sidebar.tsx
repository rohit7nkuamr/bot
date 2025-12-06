'use client';

import Link from 'next/link';
import { Home, Users, BarChart2, Settings, LogOut, MessageSquare, X } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Leads', href: '/leads' },
    { icon: MessageSquare, label: 'Conversations', href: '/conversations' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 h-full w-64 bg-[#020617] border-r border-white/5 z-50 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                LeadFilter
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            // Mock active state for demo
                            const isActive = index === 0;

                            return (
                                <Link
                                    key={item.label}
                                    href="#"
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-white'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                    {item.label === 'Leads' && (
                                        <span className="ml-auto bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-indigo-500/20">
                                            New
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-white/5">
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium text-sm">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
