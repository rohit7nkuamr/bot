'use client';

import { DOCS_CONTENT } from '@/lib/docs';
import DocsLayout from '../DocsLayout';
import { notFound } from 'next/navigation';

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = DOCS_CONTENT[params.slug];

  if (!doc) {
    return notFound();
  }

  return (
    <DocsLayout>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{doc.title}</h1>
      <div
        className="prose prose-invert prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />
    </DocsLayout>
  );
}
