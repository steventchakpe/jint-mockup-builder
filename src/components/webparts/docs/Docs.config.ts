import type { DocsConfig } from './Docs.types';

/**
 * Défauts repris du widget jintan `myFilesWidget` : titre affiché (vide),
 * hauteur 400 (defaultHeight), pas de padding conteneur (BaseLayout fidèle).
 */
export const docsDefaultConfig: DocsConfig = {
  title: '',
  height: 400,
  padding: 0,
  radius: 8,
  shadow: 'medium',
};

export const docsConfigMeta = {
  typeId: 'docs',
  displayName: 'Docs',
  category: 'productivite',
  wave: 2,
  icon: 'file-text',
  description: 'Fichiers récents de l’utilisateur — cartes avec aperçu.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      options: [
        { value: 208, label: 'Petite (S)' },
        { value: 400, label: 'Moyenne (défaut)' },
        { value: 698, label: 'Grande (L)' },
      ],
    },
    {
      key: 'padding',
      label: 'Padding du conteneur',
      type: 'select' as const,
      options: [
        { value: 0, label: 'Aucun' },
        { value: 16, label: 'Standard (16px)' },
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
