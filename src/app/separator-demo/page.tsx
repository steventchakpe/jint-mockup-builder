import { Separator } from '@/components/webparts/separator';
import type { SeparatorConfig, SeparatorContent } from '@/components/webparts/separator';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const demos: { label: string; config: SeparatorConfig; content: SeparatorContent }[] = [
  {
    label: 'Défaut — texte au milieu, centré',
    config: { alignment: 'center', barHeight: 'thin', barLength: 100, textPosition: 'inBetween', barColor: 'var(--sp-theme-primary)' },
    content: { text: { html: '<h2>Nos actualités</h2>', color: 'var(--sp-theme-primary)' }, showText: true },
  },
  {
    label: 'Texte au-dessus, à gauche',
    config: { alignment: 'left', barHeight: 'thin', barLength: 60, textPosition: 'onTop', barColor: 'var(--sp-theme-primary)' },
    content: { text: { value: 'Ressources humaines', color: 'var(--sp-theme-darker)' }, showText: true },
  },
  {
    label: 'Texte à l’intérieur (barre épaisse)',
    config: { alignment: 'center', barHeight: 'large', barLength: 50, textPosition: 'inside', barColor: 'var(--sp-theme-lighter-alt)' },
    content: { text: { value: 'Section', color: 'var(--sp-theme-primary)' }, showText: true },
  },
  {
    label: 'Barre seule (sans texte)',
    config: { alignment: 'center', barHeight: 'thin', barLength: 100, textPosition: 'inBetween', barColor: 'var(--sp-theme-primary)' },
    content: { text: {}, showText: false },
  },
];

export default function SeparatorDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg flex flex-col gap-3xl">
              {demos.map((d) => (
                <div key={d.label} className="flex flex-col gap-md">
                  <p className="text-caption text-gray-400">{d.label}</p>
                  <Separator config={d.config} content={d.content} />
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
