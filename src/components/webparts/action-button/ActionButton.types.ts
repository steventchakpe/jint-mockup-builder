/**
 * Types portés de `@mozzaik365/components/action-button`
 * (ActionButtonStandardLayout / StyledButton).
 */

export type ActionButtonShadow = 'none' | 'light' | 'medium' | 'strong';
export type ActionButtonType = 'Primary' | 'Secondary';
export type ActionButtonPosition = 'start' | 'center' | 'end';
export type ActionButtonSize = 'small' | 'medium' | 'large';

export interface ActionButtonConfig {
  /** Titre (manifest : visible). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** Rayon du bouton en px (manifest : pill = 12). */
  radius: number;
  /** Ombre du bouton (manifest : Strong). */
  shadow: ActionButtonShadow;
  /** Primary = plein themePrimary ; Secondary = contour. */
  type: ActionButtonType;
  position: ActionButtonPosition;
  /** Taille → padding vertical (S=2, M=6, L=10). */
  size: ActionButtonSize;
  /** Couleur personnalisée (hex) — sinon themePrimary. */
  customColor?: string;
}

export interface ActionButtonContent {
  /** Libellé du bouton. */
  text: string;
  url?: string;
  openInNewTab?: boolean;
}

export interface ActionButtonProps {
  config: ActionButtonConfig;
  content: ActionButtonContent;
  isEditMode?: boolean;
}
