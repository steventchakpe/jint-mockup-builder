'use client';

import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { WebpartHost } from '../WebpartHost';
import { FlexibleSectionRenderer } from '../FlexibleSectionRenderer';
import {
  SECTION_GAP,
  getSectionGridClass,
} from '../section-layout';
import { LayoutPicker } from './LayoutPicker';
import { WebpartCatalog } from './WebpartCatalog';
import { getWebpart } from '@/config/webpart-registry';
import { useProjectStore } from '@/lib/state/project-store';
import { genId, makeSection, type SectionChoice } from '@/lib/state/section-ops';
import { cn } from '@/lib/utils';
import type { Column, Section, WebpartInstance } from '@/types/project';

/** Barre « + Section » (ligne légère permanente, bleue + pill au survol). */
function AddSectionBar({ onAdd }: { onAdd: (c: SectionChoice) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative group/add flex items-center justify-center py-sm cursor-pointer">
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] transition-colors ${open ? 'bg-sp-primary' : 'bg-gray-200 group-hover/add:bg-sp-primary'}`} />
      <button
        type="button"
        data-testid="add-section"
        onClick={() => setOpen((o) => !o)}
        className={`relative z-10 flex items-center gap-xs px-md py-xs rounded-full text-caption font-semibold shadow-sm transition-all
          ${open ? 'bg-sp-primary text-white' : 'bg-white border border-gray-300 text-sp-primary group-hover/add:bg-sp-primary group-hover/add:text-white group-hover/add:border-transparent'}`}
      >
        <span className="text-body leading-none">{open ? '×' : '+'}</span> Section
      </button>
      {open && <LayoutPicker onPick={(c) => { onAdd(c); setOpen(false); }} />}
    </div>
  );
}

/**
 * EditableCanvas — création / modification / suppression de sections (US-12)
 * + ajout de webparts (US-08). State-driven via le store projet (Zustand).
 * Édite la page `pageId` (défaut : page active du store).
 */
export function EditableCanvas({ pageId }: { pageId?: string }) {
  const activePageId = useProjectStore((s) => s.activePageId);
  const pid = pageId ?? activePageId ?? '';
  const sections = useProjectStore((s) => s.project?.pages.find((p) => p.id === pid)?.sections ?? []);

  const insertSection = useProjectStore((s) => s.insertSection);
  const removeSection = useProjectStore((s) => s.removeSection);
  const changeSectionLayout = useProjectStore((s) => s.changeSectionLayout);
  const insertWebpartAt = useProjectStore((s) => s.insertWebpartAt);
  const removeWebpartById = useProjectStore((s) => s.removeWebpartById);
  const moveWebpartById = useProjectStore((s) => s.moveWebpartById);
  const selectWebpart = useProjectStore((s) => s.selectWebpart);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Résout la colonne (section + colonne) depuis les `data` dnd-kit.
  const findColumn = (sectionId: string, columnId: string) =>
    sections.find((s) => s.id === sectionId)?.columns.find((c) => c.id === columnId);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const a = active.data.current as DndWp | undefined;
    const o = over.data.current as DndWp | DndColumn | undefined;
    if (!a) return;

    let toSection: string, toColumn: string, toIndex: number;
    if (o && o.kind === 'column') {
      toSection = o.sectionId; toColumn = o.columnId;
      toIndex = findColumn(toSection, toColumn)?.webparts.length ?? 0;
    } else if (o && o.kind === 'wp') {
      toSection = o.sectionId; toColumn = o.columnId;
      const col = findColumn(toSection, toColumn);
      toIndex = col ? col.webparts.findIndex((w) => w.id === o.webpartId) : 0;
    } else {
      return;
    }
    // Drop sur soi-même → no-op
    if (a.sectionId === toSection && a.columnId === toColumn && o.kind === 'wp' && o.webpartId === a.webpartId) return;

    moveWebpartById(
      pid,
      { sectionId: a.sectionId, columnId: a.columnId },
      { sectionId: toSection, columnId: toColumn, index: toIndex },
      a.webpartId,
    );
  };

  const addAt = (index: number, choice: SectionChoice) => insertSection(pid, index, makeSection(choice));
  const addWebpart = (sid: string, colId: string, type: string, at?: number) => {
    const def = getWebpart(type);
    if (!def) return;
    const section = sections.find((s) => s.id === sid);
    // Seed dans la langue du projet — figée à l'insertion (changement de langue ≠ re-seed).
    const locale = useProjectStore.getState().project?.prospect.contentLanguage ?? 'fr-FR';
    const wp: WebpartInstance = {
      id: genId('wp'), type, order: 0,
      config: { ...def.defaultConfig }, content: { ...def.defaultContent(locale) },
    };
    // En section flexible : placement par défaut tuilé (2 colonnes, snap vertical).
    if (section?.layout === 'flexible') {
      const n = section.columns.flatMap((c) => c.webparts).length;
      wp.flex = { x: (n % 2) * 6, w: 6, y: Math.floor(n / 2) * 300, z: 1 };
    }
    insertWebpartAt(pid, sid, colId, wp, at);
  };

  if (!pid) {
    return <div className="p-lg text-caption text-gray-400">Aucune page active.</div>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex flex-col px-lg py-md min-h-[400px]" onClick={() => selectWebpart(null)}>
        {sections.length === 0 ? (
          <EmptyAdd onAdd={(c) => addAt(0, c)} />
        ) : (
          <>
            <AddSectionBar onAdd={(c) => addAt(0, c)} />
            {sections.map((section, i) => (
              <div key={section.id}>
                <SectionEditFrame
                  section={section}
                  pageId={pid}
                  onRemove={() => removeSection(pid, section.id)}
                  onChangeLayout={(c) => changeSectionLayout(pid, section.id, c)}
                  onAddWebpart={(colId, type, at) => addWebpart(section.id, colId, type, at)}
                  onRemoveWebpart={(colId, wpId) => removeWebpartById(pid, section.id, colId, wpId)}
                />
                <AddSectionBar onAdd={(c) => addAt(i + 1, c)} />
              </div>
            ))}
          </>
        )}
      </div>
    </DndContext>
  );
}

/** Données dnd-kit attachées aux éléments draggables/droppables. */
type DndWp = { kind: 'wp'; sectionId: string; columnId: string; webpartId: string };
type DndColumn = { kind: 'column'; sectionId: string; columnId: string };

/** État vide : grand bouton « + Section » visible. */
function EmptyAdd({ onAdd }: { onAdd: (c: SectionChoice) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center gap-md py-3xl border-2 border-dashed border-gray-300 rounded-md text-[#605e5c]">
      <p className="text-body">Cette page est vide.</p>
      <button type="button" data-testid="add-section" onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-xs px-lg py-sm rounded-full bg-sp-primary text-white text-body font-semibold shadow">
        <span className="text-heading-sm leading-none">+</span> Ajouter une section
      </button>
      {open && <LayoutPicker onPick={(c) => { onAdd(c); setOpen(false); }} />}
    </div>
  );
}

/** Cadre d'édition d'une section : onglet, modifier le layout, supprimer. */
function SectionEditFrame({
  section, pageId, onRemove, onChangeLayout, onAddWebpart, onRemoveWebpart,
}: {
  section: Section;
  pageId: string;
  onRemove: () => void;
  onChangeLayout: (c: SectionChoice) => void;
  onAddWebpart: (colId: string, type: string, at?: number) => void;
  onRemoveWebpart: (colId: string, wpId: string) => void;
}) {
  const [pickLayout, setPickLayout] = useState(false);
  const isFlexible = section.layout === 'flexible';
  const isFullWidth = section.layout === 'full-width';
  // Full-width ET flexible s'étendent bord à bord du canvas (comme en présentation)
  const isBleed = isFullWidth || isFlexible;

  return (
    <div className={cn(
      '@container relative group/sec border border-transparent hover:border-sp-primary/40 rounded-sm transition-colors',
      // Centrage 1204px par section ; full-width/flexible bleed en annulant le padding du canvas (px-lg).
      isBleed ? '-mx-lg' : 'max-w-[1204px] mx-auto w-full',
    )}>
      {/* Barre d'outils de section (au survol) */}
      <div className="absolute -top-3 left-2 z-20 hidden group-hover/sec:flex items-center gap-xs">
        <span className="bg-[#323130] text-white text-caption px-sm py-2xs rounded-sm">Section</span>
        <div className="relative">
          <button type="button" title="Modifier la section" onClick={() => setPickLayout((o) => !o)}
            className="w-6 h-6 rounded-sm bg-white border border-gray-300 text-[#605e5c] hover:text-sp-primary hover:border-sp-primary flex items-center justify-center text-caption">✎</button>
          {pickLayout && <LayoutPicker onPick={(c) => { onChangeLayout(c); setPickLayout(false); }} />}
        </div>
        <button type="button" title="Supprimer la section" onClick={onRemove}
          className="w-6 h-6 rounded-sm bg-white border border-gray-300 text-[#605e5c] hover:text-red-600 hover:border-red-300 flex items-center justify-center text-caption">🗑</button>
      </div>

      {isFlexible ? (
        // La section flexible se gère librement ; on garde une zone d'ajout sur sa colonne unique.
        <div>
          <FlexibleSectionRenderer
            webparts={section.columns.flatMap((c) => c.webparts)}
            isEditMode
            pageId={pageId}
            sectionId={section.id}
            onRemoveWebpart={(wpId) => onRemoveWebpart(section.columns[0].id, wpId)}
          />
          <div className="mt-md">
            <AddWebpartZone compact={false} onPick={(type) => onAddWebpart(section.columns[0].id, type)} />
          </div>
        </div>
      ) : (
        // full-width : pas de padding interne — le webpart bleed bord à bord comme en présentation
        <div className={cn(getSectionGridClass(section.layout), SECTION_GAP, isFullWidth ? 'p-0' : 'p-md')}>
          {section.columns.map((col) => (
            <EditColumn
              key={col.id}
              sectionId={section.id}
              column={col}
              fullWidth={isFullWidth}
              onAdd={(type, at) => onAddWebpart(col.id, type, at)}
              onRemoveWebpart={(wpId) => onRemoveWebpart(col.id, wpId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Une colonne en édition : droppable + tri vertical (DnD), webparts empilés,
 *  zones « + Ajouter un webpart » entre chaque (empilement) + grand placeholder si vide. */
function EditColumn({
  sectionId, column, fullWidth = false, onAdd, onRemoveWebpart,
}: {
  sectionId: string;
  column: Column;
  fullWidth?: boolean;
  onAdd: (type: string, at?: number) => void;
  onRemoveWebpart: (wpId: string) => void;
}) {
  const webparts = [...column.webparts].sort((a, b) => a.order - b.order);
  // Colonne droppable (permet le drop dans une colonne vide / en fin de liste).
  const colData: DndColumn = { kind: 'column', sectionId, columnId: column.id };
  const { setNodeRef, isOver } = useDroppable({ id: `col:${sectionId}:${column.id}`, data: colData });

  if (webparts.length === 0) {
    return (
      <div ref={setNodeRef} className={cn('rounded-md transition-colors', isOver && 'ring-2 ring-sp-primary/50')}>
        <AddWebpartZone compact={false} fullWidth={fullWidth} onPick={(type) => onAdd(type, 0)} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={cn('group/col flex flex-col gap-md min-w-0 rounded-md transition-colors', isOver && 'ring-2 ring-sp-primary/40')}
    >
      <AddWebpartZone compact fullWidth={fullWidth} onPick={(type) => onAdd(type, 0)} />
      <SortableContext items={webparts.map((w) => `wp:${w.id}`)} strategy={verticalListSortingStrategy}>
        {webparts.map((wp, i) => (
          <div key={wp.id}>
            <SortableWebpart
              instance={wp}
              fullWidth={fullWidth}
              data={{ kind: 'wp', sectionId, columnId: column.id, webpartId: wp.id }}
              onRemove={() => onRemoveWebpart(wp.id)}
            />
            {/* Zone d'ajout SOUS chaque webpart (insère à i+1). */}
            <AddWebpartZone compact fullWidth={fullWidth} onPick={(type) => onAdd(type, i + 1)} />
          </div>
        ))}
      </SortableContext>
    </div>
  );
}

/** Webpart triable (DnD) avec poignée de déplacement + bouton supprimer (au survol). */
function SortableWebpart({
  instance, data, fullWidth = false, onRemove,
}: {
  instance: WebpartInstance;
  data: DndWp;
  fullWidth?: boolean;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `wp:${instance.id}`,
    data,
  });
  const style = { transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  const selected = useProjectStore((s) => s.selectedWebpartId === instance.id);
  const selectWebpart = useProjectStore((s) => s.selectWebpart);

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid="wp"
      onClick={(e) => { e.stopPropagation(); selectWebpart(instance.id); }}
      className={cn(
        'relative group/wp border rounded-sm cursor-pointer',
        selected ? 'border-sp-primary ring-1 ring-sp-primary' : 'border-transparent hover:border-sp-primary/40',
      )}
    >
      {/* Poignée de déplacement (au survol). */}
      <button
        type="button" title="Déplacer le webpart" {...attributes} {...listeners}
        className="absolute -top-2 left-2 z-20 hidden group-hover/wp:flex w-6 h-6 rounded-full bg-white border border-gray-300 text-[#605e5c] hover:text-sp-primary hover:border-sp-primary items-center justify-center text-caption shadow-sm cursor-grab active:cursor-grabbing"
      >⠿</button>
      <button
        type="button" title="Supprimer le webpart" onClick={onRemove} data-testid="wp-delete"
        className="absolute -top-2 -right-2 z-20 hidden group-hover/wp:flex w-6 h-6 rounded-full bg-white border border-gray-300 text-[#605e5c] hover:text-red-600 hover:border-red-300 items-center justify-center text-caption shadow-sm"
      >🗑</button>
      <WebpartHost instance={instance} isEditMode fullWidth={fullWidth} />
    </div>
  );
}

/** Zone d'ajout de webpart. `compact` = ligne fine (entre webparts, visible au survol de la colonne) ;
 *  sinon grand placeholder (colonne vide). */
function AddWebpartZone({ compact, fullWidth = false, onPick }: { compact: boolean; fullWidth?: boolean; onPick: (type: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('relative', compact && 'group/addwp flex items-center justify-center py-xs cursor-pointer transition-opacity',
      compact && (open ? 'opacity-100' : 'opacity-0 group-hover/col:opacity-100'))}>
      {compact ? (
        <>
          <div className={cn('absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] transition-colors',
            open ? 'bg-sp-primary' : 'bg-gray-200 group-hover/addwp:bg-sp-primary')} />
          <button type="button" onClick={() => setOpen((o) => !o)}
            className={cn('relative z-10 w-5 h-5 rounded-full text-caption flex items-center justify-center shadow-sm transition-colors',
              open ? 'bg-sp-primary text-white' : 'bg-white border border-gray-300 text-sp-primary group-hover/addwp:bg-sp-primary group-hover/addwp:text-white group-hover/addwp:border-transparent')}>
            <span className="leading-none">{open ? '×' : '+'}</span>
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setOpen((o) => !o)}
          className="w-full min-h-[96px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center gap-xs text-[#605e5c] hover:border-sp-primary hover:text-sp-primary transition-colors">
          <span className="text-heading-sm leading-none">+</span> Ajouter un webpart
        </button>
      )}
      {open && <WebpartCatalog fullWidthOnly={fullWidth} onPick={(t) => { onPick(t); setOpen(false); }} onClose={() => setOpen(false)} />}
    </div>
  );
}
