'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Book, Code, Terminal, Zap } from 'lucide-react';

export default function DocsPage() {
    const docs = [
        {
            category: 'Getting Started',
            items: ['Introduction', 'Installation', 'Quick Start', 'Architecture']
        },
        {
            category: 'Core Concepts',
            items: ['Lead Scoring', 'AI Customization', 'WhatsApp API', 'Webhooks']
        },
        {
            category: 'API Reference',
            items: ['Authentication', 'Leads', 'Campaigns', 'Analytics']
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar
                currentPage="docs"
                setCurrentPage={() => { }}
                isAuthenticated={false}
                onAuthClick={() => { }}
            />

            <div className="pt-24 max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
                    <div className="sticky top-24 space-y-8">
                        {docs.map((section, i) => (
                            <div key={i}>
                                <h3 className="font-semibold text-white mb-3 text-sm tracking-wider uppercase">{section.category}</h3>
                                <ul className="space-y-2 border-l border-white/10 ml-1">
                                    {section.items.map((item, j) => (
                                        <li key={j}>
                                            <a href="#" className="block pl-4 text-zinc-400 hover:text-cyan-400 text-sm transition-colors border-l border-transparent hover:border-cyan-400 -ml-[1px]">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-2 text-cyan-400 mb-4">
                            <Book size={20} />
                            <span className="text-sm font-medium">Documentation</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Introduction to LeadFilter</h1>
                        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                            LeadFilter is an intelligent AI agent that sits between your lead sources (WhatsApp, Indiamart, Facebook) and your CRM. It autonomously chats with leads to qualify their intent before handoff.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-cyan-500/30 transition-colors">
                                <Terminal className="text-cyan-400 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Easy Integration</h3>
                                <p className="text-zinc-500 text-sm">Connect your WhatsApp Business API in seconds via our dashboard.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-indigo-500/30 transition-colors">
                                <Zap className="text-indigo-400 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Real-time AI</h3>
                                <p className="text-zinc-500 text-sm">Response times under 2 seconds for a human-like chat experience.</p>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-zinc max-w-none">
                            <h2>Installation</h2>
                            <p className="text-zinc-400">To get started with the LeadFilter SDK, install the package via npm:</p>
                            <div className="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
                                npm install @leadfilter/sdk
                            </div>

                            <h2>Next Steps</h2>
                            <p className="text-zinc-400">
                                Check out the <a href="#" className="text-cyan-400 hover:underline">Quick Start Guide</a> to create your first agent.
                            </p>
                        </div>
                    </motion.div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
