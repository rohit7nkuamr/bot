'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Clock, TrendingUp, Shield, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Talk to Real Buyers Only',
      description: 'No more "just checking price" calls. Our AI filters out tire-kickers and sends you only serious buyers ready to purchase.',
      benefit: 'Save 2+ hours daily',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'Smart AI That Learns',
      description: 'The more you use it, the smarter it gets. Our AI learns your business and identifies your ideal customers automatically.',
      benefit: '90% accuracy rate',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Works While You Sleep',
      description: 'Leads come at 2 AM? No problem. Our WhatsApp bot qualifies them instantly, 24/7, so you wake up to hot leads.',
      benefit: '24/7 automation',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: TrendingUp,
      title: 'Close More Deals',
      description: 'Focus your energy on qualified leads. Our customers report 3x more conversions because they talk to the right people.',
      benefit: '3x more sales',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: 'Your Data is Safe',
      description: 'Bank-level security. Your leads and conversations are encrypted and stored securely. We never share your data.',
      benefit: '100% secure',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Works on WhatsApp',
      description: 'No app to download. Works directly on WhatsApp - the platform your customers already use every day.',
      benefit: 'Zero learning curve',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/20 via-slate-900 to-slate-900">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header - Human & Conversational */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-sm text-emerald-300 font-medium">Why Customers Love Us</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Everything You Need to</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Stop Wasting Time
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We built this because we felt your pain. Here's how we help you focus on what matters - closing deals.
          </p>
        </motion.div>

        {/* Features Grid - Card-based with clear hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description - Conversational */}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Benefit Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-300 font-medium">{feature.benefit}</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-xl">
            <p className="text-lg text-gray-300">
              <span className="text-emerald-400 font-semibold">100+ businesses</span> are already saving time with LeadFilter
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
            >
              Join Them Today - Start Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
