import { promises as fs } from 'fs';
import path from 'path';
import type { StorageProvider, ProjectMeta } from '@/types/providers';
import type { Project } from '@/types/project';

/**
 * Local filesystem storage provider (MVP, Phase 1).
 *
 * Arborescence :
 *   ./data/projects/{id}/project.json   ← state complet
 *   ./data/projects/{id}/metadata.json  ← ProjectMeta (liste dashboard)
 *   ./data/projects/{id}/images/        ← images uploadées (Phase 2)
 *
 * Bascule Azure/Vercel : changer STORAGE_PROVIDER (code applicatif inchangé).
 */
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const projectsDir = () => path.join(DATA_DIR, 'projects');
const projectDir = (id: string) => path.join(projectsDir(), id);
const metaPath = (id: string) => path.join(projectDir(id), 'metadata.json');

function toMeta(p: Project): ProjectMeta {
  return {
    id: p.id,
    name: p.name,
    prospectCompany: p.prospect?.company ?? '',
    updatedAt: p.metadata?.updatedAt ?? new Date().toISOString(),
    thumbnail: null,
    department: p.metadata?.department,
    createdBy: p.metadata?.createdBy || undefined,
  };
}

export class LocalStorageProvider implements StorageProvider {
  async saveProject(id: string, data: Project): Promise<void> {
    const dir = projectDir(id);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'project.json'), JSON.stringify(data, null, 2), 'utf-8');
    // Préserver le shareToken existant (metadata réécrit à chaque sauvegarde)
    const meta = toMeta(data);
    try {
      const prev = JSON.parse(await fs.readFile(path.join(dir, 'metadata.json'), 'utf-8')) as ProjectMeta;
      if (prev.shareToken) meta.shareToken = prev.shareToken;
      if (prev.thumbnail) meta.thumbnail = prev.thumbnail; // miniature générée — ne pas l'effacer
      if (prev.shareCreatedAt) meta.shareCreatedAt = prev.shareCreatedAt; // date du lien — préserver
      if (prev.posthogDashboardUrl) meta.posthogDashboardUrl = prev.posthogDashboardUrl;
    } catch {
      /* première sauvegarde */
    }
    await fs.writeFile(path.join(dir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');
  }

  /** Écrit la miniature (capture page d'accueil) et met à jour metadata.json. Retourne l'URL (cache-bustée). */
  async setThumbnail(id: string, buffer: Buffer): Promise<string> {
    const dir = projectDir(id);
    const imagesDir = path.join(dir, 'images');
    await fs.mkdir(imagesDir, { recursive: true });
    await fs.writeFile(path.join(imagesDir, 'thumbnail.jpg'), buffer);
    const url = `/api/projects/${id}/images/thumbnail.jpg?v=${Date.now()}`;
    try {
      const meta = JSON.parse(await fs.readFile(path.join(dir, 'metadata.json'), 'utf-8')) as ProjectMeta;
      meta.thumbnail = url;
      await fs.writeFile(path.join(dir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');
    } catch {
      /* pas de metadata (projet non sauvegardé) → la miniature reste sur disque */
    }
    return url;
  }

  async loadProject(id: string): Promise<Project> {
    const raw = await fs.readFile(path.join(projectDir(id), 'project.json'), 'utf-8');
    return JSON.parse(raw) as Project;
  }

  async listProjects(): Promise<ProjectMeta[]> {
    let ids: string[];
    try {
      ids = await fs.readdir(projectsDir());
    } catch {
      return []; // dossier inexistant → aucune maquette
    }
    const metas: ProjectMeta[] = [];
    for (const id of ids) {
      try {
        const raw = await fs.readFile(path.join(projectDir(id), 'metadata.json'), 'utf-8');
        metas.push(JSON.parse(raw) as ProjectMeta);
      } catch {
        /* dossier sans metadata → ignoré */
      }
    }
    // Tri par date de modification décroissante.
    return metas.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }

  async deleteProject(id: string): Promise<void> {
    await fs.rm(projectDir(id), { recursive: true, force: true });
  }

  async duplicateProject(id: string, newName: string): Promise<string> {
    const source = await this.loadProject(id);
    const newId = `project-${Date.now()}`;
    const now = new Date().toISOString();
    const copy: Project = {
      ...source,
      id: newId,
      name: newName,
      metadata: { ...source.metadata, createdAt: now, updatedAt: now },
    };
    await this.saveProject(newId, copy);
    return newId;
  }

  // ---- Images (US-49) ----
  /** Écrit l'image dans data/projects/{id}/images/ et retourne son URL servie par l'API. */
  async uploadImage(projectId: string, file: File): Promise<string> {
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
    const name = `${crypto.randomUUID()}.${ext}`;
    const dir = path.join(projectDir(projectId), 'images');
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return `/api/projects/${projectId}/images/${name}`;
  }

  /** Supprime une image à partir de son URL servie (/api/projects/{id}/images/{file}). */
  async deleteImage(url: string): Promise<void> {
    const m = url.match(/^\/api\/projects\/([^/]+)\/images\/([^/?#]+)$/);
    if (!m) return; // URL externe (Unsplash, data:) → rien à supprimer
    await fs.rm(path.join(projectDir(m[1]), 'images', m[2]), { force: true });
  }
  /** Génère (ou renvoie) le share-token du projet — stocké dans metadata.json. */
  async getShareUrl(projectId: string): Promise<string> {
    const meta = JSON.parse(await fs.readFile(metaPath(projectId), 'utf-8')) as ProjectMeta;
    let changed = false;
    if (!meta.shareToken) {
      meta.shareToken = crypto.randomUUID().replace(/-/g, '');
      changed = true;
    }
    // Stampe la date de création du lien (provider-agnostique) — même pour les tokens préexistants.
    if (!meta.shareCreatedAt) {
      meta.shareCreatedAt = new Date().toISOString();
      changed = true;
    }
    if (changed) await fs.writeFile(metaPath(projectId), JSON.stringify(meta, null, 2), 'utf-8');
    return meta.shareToken;
  }

  /** Résout le project-id d'un share-token (scan des metadata). */
  async resolveProjectId(shareToken: string): Promise<string | null> {
    let ids: string[];
    try { ids = await fs.readdir(projectsDir()); } catch { return null; }
    for (const id of ids) {
      try {
        const meta = JSON.parse(await fs.readFile(metaPath(id), 'utf-8')) as ProjectMeta;
        if (meta.shareToken && meta.shareToken === shareToken) return id;
      } catch { /* ignoré */ }
    }
    return null;
  }

  async getMeta(projectId: string): Promise<ProjectMeta> {
    return JSON.parse(await fs.readFile(metaPath(projectId), 'utf-8')) as ProjectMeta;
  }

  async updateMeta(projectId: string, patch: Partial<ProjectMeta>): Promise<void> {
    const meta = await this.getMeta(projectId);
    await fs.writeFile(metaPath(projectId), JSON.stringify({ ...meta, ...patch }, null, 2), 'utf-8');
  }

  /** Charge un projet via son share-token (lecture seule stricte). */
  async loadSharedProject(shareToken: string): Promise<Project> {
    const ids = await fs.readdir(projectsDir());
    for (const id of ids) {
      try {
        const raw = await fs.readFile(path.join(projectDir(id), 'metadata.json'), 'utf-8');
        const meta = JSON.parse(raw) as ProjectMeta;
        if (meta.shareToken && meta.shareToken === shareToken) return this.loadProject(id);
      } catch {
        /* dossier sans metadata → ignoré */
      }
    }
    throw new Error('Share token inconnu');
  }
}
