import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';
import { createAnalyticsProvider } from '@/lib/analytics';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/projects/[id]/analytics — métriques du lien partagé (stats par maquette). */
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const analytics = await createAnalyticsProvider().getAnalytics(id);
    // shareCreatedAt est provider-agnostique (metadata.json) → fusionné ici.
    let shareCreatedAt = analytics.shareCreatedAt;
    try { shareCreatedAt = (await createStorageProvider().getMeta(id)).shareCreatedAt ?? shareCreatedAt; } catch { /* sans metadata */ }
    return NextResponse.json({ ...analytics, shareCreatedAt });
  } catch {
    return NextResponse.json({ error: 'Maquette introuvable' }, { status: 404 });
  }
}
