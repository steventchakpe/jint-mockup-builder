/**
 * Données d'exemple par webpart — affichées à la pose (mode manuel), éditables inline.
 * Chaque seed est une factory `(locale) => content` : la structure (ids, dates,
 * images, statuts) vit ici, les textes dans seed-strings.{locale}.ts et les noms
 * dans profile-text.ts. Seeds figées à l'insertion (pas de re-seed au changement
 * de langue). Contenu réaliste sectoriellement neutre — remplacé par l'IA en Phase 3.
 */

import type { Locale } from '@/types/project';
import { createDefaultProfiles, DEFAULT_EMAIL_DOMAIN } from '@/lib/profiles/default-profiles';
import { profileFullName } from '@/lib/profiles/profile-text';
import { getProfileText } from '@/lib/profiles/profile-text';
import { getSeedStrings } from './seed-strings';

const img = (q: string) => `https://images.unsplash.com/${q}?w=1200&auto=format`;

export const newsSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).news;
  const n = (x: string) => profileFullName(x, locale);
  return {
    news: [
      { id: 'n1', title: s[0].title, chapo: s[0].chapo, imageUrl: img('photo-1486406146926-c627a92ad1ab'), authorId: 'profile-001', author: n('001'), date: '2026-05-28T09:00:00Z', url: '#', viewCount: 634, likeCount: 87, tags: [{ id: 't1', name: s[0].tag }], pinned: true },
      { id: 'n2', title: s[1].title, chapo: s[1].chapo, imageUrl: img('photo-1611974789855-9c2a0a7236a3'), authorId: 'profile-002', author: n('002'), date: '2026-05-25T14:00:00Z', url: '#', viewCount: 1208, likeCount: 142, tags: [{ id: 't2', name: s[1].tag }] },
      { id: 'n3', title: s[2].title, chapo: s[2].chapo, imageUrl: img('photo-1550751827-4bd374c3f58b'), authorId: 'profile-004', author: n('004'), date: '2026-05-22T10:00:00Z', url: '#', viewCount: 489, likeCount: 56, tags: [{ id: 't3', name: s[2].tag }] },
      { id: 'n4', title: s[3].title, chapo: s[3].chapo, imageUrl: img('photo-1497366216548-37526070297c'), authorId: 'profile-006', author: n('006'), date: '2026-05-19T16:00:00Z', url: '#', viewCount: 1874, likeCount: 203, tags: [{ id: 't4', name: s[3].tag }] },
    ],
  };
};

export const eventsSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).events;
  return {
    events: [
      { id: 'e1', title: s[0].title, location: s[0].location, startDate: '2026-06-10T09:00:00', url: '#', imageUrl: img('photo-1505373877841-8d25f7d46678') },
      { id: 'e2', title: s[1].title, location: s[1].location, startDate: '2026-06-13T14:00:00', url: '#' },
      { id: 'e3', title: s[2].title, location: s[2].location, startDate: '2026-06-18T18:00:00', url: '#' },
    ],
  };
};

export const focusSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).focus;
  return {
    card: {
      position: 'fill',
      tag: { value: s.tag, alignment: 'left' },
      title: { value: s.title, alignment: 'left', color: '#ffffff' },
      description: { value: s.description, alignment: 'left', color: '#ffffff' },
    },
    redirection: {
      linkUrl: '#',
      buttonProps: { value: s.button, alignment: 'left', type: 'primary', position: 'below', visible: true },
    },
  };
};

export const separatorSeed = (locale: Locale) => ({
  text: { value: getSeedStrings(locale).separator },
  showText: true,
});

// Référence les profils de l'annuaire par ID — nom/poste/photo/date hydratés au rendu.
export const newcomersSeed = (locale: Locale) => ({
  people: ['011', '012', '013'].map((x) => ({ id: `profile-${x}`, displayName: profileFullName(x, locale) })),
});

export const anniversarySeed = (locale: Locale) => ({
  people: ['005', '003', '007'].map((x) => ({ id: `profile-${x}`, displayName: profileFullName(x, locale) })),
});

// Tout l'annuaire (20 profils) — champs hydratés au rendu depuis les profils.
export const directorySeed = (locale: Locale) => ({
  people: createDefaultProfiles(DEFAULT_EMAIL_DOMAIN, locale).editable.map((p) => ({ id: p.id, displayName: `${p.firstName} ${p.lastName}` })),
});

export const myAppsSeed = (locale: Locale) => ({
  links: getSeedStrings(locale).myApps.map((name, i) => ({ id: `ap${i + 1}`, name, url: '#' })),
});

export const profileSeed = (locale: Locale) => ({
  profile: { profileId: 'profile-001', name: profileFullName('001', locale) },
});

export const docsSeed = (locale: Locale) => {
  const t = getSeedStrings(locale).docs;
  return {
    files: [
      { id: 'f1', title: t[0], extension: '.pptx', previewUrl: img('photo-1454165804606-c3d57bc86b40'), url: '#' },
      { id: 'f2', title: t[1], extension: '.xlsx', url: '#' },
      { id: 'f3', title: t[2], extension: '.docx', previewUrl: img('photo-1450101499163-c8848c66ca85'), url: '#' },
      { id: 'f4', title: t[3], extension: '.pdf', url: '#' },
    ],
  };
};

