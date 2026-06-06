import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string; file: string }> };

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  svg: 'image/svg+xml', webp: 'image/webp', avif: 'image/avif',
  woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf',
};

/** GET /api/projects/[id]/images/[file] → sert un fichier uploadé (image ou font). */
export async function GET(_req: Request, { params }: Ctx) {
  const { id, file } = await params;
  // Pas de traversal : on ne garde que le basename.
  const safe = path.basename(file);
  try {
    const buf = await fs.readFile(path.join(DATA_DIR, 'projects', id, 'images', safe));
    const ext = safe.split('.').pop()?.toLowerCase() ?? '';
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': MIME[ext] ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable', // nom = uuid, jamais réécrit
      },
    });
  } catch {
    return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
  }
}
