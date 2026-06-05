/**
 * Types portés de `@mozzaik365/components/search-results`
 * (SearchResultsDefaultLayout) — vues cards / tiles / table.
 */

export type SearchResultsShadow = 'none' | 'light' | 'medium' | 'strong';
export type SearchResultsLayout = 'cards' | 'tiles' | 'table';
export type ResultContentType = 'document' | 'site' | 'news' | 'page' | 'person';

export interface ResultProperty {
  name: string;
  displayName: string;
  type: 'text' | 'date' | 'user' | 'tags' | 'longtext';
  value: string | string[];
}

export interface SearchResultItem {
  id: string;
  name: string;
  contentType: ResultContentType;
  /** Extension fichier (.docx, .pdf…) — icône. */
  extension?: string;
  thumbnailUrl?: string;
  url?: string;
  properties: ResultProperty[];
}

export interface SearchResultsConfig {
  title?: string;
  /** Hauteur de la zone en px (manifest : L = 832). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : Small → light). */
  shadow: SearchResultsShadow;
  /** Onglets de verticales (manifest : true). */
  showVerticals: boolean;
  /** Switch cards/tiles/table (manifest : true). */
  enableViewSwitch: boolean;
  /** Vue par défaut (manifest : table). */
  layout: SearchResultsLayout;
  /** Connexion à la Search box / aux filtres (manifest : autoConnect true). */
  autoConnect: boolean;
}

export interface SearchResultsContent {
  /** Verticales (onglets) — la 1re est sélectionnée. */
  verticals: string[];
  items: SearchResultItem[];
}

export interface SearchResultsProps {
  config: SearchResultsConfig;
  content: SearchResultsContent;
  isEditMode?: boolean;
  locale?: string;
}
