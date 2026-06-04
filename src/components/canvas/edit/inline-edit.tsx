'use client';

import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Path = (string | number)[];

interface InlineEditCtx {
  editing: boolean;
  content: unknown; // contenu complet du webpart (instance.content)
  commit: (next: unknown) => void;
}

const Ctx = createContext<InlineEditCtx | null>(null);

/** Fournit le contexte d'édition inline à un webpart (mode Édition uniquement). */
export function WebpartEditProvider({
  content,
  commit,
  children,
}: {
  content: unknown;
  commit: (next: unknown) => void;
  children: ReactNode;
}) {
  return <Ctx.Provider value={{ editing: true, content, commit }}>{children}</Ctx.Provider>;
}

export const useInlineEdit = () => useContext(Ctx);

/** Set immuable d'une valeur à un chemin (objets + tableaux). */
function setPath(obj: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;
  const [k, ...rest] = path;
  if (Array.isArray(obj)) {
    return obj.map((it, i) => (i === Number(k) ? setPath(it, rest, value) : it));
  }
  const base = (obj ?? {}) as Record<string, unknown>;
  return { ...base, [k]: setPath(base[k as string], rest, value) };
}

interface InlineTextProps {
  /** Valeur affichée (vient des props/state — source de vérité pour le rendu). */
  value?: string;
  /** Chemin dans `content` à mettre à jour au commit (ex: ['card','title','value']). */
  path: Path;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}

/**
 * Texte éditable en place (US-06). Hors mode Édition (pas de contexte) : rendu simple.
 * En mode Édition : `contentEditable`, commit au blur (et sur Entrée pour les éléments non-div).
 * Le texte reste exactement à sa position de rendu — aucun overlay à aligner.
 */
export function InlineText({ value, path, as: Tag = 'span', className, style, placeholder }: InlineTextProps) {
  const ctx = useInlineEdit();

  if (!ctx?.editing) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={cn(
        'outline-none rounded-sm ring-1 ring-transparent hover:ring-sp-primary/40 focus:ring-2 focus:ring-sp-primary cursor-text',
        'empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400',
        className,
      )}
      style={style}
      onPointerDown={(e) => e.stopPropagation()} // ne pas déclencher un drag du webpart
      onBlur={(e) => {
        const next = e.currentTarget.textContent ?? '';
        if (next !== (value ?? '')) ctx.commit(setPath(ctx.content, path, next));
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && Tag !== 'div' && Tag !== 'p') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
