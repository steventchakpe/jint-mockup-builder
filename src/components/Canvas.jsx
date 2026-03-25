// ── SharePoint Page Canvas – w=1366px ────────────────────────────────────────
// Structure exacte du fichier Figma :
//   Suite Header      h=48px
//   AppBar            w=48px (vertical)
//   Page wrap w=1318px :
//     Site Header     h=148px (hub 40px + comm 108px)
//     Content (px=57px, sections py=32px) :
//       § One column       → Hero: Tiles (1204px)
//       § One column       → News Side-by-side + News Hub
//       § One-third left   → [380px Text] [792px Quick Links]
//       § One column       → Events Filmstrip (1204px)
//       § One-third right  → [792px News Carousel] [380px News List]
//       § Two columns      → [586px Image] [586px Text+Btn]
//       § One-third left   → [380px Events Compact] [792px Hero Layers]
//       § One column       → Hero Tiles (1204px)
//     Footer

import { useMockupStore } from '../store'
import SuiteHeader      from './shell/SuiteHeader'
import AppBar           from './shell/AppBar'
import SiteHeader       from './shell/SiteHeader'
import HeroTiles        from './webparts/HeroTiles'
import NewsSideBySide   from './webparts/NewsSideBySide'
import NewsHub          from './webparts/NewsHub'
import QuickLinksFilmstrip from './webparts/QuickLinksFilmstrip'
import EventsFilmstrip  from './webparts/EventsFilmstrip'
import NewsCarousel     from './webparts/NewsCarousel'
import NewsList         from './webparts/NewsList'
import HeroLayers       from './webparts/HeroLayers'
import EventsCompact    from './webparts/EventsCompact'
import PreviewToggle    from './PreviewToggle'

// ── Helper : section wrapper ──────────────────────────────────────────────────
function Section({ children, className = '' }) {
  return (
    <div className={`bg-white ${className}`}>
      {children}
    </div>
  )
}

// ── Helper : full-width column (1204px) ───────────────────────────────────────
function ColFull({ children }) {
  // px=57px both sides, py=32px
  return (
    <div style={{ padding: '32px 57px' }}>
      {children}
    </div>
  )
}

// ── Helper : one-third left layout ───────────────────────────────────────────
// col1=380px, gap=32px, col2=792px, all wrapped in px=57px py=32px
function ColOneThirdLeft({ left, right }) {
  return (
    <div style={{ padding: '32px 57px' }}>
      <div className="flex gap-[32px]">
        <div style={{ width: 380, shrink: 0, flexShrink: 0 }}>{left}</div>
        <div style={{ width: 792, flexShrink: 0 }}>{right}</div>
      </div>
    </div>
  )
}

// ── Helper : one-third right layout ──────────────────────────────────────────
// col1=792px, gap=32px, col2=380px
function ColOneThirdRight({ left, right }) {
  return (
    <div style={{ padding: '32px 57px' }}>
      <div className="flex gap-[32px]">
        <div style={{ width: 792, flexShrink: 0 }}>{left}</div>
        <div style={{ width: 380, flexShrink: 0 }}>{right}</div>
      </div>
    </div>
  )
}

// ── Helper : two-column layout ───────────────────────────────────────────────
// col1=586px, gap=32px, col2=586px
function ColTwo({ left, right }) {
  return (
    <div style={{ padding: '32px 57px' }}>
      <div className="flex gap-[32px]">
        <div style={{ width: 586, flexShrink: 0 }}>{left}</div>
        <div style={{ width: 586, flexShrink: 0 }}>{right}</div>
      </div>
    </div>
  )
}

// ── Image webpart placeholder ────────────────────────────────────────────────
function ImageWebpart() {
  return (
    <div className="overflow-hidden rounded-[2px]" style={{ height: 391 }}>
      <img
        src="https://picsum.photos/seed/sp-img1/586/391"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  )
}

