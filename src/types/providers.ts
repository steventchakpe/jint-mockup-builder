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
}

export interface ProjectMeta {
  id: string;
  name: string;
  prospectCompany: string;
  updatedAt: string;
  thumbnail: string | null;
  /** Token de partage opaque (≠ project-id, sécurité) — généré au premier partage. */
  shareToken?: string;
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
