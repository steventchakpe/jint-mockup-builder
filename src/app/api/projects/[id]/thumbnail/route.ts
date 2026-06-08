import { NextResponse } from 'next/server';
import captureWebsite from 'capture-website';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';
export const maxDuration = 30;

type Ctx = { params: Promise<{ id: string }> };

/**
 * POST /api/projects/[id]/thumbnail
 * Capture la page d'accueil de la maquette (route read-only /preview/{id}) en headless
 * et l'enregistre comme miniature du projet. Appelé en fire-and-forget après une sauvegarde.
 */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const origin = new URL(req.url).origin;
  try {
    const buffer = (await captureWebsite.buffer(`${origin}/preview/${id}`, {
      type: 'jpeg',
      quality: 0.8,
      width: 1440,
      height: 900,
      scaleFactor: 0.5, // ~720×450 — léger, suffisant pour une carte dashboard
      delay: 2.5, // laisser webparts + images se charger (cf. --delay du CLI)
      launchOptions: { args: ['--no-sandbox'] },
    })) as Buffer;
    const thumbnail = await createStorageProvider().setThumbnail(id, buffer);
    return NextResponse.json({ thumbnail });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Échec de la capture' },
      { status: 500 },
    );
  }
}
