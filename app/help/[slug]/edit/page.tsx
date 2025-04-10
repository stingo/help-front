'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Lazy-load ToastEditor to prevent SSR issues
const Editor = dynamic(() => import('../../../../components/ToastEditor'), { ssr: false })

export default function EditHelpArticlePage() {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])

  const [article, setArticle] = useState({
    title: '',
    summary: '',
    tags: '',
    body: '',
    note: '',
    tips: '',
    category: '',
  })

  // Fetch article details
  useEffect(() => {
    if (!slug) return

    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help/${slug}/`)
        if (!res.ok) throw new Error('Failed to load article.')
        const data = await res.json()

        setArticle({
          title: data.title || '',
          summary: data.summary || '',
          tags: data.tags || '',
          body: data.body || '',
          note: data.note || '',
          tips: data.tips || '',
          category: data.category || '',
        })
      } catch (err) {
        console.error(err)
        alert('❌ Error loading article.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  // Fetch categories dynamically
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help-categories/`)
        const data = await res.json()
  
        // Flexible check in case API returns an object with nested results
        if (Array.isArray(data)) {
          setCategories(data)
        } else if (Array.isArray(data.results)) {
          setCategories(data.results)
        } else {
          console.error('❌ Expected array of categories but got:', data)
        }
      } catch (error) {
        console.error('❌ Failed to load categories:', error)
      }
    }
  
    fetchCategories()
  }, [])

  async function handleSave() {
    if (!article.title || !article.body) {
      alert('Title and body are required.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help/${slug}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      })

      if (res.ok) {
        alert('✅ Article updated.')
        router.push(`/help/${slug}`)
      } else {
        alert('❌ Failed to update article.')
      }
    } catch (err) {
      console.error(err)
      alert('⚠️ Unexpected error while saving.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <Loader2 className="animate-spin mx-auto text-zinc-500" size={24} />
        <p>Loading article...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Help Article</h1>

      <input
        type="text"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        placeholder="Article title"
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
      />

      <input
        type="text"
        value={article.tags}
        onChange={(e) => setArticle({ ...article, tags: e.target.value })}
        placeholder="Comma-separated tags"
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
      />

      <textarea
        value={article.summary}
        onChange={(e) => setArticle({ ...article, summary: e.target.value })}
        placeholder="Short summary (HTML allowed)"
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
        rows={3}
      />

      <select
        value={article.category}
        onChange={(e) => setArticle({ ...article, category: parseInt(e.target.value) })}
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <Editor
        initialValue={article.body}
        onChange={(body) => setArticle({ ...article, body })}
      />

      <textarea
        value={article.note}
        onChange={(e) => setArticle({ ...article, note: e.target.value })}
        placeholder="Optional Note (markdown or text)"
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
        rows={3}
      />

      <textarea
        value={article.tips}
        onChange={(e) => setArticle({ ...article, tips: e.target.value })}
        placeholder="Helpful Tips (markdown or text)"
        className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded mb-4"
        rows={3}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
      >
        {saving && <Loader2 className="animate-spin" size={18} />}
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}