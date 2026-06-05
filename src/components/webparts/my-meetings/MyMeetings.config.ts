import type { MyMeetingsConfig } from './MyMeetings.types';

/**
 * Défauts repris du manifest MyMeetingsWebPart (preconfiguredEntries) :
 * titre « Mes réunions » (htmlTitle i18n), height M (416), radius pill (12),
 * shadow Strong — paddingEnabled false → ombre/radius sur les cartes.
 */
export const myMeetingsDefaultConfig: MyMeetingsConfig = {
  title: 'Mes réunions',
  height: 416,
  radius: 12,
  shadow: 'strong',
};

export const myMeetingsConfigMeta = {
  typeId: 'my-meetings',
  displayName: 'My meetings',
  category: 'productivite',
  wave: 2,
  icon: 'calendar-clock',
  description: 'Agenda Outlook — prochaines réunions avec statut et accès rapide.',
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
