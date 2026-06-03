import type { FocusConfig } from './Focus.types';

/**
 * Défauts repris du manifest focusV2 (preconfiguredEntries) :
 * height "S" = 208px, radius "pill" = 12px, shadow "Strong",
 * background image plein cadre (cover, center center).
 */
export const focusDefaultConfig: FocusConfig = {
  title: '',
  height: 208,
  radius: 12,
  shadow: 'Strong',
  background: {
    type: 'image',
    url: '/focus-banner-default.jpg',
    position: 'center center',
    adjustment: 'cover',
  },
};

export const focusConfigMeta = {
  typeId: 'focus',
  displayName: 'Focus',
  category: 'hero',
  wave: 1,
  icon: 'sparkles',
  description: 'Met en avant un contenu prioritaire (hero) avec image, titre et appel à action.',
  configurableProps: [
    {
      key: 'title',
      label: 'Titre de section',
      type: 'string' as const,
      placeholder: 'À la une',
    },
    {
      key: 'height',
      label: 'Hauteur (px)',
      type: 'number' as const,
    },
    {
      key: 'radius',
      label: 'Arrondis (px)',
      type: 'number' as const,
    },
  ],
};
