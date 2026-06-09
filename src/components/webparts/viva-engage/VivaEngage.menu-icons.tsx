import type { SVGProps } from 'react';

/* Icônes du menu ⋮ d'une conversation Viva Engage — tracés style Fluent (viewBox 20×20),
 * monochromes. Seul « Supprimer » est fonctionnel ; les autres sont visuels. */

const base = {
  viewBox: '0 0 20 20',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  xmlns: 'http://www.w3.org/2000/svg',
};

export function CloseConvIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M4 4h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 14H8l-4 3v-3a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 4 4Z" /><path d="m7 7 6 6m0-6-6 6" /></svg>;
}
export function LinkIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M8 12a3 3 0 0 0 4.2 0l2.3-2.3a3 3 0 0 0-4.2-4.2L9 6.8" /><path d="M12 8a3 3 0 0 0-4.2 0L5.5 10.3a3 3 0 0 0 4.2 4.2L11 13.2" /></svg>;
}
export function FollowInboxIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M3 6.5 10 11l7-4.5" /><rect x="3" y="4.5" width="14" height="11" rx="1.5" /><path d="m12.5 13 1.5 1.5L17 11" /></svg>;
}
export function ViewConvIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M4 4h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 14H8l-4 3v-3a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 4 4Z" /><circle cx="10" cy="9" r="1.6" /></svg>;
}
export function ReplaceQuestionIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M4 4h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 14H8l-4 3v-3a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 4 4Z" /><path d="m12 9-2 2-1.2-1.2" /></svg>;
}
export function TopicsIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><rect x="4" y="4" width="12" height="12" rx="1.5" /><path d="M4 7.5h12" /></svg>;
}
export function StarIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="m10 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 13.9 5.8 16l.8-4.7L3.2 8l4.7-.7L10 3Z" /></svg>;
}
export function TrashIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M4 5.5h12M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M6 5.5l.7 9a1.5 1.5 0 0 0 1.5 1.4h3.6a1.5 1.5 0 0 0 1.5-1.4l.7-9M8.5 8.5v5M11.5 8.5v5" /></svg>;
}
export function EditIcon(p: SVGProps<SVGSVGElement>) {
  return <svg {...base} {...p}><path d="M13.5 4.5 15.5 6.5 7 15l-2.5.5L5 13l8.5-8.5Z" /></svg>;
}