export const myEmailsSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).myEmails;
  const n = (x: string) => profileFullName(x, locale);
  // [profil expéditeur, heure, lu, PJ] zippé avec les textes (subject/preview).
  const meta: Array<[string, string, boolean, boolean?]> = [
    ['001', '2026-06-05T09:24:00', false, true],
    ['005', '2026-06-05T08:47:00', false],
    ['004', '2026-06-04T17:32:00', true],
    ['002', '2026-06-04T11:05:00', true, true],
    ['003', '2026-06-03T15:18:00', true],
    ['006', '2026-06-03T09:51:00', true],
  ];
  return {
    emails: meta.map(([p, receptHour, isRead, hasAttachments], i) => ({
      id: `m${i + 1}`, displayName: n(p), receptHour, subject: s[i].subject, bodyPreview: s[i].preview, isRead, ...(hasAttachments ? { hasAttachments } : {}),
    })),
  };
};

export const myMeetingsSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).myMeetings;
  const n = (x: string) => profileFullName(x, locale);
  return {
    meetings: [
      { id: 'mt1', subject: s[0], startTime: '2026-06-05T09:00:00', endTime: '2026-06-05T10:30:00', status: 'accepted' as const, isOnlineMeeting: true, isOccurrence: true, attendees: [{ name: n('001') }, { name: n('002') }, { name: n('005') }] },
      { id: 'mt2', subject: s[1], startTime: '2026-06-05T11:00:00', endTime: '2026-06-05T11:30:00', status: 'accepted' as const, isOnlineMeeting: true, attendees: [{ name: n('003') }, { name: n('006') }] },
      { id: 'mt3', subject: s[2], startTime: '2026-06-05T14:00:00', endTime: '2026-06-05T15:00:00', status: 'tentativelyAccepted' as const, hasAttachments: true, attendees: [{ name: n('005') }] },
      { id: 'mt4', subject: s[3], startTime: '2026-06-05T16:00:00', endTime: '2026-06-05T17:30:00', status: 'notResponded' as const, attendees: [{ name: n('004') }, { name: n('002') }] },
      { id: 'mt5', subject: s[4], startTime: '2026-06-06T10:00:00', endTime: '2026-06-06T11:00:00', status: 'accepted' as const, isOnlineMeeting: true, attendees: [{ name: n('001') }, { name: n('003') }] },
      { id: 'mt6', subject: s[5], startTime: '2026-06-06T14:30:00', endTime: '2026-06-06T16:00:00', status: 'notResponded' as const, hasAttachments: true, attendees: [{ name: n('002') }] },
    ],
  };
};

export const newshubSeed = (locale: Locale) => {
  const c = getSeedStrings(locale).newshub;
  const jint = img('photo-1560179707-f14e90ef3623') + '&fit=crop&w=80';
  const academy = img('photo-1573164713988-8665fc963095') + '&fit=crop&w=80';
  return {
    posts: [
      { id: 'p1', author: 'Jint', logo: jint, date: '2026-06-04T10:00:00', source: 'LinkedIn' as const, content: c[0], images: [img('photo-1522071820081-009f0129c71c')], url: '#' },
      { id: 'p2', author: 'Jint', logo: jint, date: '2026-06-03T15:30:00', source: 'Twitter' as const, content: c[1], url: '#' },
      { id: 'p3', author: 'Jint Academy', logo: academy, date: '2026-06-02T09:00:00', source: 'YouTube' as const, content: c[2], images: [img('photo-1551434678-e076c223a692')], isVideo: true, url: '#' },
      { id: 'p4', author: 'Jint', logo: jint, date: '2026-06-01T14:00:00', source: 'LinkedIn' as const, content: c[3], images: [img('photo-1497366216548-37526070297c'), img('photo-1517245386807-bb43f82c33c4'), img('photo-1431540015161-0bf868a2d407'), img('photo-1505373877841-8d25f7d46678')], url: '#' },
      { id: 'p5', author: 'Jint', logo: jint, date: '2026-05-30T11:00:00', source: 'Twitter' as const, content: c[4], url: '#' },
      { id: 'p6', author: 'Jint Blog', logo: academy, date: '2026-05-28T08:30:00', source: 'Rss' as const, content: c[5], url: '#' },
    ],
  };
};

