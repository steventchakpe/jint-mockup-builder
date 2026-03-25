// ── Suite Header – h=48px, bg=var(--brand-primary) ───────────────────────────
// Valeurs exactes Figma : search w=468px h=32px, avatar size=28px,
// tenant logo bg=var(--brand-color) text-xs uppercase tracking-widest

export default function SuiteHeader({ clientName = 'Contoso' }) {
  return (
    <div
      className="w-full flex items-center justify-between relative"
      style={{ height: 48, backgroundColor: 'var(--brand-primary)' }}
    >
      {/* ── Left: Waffle + Tenant logo + "SharePoint" label ── */}
      <div className="flex items-center h-full shrink-0">
        {/* Waffle (app menu) 48×48 */}
        <button className="flex items-center justify-center w-[48px] h-[48px] hover:bg-white/10 transition-colors">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            {[0,5,10].map(y => [0,5,10].map(x => (
              <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="white" />
            )))}
          </svg>
        </button>

        {/* Tenant logo pill */}
        <div className="flex items-center h-full px-2">
          <div
            className="flex items-center h-6 px-2 overflow-hidden"
            style={{ backgroundColor: 'var(--brand-color)' }}
          >
            <span className="text-white text-[11px] font-semibold tracking-[1.2px] uppercase whitespace-nowrap">
              {clientName}
            </span>
          </div>
        </div>

        {/* App label */}
        <div className="flex items-center h-full pb-px px-2">
          <span className="text-white text-[16px] font-semibold leading-[20px]">SharePoint</span>
        </div>
      </div>

      {/* ── Center: Search bar – w=468px h=32px ── */}
      <div
        className="absolute flex items-center"
        style={{ width: 468, height: 32, left: '50%', top: '50%', transform: 'translate(-38px, -50%)' }}
      >
        <div
          className="relative flex items-center w-full h-full rounded-[4px]"
          style={{
            backgroundColor: '#fafafa',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.14), 0px 0px 2px rgba(0,0,0,0.12)',
          }}
        >
          <svg className="absolute left-[8px] w-4 h-4 text-[#616161]" fill="none" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#616161"/>
          </svg>
          <span className="ml-8 text-[14px] text-[#616161] leading-[20px] select-none">Search this site</span>
        </div>
      </div>

      {/* ── Right: Action buttons + Avatar ── */}
      <div className="flex items-center h-full shrink-0">
        {/* Notification */}
        <button className="flex items-center justify-center w-[48px] h-[48px] hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" opacity="0.9">
            <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zM10 18a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z"/>
          </svg>
        </button>
        {/* Settings */}
        <button className="flex items-center justify-center w-[48px] h-[48px] hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" opacity="0.9">
            <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7-2a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
        </button>
        {/* Help */}
        <button className="flex items-center justify-center w-[48px] h-[48px] hover:bg-white/10 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" opacity="0.9">
            <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm0 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1.5-5.5c0 .83-.67 1.5-1.5 1.5v1a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5 1 1 0 1 0-1-1 .5.5 0 0 1-1 0 2 2 0 1 1 3.5 1.32v.18z"/>
          </svg>
        </button>
        {/* Avatar – size=28px */}
        <div className="flex items-center justify-center w-[48px] h-[48px]">
          <div
            className="flex items-center justify-center rounded-full overflow-hidden text-white text-[12px] font-semibold"
            style={{ width: 28, height: 28, backgroundColor: 'var(--brand-color)' }}
          >
            JL
          </div>
        </div>
      </div>
    </div>
  )
}
