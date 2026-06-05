import type { MyResumeConfig } from './MyResume.types';

/**
 * Défauts repris du manifest MySummaryWebPart (preconfiguredEntries) :
 * titre « Mon résumé » (htmlTitle i18n), height S (208), radius pill (12),
 * shadow Strong.
 */
export const myResumeDefaultConfig: MyResumeConfig = {
  title: 'Mon résumé',
  height: 208,
  radius: 12,
  shadow: 'strong',
};

export const myResumeConfigMeta = {
  typeId: 'my-resume',
  displayName: 'My resume',
  category: 'productivite',
  wave: 3,
  icon: 'gauge',
  description: 'Résumé du jour — salutation et compteurs réunions / e-mails / tâches.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      options: [
        { value: 208, label: 'Petite (S)' },
        { value: 416, label: 'Moyenne (M)' },
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
