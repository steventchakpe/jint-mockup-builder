import type { SeparatorConfig } from './Separator.types';

/**
 * Défauts repris du manifest separator (preconfiguredEntries) :
 * alignment "center", separatorBarHeight "thin", separatorBarLength 100,
 * separatorTextPosition "inBetween". Couleur barre = couleur primaire du thème.
 */
export const separatorDefaultConfig: SeparatorConfig = {
  alignment: 'center',
  barHeight: 'thin',
  barLength: 100,
  textPosition: 'inBetween',
  barColor: 'var(--sp-theme-primary)',
};

export const separatorConfigMeta = {
  typeId: 'separator',
  displayName: 'Separator',
  category: 'layout',
  wave: 1,
  icon: 'minus',
  description: 'Séparateur graphique configurable (barre + texte) adapté à la charte.',
  configurableProps: [
    {
      key: 'alignment',
      label: 'Alignement',
      type: 'select' as const,
      options: [
        { value: 'left', label: 'Gauche' },
        { value: 'center', label: 'Centre' },
        { value: 'right', label: 'Droite' },
      ],
    },
    {
      key: 'barHeight',
      label: 'Épaisseur de la barre',
      type: 'select' as const,
      options: [
        { value: 'thin', label: 'Fine' },
        { value: 'large', label: 'Épaisse' },
      ],
    },
    {
      key: 'textPosition',
      label: 'Position du texte',
      type: 'select' as const,
      options: [
        { value: 'inBetween', label: 'Au milieu' },
        { value: 'onTop', label: 'Au-dessus' },
        { value: 'inside', label: 'À l’intérieur' },
      ],
    },
    {
      key: 'barLength',
      label: 'Longueur de la barre (%)',
      type: 'number' as const,
    },
  ],
};
