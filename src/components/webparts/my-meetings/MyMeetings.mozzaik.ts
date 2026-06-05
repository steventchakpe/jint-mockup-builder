import type { MeetingStatus, MyMeetingsShadow } from './MyMeetings.types';

/**
 * Constantes extraites À L'IDENTIQUE de `my-meetings.js` (@mozzaik365/components dist) :
 *  - Disposition par hauteur : ≥608→7, ≥548→6, ≥482→5, ≥420→4, ≥354→3, ≥292→2, sinon 1
 *  - Carte sélectionnée : hauteur 120 ; autres : (height − 48 header − 48 footer − 12
 *    paddingBottom − (rows−1)×12 gap − 120) / (rows−1)
 *  - MeetingCard : padding 8, radius défaut 8, bordure 1px neutralLighter,
 *    colonne heure maxWidth 53 padding-left 4, infos padding-left 12,
 *    sous-infos gap 8, icônes gap 8 ; pastille statut : padding 6, radius 8,
 *    margin-right 8, fond = couleur icône à 20 %
 *  - StatusBar : largeur 8, radius 8, pleine hauteur — accepted → themePrimary plein ;
 *    notResponded/tentative → hachures 135° blanc/themePrimary par 4px + bordure
 *    themePrimary ; cancelled → blanc bordure neutralQuaternary
 *  - Statuts (Fluent palette) : accepted CheckmarkCircle green #107c10,
 *    declined DismissCircle red #e81123, tentative QuestionCircle neutralPrimary
 *  - Carousel : navigation 48px identique à My emails
 * Typo : BodyText=14, MetaData=12 ; Bold=700, Semibold=600.
 * Défauts manifest MyMeetingsWebPart : htmlTitle « Mes réunions » (i18n), height M=416,
 * radius pill=12, shadow Strong — paddingEnabled false → ombre/radius sur les CARTES.
 */

export const MEETINGS_SLIDE_GAP = 12;
export const CARD_HEADER = 48;
export const CARD_FOOTER = 48;
export const CARD_PADDING_BOTTOM = 12;

export const MEETING_CARD_PADDING = 8;
export const MEETING_CARD_SELECTED_HEIGHT = 120;
export const MEETING_CARD_TIME_PADDING = '0 0 0 4px';
export const MEETING_CARD_TIME_MAX_WIDTH = 53;
export const MEETING_CARD_INFORMATIONS_PADDING = '0 0 0 12px';
export const MEETING_CARD_SUBINFORMATIONS_GAP = 8;
export const MEETING_CARD_ICONS_GAP = 8;
export const PADDING_ICON = 6;
export const ICON_MARGIN = 8;
export const RADIUS_MEDIUM = 8;

export const STATUS_BAR_WIDTH = 8;
export const STATUS_BAR_RADIUS = 8;

export const NAVIGATION_HEIGHT = 48;

export const FONT_SIZE = { PaneHeader: 20, BodyText: 14, MetaData: 12 } as const;

/** Neutres + statuts Fluent (fixes). */
export const NEUTRAL_PRIMARY = '#323130';
export const NEUTRAL_SECONDARY = '#605e5c';
export const NEUTRAL_TERTIARY = '#a19f9d';
export const NEUTRAL_QUATERNARY = '#d2d0ce';
export const NEUTRAL_LIGHTER = '#f3f2f1';
export const FLUENT_GREEN = '#107c10';
export const FLUENT_RED = '#e81123';

/** Couleur d'icône de statut (theme.palette.green/red/neutralPrimary). */
export const STATUS_ICON_COLOR: Record<MeetingStatus, string> = {
  accepted: FLUENT_GREEN,
  declined: FLUENT_RED,
  tentativelyAccepted: NEUTRAL_PRIMARY,
  notResponded: NEUTRAL_PRIMARY,
  cancelled: FLUENT_RED,
};

/** Lignes par hauteur — port de getDispositionByHeight. */
export function rowsForHeight(height: number): number {
  if (height >= 608) return 7;
  if (height >= 548) return 6;
  if (height >= 482) return 5;
  if (height >= 420) return 4;
  if (height >= 354) return 3;
  if (height >= 292) return 2;
  return 1;
}

/** Port de calcUnselectedCardHeight. */
export function calcUnselectedCardHeight(rows: number, height: number): number {
  return (
    (height - CARD_FOOTER - CARD_HEADER - CARD_PADDING_BOTTOM - (rows - 1) * MEETINGS_SLIDE_GAP - MEETING_CARD_SELECTED_HEIGHT) /
    (rows - 1)
  );
}

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<MyMeetingsShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};

/** Hex avec opacité 20 % — port de getColorFromHex(color, 20). */
export const tint20 = (hex: string) => `${hex}33`;
