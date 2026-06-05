import type { MyResumeShadow } from './MyResume.types';

/**
 * Constantes extraites À L'IDENTIQUE de `my-summary.js` (@mozzaik365/components dist) :
 *  - Conteneur : gap 12, cartes gap 8, présentation gap 4
 *  - Salutation : « Bonjour {prénom} ! » PaneHeader (20) bold — prénom themePrimary,
 *    reste neutralPrimary ; sous-titre SubjectTitle (16) semibold — dashboardName
 *    themePrimary — affiché seulement si height > 192
 *  - Colonnes par largeur : ≥400→3 cartes, ≥280→2, sinon 1 (carousel)
 *  - CarouselCard : bordure 1px neutralLighter, radius config (défaut 8), padding 8 ;
 *    compteur Header (18) bold themePrimary (99+ si >99) + libellé MetaData
 *    neutralTertiary ; pastille icône bg themePrimary 10 %, radius 8, padding 4,
 *    icône 20 themePrimary ; libellé bas BodyText semibold
 *  - Icônes : meetings→PeopleTeam, mails→Mail, tasks→TextBulletListSquare
 * Défauts manifest MySummaryWebPart : height S=208, radius pill=12, shadow Strong,
 * htmlTitle visible.
 */

export const CONTAINER_GAP = 12;
export const CARDS_GAP = 8;
export const PRESENTATION_GAP = 4;
export const BREAKPOINT_CARD_HEIGHT = 192;
export const BREAKPOINT_TWO_COLUMNS = 280;
export const BREAKPOINT_THREE_COLUMNS = 400;

export const CARD_RADIUS = 8;
export const CARD_PADDING = 8;
export const ITEMS_LEFT_GAP = 2;
export const ICON_WRAPPER_PADDING = 4;
export const ICON_WRAPPER_RADIUS = 8;
export const ICON_BG_OPACITY = 0.1; // getColorFromHex(themePrimary, 10)

export const HEADER_HEIGHT = 48;

export const FONT_SIZE = { PaneHeader: 20, Header: 18, SubjectTitle: 16, BodyText: 14, MetaData: 12 } as const;

export const NEUTRAL_PRIMARY = '#323130';
export const NEUTRAL_TERTIARY = '#a19f9d';
export const NEUTRAL_LIGHTER = '#f3f2f1';

/** Cartes du carousel (CAROUSEL_CARDS) — libellés FR. */
export const SUMMARY_CARDS = [
  { type: 'meetings' as const, textLeft: 'à venir', textType: 'Réunions' },
  { type: 'mails' as const, textLeft: 'non lus', textType: 'E-mails' },
  { type: 'tasks' as const, textLeft: "pour aujourd'hui", textType: 'Tâches' },
];

export function columnsForWidth(width: number): number {
  if (width >= BREAKPOINT_THREE_COLUMNS) return 3;
  if (width >= BREAKPOINT_TWO_COLUMNS) return 2;
  return 1;
}

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<MyResumeShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
