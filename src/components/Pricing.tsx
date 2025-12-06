'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '₹2,499',
      period: '/mo',
      description: 'For individuals and solopreneurs.',
      features: ['Up to 500 leads/mo', 'Basic AI Qualification', 'Indiamart Integration', 'WhatsApp Automation', 'Email Support'],
      highlighted: false,
    },
    {
      name: 'Business',
      price: '₹9,999',
      period: '/mo',
      description: 'For growing Indian businesses.',
      features: ['Unlimited leads', 'Advanced Intent Analysis', 'CRM Integration (Zoho, HubSpot)', 'Priority Phone Support', 'GST Invoicing'],
      highlighted: true,
      badge: 'Best Value'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations.',
      features: ['Dedicated Instance', 'Custom AI Model Training', 'WhatsApp Green Tick Assist', 'Dedicated Account Manager', 'SLA Guarantee'],
      highlighted: false,
    },
  ];

  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-zinc-500 text-lg">
            Built for Indian Businesses. Start for free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${plan.highlighted
                ? 'bg-zinc-900/80 border-cyan-500/50 shadow-2xl shadow-cyan-500/10'
                : 'bg-zinc-950/50 border-white/10 hover:border-white/20'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-cyan-500/20">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-medium text-zinc-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-zinc-500">{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mt-4">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 ${plan.highlighted ? 'text-cyan-400' : 'text-zinc-600'}`} />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.price === 'Custom' ? '/contact' : '/signup?plan=' + plan.name.toLowerCase()}
                className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${plan.highlighted
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start 14-Day Free Trial'}
                {plan.price !== 'Custom' && <ArrowRight className="w-4 h-4" />}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table Link */}
        <div className="mt-16 text-center">
          <button className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto group">
            Compare all features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
