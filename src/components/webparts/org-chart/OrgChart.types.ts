/**
 * Types portés de `@mozzaik365/components/organization-chart`
 * (OrganizationChartTreechartLayout). Organigramme : cartes employé reliées
 * par connecteurs, expand/collapse par compteur de directs.
 */

export type OrgChartShadow = 'none' | 'light' | 'medium' | 'strong';
export type OrgChartTagType = 'none' | 'department' | 'location';

export interface OrgChartEmployee {
  id: string;
  /** ID d'un profil éditable du projet (référence). */
  profileId?: string;
  displayName: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  email?: string;
  imageUrl?: string;
  /** ID du manager (null = racine). */
  managerId: string | null;
}

export interface OrgChartConfig {
  /** Titre (manifest : masqué par défaut). */
  title?: string;
  /** Hauteur de la zone en px (manifest : L = 832). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : désactivée par défaut). */
  shadow: OrgChartShadow;
  /** Tag affiché sous le poste (département / lieu / aucun). */
  tagType: OrgChartTagType;
}

export interface OrgChartContent {
  employees: OrgChartEmployee[];
}

export interface OrgChartProps {
  config: OrgChartConfig;
  content: OrgChartContent;
  isEditMode?: boolean;
  onChatClick?: (email: string) => void;
}
