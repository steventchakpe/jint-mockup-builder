import { NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/storage';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

/** Types d'images acceptés (PRD §Images & médias + fonts pour US-18). */
const ACCEPTED = /^(image\/(jpeg|png|svg\+xml|webp|gif|avif)|font\/(woff2?|ttf|otf)|application\/(font-woff2?|octet-stream))$/;
const MAX_BYTES = 8 * 1024 * 1024; // 8 Mo

/** POST /api/projects/[id]/images → upload d'un fichier (multipart, champ "file"). */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Champ "file" manquant' }, { status: 400 });
  }
  if (!ACCEPTED.test(file.type)) {
    return NextResponse.json({ error: `Type non supporté : ${file.type}` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 8 Mo)' }, { status: 413 });
  }
  const url = await createStorageProvider().uploadImage(id, file);
  return NextResponse.json({ url });
}
