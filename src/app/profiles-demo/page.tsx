'use client';

import { useEffect } from 'react';
import { PageShell } from '@/components/structural/PageShell';
import { createBlankProject } from '@/lib/state/blank-project';
import { useProjectStore } from '@/lib/state/project-store';

/** Page démo temporaire — profils switchables (avatar, Me control, Choisir un compte, toolbar contributeur, + UEX). */
export default function ProfilesDemoPage() {
  const loadProject = useProjectStore((s) => s.loadProject);
  const project = useProjectStore((s) => s.project);
  useEffect(() => { if (!project?.profiles.editable.length) loadProject(createBlankProject()); }, [loadProject, project]);
  return <PageShell />;
}
