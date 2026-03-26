export type NewsLayout = 'top-story' | 'hero' | 'tiles-verticales' | 'carousel';
export type NewsFormat = '3/3' | '1/2' | 'responsive';
export type NewsRadius = 'default' | 'normal' | 'large' | 'none';

export interface NewsConfig {
  layout: NewsLayout;
  format: NewsFormat;
  radius: NewsRadius;
  title?: string;
  maxItems?: number;
}

export interface NewsAuthor {
  profileId: string;
  name: string;
  avatarUrl: string;
  jobTitle?: string;
}

export interface NewsEngagementData {
  likes: number;
  comments: number;
  views: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  category?: string;
  author: NewsAuthor;
  publishedAt: string;
  readTimeMinutes?: number;
  engagement?: NewsEngagementData;
  articlePageId?: string;
}

export interface NewsContent {
  articles: NewsArticle[];
}

export interface NewsProps {
  config: NewsConfig;
  content: NewsContent;
  isEditMode?: boolean;
  onArticleClick?: (articleId: string) => void;
}
