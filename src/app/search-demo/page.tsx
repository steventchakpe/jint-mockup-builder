import { Search, searchDefaultConfig } from '@/components/webparts/search';
import type { SearchConfig } from '@/components/webparts/search';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const demos: { label: string; config: SearchConfig }[] = [
  { label: 'Défaut — Glassmorphism, XS, fond primaire', config: { ...searchDefaultConfig, title: 'Rechercher' } },
  { label: 'Grande (S) avec titre', config: { ...searchDefaultConfig, size: 'S', title: 'Trouvez ce dont vous avez besoin' } },
  { label: 'Classic (fond blanc, sur image)', config: { ...searchDefaultConfig, size: 'S', searchBoxTheme: 'Classic', title: 'Recherche', backgroundImage: '/focus-banner-default.jpg' } },
];

export default function SearchDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg flex flex-col gap-2xl">
              {demos.map((d) => (
                <div key={d.label} className="flex flex-col gap-sm">
                  <p className="text-caption text-gray-400">{d.label}</p>
                  <Search config={d.config} />
                </div>
              ))}
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
