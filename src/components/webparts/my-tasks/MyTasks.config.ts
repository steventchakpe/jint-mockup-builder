import type { MyTasksConfig } from './MyTasks.types';

/**
 * Défauts repris du manifest MyTasksWebPart (preconfiguredEntries) :
 * titre « Mes tâches » (htmlTitle i18n), height M (416), radius pill (12),
 * shadow Strong.
 */
export const myTasksDefaultConfig: MyTasksConfig = {
  title: 'Mes tâches',
  height: 416,
  radius: 12,
  shadow: 'strong',
};

export const myTasksConfigMeta = {
  typeId: 'my-tasks',
  displayName: 'My tasks',
  category: 'productivite',
  wave: 2,
  icon: 'list-checks',
  description: 'Tâches Microsoft To Do / Planner — listes et checklists cochables.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
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
