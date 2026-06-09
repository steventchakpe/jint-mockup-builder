import type { VivaEngageConfig } from './VivaEngage.types';

/** Défauts : titre « Conversations », barre de composition affichée. */
export const vivaEngageDefaultConfig: VivaEngageConfig = {
  title: 'Conversations',
  showComposer: true,
};

export const vivaEngageConfigMeta = {
  typeId: 'viva-engage',
  displayName: 'Viva Engage',
  category: 'engagement',
  wave: 2,
  icon: 'message-circle',
  description: 'Fil social Viva Engage — conversations, J’aime, commentaires, composition.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    { key: 'showComposer', label: 'Afficher la zone de composition', type: 'boolean' as const },
  ],
};
