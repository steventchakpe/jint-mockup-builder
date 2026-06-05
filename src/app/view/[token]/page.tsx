'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PresentationView } from '@/components/presentation/PresentationView';
import { useShareTracking } from '@/components/presentation/useShareTracking';
import { useProjectStore } from '@/lib/state/project-store';

/**
 * Lien partagé au prospect (`/view/{share-token}`) — lecture seule STRICTE :
 * pas de chrome d'édition, pas d'easter egg, navigation uniquement (PRD §6.6).
 */
export default function SharedViewPage() {
  const { token } = useParams<{ token: string }>();
  const loadProject = useProjectStore((s) => s.loadProject);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>('loading');

  // Tracking du lien partagé (self-hosted) — actif uniquement sur cette route.
  useShareTracking(token);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/view/${token}`);
      if (cancelled) return;
      if (!res.ok) { setStatus('notfound'); return; }
      loadProject(await res.json());
      setStatus('ready');
    })();
    return () => { cancelled = true; };
  }, [token, loadProject]);

  if (status === 'loading') {
    return <div className="h-screen flex items-center justify-center text-body text-gray-500">Chargement…</div>;
  }
  if (status === 'notfound') {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-md">
        <p className="text-body text-gray-600">Cette démo n’existe plus ou le lien est incorrect.</p>
      </div>
    );
  }
  return <PresentationView />;
}
