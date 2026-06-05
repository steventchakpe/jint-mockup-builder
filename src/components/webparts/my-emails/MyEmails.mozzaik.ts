import type { MyEmailsShadow } from './MyEmails.types';

/**
 * Constantes extraites À L'IDENTIQUE de `my-emails.js` (@mozzaik365/components dist) :
 *  - Disposition par hauteur : ≥712→5 lignes, ≥608→4, ≥400→3, ≥296→2, sinon 1
 *  - calcCardHeight = (height − 48 header − 48 footer − 12 paddingBottom − (rows−1)×4) / rows
 *  - Pile de cartes : gap 12 (CARD_GAP), padding 2 (CONTENT_PADDING)
 *  - CardMail : padding 8, gap interne 4, header gap 4 (persona/date),
 *    texte gap 4 si height<504 sinon 6, bodyPreview 1 ligne si height<504 sinon 2,
 *    zone trombone minWidth 40
 *  - Couleurs lu/non-lu : heure & sujet → neutralTertiary / themePrimary ;
 *    persona → neutralSecondaryAlt / neutralPrimary ; aperçu → neutralTertiary / neutralSecondary
 *  - Carousel (mozzaik-ui Grid bundle) : navigation 48px, padding '4px 8px',
 *    boutons 24px ronds blancs (chevrons Filled, masqués aux extrémités),
 *    bullets : pastille blanche radius 100 padding 8 gap 8, points 6px (actif 16px)
 *  - Card (mozzaik-ui) : bg blanc, bordure 1px neutralLighter, cursor pointer
 * Typo : SubjectTitle=16, BodyText=14, MetaData=12, Persona Size24 → 10px ; Bold=700.
 * Défauts manifest MyMailsWebPart : htmlTitle « Mes e-mails » (i18n), height M=416,
 * radius pill=12, shadow Strong — paddingEnabled false → ombre/radius sur les CARTES.
 */

export const CONTENT_PADDING = 2;
export const CARD_GAP = 12;
export const HEADER_GAP = 8;
export const ROWS_BREAKPOINTS = [296, 400, 608, 712] as const; // → 2/3/4/5 lignes

export const CARD_MAIL_GAP = 4;
export const ICON_CONTAINER_WIDTH = 40;
export const CARD_MAIL_PADDING = 8;
export const SMALL_CARD_TEXT_GAP = 4;
export const TEXT_GAP = 6;
export const CARD_BREAKPOINT = 504;
export const CARD_HEADER = 48;
export const CARD_FOOTER = 48;
export const CARD_PADDING_BOTTOM = 12;
export const PERSONA_DATE_GAP = 4;

export const NAVIGATION_HEIGHT = 48;
export const NAVIGATION_PADDING = '4px 8px';
export const NAV_BUTTON_SIZE = 24;
export const BULLET_SIZE = 6;
export const BULLET_ACTIVE_WIDTH = 16;
export const BULLETS_GAP = 8;
export const BULLETS_PADDING = 8;

export const PERSONA_SIZE = 24; // PersonaSize.Size24
export const PERSONA_FONT_SIZE = 10; // fontSizeByPersoneSize(Size24)

export const FONT_SIZE = { PaneHeader: 20, SubjectTitle: 16, BodyText: 14, MetaData: 12 } as const;

/** Neutres Fluent (fixes). */
export const NEUTRAL_PRIMARY = '#323130';
export const NEUTRAL_SECONDARY = '#605e5c';
export const NEUTRAL_SECONDARY_ALT = '#8a8886';
export const NEUTRAL_TERTIARY = '#a19f9d';
export const NEUTRAL_LIGHTER = '#f3f2f1';

/** Lignes par hauteur — port de getDispositionByHeight. */
export function rowsForHeight(height: number): number {
  if (height >= 712) return 5;
  if (height >= 608) return 4;
  if (height >= 400) return 3;
  if (height >= 296) return 2;
  return 1;
}

/** Port de calcCardHeight. */
export function calcCardHeight(height: number, rows: number): number {
  return (height - CARD_HEADER - CARD_FOOTER - CARD_PADDING_BOTTOM - (rows - 1) * CARD_MAIL_GAP) / rows;
}

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<MyEmailsShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
