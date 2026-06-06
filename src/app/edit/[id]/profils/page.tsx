'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { ProfileDirectory } from '@/components/profiles/ProfileDirectory';
import { useUnsavedWarning } from '@/components/editor/useUnsavedWarning';
import { useProjectStore } from '@/lib/state/project-store';

/**
 * Annuaire des profils (`/edit/{id}/profils`) — gestion hors maquette des
 * 20 profils éditables : création, édition, suppression, flag « login simulé ».
 */
export default function ProfilesPage() {
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
      <ProfileDirectory />
    </div>
  );
}
