import { EmployeeDirectory } from '@/components/webparts/employee-directory';
import type { EmployeeDirectoryConfig, EmployeeDirectoryContent } from '@/components/webparts/employee-directory';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const av = (s: string) => `https://images.unsplash.com/${s}?w=160&h=160&fit=crop&crop=faces`;

const content: EmployeeDirectoryContent = {
  people: [
    { id: 'p1', displayName: 'Claire Fontaine', title: 'Directrice Risques', department: 'Risques', location: 'Paris', imageUrl: av('photo-1494790108377-be9c29b29330') },
    { id: 'p2', displayName: 'Marc Lefebvre', title: 'Directeur Financier', department: 'Finance', location: 'Lyon', imageUrl: av('photo-1500648767791-00dcc994a43e') },
    { id: 'p3', displayName: 'Sophie Aubert', title: 'RSSI', department: 'IT & Sécurité', location: 'Nantes', imageUrl: av('photo-1438761681033-6461ffad8d80') },
    { id: 'p4', displayName: 'Thomas Bernard', title: 'Responsable Communication', department: 'Communication', location: 'Paris', imageUrl: av('photo-1507003211169-0a1dd7228f2d') },
    { id: 'p5', displayName: 'Inès Moreau', title: 'Analyste Conformité', department: 'Conformité', location: 'Lille', imageUrl: av('photo-1534528741775-53994a69daeb') },
    { id: 'p6', displayName: 'Hugo Rousseau', title: 'Chef de projet', department: 'Opérations', location: 'Bordeaux', imageUrl: av('photo-1599566150163-29194dcaad36') },
  ],
};

const config: EmployeeDirectoryConfig = {
  title: 'Trombinoscope',
  description: 'Retrouvez vos collègues par nom, service ou site.',
  pageSize: 4,
  rounded: 'normal',
  shadow: 'medium',
};

export default function DirectoryDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <SiteBar />
        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg">
              <EmployeeDirectory config={config} content={content} />
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
