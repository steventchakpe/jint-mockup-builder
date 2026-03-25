// ── Quick Links: Filmstrip – w=792px, h≈302px ────────────────────────────────
// Figma :
//   Card : border 1px #e1dfdd, rounded-[4px], shadow-sp-4
//   Image area : h=135px (fixed aspect ratio)
//   Content    : h=65px, px=12px, py=14px, border-t #edebe9, bg white
//   Link title : Semibold 14px/20px #323130
//   Iterators  : left/right arrows bg rgba(20,20,20,0.65) size=36px
//   Pagination : 4 dots (first active = brand-color ring + inner dot)

import { ChevronLeft, ChevronRight } from 'lucide-react'

const links = [
  { id: 1, label: 'Portail RH & Congés',           img: 'sp-ql1' },
  { id: 2, label: 'Espace de travail collaboratif', img: 'sp-ql2' },
  { id: 3, label: 'Outils & applications internes', img: 'sp-ql3' },
  { id: 4, label: 'Formations et e-learning',       img: 'sp-ql4' },
  { id: 5, label: 'Annuaire des collaborateurs',    img: 'sp-ql5' },
]

function QuickLinkCard({ link }) {
  return (
    <div
      className="flex flex-col flex-1 min-w-0 overflow-hidden border border-[#e1dfdd] rounded-[4px] py-px"
      style={{ boxShadow: 'var(--shadow-4, 0px 2px 4px rgba(0,0,0,0.14), 0px 0px 2px rgba(0,0,0,0.12))' }}
    >
      {/* Image area – h=135px */}
      <div className="relative overflow-hidden bg-[#faf9f8]" style={{ height: 135 }}>
        <img
          src={`https://picsum.photos/seed/${link.img}/300/200`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Content – h=65px */}
      <div
        className="bg-white border-t border-[#edebe9] flex flex-col overflow-hidden"
        style={{ height: 65, padding: '14px 12px' }}
      >
        <p
          className="font-semibold text-[14px] leading-[20px] text-[#323130] overflow-hidden text-ellipsis"
          style={{ maxHeight: 40 }}
        >
          {link.label}
        </p>
      </div>
    </div>
  )
}

export default function QuickLinksFilmstrip() {
  return (
    <div className="flex flex-col gap-[18px] w-full">
      {/* Title */}
      <div className="flex items-end justify-between w-full">
        <p className="text-[20px] font-semibold leading-[26px] text-[#323130]">Liens rapides</p>
      </div>

      {/* Cards + iterators */}
      <div className="flex flex-col gap-8 w-full">
        <div className="relative">
          <div className="flex gap-[24px] w-full">
            {links.slice(0, 3).map((link) => (
              <QuickLinkCard key={link.id} link={link} />
            ))}
          </div>
          {/* Iterators – size=36px, bg rgba(20,20,20,0.65) */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center overflow-hidden"
            style={{ width: 36, height: 36, background: 'rgba(20,20,20,0.65)' }}
          >
            <ChevronLeft className="text-white w-7 h-7" />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center overflow-hidden"
            style={{ width: 36, height: 36, background: 'rgba(20,20,20,0.65)' }}
          >
            <ChevronRight className="text-white w-7 h-7" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[10px]"
              style={{
                width: 20,
                height: 20,
                border: `1px solid ${i === 0 ? 'var(--brand-color)' : '#323130'}`,
                position: 'relative',
              }}
            >
              {i === 0 && (
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 10, height: 10,
                    top: 4, left: 4,
                    backgroundColor: 'var(--brand-color)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
