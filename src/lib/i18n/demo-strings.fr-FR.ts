import type { DemoStrings } from './demo-strings.types';

/** Chaînes du chrome de la maquette — Français (France). */
export const frFR: DemoStrings = {
  /** Mapping vers la locale JS pour les formats de dates. */
  dateLocale: 'fr-FR',

  suite: {
    appName: 'SharePoint',
    searchPlaceholder: 'Rechercher sur ce site',
    apps: 'Applications',
    notifications: 'Notifications',
    settings: 'Paramètres',
    help: 'Aide',
    more: 'Plus',
    search: 'Rechercher',
    account: 'Compte',
  },

  header: {
    hubTitle: 'Titre du site hub',
    hubLinks: ['Lien principal', 'Lien principal', 'Lien principal', 'Groupe principal'],
    siteTitle: 'Titre du site SharePoint',
    labels: ['Confidentiel', 'Conseil stratégique +2'],
    localNav: ['Accueil', 'Documents', 'Pages', 'Contenu du site'],
    following: 'Suivi',
    notFollowing: 'Non suivi',
    share: 'Partager',
    members: (n: number) => `${n} membres`,
    edit: 'Modifier',
    menu: 'Menu',
  },

  toolbar: {
    newItem: 'Nouveau',
    promote: 'Promouvoir',
    translation: 'Traduction',
    pageDetails: 'Détails de la page',
    analytics: 'Analyse',
    publishedOn: (date: string) => `Publié le ${date}`,
    share: 'Partager',
    edit: 'Modifier',
  },

  account: {
    chooseAccount: 'Choisir un compte',
    signedIn: 'Connecté',
    useAnother: 'Utiliser un autre compte',
    signOut: 'Se déconnecter',
    viewAccount: 'Afficher le compte',
    myProfile: 'Mon profil Microsoft 365',
    signInAnother: 'Se connecter avec un autre compte',
    terms: 'Conditions d’utilisation',
    privacy: 'Confidentialité et cookies',
  },

  footer: {
    groupHeader: 'Filiales',
    link: (n: number) => `Filiale ${n}`,
  },

  uex: {
    navigate: 'Naviguer',
    apps: 'Applications',
    search: 'Rechercher',
    contribute: 'Contribuer',
    inform: 'S’informer',
    goTo: 'Aller à',
    alertText: 'Information importante — consultez les dernières mises à jour du moment.',
    learnMore: 'En savoir plus',
    contributionCenter: 'Centre de contribution',
    article: 'Article',
    page: 'Page',
    settings: 'Paramètres',
    contentSharing: 'Partage du contenu',
    teams: 'Teams',
    engage: 'Engage',
    newsletter: 'Newsletter',
    notification: 'Notification',
    favorite: 'Favori',
    navLinks: ['Accueil', 'Actualités', 'Événements', 'Annuaire', 'Documents'],
    feed: [
      'Lancement de notre nouvelle plateforme intranet',
      'Résultats du trimestre : une croissance soutenue',
      'Formation cybersécurité : session de juin',
      'Retour en images sur notre séminaire annuel',
    ],
    appGroups: {
      myApps: 'Mes applications',
      communication: 'Communication',
      hr: 'RH',
      training: 'Formation',
      support: 'Support',
    },
  },

  blank: {
    homeTitle: 'Accueil',
    homeSlug: 'accueil',
  },

  webparts: {
    addToCalendar: 'Ajouter au calendrier',
    noLocation: 'Aucun lieu',
    noNews: 'Aucune actualité à afficher.',
    noEvent: 'Aucun événement à venir.',
    noTask: 'Aucune tâche',
    noMeeting: 'Aucune réunion à venir',
    noEmail: 'Aucun e-mail',
    noApps: 'Aucune application',
    noFiles: 'Aucun fichier récent',
    noPerson: 'Aucune personne trouvée.',
    noNewcomer: 'Aucun nouvel arrivant',
    noAnniversary: 'Aucun anniversaire à venir',
    noResult: 'Aucun résultat',
    noImage: 'Aucune image configurée.',
    searchPerson: 'Rechercher une personne',
    showMore: 'Afficher plus',
  },
};
