import { createHash } from 'crypto';

/**
 * Clé visiteur opaque = hash(IP + user-agent) — pas de stockage d'IP en clair.
 * Sert de `distinct_id` partagé entre la capture server-side et le client
 * PostHog (même visiteur = une seule personne, pas de double comptage).
 */
export function visitorKey(req: Request): string {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'local';
  const ua = req.headers.get('user-agent') ?? '';
  return createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 24);
}
