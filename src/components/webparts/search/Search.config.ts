import type { SearchConfig } from './Search.types';

/**
 * Défauts repris du manifest mzkSearchBox (preconfiguredEntries) :
 * bkgColor themePrimary, shadow small (light), theme Glassmorphism, size XS.
 */
export const searchDefaultConfig: SearchConfig = {
  title: '',
  watermark: 'Rechercher sur le site',
  size: 'XS',
  searchBoxTheme: 'Glassmorphism',
  radius: 8,
  shadow: 'light',
  bkgColor: 'var(--sp-theme-primary)',
};

export const searchConfigMeta = {
  typeId: 'search',
  displayName: 'Search',
  category: 'navigation',
  wave: 1,
  icon: 'search',
  description: 'Barre de recherche en bannière (glassmorphism / classic).',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    { key: 'watermark', label: 'Texte d’invite', type: 'string' as const },
    {
      key: 'size',
      label: 'Taille',
      type: 'select' as const,
      options: [
        { value: 'XS', label: 'Compacte (104px)' },
        { value: 'S', label: 'Grande (208px)' },
      ],
    },
    {
      key: 'searchBoxTheme',
      label: 'Style',
      type: 'select' as const,
      options: [
        { value: 'Glassmorphism', label: 'Glassmorphism' },
        { value: 'Classic', label: 'Classic' },
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
