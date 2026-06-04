import type { MyAppsConfig } from './MyApps.types';

/**
 * Défauts repris du manifest my-links (preconfiguredEntries) :
 * cardSize medium (défaut du type), shadow Light (carte), radius 4 (CARD_RADIUS).
 */
export const myAppsDefaultConfig: MyAppsConfig = {
  title: '',
  cardSize: 'medium',
  radius: 4,
  shadow: 'light',
};

export const myAppsConfigMeta = {
  typeId: 'my-apps',
  displayName: 'My Apps',
  category: 'liens',
  wave: 2,
  icon: 'layout-grid',
  description: 'Lanceur d’applications — grille de raccourcis vers les apps.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'cardSize',
      label: 'Taille des cartes',
      type: 'select' as const,
      options: [
        { value: 'medium', label: 'Moyenne (nom dessous)' },
        { value: 'large', label: 'Grande (nom au survol)' },
      ],
    },
    { key: 'radius', label: 'Arrondis (px)', type: 'number' as const },
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
  ],
};
