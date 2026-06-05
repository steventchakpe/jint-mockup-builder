import type { ActionButtonShadow, ActionButtonSize } from './ActionButton.types';

/**
 * Constantes extraites À L'IDENTIQUE de `action-button.js` + StyledButton
 * (mozzaik-ui Pagination bundle) + ActionButtonWebPart.constants :
 *  - Zone : minHeight 80, contenu centré verticalement, aligné selon position
 *  - StyledButton : padding `{topBottomPadding}px 15px` —
 *    MAPPING_BUTTON_HEIGHT : small=2, medium=6, large=10 ;
 *    radius/ombre configurables appliqués au bouton
 *  - Bouton mozzaik Primary : fond themePrimary, texte blanc,
 *    hover themeDarkAlt, active themeDark ; Secondary : blanc, texte/contour
 *    themePrimary, hover lighter-alt
 * Défauts manifest ActionButtonWebPart : height M=416, radius pill=12,
 * shadow Strong, type Primary, position center, size small, titre visible.
 */

export const LAYOUT_MIN_HEIGHT = 80;
export const PADDING_LEFT_RIGHT = 15;

/** MAPPING_BUTTON_HEIGHT — taille → padding vertical. */
export const SIZE_TO_PADDING: Record<ActionButtonSize, number> = {
  small: 2,
  medium: 6,
  large: 10,
};

export const HEADER_HEIGHT = 48;
export const FONT_SIZE = { PaneHeader: 20, BodyText: 14 } as const;

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<ActionButtonShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
