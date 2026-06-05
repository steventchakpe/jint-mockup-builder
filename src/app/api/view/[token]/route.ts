import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ token: string }> };

/** GET /api/view/[token] → charge la maquette partagée (lecture seule, US-19/20). */
export async function GET(_req: Request, { params }: Ctx) {
  const { token } = await params;
  try {
    const project = await createStorageProvider().loadSharedProject(token);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Cette démo n’existe plus ou le lien est incorrect.' }, { status: 404 });
  }
}
