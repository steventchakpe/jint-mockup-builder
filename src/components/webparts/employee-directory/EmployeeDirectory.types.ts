/**
 * Types portés de jintan `mzkWhoIsWho` (Trombinoscope / Employee Directory),
 * layout `whoiswho/classic`. Le contenu vient des profils du state (pas de Graph).
 */

export type DirectoryRounded = 'none' | 'normal' | 'large';
export type DirectoryShadow = 'none' | 'light' | 'medium' | 'strong';

/** Personne affichée (référence un profil du Project par `id`). */
export interface DirectoryPerson {
  id: string;
  displayName: string;
  title?: string; // poste
  department?: string;
  location?: string;
  imageUrl?: string;
}

export interface EmployeeDirectoryConfig {
  /** Titre au-dessus de la barre de recherche. */
  title?: string;
  /** Description sous le titre. */
  description?: string;
  /** Nombre de cartes par page (« Show more » au-delà). */
  pageSize: number;
  rounded: DirectoryRounded;
  shadow: DirectoryShadow;
}

export interface EmployeeDirectoryContent {
  people: DirectoryPerson[];
}

export interface EmployeeDirectoryProps {
  config: EmployeeDirectoryConfig;
  content: EmployeeDirectoryContent;
  isEditMode?: boolean;
  /** Clic sur une carte → ouverture de la fiche profil (Phase B). */
  onSelectPerson?: (personId: string) => void;
}
