import React from 'react';
import BlockRenderer, { Block } from '@/components/Blocks/BlockRenderer';
import { notFound } from 'next/navigation';

interface PageData {
  id: string;
  title: string;
  slug: string;
  layout: Block[];
}

async function fetchPage(slug: string): Promise<PageData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000"}/api/pages?where[slug][equals]=${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  if (!data.docs || data.docs.length === 0) {
    notFound();
  }

  const page = data.docs[0];
  console.log('Fetched page data for slug:', slug, page); // Debug log
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    layout: page.layout,
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  const page = await fetchPage(resolvedParams.slug);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <BlockRenderer layout={page.layout} />
    </div>
  );
};

export default Page;