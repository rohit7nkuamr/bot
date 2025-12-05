'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, TrendingUp, Users, Zap, ArrowRight, Menu, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* Background blur elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Features />
            <Pricing setCurrentPage={setCurrentPage} />
          </>
        )}
        
        {currentPage === 'dashboard' && <Dashboard />}
        
        <Footer />
      </div>
    </div>
  );
}