export const myTasksSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).myTasks;
  return {
    lists: [
      {
        id: 'l-important', name: s[0].name, kind: 'important' as const,
        tasks: [
          { id: 'tk1', title: s[0].tasks[0].title, completed: false, dueDate: '2026-06-08', checklist: [
            { id: 'tk1a', title: s[0].tasks[0].checklist![0], checked: true },
            { id: 'tk1b', title: s[0].tasks[0].checklist![1], checked: false },
          ] },
          { id: 'tk2', title: s[0].tasks[1].title, completed: false, dueDate: '2026-06-09' },
          { id: 'tk3', title: s[0].tasks[2].title, completed: true, dueDate: '2026-06-03' },
        ],
      },
      {
        id: 'l-planned', name: s[1].name, kind: 'planned' as const,
        tasks: [
          { id: 'tk4', title: s[1].tasks[0].title, completed: false, dueDate: '2026-06-10' },
          { id: 'tk5', title: s[1].tasks[1].title, completed: false, dueDate: '2026-06-12' },
        ],
      },
      {
        id: 'l-assigned', name: s[2].name, kind: 'assigned' as const,
        tasks: [
          { id: 'tk6', title: s[2].tasks[0].title, completed: false, dueDate: '2026-06-11', checklist: [
            { id: 'tk6a', title: s[2].tasks[0].checklist![0], checked: false },
          ] },
        ],
      },
    ],
  };
};

// ids = profils de l'annuaire ; managerId résolu depuis profile.manager au rendu.
export const orgChartSeed = (locale: Locale) => {
  const e = (x: string, m: string | null) => ({ id: `profile-${x}`, displayName: profileFullName(x, locale), managerId: m ? `profile-${m}` : null });
  return {
    employees: [
      e('008', null), e('001', '008'), e('002', '008'), e('005', '008'),
      e('006', '001'), e('011', '001'), e('007', '002'), e('003', '009'), e('009', '008'),
    ],
  };
};

export const imageInteractiveSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).imageInteractive;
  return {
    imageUrl: img('photo-1497366754035-f200968a6e72'),
    altText: s.alt,
    shapes: [
      { id: 's1', type: 'pinpoint' as const, x: 28, y: 38, showTooltip: true, url: '#', tooltipItems: [
        { type: 'title' as const, value: s.shapes[0].title, size: 'H3' as const },
        { type: 'paragraph' as const, value: s.shapes[0].paragraph! },
      ] },
      { id: 's2', type: 'pinpoint' as const, x: 62, y: 55, showTooltip: true, url: '#', tooltipItems: [
        { type: 'title' as const, value: s.shapes[1].title, size: 'H3' as const },
        { type: 'paragraph' as const, value: s.shapes[1].paragraph! },
      ] },
      { id: 's3', type: 'rectangle' as const, x: 80, y: 30, width: 18, height: 22, showTooltip: true, url: '#', tooltipItems: [
        { type: 'title' as const, value: s.shapes[2].title, size: 'H3' as const },
      ] },
    ],
  };
};

export const myResumeSeed = (locale: Locale) => ({
  userName: getProfileText(locale)['001'][0],
  dashboardName: getSeedStrings(locale).myResume.dashboardName,
  cards: [
    { cardType: 'meetings' as const, itemsLeft: 3 },
    { cardType: 'mails' as const, itemsLeft: 12 },
    { cardType: 'tasks' as const, itemsLeft: 5 },
  ],
});

export const actionButtonSeed = (locale: Locale) => ({
  text: getSeedStrings(locale).actionButton,
  url: '#',
});

export const mesDocumentsSeed = (locale: Locale) => {
  const titles = getSeedStrings(locale).mesDocuments.documents;
  const profiles = createDefaultProfiles(DEFAULT_EMAIL_DOMAIN, locale).editable;
  const types = ['pptx', 'xlsx', 'docx', 'pdf', 'docx'];
  const dates = ['2026-06-05', '2026-06-03', '2026-05-31', '2026-05-28', '2026-05-26'];
  return {
    documents: titles.map((title, i) => ({
      id: `mydoc-${i + 1}`,
      title,
      url: '#',
      fileType: types[i % types.length],
      modifiedDate: dates[i % dates.length],
      modifiedBy: `${profiles[i % profiles.length].firstName} ${profiles[i % profiles.length].lastName}`,
    })),
  };
};

export const pollSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).poll;
  const votes = [58, 34, 12];
  return {
    question: s.question,
    userHasVoted: false,
    options: s.options.map((label, i) => ({ id: `opt-${i + 1}`, label, votes: votes[i] ?? 0 })),
  };
};

export const ideaBoxSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).ideaBox;
  // Auteur de la réponse = profil contributeur (001), cohérent avec l'annuaire.
  const author = createDefaultProfiles(DEFAULT_EMAIL_DOMAIN, locale).editable[0];
  const votes = [42, 28, 17, 11, 6];
  return {
    ideas: s.ideas.map((it, i) => ({
      id: `idea-${i + 1}`,
      title: it.title,
      idea: it.idea,
      votes: votes[i] ?? 0,
      userHasVoted: i === 1,
      // La 1re idée (la plus votée) a une réponse officielle de l'équipe.
      answer: i === 0
        ? { authorName: `${author.firstName} ${author.lastName}`, authorTitle: author.jobTitle, authorAvatar: author.avatar, state: s.answer.state, text: s.answer.text }
        : null,
    })),
  };
};

export { searchResultsSeed, searchFiltersSeed } from './webpart-seeds.search';
