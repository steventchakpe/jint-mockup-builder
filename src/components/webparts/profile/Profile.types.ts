/**
 * Types portés de `@mozzaik365/components/profile` (CompactLayout / ProfileCard).
 * Affiche la fiche de l'utilisateur connecté (bouton Modifier) ou d'un
 * collaborateur spécifique (boutons Chat + Mail) — `specificProfile`.
 */

export type ProfileShadow = 'none' | 'light' | 'medium' | 'strong';

export interface ProfilePerson {
  /** ID d'un profil éditable du projet (référence, jamais de duplication). */
  profileId?: string;
  name: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  email?: string;
  avatar?: string;
}

export interface ProfileConfig {
  /** Titre de section (LayoutHeader). */
  title?: string;
  /** Hauteur de la zone en px (manifest : S = 208). */
  height: number;
  /** Rayon de la carte en px (manifest : rounded = 8). */
  radius: number;
  /** Ombre de la carte (manifest : Medium). */
  shadow: ProfileShadow;
  /** true = profil d'un collaborateur (Chat/Mail) ; false = utilisateur connecté (Modifier). */
  specificProfile: boolean;
}

export interface ProfileContent {
  profile: ProfilePerson;
}

export interface ProfileProps {
  config: ProfileConfig;
  content: ProfileContent;
  isEditMode?: boolean;
  onChatClick?: (email: string) => void;
}
