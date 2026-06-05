import type { ActionButtonConfig } from './ActionButton.types';

/**
 * Défauts repris du manifest ActionButtonWebPart (preconfiguredEntries) :
 * height M (416), radius pill (12), shadow Strong, type Primary,
 * position center, size small, titre visible.
 */
export const actionButtonDefaultConfig: ActionButtonConfig = {
  title: '',
  height: 208,
  radius: 12,
  shadow: 'strong',
  type: 'Primary',
  position: 'center',
  size: 'small',
};

export const actionButtonConfigMeta = {
  typeId: 'action-button',
  displayName: 'Action button',
  category: 'liens',
  wave: 3,
  icon: 'mouse-pointer-click',
  description: 'Bouton d’appel à l’action configurable avec redirection.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      options: [
        { value: 128, label: 'Compacte' },
        { value: 208, label: 'Petite (S)' },
        { value: 416, label: 'Moyenne (M)' },
      ],
    },
    {
      key: 'type',
      label: 'Style',
      type: 'select' as const,
      options: [
        { value: 'Primary', label: 'Principal (plein)' },
        { value: 'Secondary', label: 'Secondaire (contour)' },
      ],
    },
    {
      key: 'position',
      label: 'Position',
      type: 'select' as const,
      options: [
        { value: 'start', label: 'Gauche' },
        { value: 'center', label: 'Centre' },
        { value: 'end', label: 'Droite' },
      ],
    },
    {
      key: 'size',
      label: 'Taille',
      type: 'select' as const,
      options: [
        { value: 'small', label: 'Petite' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'large', label: 'Grande' },
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
