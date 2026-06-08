import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';
import { createAnalyticsProvider } from '@/lib/analytics';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** POST /api/projects/[id]/share → génère/renvoie le lien de partage (US-19) + dashboard analytics. */
export async function POST(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const storage = createStorageProvider();
    const token = await storage.getShareUrl(id);
    const meta = await storage.getMeta(id);

    // Provisionne le dashboard d'analytics au premier partage (idempotent via metadata).
    let posthogUrl = meta.posthogDashboardUrl ?? null;
    if (!posthogUrl) {
      posthogUrl = await createAnalyticsProvider().ensureDashboard(id, {
        shareToken: token,
        projectName: meta.name,
        company: meta.prospectCompany,
      });
      if (posthogUrl) await storage.updateMeta(id, { posthogDashboardUrl: posthogUrl });
    }

    return NextResponse.json({ token, url: `/view/${token}`, posthogUrl });
  } catch {
    return NextResponse.json({ error: 'Maquette introuvable — sauvegardez-la d’abord.' }, { status: 404 });
  }
}
