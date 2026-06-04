'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/lib/state/project-store';

/** Avertit avant de quitter l'onglet si des modifications ne sont pas sauvegardées (PRD §6.8). */
export function useUnsavedWarning() {
  const isDirty = useProjectStore((s) => s.isDirty);
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);
}
