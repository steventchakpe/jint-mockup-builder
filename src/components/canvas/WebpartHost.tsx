'use client';

import { Suspense } from 'react';
import { getWebpart } from '@/config/webpart-registry';
import { useProjectStore } from '@/lib/state/project-store';
import { useDemoDateLocale } from '@/lib/i18n';
import { WebpartEditProvider } from './edit/inline-edit';
import { hydrateWebpartContent } from '@/lib/profiles/hydrate';
import { syncEditToProfiles } from '@/lib/profiles/sync-back';
import type { WebpartInstance } from '@/types/project';

interface WebpartHostProps {
  instance: WebpartInstance;
  isEditMode?: boolean;
  /** Section pleine largeur : le webpart bleed bord à bord, radius forcé à 0 (comme SharePoint). */
  fullWidth?: boolean;
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

export function WebpartHost({ instance, isEditMode = false, fullWidth = false }: WebpartHostProps) {
  const def = getWebpart(instance.type);
  // Locale des dates de la maquette (langue du projet)
  const dateLocale = useDemoDateLocale();
  // Pleine largeur : radius 0 + padding BaseLayout désactivé (le webpart colle
  // les bords du canvas, sans ombre — comportement jintan/SharePoint)
  const config = fullWidth ? { ...instance.config, radius: 0, padding: false } : instance.config;
  // US-30 : les webparts personnalisés affichent le contenu du profil actif
  const profiles = useProjectStore((s) => s.project?.profiles);
  const mapping = PERSONAL_CONTENT_MAP[instance.type];
  // Annuaire : résolution des références aux profils (id/profileId/authorId)
  let content = hydrateWebpartContent(instance.type, instance.content, profiles?.editable ?? []);
  const active = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  if (mapping && active) {
    const personal = active.personalContent?.[mapping.from];
    if (personal) content = { ...content, [mapping.to]: personal };
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
        config={config}
        content={content}
        isEditMode={isEditMode}
        locale={dateLocale}
      />
    </Suspense>
  );

  if (!isEditMode) return element;
  return (
    <WebpartEditProvider
      content={content}
      config={config}
      commitContent={(next) => {
        const store = useProjectStore.getState();
        // Édition inline d'un champ lié à un profil → reportée dans l'annuaire
        // (source de vérité), qui re-propage à tous les webparts concernés.
        const syncs = syncEditToProfiles(
          instance.type,
          content,
          next as Record<string, unknown>,
          store.project?.profiles.editable ?? [],
        );
        syncs.forEach(({ profileId, updates }) => store.updateProfile(profileId, updates));
        store.updateWebpartContent(instance.id, next as Record<string, unknown>);
      }}
      commitConfig={(next) =>
        useProjectStore.getState().updateWebpartConfig(instance.id, next as Record<string, unknown>)
      }
    >
      {element}
    </WebpartEditProvider>
  );
}
