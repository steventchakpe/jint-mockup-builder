/**
 * Types portés de `@mozzaik365/components/my-summary` (ListViewLayout).
 * Résumé du jour : salutation personnalisée + cartes compteurs
 * (réunions / e-mails / tâches) en carousel.
 */

export type MyResumeShadow = 'none' | 'light' | 'medium' | 'strong';

export interface SummaryCardData {
  cardType: 'meetings' | 'mails' | 'tasks';
  itemsLeft: number;
}

export interface MyResumeConfig {
  /** Titre (manifest : htmlTitle « Mon résumé »). */
  title?: string;
  /** Hauteur de la zone en px (manifest : S = 208). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : Strong). */
  shadow: MyResumeShadow;
}

export interface MyResumeContent {
  /** Prénom de l'utilisateur connecté (themePrimary dans la salutation). */
  userName: string;
  /** Nom du dashboard / de l'intranet (themePrimary dans le sous-titre). */
  dashboardName: string;
  cards: SummaryCardData[];
}

export interface MyResumeProps {
  config: MyResumeConfig;
  content: MyResumeContent;
  isEditMode?: boolean;
}
