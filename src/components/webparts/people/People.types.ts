/**
 * Types portés de `@mozzaik365/components/people` (CardsLayout).
 * Un seul webpart, deux modes : Newcomers (nouveaux arrivants) et
 * Anniversaries (anniversaires professionnels) — basés sur la date d'arrivée.
 */

export type PeopleMode = 'Newcomers' | 'Anniversaries';
export type PeopleShadow = 'none' | 'light' | 'medium' | 'strong';

export interface PeoplePerson {
  id: string;
  displayName: string;
  jobTitle?: string;
  imageUrl?: string;
  email?: string;
  /** Date d'arrivée (ISO) — sert au calcul du libellé (date / anniversaire + ancienneté). */
  date?: string;
}

export interface PeopleConfig {
  mode: PeopleMode;
  /** Titre de section. */
  title?: string;
  /** Hauteur de la zone en px (< 392 → cartes horizontales compactes). */
  height: number;
  /** Rayon des cartes en px (pill = 12). */
  radius: number;
  shadow: PeopleShadow;
  /** Couleur de fond des cartes (défaut blanc). */
  cardColor?: string;
}

export interface PeopleContent {
  people: PeoplePerson[];
}

export interface PeopleProps {
  config: PeopleConfig;
  content: PeopleContent;
  isEditMode?: boolean;
  locale?: string;
  onChatClick?: (email: string) => void;
}
