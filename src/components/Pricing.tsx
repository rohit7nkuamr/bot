'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap } from 'lucide-react';

interface PricingProps {
  setCurrentPage?: () => void;
}

export default function Pricing({ setCurrentPage }: PricingProps = {}) {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Get started with AI qualification.',
      features: ['50 leads/month', 'AI "Riya" qualification', 'Dashboard access', 'Email support', 'Manual lead entry'],
      highlighted: false,
    },
    {
      name: 'Growth',
      price: '₹999',
      period: '/mo',
      description: 'For growing IndiaMART sellers.',
      features: ['500 leads/month', '2,000 AI conversations', 'IndiaMART integration', 'WhatsApp automation', 'Lead scoring (Hot/Warm/Cold)', 'Priority email support'],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Professional',
      price: '₹2,499',
      period: '/mo',
      description: 'For serious sales teams.',
      features: ['2,000 leads/month', '10,000 AI conversations', 'All Growth features', 'Zoho CRM integration', 'HubSpot integration', 'Advanced analytics', 'Phone support'],
      highlighted: false,
    },
    {
      name: 'Business',
      price: '₹4,999',
      period: '/mo',
      description: 'For high-volume businesses.',
      features: ['Unlimited leads', 'Unlimited AI conversations', 'All Professional features', 'Custom AI training', 'API access', 'Dedicated account manager', 'SLA guarantee'],
      highlighted: false,
    },
  ];

  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-medium text-green-400">START FREE, UPGRADE ANYTIME</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Start for free. Upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ${plan.highlighted
                ? 'bg-zinc-900/80 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 scale-105'
                : 'bg-zinc-950/50 border-white/10 hover:border-white/20'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-cyan-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium text-zinc-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-zinc-500">{plan.period}</span>
                </div>
                <p className="text-sm text-zinc-500 mt-3">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-cyan-400' : 'text-zinc-600'}`} />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.price === 'Free' ? '/auth/signup' : '/auth/signup?plan=' + plan.name.toLowerCase()}
                className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${plan.highlighted
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
              >
                {plan.price === 'Free' ? 'Start Free' : 'Get Started'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Value Prop */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm">
            All plans include: <span className="text-zinc-300">24/7 AI availability</span> • <span className="text-zinc-300">No setup fees</span> • <span className="text-zinc-300">Cancel anytime</span> • <span className="text-zinc-300">GST invoice</span>
          </p>
        </div>

      </div>
    </section>
  );
}

