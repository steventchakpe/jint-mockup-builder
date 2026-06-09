import type { IdeaBoxConfig } from './IdeaBox.types';

/**
 * Défauts repris du manifest MzkSuggestionBoxWebPart (preconfiguredEntries) :
 * enableAddSuggestion true, rowLimit 5.
 */
export const ideaBoxDefaultConfig: IdeaBoxConfig = {
  enableAddSuggestion: true,
  rowLimit: 5,
};

export const ideaBoxConfigMeta = {
  typeId: 'idea-box',
  displayName: 'Idea box',
  category: 'engagement',
  wave: 3,
  icon: 'lightbulb',
  description: 'Boîte à idées — soumission et vote d’idées par les employés.',
  configurableProps: [
    {
      key: 'enableAddSuggestion',
      label: 'Bouton « Proposer une idée »',
      type: 'boolean' as const,
    },
    {
      key: 'rowLimit',
      label: 'Nombre d’idées affichées',
      type: 'select' as const,
      options: [
        { value: 3, label: '3' },
        { value: 5, label: '5' },
        { value: 10, label: '10' },
      ],
    },
  ],
};
