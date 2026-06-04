import { PageShell } from '@/components/structural/PageShell';
import { News } from '@/components/webparts/news';
import type { NewsContent, NewsConfig } from '@/components/webparts/news';

const demoContent: NewsContent = {
  news: [
    {
      id: 'a1',
      title: 'Lancement de la nouvelle plateforme de gestion des risques ESG',
      chapo: "La direction Risques & Conformité annonce le déploiement de l'outil de monitoring ESG intégré à SharePoint.",
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format',
      author: 'Claire Fontaine',
      authorEmail: 'claire.fontaine@contoso.com',
      date: '2026-03-24T09:00:00Z',
      url: '#',
      viewCount: 634,
      likeCount: 87,
      tags: [{ id: 't1', name: 'Risques & Conformité' }],
      pinned: true,
    },
    {
      id: 'a2',
      title: 'Résultats T1 2026 — Croissance de 8,3 % du PNB',
      chapo: 'Les résultats du premier trimestre confirment la dynamique de croissance du groupe sur tous les segments.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format',
      author: 'Marc Lefebvre',
      date: '2026-03-21T14:00:00Z',
      url: '#',
      viewCount: 1208,
      likeCount: 142,
      tags: [{ id: 't2', name: 'Finance' }],
    },
    {
      id: 'a3',
      title: "Formation obligatoire cybersécurité — Session d'avril",
      chapo: 'Tous les collaborateurs doivent suivre la nouvelle session de sensibilisation avant la fin du mois.',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format',
      author: 'Sophie Aubert',
      date: '2026-03-18T10:00:00Z',
      url: '#',
      viewCount: 489,
      likeCount: 56,
      tags: [{ id: 't3', name: 'IT & Sécurité' }],
    },
    {
      id: 'a4',
      title: 'Ouverture du nouveau siège de Lyon — Retour en images',
      chapo: 'Retour en images sur l’inauguration de nos nouveaux locaux lyonnais en présence des équipes.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format',
      author: 'Thomas Bernard',
      date: '2026-03-15T16:00:00Z',
      url: '#',
      viewCount: 1874,
      likeCount: 203,
      tags: [{ id: 't4', name: "Vie d'entreprise" }],
    },
  ],
};

const newsConfig: NewsConfig = {
  layout: 'topStory',
  newsAmount: 6,
  rounded: 'normal',
  shadow: 'None',
  showPin: true,
  title: 'Toutes les actualités',
  customContent: {
    showViewCount: true,
    showLikeCount: true,
    showLikeButton: true,
    showShareButton: true,
    showTags: true,
    showDate: true,
    showAuthor: true,
  },
};

export default function NewsDemoPage() {
  return (
    <PageShell>
      <div className="px-lg py-xl">
        <News config={newsConfig} content={demoContent} />
      </div>
    </PageShell>
  );
}
