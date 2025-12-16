'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu,
  Bell
} from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import StatsGrid from './dashboard/StatsGrid';
import MetricCharts from './dashboard/MetricCharts';
import LeadsTable from './dashboard/LeadsTable';
import UsageMeter from './dashboard/UsageMeter';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { stats, leads, loading, error, userPlan } = useDashboardData();

  // Derived Stats for StatsGrid - with null safety
  const dashboardStats = [
    { label: 'Total Leads', value: String(stats?.totalLeads ?? 0), change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Qualified', value: String(stats?.qualified ?? 0), change: '+23%', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
    { label: 'Conversion Rate', value: stats?.conversionRate ?? '0%', change: '+5%', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
    { label: 'Response Time', value: stats?.responseTime ?? '-', change: '-10%', icon: Clock, color: 'from-orange-500 to-red-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex text-white font-sans overflow-hidden">

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 relative lg:ml-64`}>
        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md px-2 py-4 -mx-2 md:static md:bg-transparent md:p-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                  Dashboard
                </h1>
                <p className="text-zinc-500 mt-1 flex items-center gap-2 text-xs md:text-sm">
                  AI Riya is qualifying leads 24/7
                  <span className={`px-2 py-0.5 rounded text-[10px] md:text-xs font-medium uppercase tracking-wider ${userPlan === 'enterprise' ? 'bg-indigo-500/20 text-indigo-400' :
                    userPlan === 'professional' ? 'bg-cyan-500/20 text-cyan-400' :
                      userPlan === 'starter' ? 'bg-zinc-800 text-zinc-400' :
                        'bg-green-500/20 text-green-400'
                    }`}>
                    {userPlan} Plan
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5 flex-1 md:flex-none justify-center">
                {['day', 'week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex-1 md:flex-none text-center ${timeRange === range
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-white'
                      }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
              <button className="p-2 text-zinc-400 hover:text-white relative bg-white/5 rounded-lg md:bg-transparent">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <StatsGrid stats={dashboardStats} />

          {/* Business Logic Enforcement: Plan-gated Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className={`lg:col-span-2 relative ${userPlan === 'starter' ? 'opacity-80' : ''}`}>
              {userPlan === 'starter' && (
                <div className="absolute inset-0 z-10 backdrop-blur-[2px] flex items-center justify-center rounded-3xl border border-white/5 bg-zinc-950/20">
                  <div className="text-center p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl mx-4">
                    <Lock className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">Advanced Analytics Locked</h3>
                    <p className="text-zinc-500 text-sm mb-4">Upgrade to Professional Plan to see detailed breakdown.</p>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              )}
              <MetricCharts stats={stats} leads={leads} />
            </div>

            {/* Usage Meter */}
            <div className="space-y-6">
              <UsageMeter />

              {/* Integrations */}
              <div className="glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-6">Integrations</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">WhatsApp API</p>
                        <p className="text-xs text-zinc-500">Not Connected</p>
                      </div>
                    </div>
                    <Link href="/settings" className="text-xs text-cyan-400 hover:text-cyan-300">Connect</Link>
                  </div>

                  <div className={`flex items-center justify-between p-4 rounded-xl border border-white/5 ${userPlan === 'starter' ? 'bg-zinc-900/50 opacity-60' : 'bg-white/5'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Indiamart</p>
                        <p className="text-xs text-zinc-500">
                          {userPlan === 'starter' ? 'Professional Plan Only' : 'Not Connected'}
                        </p>
                      </div>
                    </div>
                    {userPlan === 'starter' ? (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    ) : (
                      <Link href="/settings" className="text-xs text-cyan-400 hover:text-cyan-300">Connect</Link>
                    )}
                  </div>

                  <div className={`flex items-center justify-between p-4 rounded-xl border border-white/5 ${userPlan === 'starter' ? 'bg-zinc-900/50 opacity-60' : 'bg-white/5'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Zoho CRM</p>
                        <p className="text-xs text-zinc-500">
                          {userPlan === 'starter' ? 'Professional Plan Only' : 'Not Connected'}
                        </p>
                      </div>
                    </div>
                    {userPlan === 'starter' ? (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    ) : (
                      <Link href="/settings" className="text-xs text-cyan-400 hover:text-cyan-300">Connect</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <LeadsTable leads={leads} />

        </div>
      </main>
    </div>
  );
}
