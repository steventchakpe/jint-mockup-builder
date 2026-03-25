// ── Hero: Tiles – w=1204px, h=450px ──────────────────────────────────────────
// Figma :
//   1 large tile left (50%) : image + gradient overlay opacity-70 (h=350px)
//   4 small tiles 2×2 right : alternating [image|brand-color]
//   Large title : Semibold 28px/36px white
//   CTA         : Semibold 16px/23px white + arrow icon
//   Small title : Semibold 24px/28px white, padding 16px 16px 16px 16px
//   Gap between tiles : 2px

import { ArrowRight } from 'lucide-react'

const HERO_IMG = (seed) => `https://picsum.photos/seed/${seed}/800/450`

function LargeTile({ title, cta, imgSeed }) {
  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{ minWidth: 0, height: 450 }}
    >
      <img
        src={HERO_IMG(imgSeed)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Gradient overlay – opacity-70 from transparent to black */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: 350,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.49) 100%)',
          opacity: 0.7,
        }}
      />
      {/* Title + CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col gap-4"
        style={{ padding: '0 128px 32px 32px' }}
      >
        {/* Title – Semibold 28px/36px */}
        <p className="text-white font-semibold text-[28px] leading-[36px]">{title}</p>
        {/* CTA – Semibold 16px/23px */}
        <div className="flex items-center gap-1">
          <span className="text-white font-semibold text-[16px] leading-[23px]">{cta}</span>
          <ArrowRight className="w-4 h-[17px] text-white" />
        </div>
      </div>
    </div>
  )
}

function SmallTile({ title, imgSeed, useBrand }) {
  return (
    <div
      className="relative overflow-hidden flex-1"
      style={{ height: 224, minWidth: 0 }}
    >
      {useBrand ? (
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--brand-color)' }} />
      ) : (
        <>
          <img
            src={HERO_IMG(imgSeed)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: 225,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.49) 100%)',
              opacity: 0.7,
            }}
          />
        </>
      )}
      {/* Title – Semibold 24px/28px */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
        style={{ padding: '0 32px 16px 16px' }}
      >
        <p className="text-white font-semibold text-[24px] leading-[28px]">{title}</p>
      </div>
    </div>
  )
}

const tiles = [
  { title: 'Bienvenue sur votre intranet. Restez informé et connecté.', cta: 'Découvrir nos services' },
  { title: 'Nos dernières actualités et communications', useBrand: true },
  { title: 'Innovation et transformation digitale 2024', imgSeed: 'sp-h3' },
  { title: 'Rejoignez nos communautés de pratiques', imgSeed: 'sp-h4' },
  { title: 'Ressources humaines et bien-être au travail', useBrand: true },
]

export default function HeroTiles() {
  return (
    <div className="flex gap-[2px] w-full" style={{ height: 450 }}>
      {/* Large tile */}
      <LargeTile
        title={tiles[0].title}
        cta={tiles[0].cta}
        imgSeed="sp-hero1"
      />
      {/* 2×2 small tiles */}
      <div className="flex flex-col gap-[2px] flex-1" style={{ minWidth: 0 }}>
        <div className="flex gap-[2px] flex-1">
          <SmallTile title={tiles[1].title} useBrand={true} />
          <SmallTile title={tiles[2].title} imgSeed="sp-h3" />
        </div>
        <div className="flex gap-[2px] flex-1">
          <SmallTile title={tiles[3].title} imgSeed="sp-h4" />
          <SmallTile title={tiles[4].title} useBrand={true} />
        </div>
      </div>
    </div>
  )
}
