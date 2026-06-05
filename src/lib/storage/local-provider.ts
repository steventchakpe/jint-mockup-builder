import { promises as fs } from 'fs';
import path from 'path';
import type { StorageProvider, ProjectMeta, VisitEvent, ShareAnalytics } from '@/types/providers';
import type { Project } from '@/types/project';

/** Session d'un visiteur (clé = hash IP+UA). */
interface VisitSession {
  firstSeen: string;
  lastSeen: string;
  pages: Record<string, { title: string; views: number }>;
}
interface AnalyticsFile {
  shareCreatedAt: string | null;
  sessions: Record<string, VisitSession>;
}
/** Fenêtre d'inactivité au-delà de laquelle on ne cumule plus la durée (anti-onglet oublié). */
const SESSION_GAP_MS = 30 * 60 * 1000;

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

const analyticsPath = (id: string) => path.join(projectDir(id), 'analytics.json');
async function readAnalytics(id: string): Promise<AnalyticsFile> {
  try {
    return JSON.parse(await fs.readFile(analyticsPath(id), 'utf-8')) as AnalyticsFile;
  } catch {
    return { shareCreatedAt: null, sessions: {} };
  }
}
async function writeAnalytics(id: string, data: AnalyticsFile): Promise<void> {
  await fs.mkdir(projectDir(id), { recursive: true });
  await fs.writeFile(analyticsPath(id), JSON.stringify(data, null, 2), 'utf-8');
}

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
    // Stampe la date de création du lien (tracking) — y compris pour les tokens préexistants.
    const a = await readAnalytics(projectId);
    if (!a.shareCreatedAt) {
      a.shareCreatedAt = new Date().toISOString();
      await writeAnalytics(projectId, a);
    }
    return meta.shareToken;
  }

  /** Résout le project-id d'un share-token (scan des metadata). */
  private async projectIdFromToken(shareToken: string): Promise<string | null> {
    let ids: string[];
    try { ids = await fs.readdir(projectsDir()); } catch { return null; }
    for (const id of ids) {
      try {
        const meta = JSON.parse(await fs.readFile(path.join(projectDir(id), 'metadata.json'), 'utf-8')) as ProjectMeta;
        if (meta.shareToken && meta.shareToken === shareToken) return id;
      } catch { /* ignoré */ }
    }
    return null;
  }

  /** Enregistre un événement de visite (lien partagé uniquement). */
  async recordVisit(shareToken: string, visitorKey: string, event: VisitEvent): Promise<void> {
    const projectId = await this.projectIdFromToken(shareToken);
    if (!projectId) return; // token inconnu → silencieux
    const a = await readAnalytics(projectId);
    const now = event.at ?? new Date().toISOString();
    const s = a.sessions[visitorKey] ?? { firstSeen: now, lastSeen: now, pages: {} };
    // Réinitialise la fenêtre de session si trop d'inactivité (évite de gonfler la durée)
    if (Date.parse(now) - Date.parse(s.lastSeen) > SESSION_GAP_MS) s.firstSeen = now;
    s.lastSeen = now;
    if ((event.type === 'view' || event.type === 'pageview') && event.pageId) {
      const p = s.pages[event.pageId] ?? { title: event.pageTitle ?? event.pageId, views: 0 };
      p.title = event.pageTitle ?? p.title;
      p.views += 1;
      s.pages[event.pageId] = p;
    }
    a.sessions[visitorKey] = s;
    await writeAnalytics(projectId, a);
  }

  /** Agrège les métriques du lien partagé (dashboard). */
  async getAnalytics(projectId: string): Promise<ShareAnalytics> {
    const a = await readAnalytics(projectId);
    const sessions = Object.values(a.sessions);
    const views = sessions.length;
    const lastViewedAt = sessions.reduce<string | null>((m, s) => (!m || s.lastSeen > m ? s.lastSeen : m), null);
    const avgSessionSeconds = views === 0 ? 0 : Math.round(
      sessions.reduce((sum, s) => sum + (Date.parse(s.lastSeen) - Date.parse(s.firstSeen)) / 1000, 0) / views,
    );
    const pageMap = new Map<string, { title: string; views: number }>();
    for (const s of sessions) {
      for (const [pid, p] of Object.entries(s.pages)) {
        const cur = pageMap.get(pid) ?? { title: p.title, views: 0 };
        cur.views += p.views; cur.title = p.title;
        pageMap.set(pid, cur);
      }
    }
    const pagesVisited = [...pageMap.entries()]
      .map(([pageId, p]) => ({ pageId, ...p }))
      .sort((x, y) => y.views - x.views);
    return { shareCreatedAt: a.shareCreatedAt, views, lastViewedAt, avgSessionSeconds, pagesVisited };
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
