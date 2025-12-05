'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, CheckCircle, AlertCircle, MoreVertical, Download, Filter } from 'lucide-react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    { label: 'Total Leads', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Qualified', value: '987', change: '+23%', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
    { label: 'Conversion Rate', value: '79.8%', change: '+5%', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
    { label: 'Response Time', value: '2.3s', change: '-15%', icon: MessageSquare, color: 'from-orange-500 to-red-500' },
  ];

  const recentLeads = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', status: 'qualified', budget: '₹50,000', time: '2 min ago' },
    { id: 2, name: 'Priya Singh', phone: '+91 87654 32109', status: 'qualified', budget: '₹1,00,000', time: '5 min ago' },
    { id: 3, name: 'Amit Patel', phone: '+91 76543 21098', status: 'pending', budget: '₹25,000', time: '12 min ago' },
    { id: 4, name: 'Neha Gupta', phone: '+91 65432 10987', status: 'qualified', budget: '₹75,000', time: '18 min ago' },
    { id: 5, name: 'Vikram Sharma', phone: '+91 54321 09876', status: 'rejected', budget: 'N/A', time: '25 min ago' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your lead performance.</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 glass rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Filter className="w-4 h-4" /> Filter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg text-sm font-medium text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export
            </motion.button>
          </div>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {['day', 'week', 'month', 'year'].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-400 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Lead Qualification Trend</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 78, 72, 85, 92, 88, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-indigo-500 to-emerald-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer group relative"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-400">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </motion.div>

          {/* Status Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Status Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Qualified', value: 79, color: 'from-emerald-500 to-teal-500' },
                { label: 'Pending', value: 15, color: 'from-orange-500 to-yellow-500' },
                { label: 'Rejected', value: 6, color: 'from-red-500 to-pink-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className="text-sm font-semibold text-white">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Recent Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Budget</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + lead.id * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-white font-medium">{lead.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{lead.phone}</td>
                    <td className="py-4 px-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'qualified'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : lead.status === 'pending'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-white font-medium">{lead.budget}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{lead.time}</td>
                    <td className="py-4 px-4 text-sm">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
