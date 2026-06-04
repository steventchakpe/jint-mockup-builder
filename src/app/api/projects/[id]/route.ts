import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';
import type { Project } from '@/types/project';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/projects/[id] → charge une maquette. */
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const project = await createStorageProvider().loadProject(id);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Maquette introuvable' }, { status: 404 });
  }
}

/** PUT /api/projects/[id] → sauvegarde une maquette (body = Project). */
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const project = (await req.json()) as Project;
  await createStorageProvider().saveProject(id, project);
  return NextResponse.json({ ok: true });
}

/** DELETE /api/projects/[id] → supprime une maquette. */
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  await createStorageProvider().deleteProject(id);
  return NextResponse.json({ ok: true });
}
