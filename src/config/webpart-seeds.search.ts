/**
 * Seeds des webparts de recherche (résultats + filtres) — extraits de
 * webpart-seeds.ts pour rester sous ~200 lignes/fichier. Même principe :
 * structure ici, textes dans seed-strings, noms via profile-text.
 */
import type { Locale } from '@/types/project';
import { profileFullName } from '@/lib/profiles/profile-text';
import { getSeedStrings } from './seed-strings';

const img = (q: string) => `https://images.unsplash.com/${q}?w=1200&auto=format`;

export const searchResultsSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).searchResults;
  const n = (x: string) => profileFullName(x, locale);
  const L = s.labels;
  // [profil auteur, date modifiée, contentType, extension?, thumbnail?] zippé avec s.items.
  const props = (author: string, modified: string, ownerLabel = L.author, dateLabel = L.modified) => (tags: readonly string[]) => [
    { name: 'author', displayName: ownerLabel, type: 'user' as const, value: n(author) },
    { name: 'modified', displayName: dateLabel, type: 'date' as const, value: modified },
    { name: 'tags', displayName: L.tags, type: 'tags' as const, value: [...tags] },
  ];
  return {
    verticals: [...s.verticals],
    items: [
      { id: 'sr1', name: s.items[0].name, contentType: 'document' as const, extension: '.pptx', thumbnailUrl: img('photo-1454165804606-c3d57bc86b40'), url: '#', properties: props('001', '2026-06-02')(s.items[0].tags) },
      { id: 'sr2', name: s.items[1].name, contentType: 'document' as const, extension: '.pdf', url: '#', properties: props('005', '2026-05-28')(s.items[1].tags) },
      { id: 'sr3', name: s.items[2].name, contentType: 'document' as const, extension: '.xlsx', url: '#', properties: props('002', '2026-06-04')(s.items[2].tags) },
      { id: 'sr4', name: s.items[3].name, contentType: 'site' as const, thumbnailUrl: img('photo-1522071820081-009f0129c71c'), url: '#', properties: props('001', '2026-06-01', L.owner)(s.items[3].tags) },
      { id: 'sr5', name: s.items[4].name, contentType: 'document' as const, extension: '.docx', url: '#', properties: props('008', '2026-05-30')(s.items[4].tags) },
      { id: 'sr6', name: s.items[5].name, contentType: 'news' as const, thumbnailUrl: img('photo-1486406146926-c627a92ad1ab'), url: '#', properties: props('001', '2026-05-28', L.author, L.published)(s.items[5].tags) },
      { id: 'sr7', name: s.items[6].name, contentType: 'document' as const, extension: '.docx', url: '#', properties: props('005', '2026-05-26')(s.items[6].tags) },
      { id: 'sr8', name: s.items[7].name, contentType: 'document' as const, extension: '.xlsx', url: '#', properties: props('007', '2026-06-03')(s.items[7].tags) },
    ],
  };
};

export const searchFiltersSeed = (locale: Locale) => {
  const s = getSeedStrings(locale).searchResults;
  const n = (x: string) => profileFullName(x, locale);
  return {
    facets: [
      { name: 'fileType', displayName: s.facets.fileType, buckets: [
        { key: '.docx', label: 'Word', count: 3 },
        { key: '.xlsx', label: 'Excel', count: 2 },
        { key: '.pptx', label: 'PowerPoint', count: 1 },
        { key: '.pdf', label: 'PDF', count: 1 },
      ] },
      { name: 'contentType', displayName: s.facets.contentType, buckets: [
        { key: 'document', label: s.facets.contentBuckets[0], count: 6 },
        { key: 'site', label: s.facets.contentBuckets[1], count: 1 },
        { key: 'news', label: s.facets.contentBuckets[2], count: 1 },
      ] },
      { name: 'author', displayName: s.facets.author, buckets: ['001', '005', '002'].map((x) => ({ key: n(x), label: n(x) })) },
    ],
  };
};
