import { EmployeeDirectory } from '@/components/webparts/employee-directory';
import type { EmployeeDirectoryConfig, EmployeeDirectoryContent } from '@/components/webparts/employee-directory';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const av = (s: string) => `https://images.unsplash.com/${s}?w=160&h=160&fit=crop&crop=faces`;

const content: EmployeeDirectoryContent = {
  people: [
    { id: 'p1', displayName: 'Claire Fontaine', title: 'Directrice Risques', department: 'Risques', location: 'Paris', imageUrl: av('photo-1494790108377-be9c29b29330'), email: 'claire.fontaine@contoso.com', phone: '+33 1 23 45 67 89', bio: 'Pilote la stratégie de gestion des risques et la conformité ESG du groupe depuis 2019.', skills: ['Gestion des risques', 'ESG', 'Audit', 'Réglementaire'] },
    { id: 'p2', displayName: 'Marc Lefebvre', title: 'Directeur Financier', department: 'Finance', location: 'Lyon', imageUrl: av('photo-1500648767791-00dcc994a43e'), email: 'marc.lefebvre@contoso.com', phone: '+33 4 11 22 33 44', managerId: 'p1', bio: 'Responsable de la planification financière et du reporting groupe.', skills: ['Finance', 'Contrôle de gestion'] },
    { id: 'p3', displayName: 'Sophie Aubert', title: 'RSSI', department: 'IT & Sécurité', location: 'Nantes', imageUrl: av('photo-1438761681033-6461ffad8d80'), email: 'sophie.aubert@contoso.com', managerId: 'p1', skills: ['Cybersécurité', 'ISO 27001'] },
    { id: 'p4', displayName: 'Thomas Bernard', title: 'Responsable Communication', department: 'Communication', location: 'Paris', imageUrl: av('photo-1507003211169-0a1dd7228f2d'), email: 'thomas.bernard@contoso.com', managerId: 'p1' },
    { id: 'p5', displayName: 'Inès Moreau', title: 'Analyste Conformité', department: 'Conformité', location: 'Lille', imageUrl: av('photo-1534528741775-53994a69daeb'), email: 'ines.moreau@contoso.com' },
    { id: 'p6', displayName: 'Hugo Rousseau', title: 'Chef de projet', department: 'Opérations', location: 'Bordeaux', imageUrl: av('photo-1599566150163-29194dcaad36'), email: 'hugo.rousseau@contoso.com' },
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
