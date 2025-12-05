'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, BarChart3, MessageSquare, Shield, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Qualification',
      description: 'GPT-4o-mini analyzes leads in real-time to identify genuine opportunities.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Integration',
      description: 'Direct Meta Cloud API integration for instant lead qualification via WhatsApp.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Qualify leads in seconds, not hours. Respond instantly to genuine inquiries.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track conversion rates, lead quality, and ROI in a beautiful dashboard.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Supabase PostgreSQL with enterprise-grade encryption and compliance.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Manage your leads from anywhere with a fully responsive interface.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-white">Built for Your Success</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to automate lead qualification and focus on closing deals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
