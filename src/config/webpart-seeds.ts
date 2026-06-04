/**
 * Données d'exemple par webpart — affichées à la pose (mode manuel), éditables inline.
 * Contenu réaliste sectoriellement neutre (corporate). Remplacé par l'IA en Phase 3.
 * Règles : pas de lorem ipsum, dates récentes, noms cohérents, images via Unsplash.
 */

const img = (q: string) => `https://images.unsplash.com/${q}?w=1200&auto=format`;

export const newsSeed = {
  news: [
    {
      id: 'n1', title: 'Lancement de notre nouvelle plateforme intranet',
      chapo: "La direction de la communication présente le nouvel espace collaboratif déployé pour tous les collaborateurs.",
      imageUrl: img('photo-1486406146926-c627a92ad1ab'), author: 'Claire Fontaine',
      date: '2026-05-28T09:00:00Z', url: '#', viewCount: 634, likeCount: 87,
      tags: [{ id: 't1', name: 'Communication' }], pinned: true,
    },
    {
      id: 'n2', title: 'Résultats du trimestre : une croissance soutenue',
      chapo: 'Les performances confirment la dynamique du groupe sur l’ensemble de ses activités.',
      imageUrl: img('photo-1611974789855-9c2a0a7236a3'), author: 'Marc Lefebvre',
      date: '2026-05-25T14:00:00Z', url: '#', viewCount: 1208, likeCount: 142,
      tags: [{ id: 't2', name: 'Finance' }],
    },
    {
      id: 'n3', title: 'Formation cybersécurité : session de juin',
      chapo: 'Une nouvelle session de sensibilisation est ouverte à tous les collaborateurs ce mois-ci.',
      imageUrl: img('photo-1550751827-4bd374c3f58b'), author: 'Sophie Aubert',
      date: '2026-05-22T10:00:00Z', url: '#', viewCount: 489, likeCount: 56,
      tags: [{ id: 't3', name: 'IT & Sécurité' }],
    },
    {
      id: 'n4', title: 'Retour en images sur notre séminaire annuel',
      chapo: 'Deux jours d’échanges et d’ateliers qui ont réuni les équipes autour de nos priorités.',
      imageUrl: img('photo-1497366216548-37526070297c'), author: 'Thomas Bernard',
      date: '2026-05-19T16:00:00Z', url: '#', viewCount: 1874, likeCount: 203,
      tags: [{ id: 't4', name: "Vie d'entreprise" }],
    },
  ],
};

export const eventsSeed = {
  events: [
    { id: 'e1', title: 'Assemblée générale annuelle', location: 'Auditorium', startDate: '2026-06-10T09:00:00', url: '#', imageUrl: img('photo-1505373877841-8d25f7d46678') },
    { id: 'e2', title: 'Atelier conformité & RGPD', location: 'Salle Lyon', startDate: '2026-06-13T14:00:00', url: '#' },
    { id: 'e3', title: 'Afterwork équipes', location: 'Rooftop', startDate: '2026-06-18T18:00:00', url: '#' },
  ],
};

export const newcomersSeed = {
  people: [
    { id: 'nc1', displayName: 'Léa Girard', jobTitle: 'Chargée de communication', date: '2026-05-26' },
    { id: 'nc2', displayName: 'Karim Benali', jobTitle: 'Développeur', date: '2026-06-01' },
    { id: 'nc3', displayName: 'Emma Petit', jobTitle: 'Analyste data', date: '2026-06-03' },
  ],
};

export const anniversarySeed = {
  people: [
    { id: 'an1', displayName: 'Julien Moreau', jobTitle: 'Responsable RH', date: '2019-06-09' },
    { id: 'an2', displayName: 'Nadia Cherif', jobTitle: 'Cheffe de projet', date: '2021-06-12' },
    { id: 'an3', displayName: 'Paul Renaud', jobTitle: 'Comptable', date: '2017-06-15' },
  ],
};

export const directorySeed = {
  people: [
    { id: 'd1', displayName: 'Claire Fontaine', title: 'Directrice communication', department: 'Communication', location: 'Paris' },
    { id: 'd2', displayName: 'Marc Lefebvre', title: 'Directeur financier', department: 'Finance', location: 'Paris' },
    { id: 'd3', displayName: 'Sophie Aubert', title: 'RSSI', department: 'IT', location: 'Lyon' },
    { id: 'd4', displayName: 'Julien Moreau', title: 'Responsable RH', department: 'RH', location: 'Paris' },
    { id: 'd5', displayName: 'Nadia Cherif', title: 'Cheffe de projet', department: 'Opérations', location: 'Lyon' },
    { id: 'd6', displayName: 'Thomas Bernard', title: 'Chargé de communication', department: 'Communication', location: 'Paris' },
  ],
};

export const myAppsSeed = {
  links: [
    { id: 'ap1', name: 'Portail RH', url: '#' },
    { id: 'ap2', name: 'Support IT', url: '#' },
    { id: 'ap3', name: 'Notes de frais', url: '#' },
    { id: 'ap4', name: 'Annuaire', url: '#' },
    { id: 'ap5', name: 'Documents', url: '#' },
    { id: 'ap6', name: 'Congés', url: '#' },
  ],
};
