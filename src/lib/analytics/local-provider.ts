import { promises as fs } from 'fs';
import path from 'path';
import type {
  AnalyticsProvider,
  VisitContext,
  VisitEvent,
  ShareAnalytics,
  GlobalMetrics,
  ProjectMeta,
} from '@/types/providers';

/** Session d'un visiteur (clé = hash IP+UA). */
interface VisitSession {
  firstSeen: string;
  lastSeen: string;
  pages: Record<string, { title: string; views: number }>;
}
interface AnalyticsFile {
  sessions: Record<string, VisitSession>;
}
/** Fenêtre d'inactivité au-delà de laquelle on ne cumule plus la durée (anti-onglet oublié). */
const SESSION_GAP_MS = 30 * 60 * 1000;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const projectsDir = () => path.join(DATA_DIR, 'projects');
const projectDir = (id: string) => path.join(projectsDir(), id);
const analyticsPath = (id: string) => path.join(projectDir(id), 'analytics.json');

async function readAnalytics(id: string): Promise<AnalyticsFile> {
  try {
    return JSON.parse(await fs.readFile(analyticsPath(id), 'utf-8')) as AnalyticsFile;
  } catch {
    return { sessions: {} };
  }
}
async function writeAnalytics(id: string, data: AnalyticsFile): Promise<void> {
  await fs.mkdir(projectDir(id), { recursive: true });
  await fs.writeFile(analyticsPath(id), JSON.stringify(data, null, 2), 'utf-8');
}

function aggregate(a: AnalyticsFile): Omit<ShareAnalytics, 'shareCreatedAt'> {
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
  return { views, lastViewedAt, avgSessionSeconds, pagesVisited };
}

/**
 * Tracking self-hosted (filesystem) — implémentation par défaut.
 * shareCreatedAt vit dans metadata.json (stampé par le StorageProvider),
 * fusionné par la route /analytics ; ce provider ne le gère pas.
 */
export class LocalAnalyticsProvider implements AnalyticsProvider {
  async recordVisit({ projectId, visitorKey }: VisitContext, event: VisitEvent): Promise<void> {
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

  async getAnalytics(projectId: string): Promise<ShareAnalytics> {
    return { shareCreatedAt: null, ...aggregate(await readAnalytics(projectId)) };
  }

  async getGlobalMetrics(): Promise<GlobalMetrics> {
    let ids: string[];
    try { ids = await fs.readdir(projectsDir()); } catch { return { totalViews: 0, lastView: { at: null, company: null } }; }
    let totalViews = 0;
    let lastView: { at: string | null; company: string | null } = { at: null, company: null };
    for (const id of ids) {
      const agg = aggregate(await readAnalytics(id));
      totalViews += agg.views;
      if (agg.lastViewedAt && (!lastView.at || agg.lastViewedAt > lastView.at)) {
        let company: string | null = null;
        try {
          const meta = JSON.parse(await fs.readFile(path.join(projectDir(id), 'metadata.json'), 'utf-8')) as ProjectMeta;
          company = meta.prospectCompany || null;
        } catch { /* pas de metadata */ }
        lastView = { at: agg.lastViewedAt, company };
      }
    }
    return { totalViews, lastView };
  }

  /** Pas de dashboard externe en local. */
  async ensureDashboard(): Promise<string | null> {
    return null;
  }
}
