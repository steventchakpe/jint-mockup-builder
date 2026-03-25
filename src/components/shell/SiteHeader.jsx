// ── Communication Site Header – w=1318px ─────────────────────────────────────
// Figma exactement :
//   Hub nav   : h=40px, bg white, border-b #f3f2f1, px=32px, gap=24px
//   Site header: h=108px, bg white, px=32px
//   Logo      : bg var(--brand-color), size=64px, uppercase initials white 28px
//   Site title : Semibold 24px/28px #323130
//   Nav        : Regular 14px/18px, active → 2px underline var(--brand-color)
//   Actions    : Follow | Share | 27 members – Regular 14px #323130

const NAV_LINKS = ['Accueil', 'Documents', 'Actualités', 'Pages', 'Contenu du site']
const HUB_LINKS = ['Lien principal', 'Lien principal', 'Lien principal', 'Groupe principal ∨']

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CS'
}

export default function SiteHeader({ clientName = 'Contoso' }) {
  const initials = getInitials(clientName)
  const hubInitials = clientName.slice(0, 2).toUpperCase()

  return (
    <div className="bg-white border-b border-[#edebe9]" style={{ width: '100%' }}>
      {/* ── Hub Navigation bar – h=40px ── */}
      <div
        className="flex items-center bg-white border-b border-[#f3f2f1]"
        style={{ height: 40, paddingLeft: 32, paddingRight: 32, gap: 20 }}
      >
        {/* Hub logo + title */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ width: 24, height: 24, backgroundColor: 'var(--brand-color)' }}
          >
            <span className="text-white text-[10px] font-normal uppercase">{hubInitials}</span>
          </div>
          <span className="text-[14px] leading-[20px] text-[#323130]">Hub site title</span>
        </div>

        {/* Hub nav items */}
        <div className="flex items-center gap-6 pt-[6px]">
          {HUB_LINKS.map((link, i) => (
            <div key={i} className="flex items-center gap-1 h-6">
              <span className="text-[14px] leading-[18px] text-[#323130]">{link}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Communication site header – h=108px ── */}
      <div
        className="bg-white flex items-center overflow-hidden"
        style={{ height: 108, paddingLeft: 32, paddingRight: 32 }}
      >
        <div className="flex items-center gap-5 w-full">
          {/* Site logo – 64×64 */}
          <div
            className="flex items-center justify-center shrink-0 overflow-hidden"
            style={{ width: 64, height: 64, backgroundColor: 'var(--brand-color)' }}
          >
            <span className="text-white text-[28px] font-normal uppercase leading-[36px]">
              {initials}
            </span>
          </div>

          {/* Site title + nav + actions */}
          <div className="flex flex-col gap-2 min-w-0 flex-1" style={{ height: 60 }}>
            {/* Row 1: site title + labels + actions */}
            <div className="flex items-baseline gap-6">
              {/* Site title – Semibold 24px/28px */}
              <span className="text-[24px] font-semibold leading-[28px] text-[#323130] whitespace-nowrap">
                {clientName} Intranet
              </span>
              {/* Site labels */}
              <div className="flex items-center gap-[6px] text-[14px] leading-[18px] text-[#323130]">
                <span className="w-[4px]">|</span>
                <span>Confidentiel</span>
              </div>
              {/* Actions – pushed right */}
              <div className="ml-auto flex items-center gap-4">
                <button className="flex items-center gap-1 text-[14px] leading-[18px] text-[#323130] hover:text-[#323130]">
                  <svg width="14" height="14" fill="#323130" viewBox="0 0 16 16">
                    <path d="M11 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z M2 13s0-3 5-3a6.5 6.5 0 0 1 1.5.2" stroke="#323130" strokeWidth="0.5" fill="none"/>
                    <circle cx="8" cy="4" r="2.5" fill="#323130"/>
                    <path d="M1 14s0-3 7-3" stroke="#323130" strokeWidth="1" fill="none"/>
                  </svg>
                  Pas en suivi
                </button>
                <button className="flex items-center gap-1 text-[14px] leading-[18px] text-[#323130]">
                  <svg width="14" height="13" fill="none" viewBox="0 0 14 13">
                    <path d="M9 1L13 5 9 9" stroke="#323130" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 12V9a4 4 0 0 1 4-4h8" stroke="#323130" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Partager
                </button>
                <button className="flex items-center gap-1 text-[14px] leading-[18px] text-[#323130]">
                  <svg width="16" height="16" fill="#323130" viewBox="0 0 16 16">
                    <path d="M8 1a5 5 0 1 0 0 10A5 5 0 0 0 8 1zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                  </svg>
                  27 membres
                </button>
              </div>
            </div>

            {/* Row 2: horizontal site nav */}
            <div className="flex items-center gap-5">
              {NAV_LINKS.map((link, i) => (
                <div key={link} className="flex flex-col gap-[4px] h-6 items-start">
                  <span
                    className={`text-[14px] leading-[18px] ${i === 0 ? 'text-[#323130]' : 'text-[#323130]'}`}
                  >
                    {link}
                  </span>
                  {i === 0 && (
                    <div className="h-[2px] w-full" style={{ backgroundColor: 'var(--brand-color)' }} />
                  )}
                </div>
              ))}
              <button
                className="text-[14px] leading-[14px]"
                style={{ color: 'var(--brand-color)' }}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
