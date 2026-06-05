import type { Project } from '@/types/project';

// ============================================
// Storage Provider — MVP: Vercel Blob, Future: Azure Blob
// ============================================
export interface StorageProvider {
  saveProject(id: string, data: Project): Promise<void>;
  loadProject(id: string): Promise<Project>;
  listProjects(userId: string): Promise<ProjectMeta[]>;
  deleteProject(id: string): Promise<void>;
  duplicateProject(id: string, newName: string): Promise<string>;
  uploadImage(projectId: string, file: File): Promise<string>;
  deleteImage(url: string): Promise<void>;
  getShareUrl(projectId: string): Promise<string>;
  loadSharedProject(shareToken: string): Promise<Project>;
  // ---- Tracking des liens partagés (self-hosted, sans PostHog) ----
  /** Enregistre un événement de visite sur un lien partagé (mode Présentation). */
  recordVisit(shareToken: string, visitorKey: string, event: VisitEvent): Promise<void>;
  /** Métriques agrégées du lien partagé d'un projet (dashboard). */
  getAnalytics(projectId: string): Promise<ShareAnalytics>;
}

/** Événement de tracking émis depuis le lien partagé `/view/{token}`. */
export interface VisitEvent {
  type: 'view' | 'pageview' | 'heartbeat' | 'end';
  pageId?: string;
  pageTitle?: string;
  /** Horodatage ISO (calculé serveur si absent). */
  at?: string;
}

/** Métriques agrégées d'un lien partagé. */
export interface ShareAnalytics {
  /** Date de création du lien (premier partage), ISO — null si jamais partagé. */
  shareCreatedAt: string | null;
  /** Nombre de visiteurs uniques (sessions par IP/user-agent). */
  views: number;
  /** Dernière consultation, ISO — null si aucune. */
  lastViewedAt: string | null;
  /** Durée moyenne de session en secondes. */
  avgSessionSeconds: number;
  /** Pages visitées : titre → nombre de vues, trié décroissant. */
  pagesVisited: { pageId: string; title: string; views: number }[];
}

export interface ProjectMeta {
  id: string;
  name: string;
  prospectCompany: string;
  updatedAt: string;
  thumbnail: string | null;
  /** Token de partage opaque (≠ project-id, sécurité) — généré au premier partage. */
  shareToken?: string;
  /** Département auteur de la maquette (affiché sur la carte du dashboard). */
  department?: string;
  /** Prénom du créateur (affiché dans les statistiques). */
  createdBy?: string;
}

// ============================================
// Chat Provider — MVP: Claude API
// ============================================
export interface ChatProvider {
  sendMessage(
    messages: ChatMessage[],
    projectState: Project,
  ): AsyncGenerator<string>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ============================================
// Image Provider — MVP: Unsplash API
// ============================================
export interface ImageProvider {
  search(query: string, count: number): Promise<ImageResult[]>;
  getAvatars(gender: 'male' | 'female', count: number): Promise<string[]>;
}

export interface ImageResult {
  url: string;
  thumbnailUrl: string;
  alt: string;
  credit: string;
}

// ============================================
// Brand Detector — Scrapes prospect website
// ============================================
export interface BrandDetector {
  detect(url: string): Promise<BrandInfo>;
}

export interface BrandInfo {
  logo: { url: string; format: 'svg' | 'png' | 'jpg'; svgContent?: string } | null;
  colors: { primary: string; secondary: string; accent: string; background: string };
  sector: string;
  companyName: string;
  language: string;
}

// ============================================
// Translation Provider — Pre-generates translations for demos
// ============================================
export interface TranslationProvider {
  translate(content: string, from: string, to: string): Promise<string>;
  translateBatch(items: Array<{ key: string; content: string }>, from: string, to: string): Promise<Record<string, string>>;
}
