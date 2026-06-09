import type { CSSProperties } from 'react';
import type { ConversationType } from './VivaEngage.types';

/*
 * Icônes Viva Engage — assets EXACTS extraits du Figma (Micro-Bird, node 20794:43927),
 * servis depuis /public/icons/viva/. Type icons = SVG colorés produit Viva ;
 * thumb-up = emoji 👍 (PNG 1f44d) ; chat/more/notepad = SVG Fluent (couleurs Figma).
 */

/** Sources des 4 icônes de type (composer). */
export const TYPE_ICON_SRC: Record<ConversationType, string> = {
  discussion: '/icons/viva/discussion.svg',
  question: '/icons/viva/question.svg',
  compliment: '/icons/viva/compliment.svg',
  poll: '/icons/viva/poll.svg',
};

/** Icône de type rendue comme image (taille en px). */
export function TypeIcon({ type, size = 24 }: { type: ConversationType; size?: number }) {
  return <img src={TYPE_ICON_SRC[type]} alt="" aria-hidden width={size} height={size} style={{ width: size, height: size }} />;
}

const VivaImg = ({ src, size = 20, style }: { src: string; size?: number; style?: CSSProperties }) => (
  <img src={src} alt="" aria-hidden width={size} height={size} style={{ width: size, height: size, ...style }} />
);

/** Pouce simple (contour, #323130) — état NON aimé. */
export const ThumbOutlineIcon = (p: { size?: number; style?: CSSProperties }) => <VivaImg src="/icons/viva/thumb.svg" {...p} />;
/** Emoji « J'aime » 👍 (1f44d) — état AIMÉ (après clic). */
export const ThumbUpIcon = (p: { size?: number; style?: CSSProperties }) => <VivaImg src="/icons/viva/thumbup.png" {...p} />;
/** Commentaire (Chat, #605E5C). */
export const ChatIcon = (p: { size?: number; style?: CSSProperties }) => <VivaImg src="/icons/viva/chat.svg" {...p} />;
/** Modifier (Notepad Edit, #323130). */
export const NotepadEditIcon = (p: { size?: number; style?: CSSProperties }) => <VivaImg src="/icons/viva/notepad-edit.svg" {...p} />;

/** Plus d'options horizontal (…, #323130 = couleur Figma). 3 points. */
export const MoreHorizontalIcon = ({ size = 20, style }: { size?: number; style?: CSSProperties }) => (
  <svg viewBox="0 0 20 20" fill="#323130" width={size} height={size} style={style} aria-hidden>
    <circle cx="4" cy="10" r="1.4" /><circle cx="10" cy="10" r="1.4" /><circle cx="16" cy="10" r="1.4" />
  </svg>
);
/** Plus d'options vertical (⋮, #323130) — en-tête de conversation. 3 points. */
export const MoreVerticalIcon = ({ size = 20, style }: { size?: number; style?: CSSProperties }) => (
  <svg viewBox="0 0 20 20" fill="#323130" width={size} height={size} style={style} aria-hidden>
    <circle cx="10" cy="4" r="1.4" /><circle cx="10" cy="10" r="1.4" /><circle cx="10" cy="16" r="1.4" />
  </svg>
);
