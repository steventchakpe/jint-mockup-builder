import { Events } from '@/components/webparts/events';
import type { EventsContent, EventsConfig } from '@/components/webparts/events';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const demoContent: EventsContent = {
  events: [
    {
      id: 'e1',
      title: 'Assemblée générale annuelle 2026',
      location: 'Auditorium — Siège social',
      startDate: '2026-06-09T09:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&auto=format',
      url: '#',
    },
    {
      id: 'e2',
      title: 'Atelier conformité réglementaire ESG',
      location: 'Salle Lyon-Confluence',
      startDate: '2026-06-12T14:00:00',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format',
      url: '#',
    },
    {
      id: 'e3',
      title: 'Journée portes ouvertes — Nouveau siège',
      location: 'Hall principal, Lyon',
      startDate: '2026-06-18T10:00:00',
      isAllDay: true,
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&auto=format',
      url: '#',
    },
    {
      id: 'e4',
      title: 'Formation cybersécurité (session avril)',
      location: 'En ligne — Teams',
      startDate: '2026-06-23T08:30:00',
      url: '#',
    },
  ],
};

const eventsConfig: EventsConfig = {
  title: 'Prochains événements',
  maxItems: 4,
  radius: 12,
  shadow: 'Strong',
  showAddToCalendar: true,
};

export default function EventsDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />

      <div className="flex flex-1">
        <SiteBar />

        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />

          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg">
              <Events config={eventsConfig} content={demoContent} />
            </div>
          </main>

          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
