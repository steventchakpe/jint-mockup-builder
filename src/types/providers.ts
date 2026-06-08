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
  /** Écrit la miniature (capture de la page d'accueil) et retourne son URL servie par l'API. */
  setThumbnail(projectId: string, buffer: Buffer): Promise<string>;
  getShareUrl(projectId: string): Promise<string>;
  loadSharedProject(shareToken: string): Promise<Project>;
  /** Résout le project-id d'un share-token (null si inconnu). */
  resolveProjectId(shareToken: string): Promise<string | null>;
  /** Lit les métadonnées d'un projet (dashboard, partage). */
  getMeta(projectId: string): Promise<ProjectMeta>;
  /** Met à jour partiellement les métadonnées (shareToken, url dashboard PostHog…). */
  updateMeta(projectId: string, patch: Partial<ProjectMeta>): Promise<void>;
}

// ============================================
// Analytics Provider — local (self-hosted) | posthog
// Tracking des liens partagés (mode Présentation uniquement).
// ============================================
export interface AnalyticsProvider {
  /** Enregistre un événement de visite (lien partagé). */
  recordVisit(ctx: VisitContext, event: VisitEvent): Promise<void>;
  /** Métriques agrégées du lien partagé d'un projet (stats par maquette). */
  getAnalytics(projectId: string): Promise<ShareAnalytics>;
  /** Métriques globales tous projets confondus (cards du dashboard). */
  getGlobalMetrics(): Promise<GlobalMetrics>;
  /**
   * Provisionne le dashboard d'analytics du lien partagé et renvoie son URL
   * (ouvrable depuis la carte du dashboard). Retourne null si non applicable
   * (provider local). L'idempotence est gérée par l'appelant via
   * ProjectMeta.posthogDashboardUrl.
   */
  ensureDashboard(projectId: string, opts: DashboardOpts): Promise<string | null>;
}

/** Contexte d'une visite, résolu côté serveur avant l'enregistrement. */
export interface VisitContext {
  projectId: string;
  shareToken: string;
  /** Clé visiteur opaque = hash(IP+UA) — sert de distinct_id. */
  visitorKey: string;
  /** Nom du prospect (injecté serveur) — propriété d'event pour le lastView global. */
  company?: string;
}

/** Métriques globales affichées sur les cards du dashboard. */
export interface GlobalMetrics {
  /** Total de vues (toutes maquettes partagées). */
  totalViews: number;
  /** Dernière consultation prospect, tous projets confondus. */
  lastView: { at: string | null; company: string | null };
}

export interface DashboardOpts {
  shareToken: string;
  projectName: string;
  company: string;
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
  /** Date de création du lien de partage, ISO — stampée au premier partage. */
  shareCreatedAt?: string | null;
  /** URL du dashboard PostHog de la maquette (créé au premier partage). */
  posthogDashboardUrl?: string | null;
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
