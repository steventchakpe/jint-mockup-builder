import { PageShell } from '@/components/structural/PageShell';
import { PageRenderer } from '@/components/canvas';
import type { Page, Section, WebpartInstance } from '@/types/project';
import { myAppsDefaultConfig } from '@/components/webparts/my-apps';
import { myAppsSeed } from '@/config/webpart-seeds';

const focusWp: WebpartInstance = {
  id: 'wp-focus', type: 'focus', order: 0,
  config: { title: '', height: 300, radius: 12, shadow: 'Strong', background: { type: 'image', url: '/focus-banner-default.jpg', position: 'center center', adjustment: 'cover' } },
  content: {
    card: {
      position: 'fill',
      tag: { value: 'À la une', alignment: 'left' },
      title: { value: 'Bienvenue sur votre intranet', alignment: 'left', color: '#ffffff' },
      description: { value: 'Retrouvez actualités, événements et collègues en un coup d’œil.', alignment: 'left', color: '#ffffff' },
    },
    redirection: { linkUrl: '#', buttonProps: { value: 'Découvrir', alignment: 'left', type: 'primary', position: 'below', visible: true, color: '#000000' } },
  },
};

const events: WebpartInstance = {
  id: 'wp-ev', type: 'events', order: 0,
  config: { title: 'Prochains événements', maxItems: 2, radius: 12, shadow: 'Strong', showAddToCalendar: true },
  content: { events: [
    { id: 'e1', title: 'Assemblée générale', location: 'Auditorium', startDate: '2026-06-09T09:00:00', url: '#' },
    { id: 'e2', title: 'Atelier ESG', location: 'Salle Lyon', startDate: '2026-06-12T14:00:00', url: '#' },
  ] },
};

const sep: WebpartInstance = {
  id: 'wp-sep', type: 'separator', order: 0,
  config: { alignment: 'center', barHeight: 'thin', barLength: 100, textPosition: 'inBetween', barColor: 'var(--sp-theme-primary)' },
  content: { text: { value: 'Nos actualités', color: 'var(--sp-theme-primary)' }, showText: true },
};

const newcomers: WebpartInstance = {
  id: 'wp-nc', type: 'newcomers', order: 0,
  config: { mode: 'Newcomers', title: 'Nouveaux arrivants', height: 416, radius: 12, shadow: 'medium' },
  content: { people: [
    { id: 'n1', displayName: 'Léa Girard', jobTitle: 'Communication', date: '2026-05-25' },
    { id: 'n2', displayName: 'Karim Benali', jobTitle: 'Développeur', date: '2026-06-01' },
    { id: 'n3', displayName: 'Emma Petit', jobTitle: 'Data', date: '2026-06-03' },
  ] },
};

const col = (id: string, index: number, wp: WebpartInstance) => ({ id, index, webparts: [wp] });

const myApps: WebpartInstance = {
  id: 'wp-apps', type: 'my-apps', order: 0,
  config: { ...myAppsDefaultConfig } as unknown as Record<string, unknown>,
  content: myAppsSeed('fr-FR') as unknown as Record<string, unknown>,
  flex: { x: 0, w: 12, y: 0, z: 1 },
};

const sections: Section[] = [
  { id: 's0', order: 0, layout: 'full-width', background: 'none', backgroundImage: null, collapsible: false, title: null, columns: [col('c0', 0, focusWp)] },
  { id: 'sf', order: 1, layout: 'flexible', background: 'none', backgroundImage: null, collapsible: false, title: null, columns: [col('cf', 0, myApps)] },
  { id: 's1', order: 2, layout: 'one-column', background: 'none', backgroundImage: null, collapsible: false, title: null, columns: [col('cs', 0, sep)] },
  { id: 's2', order: 2, layout: 'two-column', background: 'none', backgroundImage: null, collapsible: false, title: null, columns: [col('c1', 0, events), col('c2', 1, newcomers)] },
];

const demoPage: Page = {
  id: 'demo', title: 'Accueil', slug: 'accueil', icon: '', order: 0,
  sections, verticalSection: null,
};

export default function FullPage() {
  return (
    <PageShell>
      <PageRenderer page={demoPage} />
    </PageShell>
  );
}
