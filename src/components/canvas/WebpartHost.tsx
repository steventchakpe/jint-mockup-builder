'use client';

import { Suspense } from 'react';
import { getWebpart } from '@/config/webpart-registry';
import { useProjectStore } from '@/lib/state/project-store';
import { WebpartEditProvider } from './edit/inline-edit';
import type { WebpartInstance } from '@/types/project';

interface WebpartHostProps {
  instance: WebpartInstance;
  isEditMode?: boolean;
}

/**
 * Hôte d'un webpart sur le canvas : résout le composant depuis le registry
 * (lazy), affiche le skeleton pendant le chargement, et lui passe
 * `config` + `content` + `isEditMode`. Aucun fetch — données via props (state).
 */
export function WebpartHost({ instance, isEditMode = false }: WebpartHostProps) {
  const def = getWebpart(instance.type);

  if (!def) {
    return (
      <div className="p-md text-caption text-gray-400 border border-dashed border-gray-300 rounded-md">
        Webpart « {instance.type} » introuvable.
      </div>
    );
  }

  const Component = def.component;
  const Skeleton = def.skeletonComponent;

  const element = (
    <Suspense fallback={Skeleton ? <Skeleton /> : null}>
      <Component
        id={instance.id}
        config={instance.config}
        content={instance.content}
        isEditMode={isEditMode}
      />
    </Suspense>
  );

  if (!isEditMode) return element;
  return (
    <WebpartEditProvider
      content={instance.content}
      config={instance.config}
      commitContent={(next) =>
        useProjectStore.getState().updateWebpartContent(instance.id, next as Record<string, unknown>)
      }
      commitConfig={(next) =>
        useProjectStore.getState().updateWebpartConfig(instance.id, next as Record<string, unknown>)
      }
    >
      {element}
    </WebpartEditProvider>
  );
}
