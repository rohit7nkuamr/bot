'use client';

import { DOCS_CONTENT } from '@/lib/docs';
import DocsLayout from './DocsLayout';

export default function DocsRootPage() {
  const introduction = DOCS_CONTENT['introduction'];

  return (
    <DocsLayout>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{introduction.title}</h1>
      <div
        className="prose prose-invert prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: introduction.content }}
      />
    </DocsLayout>
  );
}
