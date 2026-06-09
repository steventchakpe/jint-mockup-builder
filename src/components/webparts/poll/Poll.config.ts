import type { PollConfig } from './Poll.types';

/**
 * Défauts manifest MzkSurveyWebPart : selectItemId/selectListId (refs liste SP,
 * non pertinentes en démo). Côté builder, seul le titre est configurable.
 */
export const pollDefaultConfig: PollConfig = {
  title: '',
};

export const pollConfigMeta = {
  typeId: 'poll',
  displayName: 'Poll',
  category: 'engagement',
  wave: 3,
  icon: 'bar-chart-3',
  description: 'Sondage interactif pour l’engagement des employés.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
  ],
};
