import { useEffect, useRef, useState } from 'react'
import { useMockupStore } from './store'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'

const CANVAS_WIDTH = 1366

export default function App() {
  const { primaryColor, headerColor, isPreviewMode } = useMockupStore()
  const containerRef = useRef(null)
  const innerRef     = useRef(null)
  const [scale, setScale]             = useState(1)
  const [scaledHeight, setScaledHeight] = useState('auto')

  // Sync CSS variables on first render
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color',   primaryColor)
    document.documentElement.style.setProperty('--brand-primary', headerColor)
  }, [])

  // Scale-to-fit: observe container width → compute ratio
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      setScale(w / CANVAS_WIDTH)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [isPreviewMode])

  // Track inner canvas height for correct outer sizing
  useEffect(() => {
    if (!innerRef.current) return
    const ro = new ResizeObserver((entries) => {
      setScaledHeight(entries[0].contentRect.height * scale)
    })
    ro.observe(innerRef.current)
    return () => ro.disconnect()
  }, [scale])

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f0f0]">
      {/* ── Sidebar Editor ─────────────────────────────────────────────── */}
      {!isPreviewMode && (
        <aside
          className="w-[280px] shrink-0 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-10"
          style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}
        >
          <Sidebar />
        </aside>
      )}

      {/* ── Canvas Area ────────────────────────────────────────────────── */}
      <main
        ref={containerRef}
        className={`flex-1 overflow-y-auto overflow-x-hidden ${isPreviewMode ? 'bg-white' : 'bg-[#e8e8e8]'}`}
        style={{ minHeight: 0 }}
      >
        {/* Scale wrapper: always renders at 1366px then scales down */}
        <div style={{ height: scaledHeight || 'auto', position: 'relative' }}>
          <div
            ref={innerRef}
            style={{
              width: CANVAS_WIDTH,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            }}
          >
            <Canvas />
          </div>
        </div>
      </main>
    </div>
  )
}
