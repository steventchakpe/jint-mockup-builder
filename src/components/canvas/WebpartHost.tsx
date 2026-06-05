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
/** Mapping type de webpart → clé de personalContent → clé de content (US-30). */
const PERSONAL_CONTENT_MAP: Record<string, { from: 'tasks' | 'emails' | 'meetings'; to: string }> = {
  'my-tasks': { from: 'tasks', to: 'lists' },
  'my-emails': { from: 'emails', to: 'emails' },
  'my-meetings': { from: 'meetings', to: 'meetings' },
};

export function WebpartHost({ instance, isEditMode = false }: WebpartHostProps) {
  const def = getWebpart(instance.type);
  // US-30 : les webparts personnalisés affichent le contenu du profil actif
  const profiles = useProjectStore((s) => s.project?.profiles);
  const mapping = PERSONAL_CONTENT_MAP[instance.type];
  let content = instance.content;
  const active = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  if (mapping && active) {
    const personal = active.personalContent?.[mapping.from];
    if (personal) content = { ...instance.content, [mapping.to]: personal };
  }
  // Mon résumé : prénom du profil actif + compteurs dérivés de son personalContent
  if (instance.type === 'my-resume' && active) {
    const pc = active.personalContent;
    content = { ...content, userName: active.firstName };
    if (pc && (pc.meetings || pc.emails || pc.tasks)) {
      const tasks = (pc.tasks ?? []) as Array<{ tasks?: Array<{ completed?: boolean }> }>;
      content = {
        ...content,
        cards: [
          { cardType: 'meetings', itemsLeft: (pc.meetings ?? []).length },
          { cardType: 'mails', itemsLeft: ((pc.emails ?? []) as Array<{ isRead?: boolean }>).filter((e) => !e.isRead).length },
          { cardType: 'tasks', itemsLeft: tasks.flatMap((l) => l.tasks ?? []).filter((t) => !t.completed).length },
        ],
      };
    }
  }

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
        content={content}
        isEditMode={isEditMode}
      />
    </Suspense>
  );

  if (!isEditMode) return element;
  return (
    <WebpartEditProvider
      content={content}
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
