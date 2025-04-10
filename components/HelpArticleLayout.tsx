// components/HelpArticleLayout.tsx

'use client'

import { useState } from 'react'

type Article = {
  title: string
  body: string
  summary: string
  tags: string
  // Add other fields you use like `note`, `tips`, `images`, etc.
}

export default function HelpArticleLayout({ article }: { article: Article }) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <header className="p-4">
        <h1 className="text-2xl font-bold">{article.title}</h1>
      </header>
      <main className="p-4">{article.body}</main>
    </div>
  )
}