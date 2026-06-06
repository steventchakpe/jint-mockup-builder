import type { DemoStrings } from './demo-strings.types';

/** Chrome strings — English. */
export const en: DemoStrings = {
  dateLocale: 'en-US',

  suite: {
    appName: 'SharePoint',
    searchPlaceholder: 'Search this site',
    apps: 'Apps',
    notifications: 'Notifications',
    settings: 'Settings',
    help: 'Help',
    more: 'More',
    search: 'Search',
    account: 'Account',
  },

  header: {
    hubTitle: 'Hub site title',
    hubLinks: ['Primary link', 'Primary link', 'Primary link', 'Primary group'],
    siteTitle: 'SharePoint site title',
    labels: ['Confidential', 'Corporate Advisory +2'],
    localNav: ['Home', 'Documents', 'Pages', 'Site contents'],
    following: 'Following',
    notFollowing: 'Not following',
    share: 'Share',
    members: (n: number) => `${n} members`,
    edit: 'Edit',
    menu: 'Menu',
  },

  toolbar: {
    newItem: 'New',
    promote: 'Promote',
    translation: 'Translation',
    pageDetails: 'Page details',
    analytics: 'Analytics',
    publishedOn: (date: string) => `Published ${date}`,
    share: 'Share',
    edit: 'Edit',
  },

  account: {
    chooseAccount: 'Pick an account',
    signedIn: 'Signed in',
    useAnother: 'Use another account',
    signOut: 'Sign out',
    viewAccount: 'View account',
    myProfile: 'My Microsoft 365 profile',
    signInAnother: 'Sign in with a different account',
    terms: 'Terms of use',
    privacy: 'Privacy & cookies',
  },

  footer: {
    groupHeader: 'Branches',
    link: (n: number) => `Branch ${n}`,
  },

  uex: {
    navigate: 'Navigate',
    apps: 'Apps',
    search: 'Search',
    contribute: 'Contribute',
    inform: 'Stay informed',
    goTo: 'Go to',
    alertText: 'Important information — check out the latest updates.',
    learnMore: 'Learn more',
    contributionCenter: 'Contribution center',
    article: 'Article',
    page: 'Page',
    settings: 'Settings',
    contentSharing: 'Content sharing',
    teams: 'Teams',
    engage: 'Engage',
    newsletter: 'Newsletter',
    notification: 'Notification',
    favorite: 'Favorite',
    navLinks: ['Home', 'News', 'Events', 'Directory', 'Documents'],
    feed: [
      'Launching our new intranet platform',
      'Quarterly results: sustained growth',
      'Cybersecurity training: June session',
      'Highlights from our annual offsite',
    ],
    appGroups: {
      myApps: 'My apps',
      communication: 'Communication',
      hr: 'HR',
      training: 'Training',
      support: 'Support',
    },
  },

  blank: {
    homeTitle: 'Home',
    homeSlug: 'home',
  },

  webparts: {
    addToCalendar: 'Add to calendar',
    noLocation: 'No location',
    noNews: 'No news to display.',
    noEvent: 'No upcoming events.',
    noTask: 'No tasks',
    noMeeting: 'No upcoming meetings',
    noEmail: 'No emails',
    noApps: 'No apps',
    noFiles: 'No recent files',
    noPerson: 'No one found.',
    noNewcomer: 'No newcomers',
    noAnniversary: 'No upcoming birthdays',
    noResult: 'No results',
    noImage: 'No image configured.',
    searchPerson: 'Search for a person',
    showMore: 'Show more',
  },
};
