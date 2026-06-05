import type { MyTasksShadow, TaskListKind } from './MyTasks.types';

/**
 * Constantes extraites À L'IDENTIQUE de `my-tasks.js` + TreeView mozzaik-ui
 * (Pagination bundle) :
 *  - Layout : contenu gap 8, padding droite 12, marge négative 10 (ombres),
 *    breakpoint lien header 330
 *  - TreeView : groupes avec bordure 1px neutralLighter, radius config (défaut 8),
 *    padding 12, gap groupes 8, gap items 4, header 32px, enfants padding-left 46,
 *    gap checkbox-texte 12, item gap 8, padding bas groupe ouvert 8
 *  - TreeViewItem : titre BodyText (14), sous-titre MetadataLimited (10),
 *    sélectionné → barré + neutralTertiary ; chevron 12 Filled
 *  - Checkbox Fluent 16px (coché → fond themePrimary, coche blanche)
 *  - Icônes de listes (useConvertedLists) : Important → Star #9E00E8,
 *    Planned → Person #33A000, flagged → Flag #D44000, default → Home themePrimary,
 *    custom → Folder themePrimary ; non sélectionnée → neutralTertiaryAlt
 *  - Empty state : illustration 142×139 + texte semibold
 * Défauts manifest MyTasksWebPart : htmlTitle « Mes tâches », height M=416,
 * radius pill=12, shadow Strong.
 */

export const CONTENT_GAP = 8;
export const CONTENT_PADDING_RIGHT = 12;
export const TITLE_HEIGHT = 48;

export const GROUP_BORDER_WIDTH = 1;
export const GROUP_PADDING = 12;
export const GROUPS_GAP = 8;
export const LIST_GAP = 4;
export const HEADER_HEIGHT = 32;
export const SUBITEM_PADDING_LEFT = 46;
export const CHECKBOX_TEXT_GAP = 12;
export const ITEM_GAP = 8;
export const EXPANDED_HEADER_PADDING_BOTTOM = 8;
export const CHECKBOX_SIZE = 16;

export const FONT_SIZE = { PaneHeader: 20, BodyText: 14, MetadataLimited: 10 } as const;

export const NEUTRAL_TERTIARY = '#a19f9d';
export const NEUTRAL_TERTIARY_ALT = '#c8c6c4';
export const NEUTRAL_LIGHTER = '#f3f2f1';

/** Couleurs d'icônes de listes (fixes, hors thème sauf default/custom). */
export const LIST_ICON_COLOR: Record<TaskListKind, string | 'theme'> = {
  important: '#9E00E8',
  planned: '#33A000',
  assigned: '#33A000',
  flagged: '#D44000',
  default: 'theme',
  custom: 'theme',
};

/** getElevation — shadow → boxShadow (depth16=4, elevation noir). */
export const SHADOW: Record<MyTasksShadow, string | undefined> = {
  none: undefined,
  light: '0px 1.2px 3.6px rgba(0,0,0,0.07), 0px 6.4px 14.4px rgba(0,0,0,0.05)',
  medium: '0px 1.2px 3.6px rgba(0,0,0,0.12), 0px 6.4px 14.4px rgba(0,0,0,0.10)',
  strong: '0px 1.2px 3.6px rgba(0,0,0,0.17), 0px 6.4px 14.4px rgba(0,0,0,0.15)',
};
