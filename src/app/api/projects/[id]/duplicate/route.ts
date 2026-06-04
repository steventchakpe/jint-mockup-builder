import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';

/** POST /api/projects/[id]/duplicate → duplique la maquette, renvoie le nouvel id. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { name?: string };
  const storage = createStorageProvider();
  const source = await storage.loadProject(id).catch(() => null);
  const newName = body.name ?? (source ? `${source.name} (copie)` : 'Copie');
  const newId = await storage.duplicateProject(id, newName);
  return NextResponse.json({ id: newId }, { status: 201 });
}
