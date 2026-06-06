// Détection des webparts qui référencent un profil (par ID) — utilisé par
// l'annuaire pour protéger la suppression (avertir si le profil est utilisé).
import type { Project, WebpartInstance } from '@/types/project';

export interface ProfileReference {
  pageTitle: string;
  webpartType: string;
}

/** Cherche récursivement un ID de profil dans une valeur (content/config de webpart). */
function containsId(value: unknown, profileId: string): boolean {
  if (typeof value === 'string') return value === profileId;
  if (Array.isArray(value)) return value.some((v) => containsId(v, profileId));
  if (value && typeof value === 'object') {
    return Object.values(value).some((v) => containsId(v, profileId));
  }
  return false;
}

function webpartsOfPage(page: Project['pages'][number]): WebpartInstance[] {
  const inSections = page.sections.flatMap((s) => s.columns.flatMap((c) => c.webparts));
  return [...inSections, ...(page.verticalSection?.webparts ?? [])];
}

/**
 * Liste les webparts (page + type) qui référencent le profil donné,
 * dans leur `content` ou leur `config` (ex: people.id, profile.profileId,
 * org-chart.profileId, news author par ID…).
 */
export function findProfileReferences(project: Project, profileId: string): ProfileReference[] {
  const refs: ProfileReference[] = [];
  for (const page of project.pages) {
    for (const wp of webpartsOfPage(page)) {
      if (containsId(wp.content, profileId) || containsId(wp.config, profileId)) {
        refs.push({ pageTitle: page.title, webpartType: wp.type });
      }
    }
  }
  return refs;
}
