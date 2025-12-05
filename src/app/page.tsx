'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import LoginPage from '@/components/Auth/LoginPage';
import SignupPage from '@/components/Auth/SignupPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const { isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-screen min-h-screen overflow-x-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Show auth pages if not authenticated and auth mode is set
  if (!isAuthenticated && authMode) {
    return (
      <div className="relative w-screen min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/2"></div>
        </div>

        <div className="relative z-10 w-full">
          {authMode === 'login' ? (
            <LoginPage
              onSuccess={() => {
                setAuthMode(null);
                setCurrentPage('dashboard');
              }}
              onSwitchToSignup={() => setAuthMode('signup')}
            />
          ) : (
            <SignupPage
              onSuccess={() => {
                setAuthMode(null);
                setCurrentPage('dashboard');
              }}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
        </div>
      </div>
    );
  }

  // Show main app
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* Background blur elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isAuthenticated={isAuthenticated}
          onAuthClick={() => setAuthMode('login')}
        />
        
        {currentPage === 'home' && !isAuthenticated && (
          <>
            <Hero setCurrentPage={() => setAuthMode('signup')} />
            <Features />
            <Pricing setCurrentPage={() => setAuthMode('signup')} />
          </>
        )}
        
        {currentPage === 'dashboard' && isAuthenticated && <Dashboard />}
        
        {!isAuthenticated && currentPage !== 'home' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Please sign in to access this page</p>
              <button
                onClick={() => setAuthMode('login')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
}
