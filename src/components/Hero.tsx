'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

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
    <section className="w-full min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">Powered by AI & WhatsApp</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Filter Junk Leads</span>
          <br />
          <span className="text-white">Automatically</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Stop wasting 2 hours daily on junk leads. Our AI-powered WhatsApp bot qualifies leads in real-time, so you only get genuine opportunities.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {[
            { number: '90%', label: 'Junk Filtered' },
            { number: '2h', label: 'Time Saved' },
            { number: '₹50k', label: 'Cost Cut' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-lg p-4">
              <div className="text-2xl font-bold gradient-text">{stat.number}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Floating Cards Animation */}
        <motion.div
          variants={itemVariants}
          className="relative h-96 mt-12"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-80 glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg"></div>
              <div>
                <div className="text-sm font-semibold text-white">Lead Received</div>
                <div className="text-xs text-gray-400">+91 98765 43210</div>
              </div>
            </div>
            <div className="text-xs text-gray-300">
              <span className="text-emerald-400">✓</span> Qualified & Forwarded
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute right-0 bottom-0 w-80 glass rounded-2xl p-6 border border-white/10"
          >
            <div className="text-sm text-gray-300 mb-3">
              <span className="text-indigo-400">⚡</span> AI Analysis
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Budget Match</span>
                <span className="text-emerald-400">95%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-11/12 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
