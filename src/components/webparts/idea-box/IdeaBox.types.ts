/**
 * Types portés de `webpart_legacy/mzkSuggestionBox` (Boîte à idées).
 * Source de vérité : SuggestionBox.tsx / Suggestion.tsx / SuggestionVote.tsx /
 * SuggestionAnswer.tsx (+ leurs *.module.scss).
 */

/** Réponse officielle à une idée (badge de statut coloré + auteur). */
export interface IdeaAnswer {
  /** Auteur de la réponse (affiché en persona). */
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  /** Libellé de statut (ex : « À l'étude », « Retenue »). */
  state: string;
  /** Texte de la réponse. */
  text: string;
}

export interface Idea {
  id: string;
  title: string;
  /** Corps de l'idée (pre-wrap). */
  idea: string;
  votes: number;
  userHasVoted?: boolean;
  answer?: IdeaAnswer | null;
}

export interface IdeaBoxConfig {
  /** Affiche le bouton « Proposer une idée » + l'invite au vote (manifest : true). */
  enableAddSuggestion: boolean;
  /** Nombre d'idées affichées (manifest : 5). */
  rowLimit: number;
}

export interface IdeaBoxContent {
  ideas: Idea[];
}

export interface IdeaBoxProps {
  config: IdeaBoxConfig;
  content: IdeaBoxContent;
  isEditMode?: boolean;
}
