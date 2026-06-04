import { SiteHeader, type HeaderTheme } from '@/components/structural/header/SiteHeader';

const THEMES: HeaderTheme[] = ['none', 'neutral', 'soft', 'strong'];

/**
 * Galerie header. Le header est RESPONSIVE (container queries) :
 *  - conteneur ≥ 1024px → hub nav + nav locale inline
 *  - conteneur 640–1023px → hamburger (nav repliée)
 * http://localhost:3000/header-variants
 */
export default function HeaderVariants() {
  return (
    <div className="min-h-screen bg-[#f3f2f1] p-2xl flex flex-col gap-3xl">
      <h1 className="text-heading font-semibold text-sp-darker">Header — 4 fonds × responsive</h1>

      <section className="flex flex-col gap-xl">
        <h2 className="text-heading-sm font-semibold text-sp-darker">≥ 1024px (hub nav + nav locale)</h2>
        {THEMES.map((theme) => (
          <div key={theme} className="flex flex-col gap-sm">
            <span className="text-caption text-gray-500 uppercase tracking-wide">background : {theme}</span>
            <div className="rounded-t-[12px] overflow-hidden shadow-lg">
              <SiteHeader theme={theme} />
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-xl">
        <h2 className="text-heading-sm font-semibold text-sp-darker">640–1023px (hamburger, nav repliée)</h2>
        {THEMES.map((theme) => (
          <div key={theme} className="flex flex-col gap-sm">
            <span className="text-caption text-gray-500 uppercase tracking-wide">background : {theme}</span>
            {/* conteneur 800px → déclenche le layout 640-1023 via @container */}
            <div className="w-[800px] max-w-full rounded-t-[12px] overflow-hidden shadow-lg">
              <SiteHeader theme={theme} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
