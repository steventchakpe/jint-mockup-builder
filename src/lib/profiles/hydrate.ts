// Hydratation du contenu des webparts depuis l'annuaire des profils.
// Les webparts stockent des RÉFÉRENCES (id / profileId / authorId) ; au rendu,
// les champs d'identité (nom, poste, avatar, email…) sont résolus depuis les
// profils du projet → modifier un profil dans l'annuaire met à jour toute la
// maquette (PRD §6.9). Les valeurs stockées servent de fallback si l'ID est
// inconnu (profil supprimé, contenu saisi à la main).
import type { Profile } from '@/types/project';

type Content = Record<string, unknown>;
type ById = Map<string, Profile>;

const fullName = (p: Profile) => `${p.firstName} ${p.lastName}`;

/** people des webparts Newcomers / Anniversaries (date = startDate du profil). */
function hydratePeople(content: Content, byId: ById): Content {
  const people = content.people;
  if (!Array.isArray(people)) return content;
  return {
    ...content,
    people: people.map((person: { id?: string; date?: string }) => {
      const p = person.id ? byId.get(person.id) : undefined;
      if (!p) return person;
      return {
        ...person,
        displayName: fullName(p), jobTitle: p.jobTitle, email: p.email,
        imageUrl: p.avatar, date: p.startDate ?? person.date,
      };
    }),
  };
}

/** people du trombinoscope (Employee directory). */
function hydrateDirectory(content: Content, byId: ById): Content {
  const people = content.people;
  if (!Array.isArray(people)) return content;
  return {
    ...content,
    people: people.map((person: { id?: string }) => {
      const p = person.id ? byId.get(person.id) : undefined;
      if (!p) return person;
      return {
        ...person,
        displayName: fullName(p), title: p.jobTitle, department: p.department,
        location: p.location ?? undefined, imageUrl: p.avatar, email: p.email,
        phone: p.phone ?? undefined, bio: p.bio ?? undefined,
        skills: p.skills.length ? p.skills : undefined,
        managerId: p.manager ?? undefined,
      };
    }),
  };
}

/** employees de l'organigramme (manager résolu depuis le profil). */
function hydrateOrgChart(content: Content, byId: ById): Content {
  const employees = content.employees;
  if (!Array.isArray(employees)) return content;
  return {
    ...content,
    employees: employees.map((emp: { id?: string; profileId?: string; managerId?: string | null }) => {
      const p = byId.get(emp.profileId ?? emp.id ?? '');
      if (!p) return emp;
      return {
        ...emp,
        displayName: fullName(p), jobTitle: p.jobTitle, department: p.department,
        location: p.location ?? undefined, email: p.email, imageUrl: p.avatar,
        managerId: p.manager,
      };
    }),
  };
}

/** Fiche profil (webpart Profile) — via profileId. */
function hydrateProfileCard(content: Content, byId: ById): Content {
  const profile = content.profile as { profileId?: string } | undefined;
  const p = profile?.profileId ? byId.get(profile.profileId) : undefined;
  if (!profile || !p) return content;
  return {
    ...content,
    profile: {
      ...profile,
      name: fullName(p), jobTitle: p.jobTitle, department: p.department,
      location: p.location ?? undefined, email: p.email, avatar: p.avatar,
    },
  };
}

/** Auteurs des actualités (News / News V2) — via authorId. */
function hydrateNews(content: Content, byId: ById): Content {
  const news = content.news;
  if (!Array.isArray(news)) return content;
  return {
    ...content,
    news: news.map((item: { authorId?: string }) => {
      const p = item.authorId ? byId.get(item.authorId) : undefined;
      if (!p) return item;
      return { ...item, author: fullName(p), authorEmail: p.email, authorAvatar: p.avatar };
    }),
  };
}

const HYDRATORS: Record<string, (content: Content, byId: ById) => Content> = {
  'newcomers': hydratePeople,
  'anniversary': hydratePeople,
  'employee-directory': hydrateDirectory,
  'org-chart': hydrateOrgChart,
  'profile': hydrateProfileCard,
  'news': hydrateNews,
};

/** Résout les références aux profils dans le contenu d'un webpart (no-op si type non concerné). */
export function hydrateWebpartContent(type: string, content: Content, profiles: Profile[]): Content {
  const hydrate = HYDRATORS[type];
  if (!hydrate || profiles.length === 0) return content;
  return hydrate(content, new Map(profiles.map((p) => [p.id, p])));
}
