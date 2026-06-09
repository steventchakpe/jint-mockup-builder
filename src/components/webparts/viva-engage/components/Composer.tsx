'use client';

import { useState, type SVGProps } from 'react';
import { Avatar } from './Avatar';
import { TypeIcon } from '../VivaEngage.icons';
import type { ConversationType } from '../VivaEngage.types';

const PLACEHOLDER = 'Partager des pensées, des idées ou des mises à jour';
const TYPES: { key: ConversationType; label: string }[] = [
  { key: 'discussion', label: 'Discussion' },
  { key: 'question', label: 'Question' },
  { key: 'compliment', label: 'Compliment' },
  { key: 'poll', label: 'Sondage' },
];

/** Glyphe de barre d'outils (visuel). */
const Tb = ({ d, ...p }: { d: string } & SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width={18} height={18} {...p}><path d={d} /></svg>
);
const TOOLS = ['M6 4h4a3 3 0 0 1 0 6H6V4Zm0 6h5a3 3 0 0 1 0 6H6v-6Z', 'M8 4h6M6 16h6M11 4l-2 12', 'M8 7a3 3 0 0 1 4 0l1 1a3 3 0 0 1-4 4', 'M7 6h9M7 10h9M7 14h9', 'M8 6h8M8 10h8M8 14h8', 'M7 7 4 10l3 3m6-6 3 3-3 3'];

interface Props {
  authorName: string;
  authorAvatar?: string;
  onPublish: (text: string, type: ConversationType) => void;
}

/** Barre de composition : repliée (placeholder + 4 types) → dépliée (textarea + outils + Publier). */
export function Composer({ authorName, authorAvatar, onPublish }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState<ConversationType>('discussion');
  const [typeOpen, setTypeOpen] = useState(false);
  const [text, setText] = useState('');

  if (!expanded) {
    return (
      <div className="flex items-center gap-md rounded-md bg-white px-lg py-md" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.05)' }}>
        <Avatar name={authorName} src={authorAvatar} size={40} />
        <button type="button" onClick={() => setExpanded(true)} className="grow text-left text-body-lg" style={{ color: '#605e5c' }}>
          {PLACEHOLDER}
        </button>
        <div className="flex items-center gap-sm border-l border-[#edebe9] pl-md">
          {TYPES.map(({ key }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setType(key); setExpanded(true); }}
              className="inline-flex h-10 w-10 items-center justify-center hover:bg-sp-lighter-alt"
              style={key === 'discussion' ? { background: '#f3f2f1', borderRadius: 8 } : { borderRadius: 4 }}
            >
              <TypeIcon type={key} size={24} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.05)' }}>
      <div className="p-lg">
        <div className="flex justify-end">
          <button type="button" onClick={() => setExpanded(false)} className="text-body font-semibold text-sp-primary">Réduire</button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDER}
          className="min-h-[96px] w-full resize-none text-body-lg outline-none placeholder:text-[#605e5c]"
        />
        <div className="flex items-center gap-sm pt-md text-[#605e5c]">
          <Tb d="M8 7a3 3 0 1 0 0 6m4-6a3 3 0 1 0 0 6M4 17a4 4 0 0 1 4-4m4 0a4 4 0 0 1 4 4" width={20} height={20} />
          <span className="text-body">Sélectionner une communauté ou une storyline</span>
        </div>
      </div>

      <div className="flex items-center gap-md border-t border-[#edebe9] px-lg py-sm">
        <div className="relative">
          <button type="button" onClick={() => setTypeOpen((o) => !o)} className="inline-flex items-center gap-xs rounded-sm px-xs py-xs hover:bg-sp-lighter-alt">
            <TypeIcon type={type} size={22} />
            <svg viewBox="0 0 20 20" width={14} height={14} fill="currentColor" className="text-[#605e5c]"><path d="M5.7 7.7a1 1 0 0 1 1.4 0L10 10.6l2.9-2.9a1 1 0 1 1 1.4 1.4l-3.6 3.6a1 1 0 0 1-1.4 0L5.7 9.1a1 1 0 0 1 0-1.4Z" /></svg>
          </button>
          {typeOpen && (
            <div className="absolute left-0 top-full z-20 mt-xs min-w-[200px] rounded-md bg-white py-xs" style={{ boxShadow: '0 1.2px 3.6px rgba(0,0,0,0.17), 0 6.4px 14.4px rgba(0,0,0,0.15)' }}>
              {TYPES.map(({ key, label }) => (
                <button key={key} type="button" onClick={() => { setType(key); setTypeOpen(false); }} className="flex w-full items-center gap-md px-md py-sm text-left text-body hover:bg-sp-lighter-alt">
                  <TypeIcon type={key} size={22} /> {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="mx-xs h-5 w-px bg-[#edebe9]" />
        <div className="flex items-center gap-md text-[#605e5c]">
          {TOOLS.map((d, i) => <Tb key={i} d={d} />)}
        </div>
        <button
          type="button"
          onClick={() => { const t = text.trim(); if (t) { onPublish(t, type); setText(''); setExpanded(false); } }}
          className="ml-auto rounded-sm bg-sp-lighter-alt px-lg py-sm font-semibold text-[#252423] hover:bg-sp-lighter"
        >
          Publier
        </button>
      </div>
    </div>
  );
}
