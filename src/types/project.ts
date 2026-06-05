// Project data model — single source of truth for the entire demo state
// This file defines the shape of project.json

export type Locale = 'en' | 'fr-FR' | 'fr-CA';
export type CreationMode = 'ai' | 'manual';
export type HeaderLayout = 'extended' | 'compact';
export type HeaderTheme = 'neutral' | 'soft' | 'strong' | 'mixed';
export type SectionLayout =
  | 'flexible'
  | 'one-column'
  | 'two-column'
  | 'three-column'
  | 'one-third-left'
  | 'one-third-right'
  | 'full-width';
export type SectionBackground = 'none' | 'neutral' | 'soft' | 'strong' | 'image';
export type ProfileRole = 'contributor' | 'user';
export type NewsletterStatus = 'sent' | 'draft' | 'scheduled';

export interface Project {
  id: string;
  name: string;
  creationMode: CreationMode;
  prospect: Prospect;
  theme: Theme;
  header: Header;
  profiles: ProfileCollection;
  pages: Page[];
  navigation: Navigation;
  uex: UEX;
  flows: Flows;
  metadata: ProjectMetadata;
}

export interface Prospect {
  company: string;
  sector: string;
  sourceUrl: string | null;
  logo: ProspectLogo | null;
  employeeCount: number;
  contentLanguage: Locale;
}

export interface ProspectLogo {
  url: string;
  format: 'svg' | 'png' | 'jpg';
  svgContent: string | null;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string; // Default: 'Segoe UI' (SharePoint standard)
  prospectFontFamily: string | null; // Custom font from prospect's brand (loaded via @font-face)
  prospectFontUrl: string | null; // URL to the font file (woff2/woff/ttf) or Google Fonts URL
  logo: string;
  sharepointThemeOverrides: Record<string, string>;
}

export interface Header {
  layout: HeaderLayout;
  theme: HeaderTheme;
  siteLogo: {
    type: 'initials' | 'image';
    initials: string | null;
    imageUrl: string | null;
    backgroundColor: string;
  };
  siteTitle: string;
  labels: string[];
  hubNavigation: {
    hubLogo: { initials: string; backgroundColor: string };
    hubTitle: string;
    links: Array<{ label: string; url: string }>;
    groups: Array<{ label: string; children: Array<{ label: string; url: string }> }>;
  };
  localNavigation: {
    items: Array<{ label: string; url: string; isActive: boolean }>;
  };
  actions: {
    showFollowButton: boolean;
    showShareButton: boolean;
  };
}

export interface ProfileCollection {
  activeProfileId: string;
  switchable: string[]; // 3 profile IDs
  editable: Profile[]; // max 20
  generated: Profile[]; // non-editable, auto-generated
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  role: ProfileRole;
  jobTitle: string;
  department: string;
  email: string;
  phone: string | null;
  location: string | null;
  avatar: string;
  manager: string | null;
  startDate: string | null;
  birthDate: string | null;
  bio: string | null;
  skills: string[];
  personalContent: {
    tasks: unknown[] | null;
    emails: unknown[] | null;
    meetings: unknown[] | null;
  } | null;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  icon: string;
  order: number;
  sections: Section[];
  verticalSection: VerticalSection | null;
}

export interface Section {
  id: string;
  order: number;
  layout: SectionLayout;
  background: SectionBackground;
  backgroundImage: string | null; // URL of the background image (when background === 'image')
  collapsible: boolean;
  title: string | null;
  columns: Column[];
}

export interface Column {
  id: string;
  index: number;
  webparts: WebpartInstance[];
}

export interface WebpartInstance {
  id: string;
  type: string; // webpart type-id from registry
  config: Record<string, unknown>; // webpart-specific configurable properties
  content: Record<string, unknown>; // webpart-specific content
  order: number;
  // Positionnement dans une section "flexible" (grille 12 colonnes 2D SharePoint).
  // Ignoré dans les sections à colonnes fixes.
  flex?: FlexPosition;
}

/**
 * Position d'un webpart dans une section flexible (SharePoint).
 * Grille 12 colonnes horizontale + placement vertical libre :
 * `x` = colonne de départ (0-11), `w` = largeur en colonnes (1-12),
 * `y` = décalage vertical en pixels (0+), `z` = z-index pour le chevauchement.
 */
export interface FlexPosition {
  x: number;
  w: number;
  y: number;
  z?: number;
}

export interface VerticalSection {
  webparts: WebpartInstance[];
}

export interface Navigation {
  type: 'left' | 'top' | 'mega-menu';
  items: Array<{ label: string; pageId: string; icon?: string }>;
}

export interface UEX {
  enabled: boolean;
  sections: {
    navigate: { links: Array<{ label: string; url: string; icon: string }> };
    inform: { showEvents: boolean; showNews: boolean; maxItems: number };
    search: { enabled: boolean; placeholder: string };
    contribute: { enabled: boolean };
    share: { channels: string[] };
  };
}

export interface Flows {
  newsletter: NewsletterFlow;
  article: ArticleFlow;
  sharing: SharingFlow;
}

export interface NewsletterFlow {
  enabled: boolean;
  steps: NewsletterStep[];
  editorComponents: string[];
  editorConfig: {
    layouts: string[];
    pageSettings: {
      subject: string;
      font: string;
      themeColor: string;
      spacing: number;
    };
  };
  dashboardContent: {
    kpis: { openRate: number; clickRate: number; engagementRate: number; avgReadTime: string };
    newsletters: Array<{
      subject: string;
      modifiedDate: string;
      status: NewsletterStatus;
      sentDate: string | null;
      scheduledDate: string | null;
      sender: { name: string; avatar: string };
      author: { name: string; avatar: string };
    }>;
  };
}

export interface NewsletterStep {
  id: string;
  title: string;
  screen: string;
}

export interface ArticleFlow {
  enabled: boolean;
  steps: unknown[];
}

export interface SharingFlow {
  enabled: boolean;
  channels: string[];
  steps: unknown[];
}

/** Département auteur de la maquette (équipe interne Jint). */
export type Department = 'Design' | 'Customer Success' | 'Sales' | 'Autre';
export const DEPARTMENTS: Department[] = ['Design', 'Customer Success', 'Sales', 'Autre'];

export interface ProjectMetadata {
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  shareUrl: string;
  /** Département qui a réalisé la maquette. */
  department: Department;
}
