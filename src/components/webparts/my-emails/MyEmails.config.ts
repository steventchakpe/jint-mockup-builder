import type { MyEmailsConfig } from './MyEmails.types';

/**
 * Défauts repris du manifest MyMailsWebPart (preconfiguredEntries) :
 * titre « Mes e-mails » (htmlTitle i18n), height M (416), radius pill (12),
 * shadow Strong — padding désactivé → ombre/radius portés par les cartes.
 */
export const myEmailsDefaultConfig: MyEmailsConfig = {
  title: 'Mes e-mails',
  height: 416,
  radius: 12,
  shadow: 'strong',
};

export const myEmailsConfigMeta = {
  typeId: 'my-emails',
  displayName: 'My emails',
  category: 'productivite',
  wave: 2,
  icon: 'mail',
  description: 'Boîte de réception Outlook — derniers e-mails reçus.',
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
