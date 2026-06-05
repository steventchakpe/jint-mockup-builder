import type { ProfileShadow } from './Profile.types';

/**
 * Constantes extraites À L'IDENTIQUE de `profile.js` (@mozzaik365/components dist) :
 *  - ProfileCardToken : card/container gap 16, padding 16, infoContainer 12,
 *    subTextContainer 12, subText 4, textContainer 8
 *  - ActionButtons : gap 10 ; Persona Size100 (100px, bordure 2px, ombre Medium, cercle)
 *  - LayoutHeader (mozzaik-ui Pagination bundle) : hauteur 48, titre PaneHeader semibold
 * Typo (mozzaik-ui Text) : PaneHeader=20, MetaData=12 ; Bold=700, Semibold=600.
 * Neutres Fluent (fixes) : neutralSecondary #605e5c, neutralTertiary #a19f9d.
 * Défauts manifest ProfileWebPart : height S=208, radius rounded=8, shadow Medium,
 * specificProfile.enabled=false.
 */

export const CONTAINER_GAP = 16;
export const INFO_CONTAINER_GAP = 12;
export const SUB_TEXT_CONTAINER_GAP = 12;
export const SUB_TEXT_GAP = 4;
export const TEXT_GAP = 8;
export const PROFILE_CARD_PADDING = 16;
export const ACTION_BUTTONS_GAP = 10;

export const PERSONA_SIZE = 100; // PersonaSize.Size100
export const PERSONA_BORDER_WIDTH = 2; // BORDER_WIDTH (withBorder)

export const HEADER_HEIGHT = 48; // LayoutHeader

export const FONT_SIZE = { PaneHeader: 20, MetaData: 12 } as const;

export const NEUTRAL_SECONDARY = '#605e5c';
export const NEUTRAL_TERTIARY = '#a19f9d';

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<ProfileShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};

/** Ombre de l'avatar : getElevation(Medium, Depth16) — fixe dans ProfileCardStyles.persona. */
export const AVATAR_SHADOW = SHADOW.medium;
