import { NextResponse } from 'next/server';
import { visitorKey } from '@/lib/analytics/visitor-key';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ token: string }> };

/**
 * GET /api/view/[token]/identify — données d'init du client PostHog (lien partagé).
 * Renvoie le distinct_id (= même hash que la capture server-side, pas de double
 * comptage) + la Project API key publique + le flag d'activation.
 */
export async function GET(req: Request, _ctx: Ctx) {
  const enabled =
    (process.env.ANALYTICS_PROVIDER || 'local') === 'posthog' &&
    !!process.env.POSTHOG_PROJECT_API_KEY;
  return NextResponse.json({
    enabled,
    distinctId: visitorKey(req),
    apiKey: enabled ? process.env.POSTHOG_PROJECT_API_KEY : null,
  });
}
