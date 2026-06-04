import type { AppCardSize, AppShadow } from './MyApps.types';

/**
 * Constantes extraites À L'IDENTIQUE de `links.js` (LinkCard / CardsLayout) :
 *  - padding 8, gap interne 4 (medium), radius carte/image 4
 *  - medium : image 42, conteneur 50, minSize 90 ; large : image 54, conteneur 80, minSize 96
 *  - large : nom en bandeau bas (dégradé transparent→noir 0.6, hauteur 45, blanc, apparaît au survol)
 *  - breakpoints GridCarousel medium columns [216,328,…1336] / large [200,304,…720]
 *    → reproduits via auto-fill minmax(minSize, 1fr)
 * Défauts manifest : height M, radius pill, shadow Strong (carte : Light).
 */

export const CARD_PADDING = 8;
export const CONTENT_GAP = 4;
export const CARD_RADIUS = 4;
export const GRID_GAP = 16;

export const SIZE = {
  medium: { image: 42, container: 50, min: 90 },
  large: { image: 54, container: 80, min: 96 },
} as const satisfies Record<AppCardSize, { image: number; container: number; min: number }>;

export const LARGE_TEXT_BAR_HEIGHT = 45;
export const LARGE_TEXT_GRADIENT = 'linear-gradient(180deg, rgba(50,49,48,0) 0%, rgba(0,0,0,0.6) 100%)';
export const LARGE_TEXT_COLOR = '#ffffff';

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<AppShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
