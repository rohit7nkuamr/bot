'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const docsNavigation = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Quick Start', slug: 'getting-started' },
    ],
  },
  {
    category: 'Core Concepts',
    items: [
      { title: 'AI Qualification', slug: 'ai-qualification' },
      { title: 'WhatsApp Automation', slug: 'whatsapp-automation' },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { title: 'IndiaMART', slug: 'integration-indiamart' },
      { title: 'Zoho CRM', slug: 'integration-zoho' },
      { title: 'HubSpot', slug: 'integration-hubspot' },
    ],
  },
  {
    category: 'API Reference',
    items: [
      { title: 'Authentication', slug: 'api-auth' },
      { title: 'Leads', slug: 'api-leads' },
      { title: 'Webhooks', slug: 'api-webhooks' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={false} />

      <div className="pt-24 max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-8">
            {docsNavigation.map((section) => (
              <div key={section.category}>
                <h3 className="font-semibold text-white mb-3 text-sm tracking-wider uppercase">{section.category}</h3>
                <ul className="space-y-2 border-l border-white/10 ml-1">
                  {section.items.map((item) => {
                    const isActive = pathname === `/docs/${item.slug}` || (pathname === '/docs' && item.slug === 'introduction');
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          className={`block pl-4 text-sm transition-colors border-l -ml-[1px] ${
                            isActive
                              ? 'text-cyan-400 border-cyan-400'
                              : 'text-zinc-400 hover:text-cyan-400 border-transparent hover:border-cyan-400'
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 pb-20">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
