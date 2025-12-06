'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Clock, TrendingUp, Shield, Smartphone, Zap } from 'lucide-react';

export default function Features() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Intelligence built for <span className="text-cyan-400">Scale</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Everything you need to automate your lead qualification workflow.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">

          {/* Large Card - AI Core */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 flex flex-col justify-between group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Neural Lead Scoring</h3>
              <p className="text-zinc-400 max-w-md">
                Our proprietary model analyzes conversation sentiment, intent, and budget in real-time. It doesn't just read keywords; it understands context.
              </p>
            </div>
            {/* Visual Abstract */}
            <div className="mt-8 flex-1 w-full bg-black/40 rounded-xl border border-white/5 p-4 flex items-end gap-2 overflow-hidden">
              {[40, 70, 45, 90, 60, 85, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full bg-cyan-900/40 rounded-t-sm relative overflow-hidden group-hover:bg-cyan-500/20 transition-colors"
                >
                  <div className="absolute bottom-0 w-full bg-cyan-500 h-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Medium Card - WhatsApp */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-4">
              <Smartphone className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Native</h3>
            <p className="text-sm text-zinc-500">
              Direct integration with WhatsApp Business API. No apps to install.
            </p>
          </motion.div>

          {/* Medium Card - Security */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
            <p className="text-sm text-zinc-500">
              End-to-end encryption and SOC2 compliant data handling.
            </p>
          </motion.div>

        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-zinc-900/30 border border-white/5 p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <Clock className="w-8 h-8 text-zinc-600" />
            <div>
              <h4 className="text-white font-semibold">24/7 Availability</h4>
              <p className="text-sm text-zinc-500">Never miss a lead, even at 3 AM.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-zinc-900/30 border border-white/5 p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <Zap className="w-8 h-8 text-zinc-600" />
            <div>
              <h4 className="text-white font-semibold">Instant Response</h4>
              <p className="text-sm text-zinc-500">Under 2 second response time on average.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
