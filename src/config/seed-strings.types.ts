/**
 * Type des chaînes traduisibles des seeds de webparts (contenu de démo posé
 * à l'ajout d'un webpart). La STRUCTURE (ids, dates, images, statuts) vit dans
 * webpart-seeds.ts — ici uniquement les textes, zippés par index avec elle.
 * Les noms de personnes viennent de profile-text.ts (profileFullName), pas d'ici.
 */
export interface SeedStrings {
  news: ReadonlyArray<{ title: string; chapo: string; tag: string }>;
  events: ReadonlyArray<{ title: string; location: string }>;
  focus: { tag: string; title: string; description: string; button: string };
  separator: string;
  myApps: readonly string[];
  docs: readonly string[];
  myEmails: ReadonlyArray<{ subject: string; preview: string }>;
  myMeetings: readonly string[];
  newshub: readonly string[];
  myTasks: ReadonlyArray<{ name: string; tasks: ReadonlyArray<{ title: string; checklist?: readonly string[] }> }>;
  imageInteractive: { alt: string; shapes: ReadonlyArray<{ title: string; paragraph?: string }> };
  myResume: { dashboardName: string };
  actionButton: string;
  searchResults: {
    verticals: readonly string[];
    labels: { author: string; owner: string; modified: string; published: string; tags: string };
    items: ReadonlyArray<{ name: string; tags: readonly string[] }>;
    facets: { fileType: string; contentType: string; author: string; contentBuckets: readonly string[] };
  };
  ideaBox: {
    ideas: ReadonlyArray<{ title: string; idea: string }>;
    answer: { state: string; text: string };
  };
  poll: { title: string; question: string; options: readonly string[] };
  mesDocuments: { documents: readonly string[] };
  vivaEngage: { conversations: ReadonlyArray<{ text: string; comments: readonly string[] }> };
  /** Contenu « My * » des profils switchables 002/003 (US-30). */
  personal: {
    listName: string;
    p2: { tasks: readonly string[]; emails: ReadonlyArray<{ subject: string; preview: string }>; meeting: string };
    p3: { tasks: readonly string[]; emails: ReadonlyArray<{ subject: string; preview: string }>; meeting: string };
  };
}
