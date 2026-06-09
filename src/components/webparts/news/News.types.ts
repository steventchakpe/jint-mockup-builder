/**
 * Types du webpart News (News Gallery) — portés du modèle jintan.
 * Source : deprecated/oldparts/src/layouts/news + models/mozzaik/INews.
 * Aucun couplage SharePoint : le contenu arrive en props (pas de fetch).
 */

/** Layouts du News Gallery (jintan NewsLayoutsEnum). */
export type NewsLayout = 'topStory' | 'hero' | 'carousel' | 'verticalTiles' | 'feed';

/** Arrondis (jintan RoundedType) → 0 / 12 / 24 px. */
export type NewsRounded = 'none' | 'normal' | 'large';

/** Intensité d'ombre (Elevation). */
export type NewsShadow = 'None' | 'Light' | 'Medium' | 'Strong';

export interface NewsTag {
  id: string;
  name: string;
}

/** Article — aligné sur `INews` (jintan). */
export interface NewsItem {
  id: string;
  title: string;
  chapo: string; // excerpt / résumé
  /** ID d'un profil éditable du projet — l'auteur est résolu depuis l'annuaire au rendu. */
  authorId?: string;
  author: string;
  authorEmail?: string;
  authorAvatar?: string;
  date: string; // ISO
  url: string;
  imageUrl: string;
  viewCount: number;
  likeCount: number;
  isLikedByUser?: boolean;
  tags: NewsTag[];
  pinned?: boolean;
}

/** Flags d'affichage (jintan customContent du manifest). */
export interface NewsCustomContent {
  showViewCount: boolean;
  showLikeCount: boolean;
  showLikeButton: boolean;
  showShareButton: boolean;
  showTags: boolean;
  showDate: boolean;
  showAuthor: boolean;
}

export interface NewsConfig {
  layout: NewsLayout;
  newsAmount: number; // nb d'articles affichés (pas de hauteur — dépend du contenu)
  rounded: NewsRounded;
  shadow: NewsShadow;
  showPin: boolean;
  title: string;
  customContent: NewsCustomContent;
  /**
   * Mode « Mes abonnements » (MyFeed = News + paramètre my-feed) : rendu News à
   * l'identique + un bouton d'abonnement (« Choisir mes abonnements »).
   * Absent/undefined sur le webpart News standard.
   */
  subscriptionButton?: { show: boolean; text: string };
}

export interface NewsContent {
  news: NewsItem[];
}

export interface NewsProps {
  id?: string;
  config: NewsConfig;
  content: NewsContent;
  isEditMode?: boolean;
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}
