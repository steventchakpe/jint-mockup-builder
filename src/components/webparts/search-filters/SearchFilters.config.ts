import type { SearchFiltersConfig } from './SearchFilters.types';

/** Défauts (manifest MzkSearchFilters : shadow small). */
export const searchFiltersDefaultConfig: SearchFiltersConfig = {
  title: '',
  radius: 12,
  shadow: 'light',
};

export const searchFiltersConfigMeta = {
  typeId: 'search-filters',
  displayName: 'Search filters',
  category: 'navigation',
  wave: 3,
  icon: 'filter',
  description: 'Filtres de recherche — facettes connectées aux résultats.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
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
  ],
};
