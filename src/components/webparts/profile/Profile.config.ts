import type { ProfileConfig } from './Profile.types';

/**
 * Défauts repris du manifest ProfileWebPart (preconfiguredEntries) :
 * height S (208), radius rounded (8), shadow Medium, specificProfile désactivé.
 */
export const profileDefaultConfig: ProfileConfig = {
  title: '',
  height: 208,
  radius: 8,
  shadow: 'medium',
  specificProfile: false,
};

export const profileConfigMeta = {
  typeId: 'profile',
  displayName: 'Profile',
  category: 'annuaire',
  wave: 2,
  icon: 'circle-user',
  description: "Fiche profil — informations de l'utilisateur connecté ou d'un collaborateur.",
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      options: [
        { value: 208, label: 'Petite (S)' },
        { value: 416, label: 'Moyenne (M)' },
        { value: 832, label: 'Grande (L)' },
      ],
    },
    {
      key: 'radius',
      label: 'Arrondis',
      type: 'select' as const,
      options: [
        { value: 4, label: 'Légers (semi-rounded)' },
        { value: 8, label: 'Arrondis (rounded)' },
        { value: 12, label: 'Pilule (pill)' },
      ],
    },
    {
      key: 'shadow',
      label: 'Ombre',
      type: 'select' as const,
      options: [
        { value: 'none', label: 'Aucune' },
        { value: 'light', label: 'Légère' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'strong', label: 'Forte' },
      ],
    },
    { key: 'specificProfile', label: 'Profil d’un collaborateur spécifique', type: 'boolean' as const },
  ],
};
