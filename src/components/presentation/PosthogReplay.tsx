'use client';

import { useEffect } from 'react';

/**
 * Init PostHog côté client — UNIQUEMENT sur le lien partagé au prospect
 * (`/view/{token}`), jamais en édition ni en preview Sales.
 *
 * Rôle : session replay + autocapture + enrichissement (device/géo/referrer).
 * Les métriques du dashboard viennent des events `demo_*` server-side ; ce client
 * ne sert qu'au replay/enrichissement → pas de double comptage.
 *
 * Le distinct_id est récupéré du serveur (même hash IP+UA que la capture
 * server-side) → un visiteur = une seule personne dans PostHog.
 * Réseau via reverse-proxy `/jint-relay` (anti ad-blocker, voir next.config).
 */
export function PosthogReplay({ token }: { token: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/view/${token}/identify`, { cache: 'no-store' });
        if (!res.ok) return;
        const { enabled, distinctId, apiKey } = (await res.json()) as {
          enabled: boolean; distinctId: string; apiKey: string | null;
        };
        if (cancelled || !enabled || !apiKey) return;

        // Build "full.no-external" : recorder + dead-clicks bundlés dans l'app →
        // aucun fetch de posthog-recorder.js / dead-clicks-autocapture.js (que uBlock
        // bloque par nom de fichier). Rien à bloquer côté ad-blocker.
        const posthog = (await import('posthog-js/dist/module.full.no-external')).default;
        posthog.init(apiKey, {
          api_host: '/jint-relay',
          ui_host: 'https://eu.posthog.com',
          bootstrap: { distinctID: distinctId },
          autocapture: true,
          capture_pageview: true,
          person_profiles: 'identified_only',
          disable_session_recording: false,
          session_recording: {
            // Inputs masqués (RGPD/Loi 25) — on ne capture pas ce que le prospect tape.
            maskAllInputs: true,
          },
        });
      } catch {
        /* enrichissement best-effort — ne jamais casser la démo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return null;
}
