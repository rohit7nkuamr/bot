import { DOCS_CONTENT } from '@/lib/docs';
import { notFound } from 'next/navigation';

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCS_CONTENT[slug];

  if (!doc) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{doc.title}</h1>
      <div
        className="prose prose-invert prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />
    </>
  );
}
