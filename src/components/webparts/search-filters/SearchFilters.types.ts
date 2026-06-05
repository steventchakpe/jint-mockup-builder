/**
 * Types portés des layouts `searchFilters` (jintan oldparts —
 * SearchFiltersClassic / AggregationsClassic).
 */

export type SearchFiltersShadow = 'none' | 'light' | 'medium' | 'strong';

export interface FilterBucket {
  /** Clé envoyée à la connexion (ex: '.docx', 'news'). */
  key: string;
  label: string;
  count?: number;
}

export interface FilterFacet {
  /** Nom de facette côté résultats : 'fileType', 'contentType', ou nom de propriété. */
  name: string;
  displayName: string;
  buckets: FilterBucket[];
}

export interface SearchFiltersConfig {
  title?: string;
  /** Rayon du conteneur en px (pill = 12). */
  radius: number;
  /** Ombre du conteneur (manifest searchFilters : small). */
  shadow: SearchFiltersShadow;
}

export interface SearchFiltersContent {
  facets: FilterFacet[];
}

export interface SearchFiltersProps {
  config: SearchFiltersConfig;
  content: SearchFiltersContent;
  isEditMode?: boolean;
}
