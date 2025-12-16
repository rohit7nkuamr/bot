'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Clock, TrendingUp, Shield, Smartphone, Zap, Users, BarChart3, Bot } from 'lucide-react';

export default function Features() {
  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="relative z-10 w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Built for <span className="text-cyan-400">IndiaMART Sellers</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Thousands of Indian businesses are using AI to close more deals. Here's what you get.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '2x', label: 'Faster Response', icon: TrendingUp, color: 'text-green-400' },
            { value: '3x', label: 'Better Lead Quality', icon: BarChart3, color: 'text-cyan-400' },
            { value: '24/7', label: 'Always Active', icon: Clock, color: 'text-purple-400' },
            { value: '60%', label: 'Cost Savings', icon: Users, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[500px]">

          {/* Large Card - AI Core */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 flex flex-col justify-between group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">AI "Riya" - Your Sales Agent</h3>
              <p className="text-zinc-400 max-w-md mb-4">
                Our AI asks the right qualifying questions: budget, timeline, quantity. It scores leads as Hot/Warm/Cold and only alerts you for serious buyers.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-400" /> Responds in under 2 seconds</li>
                <li className="flex items-center gap-2"><Brain className="w-4 h-4 text-cyan-400" /> Remembers conversation context</li>
                <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-cyan-400" /> Natural Hindi/English replies</li>
              </ul>
            </div>
            {/* Visual Abstract */}
            <div className="mt-6 flex-1 w-full bg-black/40 rounded-xl border border-white/5 p-4 flex items-end gap-2 overflow-hidden">
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
              Works with WhatsApp Business API. Your customers chat naturally - no new apps needed.
            </p>
          </motion.div>

          {/* Medium Card - IndiaMART */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">IndiaMART Ready</h3>
            <p className="text-sm text-zinc-500">
              Pull/Push API integration. Auto-fetch leads and respond instantly via WhatsApp.
            </p>
          </motion.div>

        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-zinc-900/30 border border-white/5 p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <Clock className="w-8 h-8 text-zinc-600" />
            <div>
              <h4 className="text-white font-semibold">Never Miss a Lead</h4>
              <p className="text-sm text-zinc-500">Reply to every inquiry instantly, even at 3 AM.</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl bg-zinc-900/30 border border-white/5 p-6 flex items-center gap-4 hover:border-white/10 transition-colors">
            <Shield className="w-8 h-8 text-zinc-600" />
            <div>
              <h4 className="text-white font-semibold">Focus on Closings</h4>
              <p className="text-sm text-zinc-500">AI handles the filtering, you handle the sales.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

