'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Animated background orb */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">AI-Powered Lead Qualification</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
            Qualify Leads in
          </span>
          <br />
          <span className="text-white">Real-Time with AI</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Stop wasting 2+ hours daily filtering junk leads. Our AI-powered WhatsApp bot automatically qualifies every lead, extracts key information, and sends you only the genuine opportunities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-cyan-500/30 text-white rounded-lg font-semibold hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" /> See it in Action
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: '⚡', title: 'Instant Analysis', desc: 'Analyze leads in milliseconds' },
            { icon: '🎯', title: 'Smart Scoring', desc: 'AI-powered qualification scores' },
            { icon: '📊', title: 'Real-time Dashboard', desc: 'Track all metrics live' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.6)' }}
              className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm hover:bg-cyan-500/10 transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Animated Orb with Cards */}
        <motion.div
          variants={itemVariants}
          className="relative h-80 mt-12 flex items-center justify-center"
        >
          {/* Central glowing orb */}
          <motion.div
            animate={{ 
              rotate: 360,
              boxShadow: [
                '0 0 40px rgba(34, 211, 238, 0.4)',
                '0 0 60px rgba(34, 211, 238, 0.6)',
                '0 0 40px rgba(34, 211, 238, 0.4)',
              ]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute w-48 h-48 rounded-full border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
          />
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-56 h-56 rounded-full border border-cyan-400/20"
          />

          {/* Top Left Card */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-0 top-0 w-64 p-5 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-sm"
          >
            <div className="text-xs font-semibold text-cyan-400 mb-3">Lead Received</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-sm text-gray-300">Budget: ₹50,000</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-sm text-gray-300">Timeline: 2 weeks</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Card */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute right-0 bottom-0 w-64 p-5 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-sm"
          >
            <div className="text-xs font-semibold text-emerald-400 mb-3">✓ Qualified</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Quality Score</span>
                  <span className="text-emerald-400 font-semibold">92%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['0%', '92%'] }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center text */}
          <div className="text-center z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
            >
              AI
            </motion.div>
            <p className="text-xs text-gray-400 mt-2">Analyzing</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto"
        >
          {[
            { number: '90%', label: 'Junk Filtered' },
            { number: '2h+', label: 'Time Saved Daily' },
            { number: '40%', label: 'More Conversions' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
              <div className="text-2xl font-bold text-cyan-400">{stat.number}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
