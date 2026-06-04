import type { ProjectMeta } from '@/types/providers';

/** Maquette affichée au dashboard (ProjectMeta + statut optionnel — Phase 2). */
export type DashProject = ProjectMeta & { status?: 'Brouillon' | 'Partagée' | 'Vue' };

/** Utilisateur connecté (mock — pas d'auth réelle en Phase 1). */
export const currentUser = {
  name: 'Steven',
  email: 'steven@jint.co',
  avatarUrl: 'https://i.pravatar.cc/150?u=steven',
};

// TODO: Phase 4 — brancher PostHog (valeurs simulées isolées ici).
export const mockMetrics = {
  totalViews: { value: '1 248', trend: '+12%', isPositive: true as boolean | null },
  lastProspectView: { value: 'Il y a 3h', trend: 'Acme Corp', isPositive: null as boolean | null },
};

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
  if (diff < 2592000) return `Il y a ${Math.floor(diff / 86400)} j`;
  return date.toLocaleDateString('fr-FR');
}

/** Dégradé déterministe (hash du nom) pour les cartes sans miniature. */
export function getGradientFromName(name: string): string {
  const colors = [
    'from-[#FFC82C] to-[#F5A623]',
    'from-[#8ED6FB] to-[#5CBDF1]',
    'from-[#0A1F19] to-[#1C4136]',
    'from-[#E8E6DF] to-[#D5D3CB]',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export const getInitials = (name: string) => (name || '?').substring(0, 2).toUpperCase();
