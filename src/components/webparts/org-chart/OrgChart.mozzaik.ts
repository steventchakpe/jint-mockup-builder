import type { OrgChartShadow } from './OrgChart.types';

/**
 * Constantes extraites À L'IDENTIQUE de `OrganizationChartTreechartLayout-*.js`
 * (@mozzaik365/components dist) :
 *  - Carte : maxWidth 180, bordure 1px neutralLight, bg blanc, padding '20px 8px',
 *    gap 6 ; rangée haute : cale 32 + Persona 72 + bouton MoreVertical ;
 *    textes gap 4 — nom SubjectTitle (16) semibold themePrimary 1 ligne,
 *    poste MetaData (12) bold neutralSecondary MAJUSCULES, tag (département)
 *    pill padding '4px 12px' radius 8 (couleur persona à 13 %)
 *  - Bouton headcount : pilule blanche absolue (bottom 10, translate(-50%,80%)),
 *    bordure 0.5px neutralLight, padding '4px 6px', gap 4, chevron 12
 *    themeSecondary + compteur MetaData
 *  - Connecteurs (TreeNode) : ligne 1px neutralQuaternary, hauteur 15px,
 *    espacement nœuds 20px, radius coins 3px ; nœud padding '20px 0'
 *  - Zone : fond neutralLighterAlt, contenu padding 32, contrôles zoom
 *    (Center/+/−) ronds en bas à droite (24/24, gap 12)
 *  - Header : 48px, titre + bouton ArrowDownload (export PDF)
 * Défauts manifest OrganizationChartWebPart : titre masqué, height L=832,
 * radius pill=12, **shadow désactivée**.
 */

export const CARD_MAX_WIDTH = 180;
export const CARD_PADDING = '20px 8px';
export const CARD_GAP = 6;
export const CARD_INNER_GAP = 10;
export const CARD_TEXT_GAP = 4;
export const CARD_EMPTY_STACK = 32;
export const PERSONA_SIZE = 72; // PersonaSize.Size72

export const HEADCOUNT_PADDING = '4px 6px';
export const HEADCOUNT_GAP = 4;

export const TAG_PADDING = '4px 12px';
export const TAG_RADIUS = 8;

export const LINE_HEIGHT = 15; // TREE_NODE_LINE_HEIGHT
export const LINE_WIDTH = 1; // TREE_NODE_LINE_WIDTH
export const NODE_SPACING = 20; // TREE_NODE_NODE_SPACING
export const NODE_BORDER_RADIUS = 3;

export const TITLE_HEIGHT = 48;
export const CONTENT_PADDING = 32;
export const CONTROLS_OFFSET = 24;
export const CONTROLS_GAP = 12;

export const FONT_SIZE = { PaneHeader: 20, SubjectTitle: 16, BodyText: 14, MetaData: 12 } as const;

export const NEUTRAL_SECONDARY = '#605e5c';
export const NEUTRAL_LIGHT = '#edebe9';
export const NEUTRAL_QUATERNARY = '#d2d0ce'; // lineColor
export const NEUTRAL_LIGHTER_ALT = '#faf9f8'; // fond de la zone

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<OrgChartShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};

/** Fluent getPersonaInitialsColor — sous-ensemble des couleurs (hash simple). */
const PERSONA_COLORS = ['#750b1c', '#a4262c', '#ca5010', '#986f0b', '#498205', '#005e50', '#038387', '#0078d4', '#4f6bed', '#8764b8', '#881798', '#c239b3', '#e3008c', '#57811b'];
export function personaColor(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return PERSONA_COLORS[Math.abs(h) % PERSONA_COLORS.length];
}
