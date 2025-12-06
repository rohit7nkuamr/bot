'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  setCurrentPage: (page: string) => void;
}

export default function Pricing({ setCurrentPage }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      price: '₹2,499',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Up to 100 leads/month',
        'AI-powered qualification',
        'WhatsApp integration',
        'Email support',
        'Basic analytics',
        '14-day free trial',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '₹9,999',
      period: '/month',
      description: 'For growing businesses',
      features: [
        'Up to 1,000 leads/month',
        'Advanced AI qualification',
        'WhatsApp + SMS',
        'Priority support',
        'Advanced analytics',
        'Custom workflows',
        'Team collaboration',
        '14-day free trial',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '₹24,999',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Unlimited leads',
        'Custom AI models',
        'Multi-channel integration',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-900/20 -z-10" />
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
            <span className="text-sm text-cyan-300">💰 Transparent Pricing</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              Simple, Flexible Plans
            </span>
            <br />
            <span className="text-white">for Every Business Size</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day free trial with full access.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, borderColor: 'rgba(34, 211, 238, 0.6)' }}
              className={`relative rounded-2xl p-8 transition-all border backdrop-blur-sm ${
                plan.highlighted
                  ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 ring-2 ring-cyan-500/20 md:scale-105'
                  : 'border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 hover:bg-cyan-500/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/30">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-8">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('dashboard')}
                className={`w-full py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg'
                    : 'border border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500/50'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </motion.button>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Have questions? <span className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors font-semibold">Contact our sales team</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
