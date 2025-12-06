'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Heart, Zap, Crown } from 'lucide-react';

interface PricingProps {
  setCurrentPage: (page: string) => void;
}

export default function Pricing({ setCurrentPage }: PricingProps) {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '₹2,499',
      period: '/month',
      description: 'Perfect for small businesses just getting started',
      badge: 'Most Affordable',
      badgeColor: 'from-blue-500 to-cyan-500',
      features: [
        'Up to 100 leads/month',
        'AI-powered qualification',
        'WhatsApp integration',
        'Email support',
        'Basic analytics dashboard',
        '14-day free trial',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      icon: Heart,
      price: '₹9,999',
      period: '/month',
      description: 'For growing businesses who want to scale fast',
      badge: 'Most Loved ❤️',
      badgeColor: 'from-emerald-500 to-cyan-500',
      features: [
        'Up to 1,000 leads/month',
        'Advanced AI qualification',
        'WhatsApp + SMS integration',
        'Priority support (2hr response)',
        'Advanced analytics & reports',
        'Custom qualification rules',
        'Team collaboration tools',
        '14-day free trial',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: '₹24,999',
      period: '/month',
      description: 'For large teams who need everything',
      badge: 'Best Value',
      badgeColor: 'from-purple-500 to-pink-500',
      features: [
        'Unlimited leads',
        'Custom AI models trained for you',
        'Multi-channel integration',
        '24/7 dedicated support',
        'Custom integrations & API',
        'Advanced security & compliance',
        'Dedicated account manager',
        'SLA guarantee',
      ],
      cta: 'Talk to Us',
      highlighted: false,
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-900/20">
      {/* Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header - Friendly & Conversational */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-sm text-emerald-300 font-medium">Simple, Honest Pricing</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Choose Your Plan,</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Start Saving Time Today
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            All plans include a 14-day free trial. No credit card required. Cancel anytime. 
            <span className="text-emerald-400 font-semibold"> We're that confident you'll love it.</span>
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-white/20'
                } backdrop-blur-xl`}
              >
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${plan.badgeColor} text-white text-sm font-semibold mb-6 shadow-lg`}>
                  <Icon className="w-4 h-4" />
                  {plan.badge}
                </div>

                {/* Plan Name */}
                <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-lg ml-2">{plan.period}</span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage('dashboard')}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 mb-8 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40'
                      : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight glow */}
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 px-8 py-8 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-slate-900 flex items-center justify-center text-white font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">100+ Happy Customers</div>
                <div className="text-gray-400">Join businesses saving 2+ hours daily</div>
              </div>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              "We tried 3 other tools before LeadFilter. This is the only one that actually works. 
              <span className="text-emerald-400 font-semibold"> Our team saves 10+ hours every week.</span>"
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>— Amit Sharma, Manufacturing Business</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Have questions? <button className="text-emerald-400 hover:text-emerald-300 font-semibold underline">Chat with us</button> or call{' '}
            <span className="text-white font-semibold">+91 98765 43210</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
