'use client';

import { useProjectStore } from '@/lib/state/project-store';
import { getDemoStrings } from './get-demo-strings';
import type { DemoStrings } from './demo-strings.types';

export type { DemoStrings } from './demo-strings.types';
export { getDemoStrings } from './get-demo-strings';

/**
 * Chaînes du chrome de la maquette selon la langue du projet (US prospect.contentLanguage).
 * Toute la maquette (header, UEX, toolbar, footer, login, webparts) consomme ce hook —
 * jamais de chaîne chrome en dur dans les composants.
 */
export function useDemoStrings(): DemoStrings {
  const lang = useProjectStore((s) => s.project?.prospect.contentLanguage);
  return getDemoStrings(lang);
}

/** Locale JS du projet pour les formats de dates (toLocaleDateString). */
export function useDemoDateLocale(): string {
  return useDemoStrings().dateLocale;
}
