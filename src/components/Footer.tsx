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
    <footer className="w-full border-t border-white/10 mt-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">LeadFilter</span>
            </div>
            <p className="text-gray-400 text-sm">
              Automate lead qualification with AI-powered WhatsApp bot.
            </p>
            <div className="flex gap-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
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
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
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
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} LeadFilter. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
