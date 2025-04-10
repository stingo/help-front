// app/help/page.tsx
import React from 'react';
import Link from 'next/link';

type Article = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tags: string;
};

async function getHelpArticles(): Promise<Article[]> {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help/`,
    
    {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch help articles');
  }

  return res.json();
}

export default async function HelpCenterPage() {
  const articles = await getHelpArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help Center Articles</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition"
          >
            <Link href={`/help/${article.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {article.title}
            </Link>
            <p className="text-sm text-zinc-500">{article.summary}</p>
            <p className="mt-1 text-xs text-blue-500">{article.tags}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}