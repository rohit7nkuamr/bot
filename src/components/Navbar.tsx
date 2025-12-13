'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, ArrowRight, User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navItems = [
    { label: 'Product', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email[0].toUpperCase();
  };

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

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                    {getUserInitials()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-zinc-800">
                        <p className="text-white font-medium truncate">{user.email}</p>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${user.subscription_plan === 'enterprise' ? 'bg-indigo-500/20 text-indigo-400' :
                              user.subscription_plan === 'professional' ? 'bg-cyan-500/20 text-cyan-400' :
                                'bg-zinc-800 text-zinc-400'
                            }`}>
                            {user.subscription_plan || 'Starter'}
                          </span>
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="p-2 border-t border-zinc-800">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2 w-full text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
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
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                          {getUserInitials()}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium truncate">{user.email}</p>
                          <p className="text-xs text-zinc-500">{user.subscription_plan || 'Starter'} Plan</p>
                        </div>
                      </div>
                      <Link href="/dashboard" className="w-full py-2 bg-cyan-500 text-black font-semibold rounded-lg text-center" onClick={() => setIsOpen(false)}>
                        Go to Dashboard
                      </Link>
                      <Link href="/profile" className="w-full py-2 text-zinc-400 hover:text-white text-center" onClick={() => setIsOpen(false)}>
                        My Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full py-2 text-red-400 hover:text-red-300 text-center">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="w-full py-2 text-zinc-400 hover:text-white text-center" onClick={() => setIsOpen(false)}>
                        Log in
                      </Link>
                      <Link href="/auth/signup" className="w-full py-2 bg-cyan-500 text-black font-semibold rounded-lg text-center" onClick={() => setIsOpen(false)}>
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
