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

function toMeta(p: Project): ProjectMeta {
  return {
    id: p.id,
    name: p.name,
    prospectCompany: p.prospect?.company ?? '',
    updatedAt: p.metadata?.updatedAt ?? new Date().toISOString(),
    thumbnail: null,
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
    } catch {
      /* première sauvegarde */
    }
    await fs.writeFile(path.join(dir, 'metadata.json'), JSON.stringify(meta, null, 2), 'utf-8');
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

  // ---- Phase 2 ----
  async uploadImage(): Promise<string> {
    throw new Error('Not implemented — Phase 2');
  }
  async deleteImage(): Promise<void> {
    throw new Error('Not implemented — Phase 2');
  }
  /** Génère (ou renvoie) le share-token du projet — stocké dans metadata.json. */
  async getShareUrl(projectId: string): Promise<string> {
    const metaPath = path.join(projectDir(projectId), 'metadata.json');
    const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8')) as ProjectMeta;
    if (!meta.shareToken) {
      meta.shareToken = crypto.randomUUID().replace(/-/g, '');
      await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
    }
    return meta.shareToken;
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
