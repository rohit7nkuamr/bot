'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'API Docs', 'Community', 'Support'],
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'Compliance', 'Cookies'],
    },
  ];

  return (
    <footer className="w-full border-t border-cyan-500/20 mt-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">LeadFilter</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automate lead qualification with AI-powered WhatsApp bot. Save 2+ hours daily and increase conversions.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-cyan-500/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} LeadFilter. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
