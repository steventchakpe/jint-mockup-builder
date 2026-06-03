/**
 * Constantes extraites À L'IDENTIQUE du code jintan (source de vérité).
 * Sources :
 *  - @mozzaik365/components/dist/layouts (Radius/LayoutHeight)
 *  - @mozzaik365/components/dist/focus.js (FocusCard/FocusTextContent)
 *  - @mozzaik365/mozzaik-ui/dist (Text, Tag, Button, getElevation, ThemeProvider)
 *  - focusV2 manifest preconfiguredEntries (défauts)
 */

// --- layouts : selection → px ---
export const LAYOUT_HEIGHT = { S: 208, M: 416, L: 832 } as const;
export const RADIUS = { semiRounded: 4, rounded: 8, pill: 12 } as const;

// --- focus.js : constantes de carte ---
export const LAYOUT_PADDING = 16; // padding de la carte
export const CARD_CONTAINER_GAP = 16; // gap texte / image
export const CARD_PADDING = 12; // padding interne si fond/glass
export const CARD_TEXT_CONTAINER_GAP = 12; // gap titre-bloc / description
export const CARD_TEXT_HEADER_GAP = 8; // gap bloc-texte / bouton
export const DEFAULT_LINE_HEIGHT = 19; // calcul des lignes de description

// --- mozzaik-ui Text : FontSizes (px) + FontWeights ---
export const FONT_SIZE = { BodyText: 14, SubjectTitle: 16, MetaData: 12, PaneHeader: 20 } as const;
export const FONT_WEIGHT = { Regular: 400, Semibold: 600, Bold: 700 } as const;

// --- mozzaik-ui Tag (Secondary, Small) — valeurs réellement rendues par FocusTextContent ---
export const TAG_FONT_SIZE = 12;
export const TAG_PADDING_Y = 4;
export const TAG_PADDING_X = 12;

// --- mozzaik-ui StyledButton (primary, medium) ---
export const BUTTON_PADDING_Y = 5;
export const BUTTON_PADDING_X = 15;
export const BUTTON_FONT_SIZE = 14;

/**
 * getElevation(Strong, Depth16) — ombre exacte.
 * Depth16 = 4. Strong : α 17% / 15%. elevation = palette.black (#000).
 * 1er : 0  (0.3·4)px (0.9·4)px  → 0 1.2px 3.6px
 * 2e  : 0  (1.6·4)px (3.6·4)px  → 0 6.4px 14.4px
 */
export const SHADOW = {
  None: undefined,
  Light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  Medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  Strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
} as const;

/** semanticColors.bodyText = palette.neutralPrimary (Fluent default). */
export const BODY_TEXT_COLOR = '#323130';
