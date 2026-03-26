import type { NewsConfig } from './News.types';

export const newsDefaultConfig: NewsConfig = {
  layout: 'top-story',
  format: '3/3',
  radius: 'default',
  title: '',
  maxItems: 4,
};

export const newsConfigMeta = {
  typeId: 'news',
  displayName: 'News',
  category: 'actualites',
  wave: 1,
  icon: 'newspaper',
  description: "Affiche un fil d'actualités avec plusieurs mises en page.",
  configurableProps: [
    {
      key: 'layout',
      label: 'Mise en page',
      type: 'select' as const,
      options: [
        { value: 'top-story', label: 'Top Story' },
        { value: 'hero', label: 'Hero' },
        { value: 'tiles-verticales', label: 'Tiles verticales' },
        { value: 'carousel', label: 'Carousel' },
      ],
    },
    {
      key: 'format',
      label: 'Format',
      type: 'select' as const,
      options: [
        { value: '3/3', label: '3 colonnes' },
        { value: '1/2', label: '1 grande + 2 petites' },
        { value: 'responsive', label: 'Responsive' },
      ],
    },
    {
      key: 'radius',
      label: 'Arrondis',
      type: 'select' as const,
      options: [
        { value: 'default', label: 'Par défaut' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Grand' },
        { value: 'none', label: 'Aucun' },
      ],
    },
    {
      key: 'title',
      label: 'Titre de section',
      type: 'string' as const,
      placeholder: 'Actualités',
    },
  ],
};
