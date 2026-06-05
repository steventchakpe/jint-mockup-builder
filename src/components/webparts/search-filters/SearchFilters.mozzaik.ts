import type { SearchFiltersShadow } from './SearchFilters.types';

/**
 * Constantes extraites À L'IDENTIQUE de `SearchFiltersClassic.styles.ts` (jintan) :
 *  - « Filtrer par » : 16 bold themeDarker ; titres de facettes bold themeDarker
 *  - Chips : hauteur 24, padding '4px 6px', minWidth 32, bordure 1px themeLighter,
 *    texte themeDarker ; sélectionné → primary (fond themePrimary, texte blanc)
 *  - « Réinitialiser » : themePrimary, cursor pointer
 *  - Groupes : gap 12, titre/chips gap 8 ; conteneur : ombre configurable
 */

export const FILTER_BY_FONT_SIZE = 16;
export const GROUP_GAP = 12;
export const TITLE_GAP = 8;

export const FONT_SIZE = { PaneHeader: 20, BodyText: 14, MetaData: 12 } as const;

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<SearchFiltersShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
