'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, isAuthenticated, onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-xl overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">LeadFilter</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-300'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('dashboard')}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-300 hover:bg-cyan-500/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
