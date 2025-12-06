'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Zap, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* DRAMATIC Animated Background with HUGE orbs */}
      <div className="absolute inset-0 -z-10">
        {/* Giant cyan orb - VERY VISIBLE */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full blur-[120px]"
        />
        
        {/* Giant blue orb */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-blue-500/40 to-indigo-600/40 rounded-full blur-[120px]"
        />
        
        {/* Purple accent orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
          animate={{
            y: [0, -1000],
            x: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%',
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Badge with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              AI-Powered Lead Qualification
            </span>
          </motion.div>
        </motion.div>

        {/* HUGE Heading with dramatic gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight text-center"
        >
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            Qualify Leads in
          </span>
          <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Real-Time with AI
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto text-center leading-relaxed"
        >
          Stop wasting <span className="text-cyan-400 font-bold">2+ hours daily</span> filtering junk leads. 
          Our AI-powered WhatsApp bot automatically qualifies every lead and sends you only the{' '}
          <span className="text-emerald-400 font-bold">genuine opportunities</span>.
        </motion.p>

        {/* DRAMATIC CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          {/* Primary CTA with MASSIVE glow */}
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('dashboard')}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.6)] hover:shadow-[0_0_80px_rgba(34,211,238,0.8)] transition-all duration-300"
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
              animate={{
                x: isHovered ? ['-100%', '100%'] : '-100%',
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 border-2 border-cyan-400/50 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-xl bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            See it in Action
          </motion.button>
        </motion.div>

        {/* BOLD Feature Cards with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { icon: Zap, title: 'Instant Analysis', desc: 'Qualify leads in milliseconds', color: 'from-yellow-400 to-orange-500' },
            { icon: Target, title: 'Smart Scoring', desc: 'AI-powered qualification', color: 'from-cyan-400 to-blue-500' },
            { icon: TrendingUp, title: 'Real-time Dashboard', desc: 'Track all metrics live', color: 'from-emerald-400 to-green-500' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -15,
                rotateX: 10,
                rotateY: 10,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative p-8 rounded-3xl border-2 border-cyan-400/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl hover:border-cyan-400/60 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
              
              {/* Icon with gradient */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className={`relative z-10 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-all`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="relative z-10 text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="relative z-10 text-gray-400 group-hover:text-gray-300 transition-colors text-lg">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '90%', label: 'Junk Filtered', color: 'from-red-400 to-orange-500' },
            { number: '2h+', label: 'Time Saved Daily', color: 'from-cyan-400 to-blue-500' },
            { number: '40%', label: 'More Conversions', color: 'from-emerald-400 to-green-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              className="relative p-6 rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
