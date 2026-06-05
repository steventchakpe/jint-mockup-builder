import type { ImageInteractiveConfig } from './ImageInteractive.types';

/**
 * Défauts repris du manifest ImageMapWebPart (preconfiguredEntries) :
 * height M (416), fitLayoutToImageWidth false, titre masqué.
 */
export const imageInteractiveDefaultConfig: ImageInteractiveConfig = {
  title: '',
  height: 416,
  fullWidth: false,
};

export const imageInteractiveConfigMeta = {
  typeId: 'image-interactive',
  displayName: 'Image interactive',
  category: 'medias',
  wave: 3,
  icon: 'map-pin',
  description: 'Image cliquable avec zones interactives et infobulles.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    { key: 'imageUrl', label: 'URL de l’image', type: 'string' as const, target: 'content' as const, path: ['imageUrl'], defaultValue: '' },
    { key: 'altText', label: 'Texte alternatif', type: 'string' as const, target: 'content' as const, path: ['altText'], defaultValue: '' },
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
    { key: 'fullWidth', label: 'Adapter à la largeur de l’image', type: 'boolean' as const },
  ],
};
