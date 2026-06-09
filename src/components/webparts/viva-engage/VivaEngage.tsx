'use client';

import { useState } from 'react';
import { useInlineEdit } from '@/components/canvas/edit/inline-edit';
import { Composer } from './components/Composer';
import { ConversationCard } from './components/ConversationCard';
import type { ConversationType, VivaConversation, VivaEngageContent, VivaEngageProps } from './VivaEngage.types';

/**
 * Webpart Viva Engage (Conversations) — modèle Figma (pas de source jintan).
 * En-tête « Conversations » + « Afficher tout », barre de composition, puis le fil
 * (ou état vide). Interactions éphémères (J'aime, commenter, publier, supprimer) en
 * état local (présentation). En édition : rendu direct du contenu (édition inline).
 */
export function VivaEngage({ config, content, isEditMode = false, activeProfile }: VivaEngageProps) {
  const edit = useInlineEdit();
  const [local, setLocal] = useState<VivaConversation[]>(content.conversations);
  // En édition : source = contenu réel (les ajouts/suppressions y sont commités → sauvegardables).
  // En présentation : état local éphémère.
  const convs = isEditMode ? content.conversations : local;

  // Auteur = profil actif (connecté). Fallback si non fourni (ex : page démo).
  const current = activeProfile
    ? { name: `${activeProfile.firstName} ${activeProfile.lastName}`, avatar: activeProfile.avatar }
    : { name: content.conversations[0]?.authorName ?? 'Intégration Mozzaik365', avatar: content.conversations[0]?.authorAvatar };

  /** Applique une transformation : commit du contenu en édition, état local sinon. */
  const apply = (fn: (prev: VivaConversation[]) => VivaConversation[]) => {
    if (isEditMode && edit?.editing) {
      const next = fn((edit.content as VivaEngageContent).conversations);
      edit.commitContent({ ...(edit.content as VivaEngageContent), conversations: next });
    } else {
      setLocal(fn);
    }
  };

  const publish = (text: string, type: ConversationType) =>
    apply((prev) => [
      { id: `conv-${Date.now()}`, type, authorName: current.name, authorAvatar: current.avatar, time: "À l'instant", text, likeCount: 0, comments: [] },
      ...prev,
    ]);

  const remove = (id: string) => apply((prev) => prev.filter((c) => c.id !== id));

  // J'aime / commentaire : éphémères (présentation), non commités en contenu.
  const like = (id: string) =>
    setLocal((prev) => prev.map((c) => (c.id === id ? { ...c, likedByUser: !c.likedByUser, likeCount: c.likeCount + (c.likedByUser ? -1 : 1) } : c)));

  const addComment = (id: string, text: string) =>
    setLocal((prev) => prev.map((c) => (c.id === id
      ? { ...c, comments: [...c.comments, { id: `cm-${c.comments.length + 1}-${text.length}`, authorName: current.name, authorAvatar: current.avatar, time: "À l'instant", text }] }
      : c)));

  return (
    <section className="flex flex-col gap-lg">
      <div className="flex items-baseline justify-between">
        <h2 className="text-heading font-semibold text-[#252423]">{config.title}</h2>
        <span className="text-body-lg" style={{ color: '#252423' }}>Afficher tout</span>
      </div>

      {config.showComposer && (
        <Composer authorName={current.name} authorAvatar={current.avatar} onPublish={publish} />
      )}

      {convs.length === 0 ? (
        <div className="py-3xl text-center">
          <p className="text-body-lg font-semibold text-[#252423]">Démarrer une conversation</p>
          <p className="mt-sm text-body" style={{ color: '#605e5c' }}>Vous une connaissance à partager, une question ou autre chose à exprimer ?</p>
          <p className="text-body" style={{ color: '#252423' }}>Soyez le premier à le partager</p>
        </div>
      ) : (
        <div className="flex flex-col gap-lg">
          {convs.map((c, i) => (
            <ConversationCard
              key={c.id}
              conversation={c}
              index={i}
              isEditMode={isEditMode}
              currentUser={current}
              onLike={() => like(c.id)}
              onAddComment={(t) => addComment(c.id, t)}
              onDelete={() => remove(c.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
