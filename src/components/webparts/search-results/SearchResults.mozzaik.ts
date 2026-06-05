import type { SearchResultsShadow } from './SearchResults.types';

/**
 * Constantes extraites À L'IDENTIQUE de `search-results.js` (@mozzaik365/components dist) :
 *  - Conteneur : padding/margin '0px 12px 12px 12px', compteur total margin 12,
 *    container queries cartes : 4 colonnes, ≤1024→3, ≤640→2, ≤480→1, gap 8
 *  - ResultCard : padding 8, gap image/texte 8, bordure 1px (hover : bordure thème
 *    + ombre Medium + overlay dégradé noir 40 % hauteur 48), image ratio 4/3,
 *    pastille icône (padding 2, radius 4, fond noir 40 %, icône 20 themeLighter),
 *    overlay padding 12 ; titre SubjectTitle semibold 2 lignes, props gap 8 ;
 *    site sans vignette → initiales sur fond themePrimary
 *  - Navigation : verticales en onglets (zone droite 250px), bouton tri 165px
 *    (propriétés : pertinence, dates, nom, auteur, taille), switcher de vue
 *    (Grid / RowTriple / Table)
 *  - Tiles : gap 12, propriétés en grille 3 par ligne (min 200), longtext 100 %
 *  - Table : colonne logo 20, actions 60, tags max 150, user min 150
 *  - Show more : zone min 64, padding 8, bouton radius small
 * Défauts manifest SearchResultsWebPart : height L=832, radius pill=12,
 * shadow **Small**, layout **table**, showVerticals true, enableViewSwitch true,
 * autoConnect true, titre masqué.
 */

export const CONTAINER_PADDING = '0px 12px 12px 12px';
export const TOTAL_COUNT_MARGIN = 12;
export const CARDS_GAP = 8;
export const CARDS_BREAKPOINTS = { small: 480, medium: 640, large: 1024 } as const;

export const CARD_PADDING = 8;
export const IMAGE_TEXT_GAP = 8;
export const IMAGE_RATIO = '4 / 3';
export const ICON_CONTAINER_PADDING = 2;
export const ICON_CONTAINER_RADIUS = 4;
export const OVERLAY_PADDING = 12;
export const OVERLAY_HEIGHT = 48;
export const CARD_TEXT_GAP = 8;
export const TITLE_MAX_LINE = 2;

export const TILES_GAP = 12;
export const TILE_PROPERTY_MIN_WIDTH = 200;

export const LOGO_COLUMN_SIZE = 20;
export const ACTIONS_COLUMN_SIZE = 60;
export const TAG_COLUMN_MAX_WIDTH = 150;

export const SHOW_MORE_HEIGHT = 64;
export const SORT_BUTTON_WIDTH = 165;
export const HEADER_HEIGHT = 48;

export const FONT_SIZE = { PaneHeader: 20, SubjectTitle: 16, BodyText: 14, MetaData: 12 } as const;

export const NEUTRAL_PRIMARY = '#323130';
export const NEUTRAL_SECONDARY = '#605e5c';
export const NEUTRAL_LIGHTER = '#f3f2f1';

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<SearchResultsShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
