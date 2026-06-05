import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** POST /api/projects/[id]/share → génère/renvoie le lien de partage (US-19). */
export async function POST(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const token = await createStorageProvider().getShareUrl(id);
    return NextResponse.json({ token, url: `/view/${token}` });
  } catch {
    return NextResponse.json({ error: 'Maquette introuvable — sauvegardez-la d’abord.' }, { status: 404 });
  }
}
