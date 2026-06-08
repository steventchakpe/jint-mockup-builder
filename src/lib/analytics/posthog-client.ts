/**
 * Client PostHog bas niveau — wrappers fetch.
 *  - Capture : host d'ingestion (eu.i / us.i), Project API key (phc_).
 *  - Query / dashboards : host app (eu / us), Personal API key (phx_).
 * Toutes les erreurs sont avalées ou remontées explicitement selon l'appel
 * (la capture ne doit jamais bloquer la consultation d'une maquette).
 */

export interface PosthogConfig {
  appHost: string;        // https://eu.posthog.com
  ingestionHost: string;  // https://eu.i.posthog.com
  projectApiKey: string;  // phc_…
  personalApiKey: string; // phx_…
  projectId: string;      // 119943
}

/** Lit la config depuis l'env ; null si incomplète (→ fallback géré en amont). */
export function getPosthogConfig(): PosthogConfig | null {
  const appHost = (process.env.POSTHOG_HOST || '').replace(/\/$/, '');
  const projectApiKey = process.env.POSTHOG_PROJECT_API_KEY || '';
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY || '';
  const projectId = process.env.POSTHOG_PROJECT_ID || '';
  if (!appHost || !projectApiKey || !personalApiKey || !projectId) return null;
  // Host d'ingestion : eu.posthog.com → eu.i.posthog.com (idem us). Self-hosted = inchangé.
  const ingestionHost = appHost.replace(/^https:\/\/(eu|us)\.posthog\.com$/, 'https://$1.i.posthog.com');
  return { appHost, ingestionHost, projectApiKey, personalApiKey, projectId };
}

/** Capture un event (server-side). Best-effort : ne lève jamais. */
export async function capture(
  cfg: PosthogConfig,
  event: string,
  distinctId: string,
  properties: Record<string, unknown>,
  timestamp?: string,
): Promise<void> {
  try {
    await fetch(`${cfg.ingestionHost}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: cfg.projectApiKey,
        event,
        distinct_id: distinctId,
        properties: { ...properties, $process_person_profile: false },
        timestamp: timestamp ?? new Date().toISOString(),
      }),
      keepalive: true,
    });
  } catch {
    /* tracking best-effort */
  }
}

/** Exécute une requête HogQL et renvoie les lignes (results). Lève en cas d'échec. */
export async function hogql(cfg: PosthogConfig, query: string): Promise<unknown[][]> {
  const res = await fetch(`${cfg.appHost}/api/projects/${cfg.projectId}/query/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.personalApiKey}` },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
  });
  if (!res.ok) throw new Error(`PostHog query ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { results?: unknown[][] };
  return json.results ?? [];
}

/** Échappe une valeur pour interpolation HogQL (string littérale). */
export function sql(value: string): string {
  return `'${value.replace(/'/g, "\\'")}'`;
}

/** Crée un dashboard et renvoie son id. */
async function createDashboard(cfg: PosthogConfig, name: string, description: string): Promise<number> {
  const res = await fetch(`${cfg.appHost}/api/projects/${cfg.projectId}/dashboards/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.personalApiKey}` },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error(`PostHog dashboard ${res.status}: ${await res.text()}`);
  return ((await res.json()) as { id: number }).id;
}

/** Crée un insight Trends attaché à un dashboard. Best-effort. */
async function createInsight(
  cfg: PosthogConfig,
  name: string,
  dashboardId: number,
  source: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch(`${cfg.appHost}/api/projects/${cfg.projectId}/insights/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.personalApiKey}` },
      body: JSON.stringify({
        name,
        query: { kind: 'InsightVizNode', source },
        dashboards: [dashboardId],
      }),
    });
  } catch {
    /* insight best-effort — le dashboard existe déjà */
  }
}

/**
 * Provisionne le dashboard d'une maquette (filtré sur project_id) avec 3 insights :
 * visiteurs uniques, vues par page, durée. Renvoie l'URL ouvrable.
 */
export async function provisionDashboard(
  cfg: PosthogConfig,
  opts: { projectId: string; projectName: string; company: string },
): Promise<string> {
  const filter = [{ key: 'project_id', value: opts.projectId, operator: 'exact', type: 'event' }];
  const dashId = await createDashboard(
    cfg,
    `Maquette — ${opts.company || opts.projectName}`,
    `Analytics du lien partagé · ${opts.projectName}`,
  );
  await createInsight(cfg, 'Visiteurs uniques', dashId, {
    kind: 'TrendsQuery',
    series: [{ kind: 'EventsNode', event: 'demo_view', math: 'dau' }],
    properties: filter,
    interval: 'day',
  });
  await createInsight(cfg, 'Vues par page', dashId, {
    kind: 'TrendsQuery',
    series: [{ kind: 'EventsNode', event: 'demo_pageview', math: 'total' }],
    breakdownFilter: { breakdown: 'page_title', breakdown_type: 'event' },
    properties: filter,
    interval: 'day',
  });
  await createInsight(cfg, 'Pages vues (total)', dashId, {
    kind: 'TrendsQuery',
    series: [{ kind: 'EventsNode', event: 'demo_view', math: 'total' }],
    properties: filter,
    interval: 'day',
  });
  return `${cfg.appHost}/project/${cfg.projectId}/dashboard/${dashId}`;
}
