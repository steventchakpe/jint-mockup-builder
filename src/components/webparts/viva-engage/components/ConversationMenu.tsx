'use client';

import { useEffect, useRef } from 'react';
import { CloseConvIcon, LinkIcon, FollowInboxIcon, ViewConvIcon, ReplaceQuestionIcon, TopicsIcon, StarIcon, TrashIcon, EditIcon } from '../VivaEngage.menu-icons';

/** Menu ⋮ d'une conversation. Seul « Supprimer » est fonctionnel (onDelete). */
export function ConversationMenu({ onDelete, onClose }: { onDelete: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  const items = [
    { label: 'Modifier', Icon: EditIcon },
    { label: 'Supprimer', Icon: TrashIcon, action: onDelete },
    { label: 'Fermer la conversation', Icon: CloseConvIcon },
    { label: 'Copier le lien', Icon: LinkIcon },
    { label: 'Suivre dans la boîte de réception', Icon: FollowInboxIcon },
    { label: 'Afficher la conversation', Icon: ViewConvIcon },
    { label: 'Remplacer par une question', Icon: ReplaceQuestionIcon },
    { label: 'Ajouter des rubriques', Icon: TopicsIcon },
    { label: "Conversation d'actualité", Icon: StarIcon },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-20 mt-xs min-w-[260px] rounded-md bg-white py-xs"
      style={{ boxShadow: '0 1.2px 3.6px rgba(0,0,0,0.17), 0 6.4px 14.4px rgba(0,0,0,0.15)' }}
    >
      {items.map(({ label, Icon, action }) => (
        <button
          key={label}
          type="button"
          onClick={() => { action?.(); onClose(); }}
          className="flex w-full items-center gap-md px-md py-sm text-left text-body text-[#323130] hover:bg-sp-lighter-alt"
        >
          <Icon style={{ width: 20, height: 20 }} aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
