import { MyApps, myAppsDefaultConfig } from '@/components/webparts/my-apps';
import type { MyAppsContent } from '@/components/webparts/my-apps';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const ic = (n: string) => `https://cdn.simpleicons.org/${n}`;

const content: MyAppsContent = {
  links: [
    { id: 'l1', name: 'Outlook', url: '#', photoUrl: ic('microsoftoutlook') },
    { id: 'l2', name: 'Teams', url: '#', photoUrl: ic('microsoftteams') },
    { id: 'l3', name: 'SharePoint', url: '#', photoUrl: ic('microsoftsharepoint') },
    { id: 'l4', name: 'OneDrive', url: '#', photoUrl: ic('microsoftonedrive') },
    { id: 'l5', name: 'Excel', url: '#', photoUrl: ic('microsoftexcel') },
    { id: 'l6', name: 'Word', url: '#', photoUrl: ic('microsoftword') },
    { id: 'l7', name: 'Planner', url: '#' }, // pas d'icône → icône générique
    { id: 'l8', name: 'Viva Engage', url: '#' },
  ],
};

const large: MyAppsContent = {
  links: [
    { id: 'b1', name: 'Portail RH', url: '#', photoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200' },
    { id: 'b2', name: 'Support IT', url: '#', photoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200' },
    { id: 'b3', name: 'Intranet', url: '#', photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200' },
  ],
};

export default function MyAppsDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg flex flex-col gap-3xl">
              <MyApps config={{ ...myAppsDefaultConfig, title: 'Mes applications (medium)' }} content={content} />
              <MyApps config={{ ...myAppsDefaultConfig, cardSize: 'large', radius: 8, title: 'Raccourcis (large — nom au survol)' }} content={large} />
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
