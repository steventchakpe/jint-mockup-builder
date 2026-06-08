'use client';

import { useEffect, useRef } from 'react';
import { useProjectStore } from '@/lib/state/project-store';

const HEARTBEAT_MS = 15_000;

/**
 * Tracking d'un lien partagé (`/view/{token}`) — métriques canoniques server-side
 * (le serveur relaie vers le provider d'analytics : local ou PostHog).
 * Émis UNIQUEMENT depuis le lien prospect (jamais en édition ni en preview Sales).
 * Envoie : ouverture (view), changement de page (pageview), battements de cœur
 * (durée de session) et fermeture (end via sendBeacon).
 */
export function useShareTracking(token: string) {
  const activePageId = useProjectStore((s) => s.activePageId);
  const pages = useProjectStore((s) => s.project?.pages);
  const lastPage = useRef<string | null>(null);

  const send = (body: Record<string, unknown>) => {
    const url = `/api/view/${token}/track`;
    const json = JSON.stringify(body);
    if (body.type === 'end' && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([json], { type: 'application/json' }));
    } else {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: json, keepalive: true }).catch(() => {});
    }
  };

  // Vue de page (ouverture + chaque changement de page)
  useEffect(() => {
    if (!activePageId || !pages) return;
    const page = pages.find((p) => p.id === activePageId);
    const type = lastPage.current === null ? 'view' : 'pageview';
    lastPage.current = activePageId;
    send({ type, pageId: activePageId, pageTitle: page?.title ?? activePageId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageId, pages, token]);

  // Battements de cœur (durée) + fermeture
  useEffect(() => {
    const hb = setInterval(() => send({ type: 'heartbeat' }), HEARTBEAT_MS);
    const onHide = () => { if (document.visibilityState === 'hidden') send({ type: 'end' }); };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', () => send({ type: 'end' }));
    return () => {
      clearInterval(hb);
      document.removeEventListener('visibilitychange', onHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
}
