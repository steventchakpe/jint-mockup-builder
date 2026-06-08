import type {
  AnalyticsProvider,
  VisitContext,
  VisitEvent,
  ShareAnalytics,
  GlobalMetrics,
  DashboardOpts,
} from '@/types/providers';
import { getPosthogConfig, capture, hogql, sql, provisionDashboard, type PosthogConfig } from './posthog-client';

const EMPTY_ANALYTICS: ShareAnalytics = {
  shareCreatedAt: null, views: 0, lastViewedAt: null, avgSessionSeconds: 0, pagesVisited: [],
};

/** Convertit une valeur HogQL (peut être string/number/null) en string ISO ou null. */
function asIso(v: unknown): string | null {
  if (!v) return null;
  // HogQL renvoie les timestamps en string "YYYY-MM-DD HH:MM:SS" → ISO.
  const s = String(v).replace(' ', 'T');
  const d = new Date(s.endsWith('Z') || s.includes('+') ? s : `${s}Z`);
  // ClickHouse max() sur ensemble vide → epoch 0 ("1970…") : traiter comme null.
  if (isNaN(d.getTime()) || d.getTime() <= 0) return null;
  return d.toISOString();
}
function asNum(v: unknown): number {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

/**
 * Tracking via PostHog (hybride : capture server-side ici + posthog-js côté
 * client pour le replay/enrichissement). Les métriques du dashboard ne lisent
 * QUE les events `demo_*` server-side → pas de double comptage avec l'autocapture.
 */
export class PosthogAnalyticsProvider implements AnalyticsProvider {
  private cfg: PosthogConfig;

  constructor() {
    const cfg = getPosthogConfig();
    if (!cfg) throw new Error('PostHog non configuré (POSTHOG_HOST / _PROJECT_API_KEY / _PERSONAL_API_KEY / _PROJECT_ID).');
    this.cfg = cfg;
  }

  async recordVisit(ctx: VisitContext, event: VisitEvent): Promise<void> {
    await capture(this.cfg, `demo_${event.type}`, ctx.visitorKey, {
      project_id: ctx.projectId,
      share_token: ctx.shareToken,
      company: ctx.company ?? null,
      page_id: event.pageId ?? null,
      page_title: event.pageTitle ?? null,
    }, event.at);
  }

  async getAnalytics(projectId: string): Promise<ShareAnalytics> {
    const pid = sql(projectId);
    try {
      // Visiteurs uniques + dernière vue + durée moyenne (par distinct_id).
      const [summary] = await hogql(this.cfg, `
        SELECT count() AS views, max(mx) AS last, round(avg(dur)) AS avgdur FROM (
          SELECT distinct_id,
                 dateDiff('second', min(timestamp), max(timestamp)) AS dur,
                 max(timestamp) AS mx
          FROM events
          WHERE event LIKE 'demo_%' AND properties.project_id = ${pid}
          GROUP BY distinct_id
        )`);
      const pages = await hogql(this.cfg, `
        SELECT properties.page_id AS pid, any(properties.page_title) AS title, count() AS views
        FROM events
        WHERE event IN ('demo_view','demo_pageview') AND properties.project_id = ${pid}
          AND properties.page_id IS NOT NULL
        GROUP BY pid ORDER BY views DESC`);
      return {
        shareCreatedAt: null, // fusionné par la route /analytics depuis metadata.json
        views: asNum(summary?.[0]),
        lastViewedAt: asIso(summary?.[1]),
        avgSessionSeconds: asNum(summary?.[2]),
        pagesVisited: pages.map((r) => ({ pageId: String(r[0]), title: String(r[1] ?? r[0]), views: asNum(r[2]) })),
      };
    } catch {
      return EMPTY_ANALYTICS; // PostHog indisponible → ne pas casser le dashboard
    }
  }

  async getGlobalMetrics(): Promise<GlobalMetrics> {
    try {
      const results = await hogql(this.cfg, `
        SELECT
          countIf(event = 'demo_view') AS total_views,
          max(timestamp) AS last,
          argMax(properties.company, timestamp) AS company
        FROM events WHERE event LIKE 'demo_%'`);
      const row = results[0] ?? [];
      return {
        totalViews: asNum(row[0]),
        lastView: { at: asIso(row[1]), company: row[2] ? String(row[2]) : null },
      };
    } catch {
      return { totalViews: 0, lastView: { at: null, company: null } };
    }
  }

  async ensureDashboard(projectId: string, opts: DashboardOpts): Promise<string | null> {
    try {
      return await provisionDashboard(this.cfg, { projectId, projectName: opts.projectName, company: opts.company });
    } catch {
      return null; // échec de provisioning → pas bloquant pour le partage
    }
  }
}
