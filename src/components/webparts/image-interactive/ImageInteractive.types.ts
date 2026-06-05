/**
 * Types portés de `@mozzaik365/components/image-map` (ImageMapLayout).
 * Image cliquable avec zones interactives (pin points, rectangles, ellipses)
 * et infobulles (Callout titre/paragraphe).
 */

export type ShapeType = 'pinpoint' | 'rectangle' | 'ellipse';

export interface ShapeTooltipItem {
  type: 'title' | 'paragraph';
  value: string;
  /** Pour les titres : H1 (GreetingTitle) / H2 (PageTitle 28) / H3 (PaneHeader 20). */
  size?: 'H1' | 'H2' | 'H3';
}

export interface ImageMapShape {
  id: string;
  type: ShapeType;
  /** Position du centre en % de l'image. */
  x: number;
  y: number;
  /** Dimensions en % (rectangle / ellipse uniquement). */
  width?: number;
  height?: number;
  /** Couleur (hex) — défaut themePrimary. */
  fillColor?: string;
  url?: string;
  openInNewTab?: boolean;
  showTooltip?: boolean;
  tooltipItems?: ShapeTooltipItem[];
}

export interface ImageInteractiveConfig {
  /** Titre (manifest : showTitle false). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** true = l'image prend toute la largeur (hauteur auto, ratio conservé). */
  fullWidth: boolean;
}

export interface ImageInteractiveContent {
  imageUrl: string;
  altText?: string;
  shapes: ImageMapShape[];
}

export interface ImageInteractiveProps {
  config: ImageInteractiveConfig;
  content: ImageInteractiveContent;
  isEditMode?: boolean;
}
