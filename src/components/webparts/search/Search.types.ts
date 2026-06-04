/**
 * Types portés de jintan `mzkSearchBox` (layout searchBox/SearchBox).
 * Bannière de recherche : fond (couleur/image), titre optionnel, barre de recherche.
 */

export type SearchSize = 'XS' | 'S';
export type SearchTheme = 'Glassmorphism' | 'Classic';
export type SearchShadow = 'none' | 'light' | 'medium' | 'strong';

export interface SearchConfig {
  /** Titre affiché au-dessus de la barre. */
  title?: string;
  /** Texte d'invite (placeholder). */
  watermark?: string;
  /** Taille de la bannière : XS = 104px, S = 208px. */
  size: SearchSize;
  /** Glassmorphism (translucide + flou) ou Classic (fond blanc). */
  searchBoxTheme: SearchTheme;
  /** Rayon de la barre en px. */
  radius: number;
  shadow: SearchShadow;
  /** Couleur de fond de la bannière (défaut : primaire du thème). */
  bkgColor?: string;
  /** Image de fond (prioritaire sur bkgColor). */
  backgroundImage?: string;
}

// Le webpart Search n'a pas de contenu propre.
export type SearchContent = Record<string, never>;

export interface SearchProps {
  config: SearchConfig;
  content?: SearchContent;
  isEditMode?: boolean;
  /** Soumission de la recherche (Entrée). */
  onSearch?: (query: string) => void;
}
