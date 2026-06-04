'use client';

import { useEffect } from 'react';
import { PageShell } from '@/components/structural/PageShell';
import { EditableCanvas } from '@/components/canvas/edit/EditableCanvas';
import { useProjectStore } from '@/lib/state/project-store';
import { createBlankProject } from '@/lib/state/blank-project';

/**
 * Démo de l'expérience d'édition (Phase 1) : création/suppression/modif de sections
 * (US-12) + ajout/empilement de webparts (US-08), state-driven via le store projet.
 * Charge un projet vierge (mode manuel) au montage.
 */
export default function EditorDemo() {
  const project = useProjectStore((s) => s.project);
  const loadProject = useProjectStore((s) => s.loadProject);

  useEffect(() => {
    if (!project) loadProject(createBlankProject());
  }, [project, loadProject]);

  if (!project) return null;

  return (
    <PageShell>
      <EditableCanvas />
    </PageShell>
  );
}
