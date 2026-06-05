'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PresentationView } from '@/components/presentation/PresentationView';
import { useProjectStore } from '@/lib/state/project-store';

/**
 * Preview Présentation depuis l'éditeur (`/preview/{project-id}`) — réservé au
 * Sales. Utilise le state en mémoire (modifications non sauvegardées visibles) ;
 * easter egg (double-clic coin bas-droit) pour revenir à l'édition.
 */
export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const project = useProjectStore((s) => s.project);
  const loadProject = useProjectStore((s) => s.loadProject);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>(project?.id === id ? 'ready' : 'loading');

  useEffect(() => {
    if (project?.id === id) { setStatus('ready'); return; }
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/projects/${id}`);
      if (cancelled) return;
      if (!res.ok) { setStatus('notfound'); return; }
      loadProject(await res.json());
      setStatus('ready');
    })();
    return () => { cancelled = true; };
  }, [id, project?.id, loadProject]);

  if (status === 'loading') {
    return <div className="h-screen flex items-center justify-center text-body text-gray-500">Chargement…</div>;
  }
  if (status === 'notfound') {
    return <div className="h-screen flex items-center justify-center text-body text-gray-600">Maquette introuvable.</div>;
  }
  return <PresentationView editReturnId={id} />;
}
