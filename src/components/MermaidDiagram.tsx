import mermaid from 'mermaid'
import { useEffect, useRef, useState, useCallback } from 'react'

let initialized = false

function ensureInit() {
  if (initialized) return
  initialized = true
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    themeVariables: {
      primaryColor: '#3eaf7c',
      primaryTextColor: '#fff',
      primaryBorderColor: '#2d8f5e',
      lineColor: '#666',
      secondaryColor: '#2196f3',
      tertiaryColor: '#f5f5f5',
    },
  })
}

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const svgRef = useRef('')
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`)
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const drag = useRef({ dragging: false, startX: 0, startY: 0, tx: 0, ty: 0 })

  useEffect(() => {
    ensureInit()
    let cancelled = false
    mermaid.render(idRef.current, chart).then(({ svg }) => {
      if (!cancelled && ref.current) {
        ref.current.innerHTML = svg
        svgRef.current = svg
      }
    })
    return () => {
      cancelled = true
    }
  }, [chart])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale(s => Math.max(0.25, Math.min(5, s - e.deltaY * 0.002)))
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    drag.current = {
      dragging: true,
      startX: e.clientX - translate.x,
      startY: e.clientY - translate.y,
      tx: translate.x,
      ty: translate.y,
    }
    e.preventDefault()
  }, [translate])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current.dragging) return
    setTranslate({
      x: e.clientX - drag.current.startX,
      y: e.clientY - drag.current.startY,
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    drag.current.dragging = false
  }, [])

  return (
    <>
      <div
        className="mermaid-wrapper"
        ref={ref}
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {open && (
        <div className="lightbox-overlay" onClick={handleClose}>
          <button className="lightbox-close" onClick={handleClose} type="button" aria-label="关闭">
            ×
          </button>
          <div
            className="lightbox-mermaid"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={() => { setScale(1); setTranslate({ x: 0, y: 0 }) }}
            style={{ cursor: drag.current.dragging ? 'grabbing' : scale > 1 ? 'grab' : 'default' }}
          >
            <div
              className="lightbox-mermaid-content"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
              dangerouslySetInnerHTML={{ __html: svgRef.current }}
            />
          </div>
        </div>
      )}
    </>
  )
}
