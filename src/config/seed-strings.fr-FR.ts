import type { SeedStrings } from './seed-strings.types';

/** Textes des seeds — Français (France). Structure zippée par index avec webpart-seeds.ts. */
export const seedFrFR: SeedStrings = {
  news: [
    { title: 'Lancement de notre nouvelle plateforme intranet', chapo: 'La direction de la communication présente le nouvel espace collaboratif déployé pour tous les collaborateurs.', tag: 'Communication' },
    { title: 'Résultats du trimestre : une croissance soutenue', chapo: 'Les performances confirment la dynamique du groupe sur l’ensemble de ses activités.', tag: 'Finance' },
    { title: 'Formation cybersécurité : session de juin', chapo: 'Une nouvelle session de sensibilisation est ouverte à tous les collaborateurs ce mois-ci.', tag: 'IT & Sécurité' },
    { title: 'Retour en images sur notre séminaire annuel', chapo: 'Deux jours d’échanges et d’ateliers qui ont réuni les équipes autour de nos priorités.', tag: "Vie d'entreprise" },
  ],
  events: [
    { title: 'Assemblée générale annuelle', location: 'Auditorium' },
    { title: 'Atelier conformité & RGPD', location: 'Salle Lyon' },
    { title: 'Afterwork équipes', location: 'Rooftop' },
  ],
  focus: { tag: 'À la une', title: 'Titre du focus', description: 'Décrivez ici le contenu mis en avant.', button: 'En savoir plus' },
  separator: 'Séparateur',
  myApps: ['Portail RH', 'Support IT', 'Notes de frais', 'Annuaire', 'Documents', 'Congés'],
  docs: ['Plan stratégique 2026', 'Budget prévisionnel T3', 'Compte-rendu comité de direction', 'Charte télétravail'],
  myEmails: [
    { subject: 'Validation de la communication interne', preview: 'Bonjour, peux-tu relire la note avant diffusion à l’ensemble des équipes ? Merci !' },
    { subject: 'Entretiens annuels — planning', preview: 'Le planning des entretiens est disponible. Merci de confirmer vos créneaux avant vendredi.' },
    { subject: 'Rappel : formation cybersécurité', preview: 'La session de sensibilisation a lieu jeudi à 14h en salle Lyon. Inscription obligatoire.' },
    { subject: 'Reporting T2 — chiffres consolidés', preview: 'Vous trouverez en pièce jointe le reporting consolidé du deuxième trimestre.' },
    { subject: 'Point projet hebdomadaire', preview: 'Compte-rendu du point de ce matin et prochaines étapes du déploiement.' },
    { subject: 'Photos du séminaire annuel', preview: 'Les photos du séminaire sont en ligne sur l’intranet, n’hésitez pas à les partager.' },
  ],
  myMeetings: [
    'Comité de direction hebdomadaire',
    'Point projet intranet',
    'Entretien annuel — équipe communication',
    'Atelier conformité & RGPD',
    'Préparation séminaire annuel',
    'Revue budgétaire T3',
  ],
  newshub: [
    'Fiers d’annoncer le lancement de notre nouvelle expérience intranet ! Une navigation repensée, des contenus personnalisés et une recherche unifiée pour tous les collaborateurs.',
    'Notre équipe sera présente au salon Digital Workplace Paris la semaine prochaine. Venez nous rencontrer au stand B12 ! #DigitalWorkplace #Intranet',
    'Nouveau tutoriel : créer une newsletter interne en 5 minutes.',
    'Retour en images sur notre séminaire annuel : deux jours d’ateliers et d’échanges autour de la communication interne.',
    'Merci à tous nos clients pour leur confiance : 96% de satisfaction sur le support cette année ! 🎉',
    '5 bonnes pratiques pour engager les équipes terrain avec votre intranet mobile : notifications ciblées, contenus courts, accès sans VPN…',
  ],
  myTasks: [
    { name: 'Important', tasks: [
      { title: 'Finaliser la note de cadrage intranet', checklist: ['Relire la partie gouvernance', 'Valider le planning avec la DSI'] },
      { title: 'Préparer le support du comité de direction' },
      { title: 'Envoyer le sondage de satisfaction interne' },
    ] },
    { name: 'Planifié', tasks: [
      { title: 'Réserver la salle pour l’atelier RGPD' },
      { title: 'Mettre à jour l’annuaire des équipes' },
    ] },
    { name: 'Qui me sont affectées', tasks: [
      { title: 'Rédiger l’article sur le séminaire', checklist: ['Sélectionner les photos'] },
    ] },
  ],
  imageInteractive: {
    alt: 'Plan des locaux',
    shapes: [
      { title: 'Espace collaboratif', paragraph: 'Open space et salles de réunion réservables.' },
      { title: 'Cafétéria', paragraph: 'Ouverte de 8h à 16h.' },
      { title: 'Accueil visiteurs' },
    ],
  },
  myResume: { dashboardName: 'l’intranet' },
  actionButton: 'Faire une demande',
  searchResults: {
    verticals: ['Tous', 'Documents', 'Sites', 'Actualités'],
    labels: { author: 'Auteur', owner: 'Propriétaire', modified: 'Modifié le', published: 'Publié le', tags: 'Tags' },
    items: [
      { name: 'Plan stratégique 2026', tags: ['Stratégie', 'Direction'] },
      { name: 'Charte télétravail', tags: ['RH'] },
      { name: 'Budget prévisionnel T3', tags: ['Finance'] },
      { name: 'Espace Communication', tags: ['Communication'] },
      { name: 'Compte-rendu comité de direction', tags: ['Direction'] },
      { name: 'Lancement de la nouvelle plateforme intranet', tags: ['Communication'] },
      { name: 'Guide d’accueil des nouveaux arrivants', tags: ['RH', 'Onboarding'] },
      { name: 'Reporting consolidé T2', tags: ['Finance'] },
    ],
    facets: { fileType: 'Type de fichier', contentType: 'Type de contenu', author: 'Auteur', contentBuckets: ['Documents', 'Sites', 'Actualités'] },
  },
  personal: {
    listName: 'Tâches',
    p2: {
      tasks: ['Valider le reporting consolidé T2', 'Préparer la revue budgétaire T3'],
      emails: [
        { subject: 'Clôture comptable mai', preview: 'La clôture est finalisée, le détail est en pièce jointe.' },
        { subject: 'Arbitrages budgétaires', preview: 'Peux-tu préparer les scénarios pour le prochain comité ?' },
      ],
      meeting: 'Revue budgétaire T3',
    },
    p3: {
      tasks: ['Mettre à jour le planning de déploiement'],
      emails: [
        { subject: 'Compte-rendu atelier', preview: 'Voici le compte-rendu de l’atelier de ce matin avec les actions.' },
      ],
      meeting: 'Point projet hebdomadaire',
    },
  },
};
