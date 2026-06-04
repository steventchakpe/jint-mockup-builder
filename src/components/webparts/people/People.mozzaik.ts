import type { PeopleShadow } from './People.types';

/**
 * Constantes extraites À L'IDENTIQUE de `people.js` (CardsLayout / PeopleCard) :
 *  - padding carte 12, gaps container 16 / info 12 / text 8 / subText 4
 *  - persona 48 (vertical) / 32 (horizontal), bascule horizontale si height < 392
 *  - breakpoints GridCarousel : columns [312, 474, 636, 793, 955]
 *  - displayName BodyText(14) bold themePrimary ; jobTitle MetadataLimited(10) bold
 *    neutralSecondary uppercase lineHeight 12 ; date = Tag Secondary Small
 * Défauts manifest : height M, radius pill (12), shadow Medium.
 */

export const CARD_PADDING = 12;
export const CONTAINER_GAP = 16;
export const INFO_GAP = 12;
export const TEXT_GAP = 8;
export const SUBTEXT_GAP = 4;
export const PERSONA_SIZE_LARGE = 48;
export const PERSONA_SIZE_SMALL = 32;
export const CARD_SIZE_M_BREAKPOINT = 392;

/** Paliers de colonnes du GridCarousel (largeur conteneur → nb colonnes). */
export const PEOPLE_COLUMN_BREAKPOINTS = [312, 474, 636, 793, 955];

export const FONT_SIZE = { MetadataLimited: 10, MetaData: 12, BodyText: 14 } as const;

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<PeopleShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};

/** Ombre de l'avatar (Persona) — Elevation.Medium / Depth16. */
export const AVATAR_SHADOW = SHADOW.medium;
