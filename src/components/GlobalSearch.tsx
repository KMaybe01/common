import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadContent } from '../data/content'
import { type NavItem, navConfig } from '../data/navigation'

interface PageInfo {
  title: string
  link: string
  text: string
}

interface SearchItem {
  pageTitle: string
  pageLink: string
  pageText: string
  heading?: string
  link: string
}

function flattenNav(items: NavItem[]): PageInfo[] {
  const result: PageInfo[] = []
  function walk(list: NavItem[], parentText: string[]) {
    for (const item of list) {
      const isDir = !item.link
      const texts = isDir ? [...parentText] : [...parentText, item.text]
      if (item.link) {
        result.push({ title: item.text, link: item.link, text: texts.join(' / ') })
      } else if (item.items) {
        result.push({
          title: item.text,
          link: firstLink(item.items) || '',
          text: [...parentText].join(' / '),
        })
        walk(item.items, texts)
      }
    }
  }
  walk(items, [])
  return result
}

function firstLink(items: NavItem[]): string | undefined {
  for (const item of items) {
    if (item.link) return item.link
    if (item.items) {
      const link = firstLink(item.items)
      if (link) return link
    }
  }
}

const GS_HEADING_RE = /^(#{1,3})\s+(.+)$/gm

function extractHeadings(content: string): { text: string; id: string }[] {
  const result: { text: string; id: string }[] = []
  let match
  while ((match = GS_HEADING_RE.exec(content)) !== null) {
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/\s+/g, '-')
    result.push({ text, id })
  }
  return result
}

export default function GlobalSearch({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [items, setItems] = useState<SearchItem[]>([])
  const [ready, setReady] = useState(false)

  const allPages = useMemo(() => flattenNav(navConfig), [])

  useEffect(() => {
    inputRef.current?.focus()
    Promise.all(
      allPages.map(async (p) => {
        if (!p.link) return null
        const data = await loadContent(p.link)
        if (!data) return null
        const headings = extractHeadings(data.content)
        const page: SearchItem = {
          pageTitle: p.title,
          pageLink: p.link,
          pageText: p.text,
          link: p.link,
        }
        if (headings.length === 0) return [page]
        return [
          page,
          ...headings.map((h) => ({
            pageTitle: p.title,
            pageLink: p.link,
            pageText: p.text,
            heading: h.text,
            link: `${p.link}#${h.id}`,
          })),
        ]
      }),
    ).then((results) => {
      setItems(results.filter(Boolean).flat() as SearchItem[])
      setReady(true)
    })
  }, [allPages])

  const deferredQuery = useDeferredValue(query)
  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    if (!q) return []
    return items.filter(
      (i) =>
        i.pageTitle.toLowerCase().includes(q) ||
        i.pageText.toLowerCase().includes(q) ||
        i.heading?.toLowerCase().includes(q),
    )
  }, [deferredQuery, items])

  const select = useCallback(
    (link: string) => {
      onClose()
      navigate(link)
    },
    [navigate, onClose],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        select(results[activeIndex].link)
      }
    },
    [onClose, results, activeIndex, select],
  )

  return (
    <div
      className="search-overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="搜索文章标题和章节..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={handleKeyDown}
        />
        <div className="search-results">
          {results.map((item, i) => (
            <div
              key={item.link}
              className={`search-result-item ${i === activeIndex ? 'active' : ''}`}
              onClick={() => select(item.link)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  select(item.link)
                }
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="search-result-title">
                {item.pageTitle}
                {item.heading && <span className="search-result-heading"> › {item.heading}</span>}
              </div>
              <div className="search-result-text">{item.pageText}</div>
            </div>
          ))}
          {!ready && <div className="search-status">加载索引中…</div>}
          {ready && query.trim() && results.length === 0 && (
            <div className="search-empty">未找到匹配的内容</div>
          )}
        </div>
      </div>
    </div>
  )
}
