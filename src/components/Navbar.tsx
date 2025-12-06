'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Product', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${scrolled || isOpen
          ? 'glass rounded-2xl shadow-2xl shadow-cyan-500/5'
          : 'bg-transparent'
          }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            className="flex items-center gap-2 cursor-pointer"
            href="/"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">LeadFilter</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all"
              >
                Dashboard
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl rounded-b-2xl"
            >
              <div className="p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <Link href="/dashboard" className="w-full py-2 bg-cyan-500 text-black font-semibold rounded-lg text-center" onClick={() => setIsOpen(false)}>
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" className="w-full py-2 text-zinc-400 hover:text-white text-center" onClick={() => setIsOpen(false)}>
                        Log in
                      </Link>
                      <Link href="/signup" className="w-full py-2 bg-cyan-500 text-black font-semibold rounded-lg text-center" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
