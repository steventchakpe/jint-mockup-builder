import { createStorageProvider } from '@/lib/storage';
import { createAnalyticsProvider } from '@/lib/analytics';
import { visitorKey } from '@/lib/analytics/visitor-key';
import type { VisitEvent } from '@/types/providers';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ token: string }> };

/** POST /api/view/[token]/track — événement de visite (lien partagé uniquement). */
export async function POST(req: Request, { params }: Ctx) {
  const { token } = await params;
  let event: VisitEvent;
  try {
    event = (await req.json()) as VisitEvent;
  } catch {
    return new Response(null, { status: 400 });
  }
  try {
    const storage = createStorageProvider();
    const projectId = await storage.resolveProjectId(token);
    if (!projectId) return new Response(null, { status: 204 }); // token inconnu → silencieux
    let company: string | undefined;
    try { company = (await storage.getMeta(projectId)).prospectCompany; } catch { /* sans metadata */ }
    await createAnalyticsProvider().recordVisit(
      { projectId, shareToken: token, visitorKey: visitorKey(req), company },
      event,
    );
  } catch {
    /* tracking best-effort — ne jamais bloquer la consultation */
  }
  return new Response(null, { status: 204 });
}
