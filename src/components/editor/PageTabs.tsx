'use client';

import { useState } from 'react';
import {
  DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, horizontalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { useProjectStore } from '@/lib/state/project-store';
import { makePage, slugify } from '@/lib/state/section-ops';
import type { Page } from '@/types/project';

/**
 * Bandeau d'onglets de pages (US-09) : changer de page, ajouter, renommer (double-clic),
 * supprimer, réordonner (drag). Pilote `activePageId` et les pages du store.
 */
export function PageTabs() {
  const pages = useProjectStore((s) => s.project?.pages ?? []);
  const activePageId = useProjectStore((s) => s.activePageId);
  const setActivePage = useProjectStore((s) => s.setActivePage);
  const addPage = useProjectStore((s) => s.addPage);
  const removePage = useProjectStore((s) => s.removePage);
  const updatePage = useProjectStore((s) => s.updatePage);
  const reorderPages = useProjectStore((s) => s.reorderPages);

  const ordered = [...pages].sort((a, b) => a.order - b.order);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const add = () => {
    const page = makePage('Nouvelle page');
    addPage(page);
    setActivePage(page.id);
  };
  const remove = (id: string) => {
    if (ordered.length <= 1) return;
    if (!confirm('Supprimer cette page ?')) return;
    removePage(id);
    if (id === activePageId) {
      const next = ordered.find((p) => p.id !== id);
      if (next) setActivePage(next.id);
    }
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = ordered.map((p) => p.id);
    reorderPages(arrayMove(ids, ids.indexOf(active.id as string), ids.indexOf(over.id as string)));
  };

  return (
    <div className="flex items-center gap-xs h-10 shrink-0 px-lg border-b border-gray-200 bg-gray-50 overflow-x-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ordered.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
          {ordered.map((page) => (
            <PageTab
              key={page.id}
              page={page}
              active={page.id === activePageId}
              canDelete={ordered.length > 1}
              onSelect={() => setActivePage(page.id)}
              onRename={(title) => updatePage(page.id, { title, slug: slugify(title) })}
              onDelete={() => remove(page.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        type="button"
        onClick={add}
        title="Ajouter une page"
        className="shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt text-body"
      >
        +
      </button>
    </div>
  );
}

function PageTab({
  page, active, canDelete, onSelect, onRename, onDelete,
}: {
  page: Page;
  active: boolean;
  canDelete: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(page.title);
  const style = { transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  const commit = () => { setEditing(false); const t = draft.trim(); if (t && t !== page.title) onRename(t); else setDraft(page.title); };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      onDoubleClick={() => { setDraft(page.title); setEditing(true); }}
      className={cn(
        'group/tab shrink-0 flex items-center gap-xs h-7 px-sm rounded-sm cursor-pointer text-caption select-none',
        active ? 'bg-white border border-sp-primary text-sp-darker font-semibold shadow-sm'
               : 'text-gray-600 hover:bg-white border border-transparent',
      )}
    >
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(page.title); setEditing(false); } }}
          onClick={(e) => e.stopPropagation()}
          className="w-[120px] bg-transparent outline-none border-b border-sp-primary"
        />
      ) : (
        <span className="max-w-[160px] truncate">{page.title}</span>
      )}
      {canDelete && (
        <button
          type="button"
          title="Supprimer la page"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="hidden group-hover/tab:flex w-4 h-4 items-center justify-center rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
        >
          ×
        </button>
      )}
    </div>
  );
}
