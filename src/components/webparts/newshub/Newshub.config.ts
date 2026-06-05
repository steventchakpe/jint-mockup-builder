import type { NewshubConfig } from './Newshub.types';

/**
 * Défauts repris du manifest NewsHubWebPart (preconfiguredEntries) :
 * maximumItems 12, showMoreResults true, height M (416), radius pill (12),
 * shadow Strong (Depth4 sur les cartes), titre masqué.
 */
export const newshubDefaultConfig: NewshubConfig = {
  title: '',
  height: 416,
  radius: 12,
  shadow: 'strong',
  maximumItems: 12,
  showMoreResults: true,
};

export const newshubConfigMeta = {
  typeId: 'newshub',
  displayName: 'Newshub',
  category: 'actualites',
  wave: 2,
  icon: 'rss',
  description: 'Agrégateur de posts multi-sources (réseaux sociaux, RSS).',
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
    { key: 'maximumItems', label: 'Nombre maximum de posts', type: 'number' as const },
    { key: 'showMoreResults', label: 'Bouton « Voir plus »', type: 'boolean' as const },
  ],
};
