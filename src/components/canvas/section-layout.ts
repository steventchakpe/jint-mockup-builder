import type { SectionBackground, SectionLayout } from '@/types/project';

/**
 * Grille de sections — réplique EXACTE de la grille SharePoint (Office UI Fabric).
 * Source : https://learn.microsoft.com/en-us/sharepoint/dev/design/grid-and-responsive-design
 *
 * - Grille 12 colonnes, contenu max-width 1204px.
 * - Breakpoints (largeur) : <640 = 1 col (tout empile) · 640-767 gouttière 16 ·
 *   768-1365 gouttière 24 · ≥1366 gouttière 32. Max 2 col/section <1024, 3 col ≥1024.
 * - Proportions : 1col 12 · 2col 6/6 · 3col 4/4/4 · 1/3 gauche 4/8 · 1/3 droite 8/4.
 *
 * On reproduit avec des container queries (la grille réagit à la largeur de rendu
 * du canvas, pas seulement de la fenêtre).
 */

/** Gouttières SharePoint par breakpoint (16 → 24 → 32). */
export const SECTION_GAP = 'gap-[16px] @[768px]:gap-[24px] @[1366px]:gap-[32px]';

/** Classes `grid-template-columns` par layout, avec empilement responsive conforme. */
export function getSectionGridClass(layout: SectionLayout): string {
  switch (layout) {
    case 'two-column':
      // 6/6 — 2-up dès 640px, empilé en dessous
      return 'grid grid-cols-1 @[640px]:grid-cols-2';
    case 'three-column':
      // 4/4/4 — 3-up seulement à partir de 1024px (max 2 col avant → empilé)
      return 'grid grid-cols-1 @[1024px]:grid-cols-3';
    case 'one-third-left':
      // 4/8
      return 'grid grid-cols-1 @[640px]:grid-cols-[1fr_2fr]';
    case 'one-third-right':
      // 8/4
      return 'grid grid-cols-1 @[640px]:grid-cols-[2fr_1fr]';
    case 'one-column':
    case 'full-width':
    case 'flexible':
    default:
      return 'grid grid-cols-1';
  }
}

/** Nombre de colonnes attendu pour un layout (validation / rendu). */
export function getColumnCount(layout: SectionLayout): number {
  switch (layout) {
    case 'two-column':
    case 'one-third-left':
    case 'one-third-right':
      return 2;
    case 'three-column':
      return 3;
    default:
      return 1;
  }
}

/**
 * Fond de section dérivé du thème (none/neutral/soft/strong/image).
 * neutral = gris neutre Fluent · soft = teinte claire du thème · strong = primaire (texte blanc).
 */
export function getSectionBackgroundClass(background: SectionBackground): string {
  switch (background) {
    case 'neutral':
      return 'bg-[#f3f2f1]'; // neutralLighter (Fluent)
    case 'soft':
      return 'bg-sp-lighter-alt';
    case 'strong':
      return 'bg-sp-primary text-white';
    case 'image':
    case 'none':
    default:
      return '';
  }
}
