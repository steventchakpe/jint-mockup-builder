'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageShell } from '@/components/structural/PageShell';
import { EditableCanvas } from '@/components/canvas/edit/EditableCanvas';
import { WebpartConfigPanel } from '@/components/canvas/edit/WebpartConfigPanel';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { PageTabs } from '@/components/editor/PageTabs';
import { useUnsavedWarning } from '@/components/editor/useUnsavedWarning';
import { useProjectStore } from '@/lib/state/project-store';

/**
 * Éditeur d'une maquette (`/edit/{id}`) — charge le projet depuis l'API dans le store,
 * affiche la barre d'édition (Sauvegarder) + la shell + le canvas + le panneau de config.
 */
export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const project = useProjectStore((s) => s.project);
  const loadProject = useProjectStore((s) => s.loadProject);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>('loading');

  useUnsavedWarning();

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
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-md">
        <p className="text-body text-gray-600">Cette maquette n’existe plus ou le lien est incorrect.</p>
        <Link href="/" className="text-sp-primary hover:underline">← Retour à mes maquettes</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <EditorToolbar />
      <PageTabs />
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <PageShell>
            <EditableCanvas />
          </PageShell>
        </div>
        <WebpartConfigPanel />
      </div>
    </div>
  );
}