// ── Text + Button webpart placeholder ────────────────────────────────────────
function TextButtonWebpart({ clientName }) {
  return (
    <div className="flex flex-col gap-6" style={{ height: 293 }}>
      {/* Heading 2 – Semibold 28px/36px */}
      <p className="text-[28px] font-semibold leading-[36px] text-[#323130]">
        Rejoignez la communauté {clientName}
      </p>
      {/* Body – Regular 18px */}
      <p className="text-[18px] leading-[25px] text-[#323130]">
        Découvrez nos valeurs, notre culture et nos opportunités de développement professionnel. Ensemble, nous construisons l'entreprise de demain.
      </p>
      {/* CTA link */}
      <button
        className="self-start text-[16px] font-semibold leading-[22px] underline"
        style={{ color: 'var(--brand-color)' }}
      >
        Découvrir nos valeurs →
      </button>
      {/* Button */}
      <button
        className="self-start px-5 py-2 text-white font-semibold text-[14px] leading-[20px] rounded-[2px] transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--brand-color)' }}
      >
        Nous rejoindre
      </button>
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div
      className="flex items-center border-t border-[#edebe9] bg-white"
      style={{ height: 48, paddingLeft: 57, paddingRight: 57 }}
    >
      <span className="text-[12px] leading-[16px] text-[#605e5c]">
        © 2024 {' '}Jint · Propulsé par Microsoft SharePoint
      </span>
    </div>
  )
}

// ── Main Canvas ───────────────────────────────────────────────────────────────
export default function Canvas() {
  const { clientName, webparts } = useMockupStore()
  const wp = webparts

  return (
    <div className="bg-white" style={{ width: 1366, minHeight: '100vh' }}>
      {/* Preview toggle (sticky) */}
      <PreviewToggle />

      {/* Suite Header – h=48px */}
      <SuiteHeader clientName={clientName} />

      {/* Body: AppBar + Page content */}
      <div className="flex" style={{ minHeight: 'calc(100vh - 48px)' }}>
        {/* AppBar – w=48px */}
        <AppBar />

        {/* Page wrap – w=1318px */}
        <div className="flex flex-col flex-1" style={{ minWidth: 0 }}>
          {/* Site Header */}
          <SiteHeader clientName={clientName} />

          {/* ── CONTENT AREA ── */}
          <div className="flex flex-col divide-y divide-[#edebe9]">

            {/* § One column – Hero Tiles */}
            {wp['hero-tiles'] && (
              <Section>
                <ColFull>
                  <HeroTiles />
                </ColFull>
              </Section>
            )}

            {/* § One column – News Side-by-side + News Hub */}
            {(wp['news-sidebyside'] || wp['news-hub']) && (
              <Section>
                <ColFull>
                  <div className="flex flex-col gap-8">
                    {wp['news-sidebyside'] && <NewsSideBySide />}
                    {wp['news-hub']         && <NewsHub />}
                  </div>
                </ColFull>
              </Section>
            )}

            {/* § One-third left – [Text] [Quick Links] */}
            {wp['quick-links'] && (
              <Section>
                <ColOneThirdLeft
                  left={
                    <div className="flex flex-col gap-3 pt-2">
                      <p className="text-[28px] font-semibold leading-[36px] text-[#323130]">
                        Services & Ressources
                      </p>
                      <p className="text-[18px] leading-[25px] text-[#323130]">
                        Accédez rapidement à vos outils et applications du quotidien.
                      </p>
                    </div>
                  }
                  right={<QuickLinksFilmstrip />}
                />
              </Section>
            )}

            {/* § One column – Events Filmstrip */}
            {wp['events-filmstrip'] && (
              <Section>
                <ColFull>
                  <EventsFilmstrip />
                </ColFull>
              </Section>
            )}

            {/* § One-third right – [News Carousel] [News List] */}
            {(wp['news-carousel'] || wp['news-list']) && (
              <Section>
                <ColOneThirdRight
                  left={wp['news-carousel'] ? <NewsCarousel /> : null}
                  right={wp['news-list'] ? <NewsList /> : null}
                />
              </Section>
            )}

            {/* § Two columns – [Image] [Text + Button] */}
            <Section>
              <ColTwo
                left={<ImageWebpart />}
                right={<TextButtonWebpart clientName={clientName} />}
              />
            </Section>

            {/* § One-third left – [Events Compact] [Hero Layers] */}
            {(wp['events-compact'] || wp['hero-layers']) && (
              <Section>
                <ColOneThirdLeft
                  left={wp['events-compact'] ? <EventsCompact /> : null}
                  right={wp['hero-layers'] ? <HeroLayers /> : null}
                />
              </Section>
            )}

            {/* § One column – Hero Tiles (2nd instance) */}
            {wp['hero-tiles'] && (
              <Section>
                <ColFull>
                  <HeroTiles />
                </ColFull>
              </Section>
            )}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}
