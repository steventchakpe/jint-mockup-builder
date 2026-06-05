/**
 * Types portés de `@mozzaik365/components/news-hub` (MasonryColumns / Card).
 * Agrégateur de posts multi-sources (Twitter, LinkedIn, YouTube, RSS…).
 */

export type NewshubShadow = 'none' | 'light' | 'medium' | 'strong';

/** Port de l'enum Source. */
export type PostSource = 'None' | 'Twitter' | 'Rss' | 'YouTube' | 'LinkedIn' | 'Facebook' | 'Instagram';

export interface NewshubPost {
  id: string;
  /** Nom du compte / flux. */
  author: string;
  /** Logo du compte (Persona 40). */
  logo?: string;
  /** Date de publication (ISO). */
  date: string;
  source: PostSource;
  /** Texte du post (tronqué à 256 caractères). */
  content?: string;
  /** Images du post (mosaïque ; vidéo → 1 vignette + bouton play). */
  images?: string[];
  /** true = vignette vidéo (calque play). */
  isVideo?: boolean;
  url?: string;
}

export interface NewshubConfig {
  /** Titre (manifest : htmlTitle masqué par défaut). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : Strong — Depth4). */
  shadow: NewshubShadow;
  /** Nombre maximum de posts affichés (manifest : 12). */
  maximumItems: number;
  /** Bouton « Voir plus » (manifest : true). */
  showMoreResults: boolean;
}

export interface NewshubContent {
  posts: NewshubPost[];
}

export interface NewshubProps {
  config: NewshubConfig;
  content: NewshubContent;
  isEditMode?: boolean;
  locale?: string;
}
