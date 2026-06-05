import type { NewshubShadow } from './Newshub.types';

/**
 * Constantes extraites À L'IDENTIQUE de `news-hub.js` (@mozzaik365/components dist) :
 *  - Disposition par largeur (useDisposition) : ≥1204→4 colonnes, ≥792→3, ≥586→2, sinon 1
 *  - Conteneur : gap colonnes (gutter Masonry) 16, padding '4px 24px',
 *    padding masonry 2, fading bas 55px (gradient bodyBackground)
 *  - Card : padding '16px 16px 8px', gap interne 8, bg blanc, ombre **Depth4**,
 *    radius configurable
 *  - CardHeader : padding 4, gap 8, logo Persona 40 (bordure), nom BodyText semibold,
 *    date MetadataLimited (10) neutralSecondary, icône source 28 à droite
 *  - CardBody : gap 16, texte BodyText tronqué à 256 car. (coupe au dernier espace + ' …'),
 *    image hauteur 192 radius (mosaïque gap 4, calque +N noir 5%/blur, vidéo : rond
 *    blanc 4%/blur 64px radius 100 + Play blanc 48)
 *  - CardFooter : IconButtons ghost tertiaryTheme large — Open à gauche,
 *    Share (+ Retweet si Twitter) à droite
 * Typo : BodyText=14, MetaData=12, MetadataLimited=10.
 * Défauts manifest NewsHubWebPart : maximumItems 12, showMoreResults true,
 * height M=416, radius pill=12, shadow Strong, titre masqué.
 */

export const LAYOUT_TITLE_HEIGHT = 48;
export const CARD_CONTAINER_GAP = 16;
export const CARD_CONTAINER_PADDING = '4px 24px';
export const COLUMN_CONTAINER_PADDING = 2;
export const FADING_SIZE = 55;

export const CARD_GAP = 8;
export const CARD_PADDING = '16px 16px 8px';

export const CARD_HEADER_PADDING = 4;
export const CARD_HEADER_GAP = 8;
export const CARD_HEADER_TITLE_GAP = 4;
export const HEADER_LOGO_SIZE = 40; // Persona Size40

export const CARD_BODY_GAP = 16; // CardBodyTokens = CARD_CONTAINER_GAP
export const CONTENT_TRUNCATE_LIMIT = 256;
export const IMAGE_CONTAINER_HEIGHT = 192;
export const IMAGES_GAP = 4;
export const VIDEO_LAYER_SIZE = 64;

export const SOURCE_ICON_SIZE = 28;

export const FONT_SIZE = { PaneHeader: 20, BodyText: 14, MetaData: 12, MetadataLimited: 10 } as const;

export const NEUTRAL_SECONDARY = '#605e5c';

/** Colonnes par largeur — port de useDisposition + DISPOSITION_TO_COLUMNS_COUNT. */
export const COLUMNS_BREAKPOINTS = { half: 586, twoThird: 792, full: 1204 } as const;

/** Port de la troncature CardBody. */
export function truncateContent(text: string): string {
  if (text.length <= CONTENT_TRUNCATE_LIMIT) return text;
  const sub = text.substring(0, CONTENT_TRUNCATE_LIMIT - 1);
  return sub.substring(0, sub.lastIndexOf(' ')) + ' …';
}

/** getElevation Depth4 (cartes Newshub) : multiplicateurs 0.3/0.9 et 1.6/3.6 × depth4=1. */
export const SHADOW: Record<NewshubShadow, string | undefined> = {
  none: undefined,
  light: '0px 0.3px 0.9px rgba(0,0,0,0.07), 0px 1.6px 3.6px rgba(0,0,0,0.05)',
  medium: '0px 0.3px 0.9px rgba(0,0,0,0.12), 0px 1.6px 3.6px rgba(0,0,0,0.10)',
  strong: '0px 0.3px 0.9px rgba(0,0,0,0.17), 0px 1.6px 3.6px rgba(0,0,0,0.15)',
};
