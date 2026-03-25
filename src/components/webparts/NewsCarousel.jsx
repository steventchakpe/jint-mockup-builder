// ── News: Carousel – w=792px, h=388px ────────────────────────────────────────
// Carte principale avec image en fond, titre en overlay, navigation arrows

import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { id: 1, org: 'Direction',  title: 'Transformation numérique : le bilan de mi-parcours 2024', desc: 'Trois ans après le lancement du plan Transform 2025, où en sommes-nous ?',   img: 'sp-car1' },
  { id: 2, org: 'Innovation', title: 'Nouveaux espaces de travail : inauguration du Lab Design',  desc: 'Venez découvrir nos nouveaux espaces collaboratifs ouverts à tous les équipes.', img: 'sp-car2' },
]

export default function NewsCarousel() {
  return (
    <div className="flex flex-col gap-0 w-full" style={{ height: 388 }}>
      {/* Featured card */}
      <div className="relative overflow-hidden flex-1 rounded-[2px]" style={{ height: 388 }}>
        <img
          src={`https://picsum.photos/seed/${slides[0].img}/792/388`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
        />
        {/* Kicker */}
        <div className="absolute top-4 left-4">
          <span
            className="text-white text-[12px] font-semibold leading-[16px] uppercase rounded-[2px] px-2 py-[2px]"
            style={{ backgroundColor: 'var(--brand-color)' }}
          >
            {slides[0].org}
          </span>
        </div>
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-6">
          <p className="text-white font-semibold text-[28px] leading-[36px]">{slides[0].title}</p>
          <p className="text-white text-[14px] leading-[20px] opacity-90">{slides[0].desc}</p>
        </div>
        {/* Navigation arrows */}
        <button
          className="absolute flex items-center justify-center"
          style={{
            left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36,
            background: 'rgba(20,20,20,0.65)',
          }}
        >
          <ChevronLeft className="text-white" style={{ width: 20, height: 20 }} />
        </button>
        <button
          className="absolute flex items-center justify-center"
          style={{
            right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36,
            background: 'rgba(20,20,20,0.65)',
          }}
        >
          <ChevronRight className="text-white" style={{ width: 20, height: 20 }} />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 8 : 6,
                height: i === 0 ? 8 : 6,
                backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
