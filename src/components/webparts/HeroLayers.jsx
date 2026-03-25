// ── Hero: Layers – w=792px, h=400px ──────────────────────────────────────────
// Variante Hero avec texte superposé en couches et CTA bouton

import { ArrowRight } from 'lucide-react'

export default function HeroLayers() {
  return (
    <div className="relative overflow-hidden rounded-[2px]" style={{ height: 400 }}>
      {/* Background image */}
      <img
        src="https://picsum.photos/seed/sp-hl1/792/400"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%)' }}
      />
      {/* Content – layered */}
      <div className="absolute inset-0 flex flex-col justify-end p-10">
        {/* Topic heading */}
        <p
          className="text-[12px] font-semibold leading-[16px] uppercase tracking-[1px] mb-3"
          style={{ color: 'var(--brand-color)' }}
        >
          Développement & Innovation
        </p>
        {/* Main title */}
        <p className="text-white font-bold text-[42px] leading-[42px] mb-4">
          Rejoignez<br />l'équipe des<br />innovateurs
        </p>
        {/* Description */}
        <p className="text-white text-[16px] leading-[22px] opacity-90 mb-6 max-w-md">
          Découvrez nos opportunités internes et postulez pour rejoindre les projets les plus ambitieux du groupe.
        </p>
        {/* CTA */}
        <div className="flex">
          <button
            className="flex items-center gap-2 text-white font-semibold text-[16px] leading-[24px] px-6 py-3 rounded-[2px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-color)' }}
          >
            Voir les offres
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
