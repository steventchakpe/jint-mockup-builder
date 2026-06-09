/**
 * Types portés de `webpart_legacy/mzkSurvey` (Sondage).
 * Source de vérité : MzkSurvey.tsx + MzkSurvey.module.scss.
 */

export interface PollOption {
  id: string;
  label: string;
  /** Nombre de votes (sert au calcul des pourcentages). */
  votes: number;
}

export interface PollConfig {
  /** Titre du webpart (WebPartTitle). */
  title?: string;
}

export interface PollContent {
  /** Question du sondage (.question). */
  question: string;
  options: PollOption[];
  /** L'utilisateur a déjà voté → affichage des résultats (barres + %). */
  userHasVoted?: boolean;
}

export interface PollProps {
  config: PollConfig;
  content: PollContent;
  isEditMode?: boolean;
}
