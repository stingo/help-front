'use client'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor } from '@toast-ui/react-editor'
import { useRef, useEffect, useState } from 'react'

export default function ToastEditor({ initialValue, onChange }) {
  const editorRef = useRef(null)
  const [theme, setTheme] = useState('light')

  // Detect theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  // Set initial content when loaded
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      if (initialValue) {
        editorInstance.setHTML(initialValue)
      }
    }
  }, [initialValue])

  const handleChange = () => {
    const instance = editorRef.current.getInstance()
    const html = instance.getHTML()
    onChange(html)
  }

  const handleImageUpload = async (blob, callback) => {
    const formData = new FormData()
    formData.append('image', blob)

    const res = await fetch('http://127.0.0.1:8000/api/upload-image/', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Image upload failed')

    const data = await res.json()

    // ✅ Update this line right here:
    callback(`http://127.0.0.1:8000${data.url}`, 'uploaded image')
  }

  return (
    <Editor
      ref={editorRef}
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut
      onChange={handleChange}
      hooks={{
        addImageBlobHook: handleImageUpload,
      }}
      theme={theme}
    />
  )
}