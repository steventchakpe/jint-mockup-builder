/**
 * Types du webpart Viva Engage (Conversations).
 * Source : modèle Figma fourni par Steven (pas de source jintan pour ce webpart).
 * Cf. mémoire viva-engage-model. Aucun fetch : config + content en props.
 */

export type ConversationType = 'discussion' | 'question' | 'compliment' | 'poll';

export interface VivaComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  /** Libellé temporel (ex : « Il y a 8m », « À l'instant »). */
  time: string;
  text: string;
}

export interface VivaConversation {
  id: string;
  type: ConversationType;
  authorName: string;
  authorAvatar?: string;
  time: string;
  text: string;
  likeCount: number;
  likedByUser?: boolean;
  comments: VivaComment[];
}

export interface VivaEngageConfig {
  /** Titre du webpart (« Conversations » par défaut). */
  title: string;
  /** Affiche la barre de composition en haut. */
  showComposer: boolean;
}

export interface VivaEngageContent {
  conversations: VivaConversation[];
}

/** Profil actif (connecté) injecté par WebpartHost — auteur du composer et des nouveaux posts/commentaires. */
export interface ActiveProfileLite {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface VivaEngageProps {
  config: VivaEngageConfig;
  content: VivaEngageContent;
  isEditMode?: boolean;
  activeProfile?: ActiveProfileLite | null;
}
