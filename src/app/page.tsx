import { News } from '@/components/webparts/news';
import type { NewsContent, NewsConfig } from '@/components/webparts/news';
import { SuiteHeader } from '@/components/shell/SuiteHeader';
import { SiteBar } from '@/components/shell/SiteBar';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';

const demoContent: NewsContent = {
  articles: [
    {
      id: 'a1',
      title: 'Lancement de la nouvelle plateforme de gestion des risques ESG',
      excerpt: "La direction Risques & Conformité annonce le déploiement de l'outil de monitoring ESG intégré à SharePoint.",
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format',
      category: 'Risques & Conformité',
      author: { profileId: 'profile-001', name: 'Claire Fontaine', jobTitle: 'Directrice Risques' },
      publishedAt: '2026-03-24T09:00:00Z',
      readTimeMinutes: 4,
      engagement: { likes: 87, comments: 12, views: 634 },
    },
    {
      id: 'a2',
      title: 'Résultats T1 2026 — Croissance de 8,3 % du PNB',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format',
      category: 'Finance',
      author: { profileId: 'profile-002', name: 'Marc Lefebvre', jobTitle: 'Directeur Financier' },
      publishedAt: '2026-03-21T14:00:00Z',
      readTimeMinutes: 6,
      engagement: { likes: 142, comments: 24, views: 1208 },
    },
    {
      id: 'a3',
      title: "Formation obligatoire cybersécurité — Session d'avril",
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format',
      category: 'IT & Sécurité',
      author: { profileId: 'profile-003', name: 'Sophie Aubert', jobTitle: 'RSSI' },
      publishedAt: '2026-03-18T10:00:00Z',
      readTimeMinutes: 3,
      engagement: { likes: 56, comments: 8, views: 489 },
    },
    {
      id: 'a4',
      title: 'Ouverture du nouveau siège de Lyon — Retour en images',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format',
      category: "Vie d'entreprise",
      author: { profileId: 'profile-004', name: 'Thomas Bernard', jobTitle: 'Responsable Communication' },
      publishedAt: '2026-03-15T16:00:00Z',
      readTimeMinutes: 2,
      engagement: { likes: 203, comments: 31, views: 1874 },
    },
  ],
};

const newsConfig: NewsConfig = {
  layout: 'carousel',
  format: 'responsive',
  radius: 'none',
  title: 'Toutes les actualités',
  maxItems: 4,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />

      <div className="flex flex-1">
        <SiteBar />

        <div className="flex flex-col flex-1 min-w-0">
          <SiteHeader />

          {/* Zone de contenu — max 1204px centré */}
          <main className="flex-1 bg-white py-xl">
            <div className="max-w-[1204px] mx-auto px-lg">
              <News config={newsConfig} content={demoContent} />
            </div>
          </main>

          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
