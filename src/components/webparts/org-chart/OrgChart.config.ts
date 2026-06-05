import type { OrgChartConfig } from './OrgChart.types';

/**
 * Défauts repris du manifest OrganizationChartWebPart (preconfiguredEntries) :
 * titre masqué, height L (832), radius pill (12), shadow désactivée,
 * tag département affiché (tagType du composant).
 */
export const orgChartDefaultConfig: OrgChartConfig = {
  title: '',
  height: 832,
  radius: 12,
  shadow: 'none',
  tagType: 'department',
};

export const orgChartConfigMeta = {
  typeId: 'org-chart',
  displayName: 'Organization chart',
  category: 'annuaire',
  wave: 2,
  icon: 'network',
  description: 'Organigramme — hiérarchie navigable des équipes.',
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
    {
      key: 'tagType',
      label: 'Tag affiché',
      type: 'select' as const,
      options: [
        { value: 'none', label: 'Aucun' },
        { value: 'department', label: 'Département' },
        { value: 'location', label: 'Lieu' },
      ],
    },
  ],
};
