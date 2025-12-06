'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap, Shield, Sparkles } from 'lucide-react';

interface HeroProps {
  setCurrentPage?: () => void;
}

export default function Hero({ setCurrentPage }: HeroProps = {}) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-background">
      {/* Background Aurora */}
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-small-white opacity-[0.2]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-medium text-zinc-300 tracking-wide">AI-POWERED LEAD QUALIFICATION</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white max-w-4xl"
        >
          Qualify Leads at <br />
          <span className="text-gradient">Human Speed.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
        >
          Stop wasting hours on junk leads. Let our AI agent handle WhatsApp qualification while you focus on closing the serious buyers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Link href="/signup" className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs" className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
            <Terminal className="w-4 h-4" /> View Documentation
          </Link>
        </motion.div>

        {/* IDE Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl rounded-xl overflow-hidden glass shadow-2xl border border-white/10 relative group"
        >
          {/* Window Controls */}
          <div className="h-10 bg-zinc-950/50 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="ml-4 text-xs text-zinc-500 font-mono">lead_filter_agent.ts</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] h-[400px] bg-black/80">
            {/* Code / Logic Side */}
            <div className="p-6 font-mono text-sm border-r border-white/5 text-left hidden md:block">
              <div className="text-zinc-500 mb-2">{'// AI Logic: Lead Qualification Flow'}</div>
              <div className="space-y-1">
                <div className="flex"><span className="text-purple-400">const</span> <span className="text-blue-400 pl-2">qualifyLead</span> <span className="text-zinc-600">=</span> <span className="text-purple-400">async</span> (msg) <span className="text-zinc-600">{'=>'}</span> {'{'}</div>
                <div className="pl-4 flex"><span className="text-purple-400">const</span> <span className="text-orange-300 pl-2">intent</span> <span className="text-zinc-600">=</span> <span className="text-blue-400">analyze</span>(msg.text);</div>
                <div className="pl-4 flex"><span className="text-purple-400">if</span> (intent.score {'>'} <span className="text-green-400">0.9</span>) {'{'}</div>
                <div className="pl-8 flex"><span className="text-zinc-500">{'// Hot lead detected'}</span></div>
                <div className="pl-8 flex"><span className="text-yellow-400">notifySalesTeam</span>(intent);</div>
                <div className="pl-4 flex">{'}'} <span className="text-purple-400">else</span> {'{'}</div>
                <div className="pl-8 flex"><span className="text-blue-400">askFollowUp</span>(intent.missingInfo);</div>
                <div className="pl-4 flex">{'}'}</div>
                <div className="flex">{'}'}</div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-zinc-900/50 border border-white/5">
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <Zap className="w-3 h-3 text-yellow-500" /> AI Confidence Score
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[92%]" />
                </div>
              </div>
            </div>

            {/* Chat Preview Side */}
            <div className="p-6 bg-zinc-900/30 flex flex-col">
              <div className="flex-1 space-y-4">
                {/* User Msg */}
                <div className="flex items-start gap-3 justify-end opacity-60">
                  <div className="bg-zinc-800 px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-zinc-300 max-w-[80%]">
                    Hi, I'm interested in the industrial water pumps. Do you have the X500?
                  </div>
                </div>

                {/* AI Msg */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="bg-cyan-950/30 border border-cyan-900/30 px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-cyan-100 max-w-[90%]">
                    Yes, we have the Model-X500 in stock (5 units). It's rated for 5000L/hr. Would you like a quote?
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-mono tracking-wider uppercase">
                    Lead Qualified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div className="absolute top-full left-0 right-0 h-40 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl -z-10 opacity-30" />
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-10 hidden lg:block opacity-20 animate-float">
          <Terminal className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-1/4 right-10 hidden lg:block opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <Shield className="w-20 h-20 text-white" />
        </div>
      </div>
    </section>
  );
}
