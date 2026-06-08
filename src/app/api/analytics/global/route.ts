import { NextResponse } from 'next/server';
import { createAnalyticsProvider } from '@/lib/analytics';

export const runtime = 'nodejs';

/** GET /api/analytics/global — métriques globales pour les cards du dashboard. */
export async function GET() {
  try {
    return NextResponse.json(await createAnalyticsProvider().getGlobalMetrics());
  } catch {
    return NextResponse.json({ totalViews: 0, lastView: { at: null, company: null } });
  }
}
