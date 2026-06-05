/**
 * Types portés de `@mozzaik365/components/my-files` (MyFilesCardLayout).
 * Webpart « Docs » : fichiers récents de l'utilisateur en cartes (GridCarousel).
 */

export type DocsShadow = 'none' | 'light' | 'medium' | 'strong';

/** Extensions gérées par le mapping MAPPING_EXTENSION_ICON_NAME (regroupées par icône). */
export type DocFileKind = 'word' | 'excel' | 'powerpoint' | 'pdf' | 'document';

export interface DocFile {
  id: string;
  /** Nom sans extension (title dans jintan). */
  title: string;
  /** Extension avec point (ex: ".docx") — détermine l'icône. */
  extension: string;
  /** Aperçu (thumbnail large) — sinon icône centrée sur fond neutre. */
  previewUrl?: string;
  url?: string;
}

export interface DocsConfig {
  /** Titre de section (LayoutHeader). */
  title?: string;
  /** Hauteur de la zone en px (widget jintan : 400 par défaut). */
  height: number;
  /** Padding du BaseLayout (px) — 0 = pas d'ombre/radius conteneur (fidèle BaseLayout). */
  padding: number;
  /** Rayon du conteneur en px. */
  radius: number;
  /** Ombre du conteneur (appliquée seulement si padding > 0). */
  shadow: DocsShadow;
}

export interface DocsContent {
  files: DocFile[];
}

export interface DocsProps {
  config: DocsConfig;
  content: DocsContent;
  isEditMode?: boolean;
  onFileClick?: (file: DocFile) => void;
}
