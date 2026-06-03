import { SectionRenderer } from '@/components/canvas';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';
import type { Section, WebpartInstance } from '@/types/project';

const sep = (id: string, text: string): WebpartInstance => ({
  id,
  type: 'separator',
  order: 0,
  config: { alignment: 'center', barHeight: 'thin', barLength: 100, textPosition: 'inBetween', barColor: 'var(--sp-theme-primary)' },
  content: { text: { value: text, color: 'var(--sp-theme-primary)' }, showText: true },
});

const eventsWp: WebpartInstance = {
  id: 'wp-events',
  type: 'events',
  order: 0,
  config: { title: '', maxItems: 2, radius: 12, shadow: 'Strong', showAddToCalendar: true },
  content: {
    events: [
      { id: 'e1', title: 'Assemblée générale annuelle', location: 'Auditorium', startDate: '2026-06-09T09:00:00', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&auto=format', url: '#' },
      { id: 'e2', title: 'Atelier conformité ESG', location: 'Salle Lyon', startDate: '2026-06-12T14:00:00', url: '#' },
    ],
  },
};

const focusWp: WebpartInstance = {
  id: 'wp-focus',
  type: 'focus',
  order: 0,
  config: { title: '', height: 208, radius: 12, shadow: 'Strong', background: { type: 'image', url: '/focus-banner-default.jpg', position: 'center center', adjustment: 'cover' } },
  content: {
    card: {
      position: 'fill',
      tag: { value: 'Thème', alignment: 'left' },
      title: { value: 'Pleine largeur (bleed)', alignment: 'left' },
      description: { value: 'Cette section ignore la limite 1204px et occupe toute la largeur.', alignment: 'left' },
    },
    redirection: { linkUrl: '#', buttonProps: { value: 'Découvrir', alignment: 'left', type: 'primary', position: 'below', visible: true } },
  },
};

const col = (id: string, ...wps: WebpartInstance[]) => ({ id, index: 0, webparts: wps });

const sections: Section[] = [
  {
    id: 's1', order: 0, layout: 'two-column', background: 'none', backgroundImage: null, collapsible: false,
    title: 'Deux colonnes (6 / 6)',
    columns: [{ ...col('c1', eventsWp), index: 0 }, { ...col('c2', sep('sp1', 'Bloc droit')), index: 1 }],
  },
  {
    id: 's2', order: 1, layout: 'one-third-left', background: 'soft', backgroundImage: null, collapsible: false,
    title: 'Un tiers gauche (4 / 8) — fond soft',
    columns: [{ ...col('c3', sep('sp2', '1/3')), index: 0 }, { ...col('c4', sep('sp3', '2/3')), index: 1 }],
  },
  {
    id: 's3', order: 2, layout: 'three-column', background: 'none', backgroundImage: null, collapsible: false,
    title: 'Trois colonnes (4 / 4 / 4)',
    columns: [{ ...col('c5', sep('sp4', 'A')), index: 0 }, { ...col('c6', sep('sp5', 'B')), index: 1 }, { ...col('c7', sep('sp6', 'C')), index: 2 }],
  },
  {
    id: 's4', order: 3, layout: 'full-width', background: 'none', backgroundImage: null, collapsible: false,
    title: null,
    columns: [{ ...col('c8', focusWp), index: 0 }],
  },
  {
    id: 's5', order: 4, layout: 'flexible', background: 'none', backgroundImage: null, collapsible: false,
    title: 'Flexible (grille 12 col 2D)',
    columns: [{
      id: 'c9', index: 0, webparts: [
        { ...sep('fx1', 'x0 · w4'), order: 0, flex: { x: 0, w: 4, y: 1 } },
        { ...sep('fx2', 'x4 · w8'), order: 1, flex: { x: 4, w: 8, y: 1 } },
        { ...sep('fx3', 'x2 · w8 (ligne 2)'), order: 2, flex: { x: 2, w: 8, y: 2 } },
      ],
    }],
  },
];

export default function SectionDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            {/* Zone de contenu SharePoint : max 1204px centrée (full-width bleed en sort) */}
            <div className="max-w-[1204px] mx-auto px-lg flex flex-col gap-2xl">
              {sections
                .sort((a, b) => a.order - b.order)
                .map((s) => (
                  <SectionRenderer key={s.id} section={s} />
                ))}
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
