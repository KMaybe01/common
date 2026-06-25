interface Heading {
  level: number
  text: string
}

export default function Outline({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null

  return (
    <aside className="outline">
      <div className="outline-header">目录</div>
      <nav className="outline-list">
        {headings.map((h, i) => (
          <a
            key={i}
            href={`#${encodeURIComponent(h.text.toLowerCase().replace(/\s+/g, '-'))}`}
            className="outline-item"
            style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
            onClick={(e) => {
              e.preventDefault()
              const id = h.text.toLowerCase().replace(/\s+/g, '-')
              const el = document.getElementById(id)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
