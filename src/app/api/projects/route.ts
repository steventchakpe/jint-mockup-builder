import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';
import type { Project } from '@/types/project';

export const runtime = 'nodejs';

/** GET /api/projects → liste des maquettes (ProjectMeta[]). */
export async function GET() {
  const storage = createStorageProvider();
  const projects = await storage.listProjects('local');
  return NextResponse.json(projects);
}

/** POST /api/projects → crée/persiste une maquette (body = Project). */
export async function POST(req: Request) {
  const project = (await req.json()) as Project;
  const storage = createStorageProvider();
  await storage.saveProject(project.id, project);
  return NextResponse.json({ id: project.id }, { status: 201 });
}
