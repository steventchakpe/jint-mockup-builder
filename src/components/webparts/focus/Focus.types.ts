/**
 * Types portés à l'identique de `@mozzaik365/components/focus`
 * (FocusLayout.types). Aucun couplage SharePoint : le contenu arrive en props.
 */

export type FocusHorizontalAlignment = 'left' | 'center' | 'right';
export type FocusVerticalAlignment = 'top' | 'center' | 'bottom';
export type FocusAlignment = FocusHorizontalAlignment | FocusVerticalAlignment;

/** Position du contenu (texte) par rapport à la carte. */
export type FocusContentPosition = 'top' | 'right' | 'bottom' | 'left' | 'fill';
/** Position de l'image par rapport au bloc texte. */
export type FocusContentImagePosition = 'left' | 'right';
/** Position du bouton par rapport au texte. */
export type FocusButtonPosition = 'below' | 'right';
export type FocusButtonType = 'primary' | 'secondary';

/** Élément texte (titre, description, tag) — value brut ou html riche. */
export interface FocusElement {
  value?: string;
  html?: string;
  alignment?: FocusAlignment;
  color?: string;
  header?: string;
}

export interface FocusButtonElement {
  value?: string;
  html?: string;
  alignment: FocusAlignment;
  position?: FocusButtonPosition;
  type?: FocusButtonType;
  color?: string;
  visible: boolean;
}

export interface FocusRedirection {
  linkUrl: string;
  buttonProps?: FocusButtonElement;
}

export interface FocusContentImage {
  altText?: string;
  url: string;
  portrait?: boolean;
  /** Hauteur de l'image dérivée par la carte (px) — gérée en interne. */
  position?: FocusContentImagePosition;
}

export interface FocusCardContent {
  title: FocusElement;
  description: FocusElement;
  tag?: FocusElement;
  image?: FocusContentImage;
  position?: FocusContentPosition;
  backgroundColor?: string;
  /** Intensité du flou glassmorphism en px. */
  glassmorphism?: number;
}

export type FocusShadow = 'None' | 'Light' | 'Medium' | 'Strong';

/** Fond niveau layout (BaseLayout) — image plein cadre ou couleur. */
export type FocusBackground =
  | {
      type: 'image';
      url: string;
      /** ex: 'center center'. */
      position?: string;
      /** background-size : 'cover' | '100% auto' | 'auto 100%'. */
      adjustment?: string;
    }
  | { type: 'color'; value: string };

/** Configuration visuelle (variants jintan). */
export interface FocusConfig {
  /** Titre de section (header BaseLayout). */
  title?: string;
  /** Hauteur totale du focus en px (S=208, M=416, L=832). */
  height: number;
  /** Rayon des arrondis en px (pill=12, rounded=8, semiRounded=4). */
  radius: number;
  /** Intensité de l'ombre du conteneur. */
  shadow?: FocusShadow;
  /** Fond du focus (image par défaut dans le webpart jintan). */
  background?: FocusBackground;
}

export interface FocusContent {
  card: FocusCardContent;
  redirection?: FocusRedirection;
}

export interface FocusProps {
  config: FocusConfig;
  content: FocusContent;
  isEditMode?: boolean;
  /** Redirection au clic (carte ou bouton). */
  onRedirect?: (url: string) => void;
}
