/**
 * Types portés de `@mozzaik365/components/links` (mode myApps, CardsLayout).
 * Lanceur d'applications : grille de cartes (icône + nom, lien cliquable).
 */

export type AppCardSize = 'medium' | 'large';
export type AppShadow = 'none' | 'light' | 'medium' | 'strong';

/** Lien d'application (ILinkListContract). */
export interface AppLink {
  id: string;
  name: string;
  url: string;
  /** Icône / logo de l'app. Si absent → icône générique. */
  photoUrl?: string;
  altText?: string;
  openInNewTab?: boolean;
}

export interface MyAppsConfig {
  title?: string;
  /** medium = nom sous l'icône · large = nom en bandeau au survol. */
  cardSize: AppCardSize;
  /** Rayon des cartes en px. */
  radius: number;
  shadow: AppShadow;
}

export interface MyAppsContent {
  links: AppLink[];
}

export interface MyAppsProps {
  config: MyAppsConfig;
  content: MyAppsContent;
  isEditMode?: boolean;
  onNavigate?: (link: AppLink) => void;
}
