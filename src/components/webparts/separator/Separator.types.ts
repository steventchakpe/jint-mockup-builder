/** Types portés à l'identique de `@mozzaik365/components/separator` (SeparatorDefaultLayout). */

export type SeparatorAlignment = 'left' | 'center' | 'right';
export type SeparatorBarHeight = 'thin' | 'large';
export type SeparatorTextPosition = 'inBetween' | 'onTop' | 'inside';

export interface SeparatorConfig {
  alignment: SeparatorAlignment;
  /** thin = 4px, large = 20px. */
  barHeight: SeparatorBarHeight;
  /** Longueur de la barre en % (0-100). */
  barLength: number;
  /** Position du texte par rapport à la barre. */
  textPosition: SeparatorTextPosition;
  /** Couleur de la barre (CSS color / var thème). Par défaut couleur primaire du thème. */
  barColor: string;
}

export interface SeparatorContent {
  /** Texte riche affiché dans le séparateur. */
  text: {
    html?: string;
    value?: string;
    color?: string;
  };
  /** Affiche le texte (sinon : barre seule pleine longueur). */
  showText: boolean;
}

export interface SeparatorProps {
  config: SeparatorConfig;
  content: SeparatorContent;
  isEditMode?: boolean;
}
