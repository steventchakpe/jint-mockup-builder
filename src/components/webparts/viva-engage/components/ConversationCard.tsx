'use client';

import { useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { Avatar } from './Avatar';
import { ConversationMenu } from './ConversationMenu';
import { ThumbUpIcon, ThumbOutlineIcon, ChatIcon, NotepadEditIcon, MoreHorizontalIcon, MoreVerticalIcon } from '../VivaEngage.icons';
import type { VivaConversation } from '../VivaEngage.types';

interface Props {
  conversation: VivaConversation;
  index: number;
  isEditMode: boolean;
  /** Profil actif (connecté) — avatar du champ « Écrire un commentaire ». */
  currentUser: { name: string; avatar?: string };
  onLike: () => void;
  onAddComment: (text: string) => void;
  onDelete: () => void;
}

const NEUTRAL = '#605e5c';

/** Carte conversation — port fidèle du modèle Viva Engage (en-tête, corps, engagement, commentaires). */
export function ConversationCard({ conversation: c, index, isEditMode, currentUser, onLike, onAddComment, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const toggleComment = (id: string) => !isEditMode && setLikedComments((m) => ({ ...m, [id]: !m[id] }));

  const submit = () => { const t = draft.trim(); if (t) { onAddComment(t); setDraft(''); } };

  return (
    <div className="rounded-md bg-white p-lg" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.05)' }}>
      {/* En-tête */}
      <div className="flex items-start gap-md">
        <Avatar name={c.authorName} src={c.authorAvatar} size={40} />
        <div className="min-w-0 grow leading-tight">
          <InlineText as="div" path={['conversations', index, 'authorName']} value={c.authorName} placeholder="Auteur" className="font-semibold text-[#252423]" />
          <div style={{ fontSize: 12, color: NEUTRAL }}>{c.time}</div>
        </div>
        <div className="relative shrink-0">
          <button type="button" aria-label="Plus d'options" onClick={() => setMenuOpen((o) => !o)} className="inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-sp-lighter-alt">
            <MoreVerticalIcon size={20} />
          </button>
          {menuOpen && <ConversationMenu onDelete={onDelete} onClose={() => setMenuOpen(false)} />}
        </div>
      </div>

      {/* Corps */}
      <InlineText as="p" path={['conversations', index, 'text']} value={c.text} placeholder="Contenu de la conversation" className="mt-md text-body-lg text-[#252423] [white-space:pre-wrap]" />

      {/* Engagement */}
      <div className="mt-md flex items-center justify-between">
        <div className="flex items-center gap-xl">
          <button type="button" onClick={() => !isEditMode && onLike()} className="inline-flex items-center gap-sm font-semibold" style={{ color: c.likedByUser ? '#cb500f' : NEUTRAL }}>
            {c.likedByUser ? <ThumbUpIcon size={22} /> : <ThumbOutlineIcon size={16} />} J'aime
          </button>
          <span className="inline-flex items-center gap-sm" style={{ color: NEUTRAL }}>
            <ChatIcon size={16} /> Ajouter un commentaire
          </span>
        </div>
        <div className="text-body" style={{ color: NEUTRAL }}>
          {c.likeCount > 0 ? (
            <span className="inline-flex items-center gap-xs"><ThumbUpIcon size={20} />{c.likeCount}</span>
          ) : 'Soyez le premier à aimer ce message'}
        </div>
      </div>

      {/* Commentaires */}
      {c.comments.length > 0 && (
        <div className="mt-md border-t border-[#edebe9] pt-md flex flex-col gap-md">
          {c.comments.map((cm, ci) => (
            <div key={cm.id} className="flex items-start gap-md">
              <Avatar name={cm.authorName} src={cm.authorAvatar} size={32} />
              <div className="min-w-0">
                <div className="rounded-md bg-sp-lighter-alt px-md py-sm">
                  <div className="leading-tight">
                    <InlineText as="span" path={['conversations', index, 'comments', ci, 'authorName']} value={cm.authorName} placeholder="Auteur" className="font-semibold text-[#252423]" />
                    <span className="ml-sm" style={{ fontSize: 12, color: NEUTRAL }}>{cm.time}</span>
                  </div>
                  <InlineText as="div" path={['conversations', index, 'comments', ci, 'text']} value={cm.text} placeholder="Commentaire" className="text-body text-[#252423]" />
                </div>
                <div className="mt-xs flex items-center gap-md">
                  <button type="button" aria-label="J'aime" onClick={() => toggleComment(cm.id)} className="inline-flex items-center">
                    {likedComments[cm.id] ? <ThumbUpIcon size={22} /> : <ThumbOutlineIcon size={16} />}
                  </button>
                  <ChatIcon size={16} />
                  <NotepadEditIcon size={16} />
                  <MoreHorizontalIcon size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Champ commentaire — avatar du profil actif (connecté) */}
      <div className="mt-md flex items-center gap-md">
        <Avatar name={currentUser.name} src={currentUser.avatar} size={32} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder="Écrire un commentaire"
          className="grow rounded-[20px] bg-sp-lighter-alt px-lg py-sm text-body outline-none"
        />
      </div>
    </div>
  );
}
