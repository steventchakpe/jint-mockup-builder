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
