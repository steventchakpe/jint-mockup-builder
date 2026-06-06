// Synchro inverse de l'hydratation (hydrate.ts) : une édition inline sur un
// champ lié à un profil (nom, poste, photo… directement sur le webpart) est
// reportée dans l'annuaire — qui reste la source de vérité et propage à son
// tour la modification à tous les webparts qui référencent ce profil.
import type { Profile } from '@/types/project';

type Content = Record<string, unknown>;
type Item = Record<string, unknown>;
/** content field → updates de profil correspondants. */
type FieldMap = Record<string, (value: unknown) => Partial<Profile>>;

/** « Léa Girard » → { firstName: 'Léa', lastName: 'Girard' }. */
function splitName(value: unknown): Partial<Profile> {
  const s = String(value).trim();
  const i = s.indexOf(' ');
  return i < 0 ? { firstName: s } : { firstName: s.slice(0, i), lastName: s.slice(i + 1) };
}

const str = (key: keyof Profile) => (value: unknown): Partial<Profile> => ({ [key]: String(value) });

/** Par type de webpart : où est la liste, comment retrouver le profil, quels champs synchroniser. */
const SYNC_RULES: Record<string, { listKey: string; refKey: (item: Item) => string | undefined; fields: FieldMap }> = {
  'newcomers': { listKey: 'people', refKey: (i) => i.id as string, fields: { displayName: splitName, jobTitle: str('jobTitle'), imageUrl: str('avatar') } },
  'anniversary': { listKey: 'people', refKey: (i) => i.id as string, fields: { displayName: splitName, jobTitle: str('jobTitle'), imageUrl: str('avatar') } },
  'employee-directory': { listKey: 'people', refKey: (i) => i.id as string, fields: { displayName: splitName, title: str('jobTitle'), department: str('department'), location: str('location'), imageUrl: str('avatar'), bio: str('bio') } },
  'org-chart': { listKey: 'employees', refKey: (i) => (i.profileId ?? i.id) as string, fields: { displayName: splitName, jobTitle: str('jobTitle'), department: str('department'), location: str('location'), imageUrl: str('avatar') } },
  'news': { listKey: 'news', refKey: (i) => i.authorId as string | undefined, fields: { author: splitName, authorAvatar: str('avatar') } },
  'news-v2': { listKey: 'news', refKey: (i) => i.authorId as string | undefined, fields: { author: splitName, authorAvatar: str('avatar') } },
};

export interface ProfileSync {
  profileId: string;
  updates: Partial<Profile>;
}

/** Compare deux items et accumule les updates de profil pour les champs liés qui ont changé. */
function diffItem(prev: Item, next: Item, fields: FieldMap): Partial<Profile> {
  let updates: Partial<Profile> = {};
  for (const [key, toProfile] of Object.entries(fields)) {
    if (next[key] !== undefined && next[key] !== prev[key]) {
      updates = { ...updates, ...toProfile(next[key]) };
    }
  }
  return updates;
}

/**
 * Détecte les champs liés à un profil modifiés entre le contenu affiché (hydraté)
 * et le contenu committé par l'édition inline → liste des profils à mettre à jour.
 */
export function syncEditToProfiles(type: string, prev: Content, next: Content, profiles: Profile[]): ProfileSync[] {
  if (profiles.length === 0) return [];
  const known = new Set(profiles.map((p) => p.id));
  const syncs: ProfileSync[] = [];

  // Webpart Profile : objet unique référencé par profileId
  if (type === 'profile') {
    const prevP = prev.profile as Item | undefined;
    const nextP = next.profile as Item | undefined;
    const ref = nextP?.profileId as string | undefined;
    if (prevP && nextP && ref && known.has(ref)) {
      const updates = diffItem(prevP, nextP, { name: splitName, jobTitle: str('jobTitle'), department: str('department'), location: str('location'), avatar: str('avatar') });
      if (Object.keys(updates).length) syncs.push({ profileId: ref, updates });
    }
    return syncs;
  }

  const rule = SYNC_RULES[type];
  if (!rule) return [];
  const prevList = prev[rule.listKey];
  const nextList = next[rule.listKey];
  if (!Array.isArray(prevList) || !Array.isArray(nextList)) return [];

  for (const nextItem of nextList as Item[]) {
    const ref = rule.refKey(nextItem);
    if (!ref || !known.has(ref)) continue;
    const prevItem = (prevList as Item[]).find((i) => rule.refKey(i) === ref);
    if (!prevItem) continue;
    const updates = diffItem(prevItem, nextItem, rule.fields);
    if (Object.keys(updates).length) syncs.push({ profileId: ref, updates });
  }
  return syncs;
}
