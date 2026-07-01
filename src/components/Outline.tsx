interface Heading {
  level: number
  text: string
}

function headingId(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}

export default function Outline({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null

  return (
    <aside className="outline">
      <div className="outline-header">目录</div>
      <nav className="outline-list">
        {headings.map((h) => (
          <a
            key={headingId(h.text)}
            href={`#${headingId(h.text)}`}
            className="outline-item"
            style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
            onClick={(e) => {
              e.preventDefault()
              const id = headingId(h.text)
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
