import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { loadContent } from '../data/content'
import MarkdownRenderer from './MarkdownRenderer'
import Outline from './Outline'

interface Heading {
  level: number
  text: string
}

function extractHeadings(content: string): Heading[] {
  const regex = /^(#{1,3})\s+(.+)$/gm
  const matches: Heading[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    matches.push({ level: match[1].length, text: match[2].trim() })
  }
  return matches
}

export default function DocPage() {
  const location = useLocation()
  const [content, setContent] = useState<string | null>(null)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    setContent(null)

    loadContent(location.pathname).then((result) => {
      if (cancelled) return
      if (!result) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setContent(result.content)
      setHeadings(extractHeadings(result.content))
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [location.pathname])

  if (loading) {
    return (
      <div className="doc-page">
        <div className="doc-loading">加载中...</div>
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
