import type { SearchResultsConfig } from './SearchResults.types';

/**
 * Défauts repris du manifest SearchResultsWebPart (preconfiguredEntries) :
 * height L (832), radius pill (12), shadow Small (light), layout table,
 * showVerticals true, enableViewSwitch true, autoConnect true, titre masqué.
 */
export const searchResultsDefaultConfig: SearchResultsConfig = {
  title: '',
  height: 832,
  radius: 12,
  shadow: 'light',
  showVerticals: true,
  enableViewSwitch: true,
  layout: 'table',
  autoConnect: true,
};

export const searchResultsConfigMeta = {
  typeId: 'search-results',
  displayName: 'Search results',
  category: 'navigation',
  wave: 3,
  icon: 'list',
  description: 'Résultats de recherche — vues cartes/tuiles/table, connecté à la barre de recherche.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      options: [
        { value: 416, label: 'Moyenne (M)' },
        { value: 832, label: 'Grande (L)' },
      ],
    },
    {
      key: 'layout',
      label: 'Vue par défaut',
      type: 'select' as const,
      options: [
        { value: 'table', label: 'Table' },
        { value: 'cards', label: 'Cartes' },
        { value: 'tiles', label: 'Tuiles' },
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
    { key: 'showVerticals', label: 'Onglets de verticales', type: 'boolean' as const },
    { key: 'enableViewSwitch', label: 'Switch de vue', type: 'boolean' as const },
    { key: 'autoConnect', label: 'Connexion à la barre de recherche', type: 'boolean' as const },
  ],
};
