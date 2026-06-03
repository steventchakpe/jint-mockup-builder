/**
 * Constantes extraites À L'IDENTIQUE de jintan (source de vérité) :
 *  - @mozzaik365/components/dist/events.js (CardEvent / EventsTilesLayout)
 *  - @mozzaik365/mozzaik-ui/dist (Text FontSizes/FontWeights, getElevation, theme)
 *  - events manifest preconfiguredEntries (défauts : radius pill=12, shadow Strong, height M)
 */

// CardEvent.constants
export const IMAGE_SIZE = 64; // width/min/max
export const IMAGE_BORDER_RADIUS = 4;
export const DATE_MARGIN_LEFT = 4;
export const TITLE_LOCATION_GAP = 8;
export const CARD_CONTAINER_MIN_HEIGHT = 96;
export const CARD_CONTAINER_GAP = 8;
export const CARD_CONTAINER_PADDING = 8;
export const CARD_CONTAINER_BORDER_RADIUS = 8; // fallback si radius non fourni

// EventsTilesLayout : breakpoints du GridCarousel (largeur conteneur → colonnes)
export const EVENTS_BREAKPOINTS = [606, 915, 1224];
export const DEFAULT_SKELETONS_CARD_COUNT = 4;

// mozzaik-ui Text : FontSizes (px) + FontWeights
export const FONT_SIZE = { MetaData: 12, BodyText: 14, SubjectTitle: 16, PaneHeader: 20 } as const;
export const FONT_WEIGHT = { Regular: 400, Semibold: 600, Bold: 700 } as const;

/** Neutres Fluent (indépendants du thème) utilisés par CardEvent. */
export const NEUTRAL = {
  dark: '#201f1e', // neutralDark — titre
  primary: '#323130', // neutralPrimary — icône bouton
  secondary: '#605e5c', // neutralSecondary — icônes + date
  tertiary: '#a19f9d', // neutralTertiary — lieu
  lighter: '#f3f2f1', // neutralLighter — bordure carte
} as const;

/** getElevation : depth16=4, elevation = palette.black. */
export const SHADOW = {
  None: undefined,
  Light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  Medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  Strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
} as const;

/** Dégradé overlay image : linear-gradient(180deg, neutralPrimary α0, black α40). */
export const IMAGE_GRADIENT = 'linear-gradient(180deg, rgba(50,49,48,0) 0%, rgba(0,0,0,0.4) 100%)';
