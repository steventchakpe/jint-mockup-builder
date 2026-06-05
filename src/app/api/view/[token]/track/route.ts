import { createHash } from 'crypto';
import { createStorageProvider } from '@/lib/storage';
import type { VisitEvent } from '@/types/providers';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ token: string }> };

/** Clé visiteur opaque = hash(IP + user-agent) — pas de stockage d'IP en clair. */
function visitorKey(req: Request): string {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'local';
  const ua = req.headers.get('user-agent') ?? '';
  return createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 24);
}

/** POST /api/view/[token]/track — événement de visite (lien partagé uniquement). */
export async function POST(req: Request, { params }: Ctx) {
  const { token } = await params;
  let event: VisitEvent;
  try {
    event = (await req.json()) as VisitEvent;
  } catch {
    return new Response(null, { status: 400 });
  }
  try {
    await createStorageProvider().recordVisit(token, visitorKey(req), event);
  } catch {
    /* tracking best-effort — ne jamais bloquer la consultation */
  }
  return new Response(null, { status: 204 });
}
