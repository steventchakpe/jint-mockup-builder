import { People } from '@/components/webparts/people';
import { newcomersDefaultConfig, anniversaryDefaultConfig } from '@/components/webparts/people';
import type { PeopleContent } from '@/components/webparts/people';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const av = (s: string) => `https://images.unsplash.com/${s}?w=120&h=120&fit=crop&crop=faces`;

// Dates récentes pour Newcomers (embauches du dernier mois)
const newcomers: PeopleContent = {
  people: [
    { id: 'n1', displayName: 'Léa Girard', jobTitle: 'Chargée de communication', imageUrl: av('photo-1544005313-94ddf0286df2'), email: 'lea.girard@contoso.com', date: '2026-05-18' },
    { id: 'n2', displayName: 'Karim Benali', jobTitle: 'Développeur', imageUrl: av('photo-1633332755192-727a05c4013d'), email: 'karim.benali@contoso.com', date: '2026-05-25' },
    { id: 'n3', displayName: 'Emma Petit', jobTitle: 'Analyste data', imageUrl: av('photo-1494790108377-be9c29b29330'), email: 'emma.petit@contoso.com', date: '2026-06-01' },
    { id: 'n4', displayName: 'Lucas Martin', jobTitle: 'Designer UX', imageUrl: av('photo-1507003211169-0a1dd7228f2d'), email: 'lucas.martin@contoso.com', date: '2026-06-03' },
  ],
};

// Dates anciennes → anniversaires pro (ancienneté en années)
const anniversaries: PeopleContent = {
  people: [
    { id: 'a1', displayName: 'Claire Fontaine', jobTitle: 'Directrice Risques', imageUrl: av('photo-1534528741775-53994a69daeb'), email: 'claire.fontaine@contoso.com', date: '2019-06-05' },
    { id: 'a2', displayName: 'Marc Lefebvre', jobTitle: 'Directeur Financier', imageUrl: av('photo-1500648767791-00dcc994a43e'), email: 'marc.lefebvre@contoso.com', date: '2016-06-08' },
    { id: 'a3', displayName: 'Sophie Aubert', jobTitle: 'RSSI', imageUrl: av('photo-1438761681033-6461ffad8d80'), email: 'sophie.aubert@contoso.com', date: '2021-06-10' },
  ],
};

export default function PeopleDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg flex flex-col gap-3xl">
              <People config={{ ...newcomersDefaultConfig, title: 'Nouveaux arrivants' }} content={newcomers} />
              <People config={{ ...anniversaryDefaultConfig, title: 'Anniversaires professionnels' }} content={anniversaries} />
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
