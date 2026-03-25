// ── AppBar – w=48px, vertical left sidebar ────────────────────────────────────
// Figma : x=0, y=48, width=48, height=4296, bg white border-r stroke4

const icons = [
  { label: 'Home', path: 'M10 3L3 9.5V17h4v-4h6v4h4V9.5L10 3z' },
  { label: 'News', path: 'M3 4h14v2H3V4zm0 4h14v2H3V8zm0 4h10v2H3v-2z' },
  { label: 'My sites', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93V6c0 .55-.45 1-1 1s-1-.45-1-1V4.07C7.05 4.56 4 7.92 4 12s3.05 7.44 7 7.93z' },
  { label: 'Create', path: 'M12 5v14M5 12h14', isPlus: true },
]

export default function AppBar() {
  return (
    <div
      className="flex flex-col items-center pt-3 gap-1 border-r"
      style={{
        width: 48,
        minHeight: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'var(--stroke4, #edebe9)',
      }}
    >
      {/* SP logo mark */}
      <div className="flex items-center justify-center w-8 h-8 mb-2">
        <div
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-color)' }}
        >
          <span className="text-white text-[10px] font-bold">SP</span>
        </div>
      </div>

      {/* Nav icons */}
      {icons.map(({ label, path, isPlus }) => (
        <button
          key={label}
          title={label}
          className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors group"
        >
          {isPlus ? (
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#605e5c" strokeWidth="2" fill="none">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#605e5c">
              <path d={path}/>
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}
