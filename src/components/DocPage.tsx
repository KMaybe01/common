import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { loadContent } from '../data/content'
import MarkdownRenderer from './MarkdownRenderer'
import Outline from './Outline'

const HEADING_RE = /^(#{1,3})\s+(.+)$/
const HTTP_RE = /^https?:\/\//

interface Heading {
  level: number
  text: string
}

function extractHeadings(content: string): Heading[] {
  const lines = content.split('\n')
  const matches: Heading[] = []
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(HEADING_RE)
    if (match) {
      const text = match[2].trim()
      if (HTTP_RE.test(text)) continue
      matches.push({ level: match[1].length, text })
    }
  }
  return matches
}

export default function DocPage() {
  const location = useLocation()
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const headings = useMemo(() => (content ? extractHeadings(content) : []), [content])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (content && location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [content, location.hash])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    setContent(null)

    loadContent(location.pathname)
      .then((result) => {
        if (cancelled) return
        if (!result) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setContent(result.content)
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [location.pathname])

  if (loading) {
    return (
      <div className="doc-page">
        <div className="doc-loading">
          <div className="spinner" />
          <div className="loading-text">加载中...</div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="doc-page">
        <div className="doc-error">
          <h1>404</h1>
          <p>页面未找到</p>
          <Link to="/" className="doc-error-link">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="doc-page">
      <div className="doc-content">
        <MarkdownRenderer content={content!} basePath={location.pathname} />
      </div>
      {headings.length > 0 && <Outline headings={headings} />}
    </div>
  )
}
