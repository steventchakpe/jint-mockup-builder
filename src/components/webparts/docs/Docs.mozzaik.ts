import type { DocFileKind, DocsShadow } from './Docs.types';

/**
 * Constantes extraites À L'IDENTIQUE de `my-files.js` (@mozzaik365/components dist) :
 *  - MY_FILES_CARD_* : padding 8, gap 10, image radius 8, informations gap 7,
 *    fade padding 12, max height 400
 *  - fade : linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 100%), hauteur 48
 *  - breakpoints GridCarousel : columns [480, 768, 1024] (→ 1/2/3/4 colonnes),
 *    rows [283, 464, 698] (→ 1/2/3/4 lignes), gap grille 8 (CHILDREN_GAP)
 *  - Card (mozzaik-ui GridCarousel bundle) : bg blanc, bordure 1px neutralLighter,
 *    radius 8, hover → ombre Medium ; cursor pointer
 *  - LayoutHeader : hauteur 48, titre PaneHeader (20) semibold
 *  - Infos : icône 16 + titre SubjectTitle (16) semibold maxLine 1
 *  - MAPPING_EXTENSION_ICON_NAME : .docx→Word, .xlsx/.csv→Excel, .pptx→PowerPoint,
 *    .pdf→DocumentPdf, défaut→Document (familles complètes dans fileKindFromExtension)
 * Widget jintan (myFilesWidget) : title affiché, defaultHeight 400.
 */

export const CARD_PADDING = 8;
export const CARD_GAP = 10;
export const CARD_IMAGE_RADIUS = 8;
export const CARD_INFORMATIONS_GAP = 7;
export const FADE_PADDING = 12;
export const CARD_MAX_HEIGHT = 400;
export const FADE_HEIGHT = 48;
export const FADE_GRADIENT = 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)';

export const GRID_GAP = 8; // CHILDREN_GAP (mozzaik-ui Grid)
export const COLUMNS_BREAKPOINTS = [480, 768, 1024] as const;
export const ROWS_BREAKPOINTS = [283, 464, 698] as const;
export const CAROUSEL_NAVIGATION_HEIGHT = 48;

export const CARD_BORDER_RADIUS = 8;
export const CARD_BORDER_WIDTH = 1;

export const HEADER_HEIGHT = 48; // LayoutHeader
export const FONT_SIZE = { PaneHeader: 20, SubjectTitle: 16 } as const;

export const NEUTRAL_LIGHTER = '#f3f2f1'; // cardDefaultBorder
export const NEUTRAL_LIGHTER_ALT = '#faf9f8'; // fond image manquante

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<DocsShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};

/** Ombre Card au survol : getElevation(Medium, Depth16). */
export const CARD_HOVER_SHADOW = SHADOW.medium;

/** Port de MAPPING_EXTENSION_ICON_NAME (regroupé par icône cible). */
export function fileKindFromExtension(extension: string): DocFileKind {
  const ext = extension.toLowerCase();
  if (/^\.(doc|docm|docx|docb|dot|dotm|dotx|rtf)$/.test(ext)) return 'word';
  if (/^\.(csv|tsv|xlc|xls|xlsb|xlsm|xlsx|xlt|xltm|xltx)$/.test(ext)) return 'excel';
  if (/^\.(pot|potm|potx|sldx|sldm|ppt|pptm|pptx|pps|ppsm|ppsx)$/.test(ext)) return 'powerpoint';
  if (ext === '.pdf') return 'pdf';
  return 'document';
}
