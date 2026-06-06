/**
 * Type des chaînes du chrome de la maquette (3 locales : fr-FR, fr-CA, en).
 * Couvre UNIQUEMENT le chrome (header, toolbar, UEX, footer, login, états vides
 * des webparts) — le contenu des webparts vit dans les seeds, multilingues à part.
 */
export interface DemoStrings {
  /** Locale JS pour les formats de dates (toLocaleDateString). */
  dateLocale: string;

  suite: {
    appName: string;
    searchPlaceholder: string;
    apps: string;
    notifications: string;
    settings: string;
    help: string;
    more: string;
    search: string;
    account: string;
  };

  header: {
    hubTitle: string;
    hubLinks: readonly string[];
    siteTitle: string;
    labels: readonly string[];
    localNav: readonly string[];
    following: string;
    notFollowing: string;
    share: string;
    members: (n: number) => string;
    edit: string;
    menu: string;
  };

  toolbar: {
    newItem: string;
    promote: string;
    translation: string;
    pageDetails: string;
    analytics: string;
    publishedOn: (date: string) => string;
    share: string;
    edit: string;
  };

  account: {
    chooseAccount: string;
    signedIn: string;
    useAnother: string;
    signOut: string;
    viewAccount: string;
    myProfile: string;
    signInAnother: string;
    terms: string;
    privacy: string;
  };

  footer: {
    groupHeader: string;
    link: (n: number) => string;
  };

  uex: {
    navigate: string;
    apps: string;
    search: string;
    contribute: string;
    inform: string;
    goTo: string;
    alertText: string;
    learnMore: string;
    contributionCenter: string;
    article: string;
    page: string;
    settings: string;
    contentSharing: string;
    teams: string;
    engage: string;
    newsletter: string;
    notification: string;
    favorite: string;
    navLinks: readonly string[];
    /** Feed « S'informer » du panneau Naviguer (titres de démo). */
    feed: readonly string[];
    appGroups: {
      myApps: string;
      communication: string;
      hr: string;
      training: string;
      support: string;
    };
  };

  /** Template de projet vierge (createBlankProject). */
  blank: {
    homeTitle: string;
    homeSlug: string;
  };

  webparts: {
    addToCalendar: string;
    noLocation: string;
    noNews: string;
    noEvent: string;
    noTask: string;
    noMeeting: string;
    noEmail: string;
    noApps: string;
    noFiles: string;
    noPerson: string;
    noNewcomer: string;
    noAnniversary: string;
    noResult: string;
    noImage: string;
    searchPerson: string;
    showMore: string;
  };
}
