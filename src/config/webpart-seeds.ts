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

export const profileSeed = {
  profile: {
    name: 'Claire Fontaine',
    jobTitle: 'Directrice communication',
    department: 'Communication',
    location: 'Paris',
    email: 'claire.fontaine@exemple.com',
    avatar: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop`,
  },
};

export const docsSeed = {
  files: [
    { id: 'f1', title: 'Plan stratégique 2026', extension: '.pptx', previewUrl: img('photo-1454165804606-c3d57bc86b40'), url: '#' },
    { id: 'f2', title: 'Budget prévisionnel T3', extension: '.xlsx', url: '#' },
    { id: 'f3', title: 'Compte-rendu comité de direction', extension: '.docx', previewUrl: img('photo-1450101499163-c8848c66ca85'), url: '#' },
    { id: 'f4', title: 'Charte télétravail', extension: '.pdf', url: '#' },
  ],
};

export const myEmailsSeed = {
  emails: [
    { id: 'm1', displayName: 'Claire Fontaine', receptHour: '2026-06-05T09:24:00', subject: 'Validation de la communication interne', bodyPreview: 'Bonjour, peux-tu relire la note avant diffusion à l’ensemble des équipes ? Merci !', isRead: false, hasAttachments: true },
    { id: 'm2', displayName: 'Julien Moreau', receptHour: '2026-06-05T08:47:00', subject: 'Entretiens annuels — planning', bodyPreview: 'Le planning des entretiens est disponible. Merci de confirmer vos créneaux avant vendredi.', isRead: false },
    { id: 'm3', displayName: 'Sophie Aubert', receptHour: '2026-06-04T17:32:00', subject: 'Rappel : formation cybersécurité', bodyPreview: 'La session de sensibilisation a lieu jeudi à 14h en salle Lyon. Inscription obligatoire.', isRead: true },
    { id: 'm4', displayName: 'Marc Lefebvre', receptHour: '2026-06-04T11:05:00', subject: 'Reporting T2 — chiffres consolidés', bodyPreview: 'Vous trouverez en pièce jointe le reporting consolidé du deuxième trimestre.', isRead: true, hasAttachments: true },
    { id: 'm5', displayName: 'Nadia Cherif', receptHour: '2026-06-03T15:18:00', subject: 'Point projet hebdomadaire', bodyPreview: 'Compte-rendu du point de ce matin et prochaines étapes du déploiement.', isRead: true },
    { id: 'm6', displayName: 'Thomas Bernard', receptHour: '2026-06-03T09:51:00', subject: 'Photos du séminaire annuel', bodyPreview: 'Les photos du séminaire sont en ligne sur l’intranet, n’hésitez pas à les partager.', isRead: true },
  ],
};

export const myMeetingsSeed = {
  meetings: [
    { id: 'mt1', subject: 'Comité de direction hebdomadaire', startTime: '2026-06-05T09:00:00', endTime: '2026-06-05T10:30:00', status: 'accepted' as const, isOnlineMeeting: true, isOccurrence: true, attendees: [{ name: 'Claire Fontaine' }, { name: 'Marc Lefebvre' }, { name: 'Julien Moreau' }] },
    { id: 'mt2', subject: 'Point projet intranet', startTime: '2026-06-05T11:00:00', endTime: '2026-06-05T11:30:00', status: 'accepted' as const, isOnlineMeeting: true, attendees: [{ name: 'Nadia Cherif' }, { name: 'Thomas Bernard' }] },
    { id: 'mt3', subject: 'Entretien annuel — équipe communication', startTime: '2026-06-05T14:00:00', endTime: '2026-06-05T15:00:00', status: 'tentativelyAccepted' as const, hasAttachments: true, attendees: [{ name: 'Julien Moreau' }] },
    { id: 'mt4', subject: 'Atelier conformité & RGPD', startTime: '2026-06-05T16:00:00', endTime: '2026-06-05T17:30:00', status: 'notResponded' as const, attendees: [{ name: 'Sophie Aubert' }, { name: 'Marc Lefebvre' }] },
    { id: 'mt5', subject: 'Préparation séminaire annuel', startTime: '2026-06-06T10:00:00', endTime: '2026-06-06T11:00:00', status: 'accepted' as const, isOnlineMeeting: true, attendees: [{ name: 'Claire Fontaine' }, { name: 'Nadia Cherif' }] },
    { id: 'mt6', subject: 'Revue budgétaire T3', startTime: '2026-06-06T14:30:00', endTime: '2026-06-06T16:00:00', status: 'notResponded' as const, hasAttachments: true, attendees: [{ name: 'Marc Lefebvre' }] },
  ],
};

export const newshubSeed = {
  posts: [
    { id: 'p1', author: 'Jint', logo: img('photo-1560179707-f14e90ef3623') + '&fit=crop&w=80', date: '2026-06-04T10:00:00', source: 'LinkedIn' as const, content: 'Fiers d’annoncer le lancement de notre nouvelle expérience intranet ! Une navigation repensée, des contenus personnalisés et une recherche unifiée pour tous les collaborateurs.', images: [img('photo-1522071820081-009f0129c71c')], url: '#' },
    { id: 'p2', author: 'Jint', logo: img('photo-1560179707-f14e90ef3623') + '&fit=crop&w=80', date: '2026-06-03T15:30:00', source: 'Twitter' as const, content: 'Notre équipe sera présente au salon Digital Workplace Paris la semaine prochaine. Venez nous rencontrer au stand B12 ! #DigitalWorkplace #Intranet', url: '#' },
    { id: 'p3', author: 'Jint Academy', logo: img('photo-1573164713988-8665fc963095') + '&fit=crop&w=80', date: '2026-06-02T09:00:00', source: 'YouTube' as const, content: 'Nouveau tutoriel : créer une newsletter interne en 5 minutes.', images: [img('photo-1551434678-e076c223a692')], isVideo: true, url: '#' },
    { id: 'p4', author: 'Jint', logo: img('photo-1560179707-f14e90ef3623') + '&fit=crop&w=80', date: '2026-06-01T14:00:00', source: 'LinkedIn' as const, content: 'Retour en images sur notre séminaire annuel : deux jours d’ateliers et d’échanges autour de la communication interne.', images: [img('photo-1497366216548-37526070297c'), img('photo-1517245386807-bb43f82c33c4'), img('photo-1431540015161-0bf868a2d407'), img('photo-1505373877841-8d25f7d46678')], url: '#' },
    { id: 'p5', author: 'Jint', logo: img('photo-1560179707-f14e90ef3623') + '&fit=crop&w=80', date: '2026-05-30T11:00:00', source: 'Twitter' as const, content: 'Merci à tous nos clients pour leur confiance : 96% de satisfaction sur le support cette année ! 🎉', url: '#' },
    { id: 'p6', author: 'Jint Blog', logo: img('photo-1573164713988-8665fc963095') + '&fit=crop&w=80', date: '2026-05-28T08:30:00', source: 'Rss' as const, content: '5 bonnes pratiques pour engager les équipes terrain avec votre intranet mobile : notifications ciblées, contenus courts, accès sans VPN…', url: '#' },
  ],
};

export const myTasksSeed = {
  lists: [
    {
      id: 'l-important', name: 'Important', kind: 'important' as const,
      tasks: [
        { id: 'tk1', title: 'Finaliser la note de cadrage intranet', completed: false, dueDate: '2026-06-08', checklist: [
          { id: 'tk1a', title: 'Relire la partie gouvernance', checked: true },
          { id: 'tk1b', title: 'Valider le planning avec la DSI', checked: false },
        ] },
        { id: 'tk2', title: 'Préparer le support du comité de direction', completed: false, dueDate: '2026-06-09' },
        { id: 'tk3', title: 'Envoyer le sondage de satisfaction interne', completed: true, dueDate: '2026-06-03' },
      ],
    },
    {
      id: 'l-planned', name: 'Planifié', kind: 'planned' as const,
      tasks: [
        { id: 'tk4', title: 'Réserver la salle pour l’atelier RGPD', completed: false, dueDate: '2026-06-10' },
        { id: 'tk5', title: 'Mettre à jour l’annuaire des équipes', completed: false, dueDate: '2026-06-12' },
      ],
    },
    {
      id: 'l-assigned', name: 'Qui me sont affectées', kind: 'assigned' as const,
      tasks: [
        { id: 'tk6', title: 'Rédiger l’article sur le séminaire', completed: false, dueDate: '2026-06-11', checklist: [
          { id: 'tk6a', title: 'Sélectionner les photos', checked: false },
        ] },
      ],
    },
  ],
};

export const orgChartSeed = {
  employees: [
    { id: 'oc1', displayName: 'Isabelle Marchand', jobTitle: 'Directrice générale', department: 'Direction', email: 'isabelle.marchand@exemple.com', managerId: null },
    { id: 'oc2', displayName: 'Claire Fontaine', jobTitle: 'Directrice communication', department: 'Communication', email: 'claire.fontaine@exemple.com', managerId: 'oc1' },
    { id: 'oc3', displayName: 'Marc Lefebvre', jobTitle: 'Directeur financier', department: 'Finance', email: 'marc.lefebvre@exemple.com', managerId: 'oc1' },
    { id: 'oc4', displayName: 'Julien Moreau', jobTitle: 'Responsable RH', department: 'RH', email: 'julien.moreau@exemple.com', managerId: 'oc1' },
    { id: 'oc5', displayName: 'Thomas Bernard', jobTitle: 'Chargé de communication', department: 'Communication', email: 'thomas.bernard@exemple.com', managerId: 'oc2' },
    { id: 'oc6', displayName: 'Léa Girard', jobTitle: 'Chargée de communication', department: 'Communication', email: 'lea.girard@exemple.com', managerId: 'oc2' },
    { id: 'oc7', displayName: 'Paul Renaud', jobTitle: 'Comptable', department: 'Finance', email: 'paul.renaud@exemple.com', managerId: 'oc3' },
    { id: 'oc8', displayName: 'Nadia Cherif', jobTitle: 'Cheffe de projet', department: 'Opérations', email: 'nadia.cherif@exemple.com', managerId: 'oc4' },
  ],
};
