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
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 -z-10" />
      
      <div className="w-full max-w-7xl mx-auto px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
            <span className="text-sm text-cyan-300">✨ Powerful Features</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              Everything You Need
            </span>
            <br />
            <span className="text-white">to Qualify Leads Automatically</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Powerful AI-driven tools designed to save you time, reduce costs, and increase conversion rates.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  borderColor: 'rgba(34, 211, 238, 0.6)',
                  boxShadow: '0 25px 50px rgba(34, 211, 238, 0.25)',
                  rotateX: 5,
                  rotateY: 5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(34, 211, 238, 0.1) 50%, transparent 100%)',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -10, 10, 0],
                      boxShadow: '0 10px 30px rgba(34, 211, 238, 0.4)'
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{feature.description}</p>
                </div>

                {/* Animated border glow on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-300"
                  whileHover={{
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
