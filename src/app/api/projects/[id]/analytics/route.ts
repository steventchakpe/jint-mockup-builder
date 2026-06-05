import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/projects/[id]/analytics — métriques du lien partagé (dashboard). */
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    return NextResponse.json(await createStorageProvider().getAnalytics(id));
  } catch {
    return NextResponse.json({ error: 'Maquette introuvable' }, { status: 404 });
  }
}
