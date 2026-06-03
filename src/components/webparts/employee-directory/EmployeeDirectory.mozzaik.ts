import type { DirectoryRounded, DirectoryShadow } from './EmployeeDirectory.types';

/**
 * Constantes extraites de jintan (layout whoiswho/classic) :
 *  - WhoIsWhoClassic : gaps 24 / 12 / 8
 *  - WhoIsWhoResult : grille wrap, gap 24, justify center ; carte 283×224
 *  - PersonaCard : padding 24, gap 4, bordure #F1F1F1, avatar 72 (anneau themePrimary 3px),
 *    barre poste themePrimary/blanc padding 6/8, section tags gap 7, padding 0 13
 *  - MzkTag : padding 6/12, gap 6
 *  - Défauts manifest : pageSize 10, rounded "normal", shadow "medium"
 */

export const CARD_WIDTH = 283;
export const CARD_HEIGHT = 224;
export const CARD_PADDING = 24;
export const CARD_GAP = 4; // gap interne carte
export const CARD_BORDER_COLOR = '#F1F1F1';
export const AVATAR_SIZE = 72;
export const AVATAR_RING = 3; // bordure themePrimary
export const RESULTS_GAP = 24;
export const SECTION_TAG_GAP = 7;
export const TAG_PADDING_Y = 6;
export const TAG_PADDING_X = 12;
export const TAG_GAP = 6;
export const TITLEBAR_PADDING_Y = 6;
export const TITLEBAR_PADDING_X = 8;

/** getRadiusForStack — rounded → px. */
export const ROUNDED_PX: Record<DirectoryRounded, number> = {
  none: 0,
  normal: 8,
  large: 16,
};

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<DirectoryShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
