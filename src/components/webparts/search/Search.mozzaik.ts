import type { SearchShadow, SearchSize } from './Search.types';

/**
 * Constantes extraites de jintan (layout searchBox) :
 *  - SearchBox.styles : height XS = 104, S = 208 ; padding horizontal 32 ; gap titre/barre 12
 *  - SearchBar.styles : input bg white α80 + backdrop-blur 8 (Glassmorphism) / white (Classic),
 *    border neutralLight, padding 6, icône neutralTertiary, texte neutralPrimary,
 *    placeholder neutralTertiary, focus/hover ring themeLighter
 *  - title : SubjectTitle 16, semibold, blanc (ou couleur inversée)
 * Défauts manifest : bkgColor themePrimary, shadow small, theme Glassmorphism, size XS.
 */

export const SIZE_HEIGHT: Record<SearchSize, number> = { XS: 104, S: 208 };
export const BANNER_PADDING_X = 32;
export const CONTENT_GAP = 12;
export const INPUT_PADDING = 6;
export const BLUR = 8;
export const TITLE_FONT_SIZE = 16;

/** Neutres Fluent utilisés par SearchBar. */
export const NEUTRAL = {
  primary: '#323130', // texte saisi
  tertiary: '#a19f9d', // icône + placeholder
  light: '#edebe9', // bordure
} as const;

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<SearchShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
