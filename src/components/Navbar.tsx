'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">LeadFilter</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-indigo-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('dashboard')}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
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
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-gray-300 hover:bg-white/5'
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
