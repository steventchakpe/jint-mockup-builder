import { PageRenderer } from '@/components/canvas';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';
import type { Page, WebpartInstance } from '@/types/project';

const sep = (id: string, text: string): WebpartInstance => ({
  id, type: 'separator', order: 0,
  config: { alignment: 'center', barHeight: 'thin', barLength: 100, textPosition: 'inBetween', barColor: 'var(--sp-theme-primary)' },
  content: { text: { value: text, color: 'var(--sp-theme-primary)' }, showText: true },
});

const events: WebpartInstance = {
  id: 'wp-ev', type: 'events', order: 0,
  config: { title: '', maxItems: 2, radius: 12, shadow: 'Strong', showAddToCalendar: true },
  content: { events: [
    { id: 'e1', title: 'Assemblée générale', location: 'Auditorium', startDate: '2026-06-09T09:00:00', url: '#' },
    { id: 'e2', title: 'Atelier ESG', location: 'Salle Lyon', startDate: '2026-06-12T14:00:00', url: '#' },
  ] },
};

const page: Page = {
  id: 'p1', title: 'Accueil', slug: 'accueil', icon: '', order: 0,
  sections: [
    { id: 's1', order: 0, layout: 'two-column', background: 'none', backgroundImage: null, collapsible: false, title: 'Contenu principal',
      columns: [{ id: 'c1', index: 0, webparts: [events] }, { id: 'c2', index: 1, webparts: [sep('s-r', 'Bloc')] }] },
    { id: 's2', order: 1, layout: 'one-column', background: 'soft', backgroundImage: null, collapsible: false, title: 'Une colonne',
      columns: [{ id: 'c3', index: 0, webparts: [sep('s-1', 'Section pleine')] }] },
  ],
  verticalSection: { webparts: [sep('v1', 'Liens rapides'), sep('v2', 'Météo')] },
} as Page;

export default function PageDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white">
            <PageRenderer page={page} />
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
