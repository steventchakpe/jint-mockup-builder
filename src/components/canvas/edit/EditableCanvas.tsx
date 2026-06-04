'use client';

import { useState } from 'react';
import { WebpartHost } from '../WebpartHost';
import { FlexibleSectionRenderer } from '../FlexibleSectionRenderer';
import {
  SECTION_GAP,
  getColumnCount,
  getSectionGridClass,
} from '../section-layout';
import { LayoutPicker, type SectionChoice } from './LayoutPicker';
import { WebpartCatalog } from './WebpartCatalog';
import { getWebpart } from '@/config/webpart-registry';
import { cn } from '@/lib/utils';
import type { Column, Section, SectionLayout, WebpartInstance } from '@/types/project';

let uid = 0;
const id = (p: string) => `${p}-${Date.now()}-${uid++}`;
const emptyCols = (n: number): Column[] => Array.from({ length: n }, (_, i) => ({ id: id('col'), index: i, webparts: [] }));

function makeSection(choice: SectionChoice): Section {
  const layout: SectionLayout = choice === 'vertical' ? 'one-column' : choice;
  return {
    id: id('section'), order: 0, layout, background: 'none', backgroundImage: null,
    collapsible: false, title: null, columns: emptyCols(getColumnCount(layout)),
  };
}

/** Change le layout d'une section en préservant les webparts (fusion si moins de colonnes). */
function relayout(section: Section, choice: SectionChoice): Section {
  const layout: SectionLayout = choice === 'vertical' ? 'one-column' : choice;
  const target = getColumnCount(layout);
  const cur = section.columns;
  let columns: Column[];
  if (target >= cur.length) {
    columns = [...cur, ...emptyCols(target - cur.length).map((c, i) => ({ ...c, index: cur.length + i }))];
  } else {
    // fusionne les webparts des colonnes en trop dans la dernière colonne conservée
    const kept = cur.slice(0, target).map((c) => ({ ...c, webparts: [...c.webparts] }));
    cur.slice(target).forEach((c) => kept[target - 1].webparts.push(...c.webparts));
    columns = kept;
  }
  return { ...section, layout, columns: columns.map((c, i) => ({ ...c, index: i })) };
}

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
 * + ajout de webparts (US-08). Réplique l'expérience d'édition SharePoint.
 */
export function EditableCanvas({ initial = [] }: { initial?: Section[] }) {
  const [sections, setSections] = useState<Section[]>(initial);
  const reorder = (arr: Section[]) => arr.map((s, i) => ({ ...s, order: i }));

  const addAt = (index: number, choice: SectionChoice) =>
    setSections((s) => { const n = [...s]; n.splice(index, 0, makeSection(choice)); return reorder(n); });
  const remove = (sid: string) => setSections((s) => reorder(s.filter((x) => x.id !== sid)));
  const changeLayout = (sid: string, choice: SectionChoice) =>
    setSections((s) => s.map((sec) => sec.id === sid ? relayout(sec, choice) : sec));
  // Insère un webpart dans une colonne à la position `at` (défaut: à la fin).
  const addWebpart = (sid: string, colId: string, type: string, at?: number) => {
    const def = getWebpart(type); if (!def) return;
    const wp: WebpartInstance = { id: id('wp'), type, order: 0, config: { ...def.defaultConfig }, content: { ...def.defaultContent } };
    setSections((s) => s.map((sec) => sec.id !== sid ? sec : {
      ...sec, columns: sec.columns.map((c) => {
        if (c.id !== colId) return c;
        const wps = [...c.webparts];
        wps.splice(at ?? wps.length, 0, wp);
        return { ...c, webparts: wps.map((w, i) => ({ ...w, order: i })) };
      }),
    }));
  };
  const removeWebpart = (sid: string, colId: string, wpId: string) =>
    setSections((s) => s.map((sec) => sec.id !== sid ? sec : {
      ...sec, columns: sec.columns.map((c) => c.id !== colId ? c
        : { ...c, webparts: c.webparts.filter((w) => w.id !== wpId).map((w, i) => ({ ...w, order: i })) }),
    }));

  return (
    <div className="flex flex-col px-lg py-md min-h-[400px]">
      {sections.length === 0 ? (
        <EmptyAdd onAdd={(c) => addAt(0, c)} />
      ) : (
        <>
          <AddSectionBar onAdd={(c) => addAt(0, c)} />
          {sections.map((section, i) => (
            <div key={section.id}>
              <SectionEditFrame
                section={section}
                onRemove={() => remove(section.id)}
                onChangeLayout={(c) => changeLayout(section.id, c)}
                onAddWebpart={(colId, type, at) => addWebpart(section.id, colId, type, at)}
                onRemoveWebpart={(colId, wpId) => removeWebpart(section.id, colId, wpId)}
              />
              <AddSectionBar onAdd={(c) => addAt(i + 1, c)} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

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
  section, onRemove, onChangeLayout, onAddWebpart, onRemoveWebpart,
}: {
  section: Section;
  onRemove: () => void;
  onChangeLayout: (c: SectionChoice) => void;
  onAddWebpart: (colId: string, type: string, at?: number) => void;
  onRemoveWebpart: (colId: string, wpId: string) => void;
}) {
  const [pickLayout, setPickLayout] = useState(false);
  const isFlexible = section.layout === 'flexible';

  return (
    <div className="@container relative group/sec border border-transparent hover:border-sp-primary/40 rounded-sm transition-colors">
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
        <div className="p-md">
          <FlexibleSectionRenderer webparts={section.columns.flatMap((c) => c.webparts)} isEditMode />
          <div className="mt-md">
            <AddWebpartZone compact={false} onPick={(type) => onAddWebpart(section.columns[0].id, type)} />
          </div>
        </div>
      ) : (
        <div className={cn(getSectionGridClass(section.layout), SECTION_GAP, 'p-md')}>
          {section.columns.map((col) => (
            <EditColumn
              key={col.id}
              column={col}
              onAdd={(type, at) => onAddWebpart(col.id, type, at)}
              onRemoveWebpart={(wpId) => onRemoveWebpart(col.id, wpId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Une colonne en édition : webparts empilés, chacun avec barre de suppression,
 *  et une zone « + Ajouter un webpart » entre chaque + à la fin (empilement vertical). */
function EditColumn({
  column, onAdd, onRemoveWebpart,
}: {
  column: Column;
  onAdd: (type: string, at?: number) => void;
  onRemoveWebpart: (wpId: string) => void;
}) {
  const webparts = [...column.webparts].sort((a, b) => a.order - b.order);

  if (webparts.length === 0) {
    return <AddWebpartZone compact={false} onPick={(type) => onAdd(type, 0)} />;
  }

  return (
    <div className="group/col flex flex-col gap-md min-w-0">
      {/* Zone d'ajout AU-DESSUS du premier webpart (insère à 0). */}
      <AddWebpartZone compact onPick={(type) => onAdd(type, 0)} />
      {webparts.map((wp, i) => (
        <div key={wp.id}>
          <div className="relative group/wp border border-transparent hover:border-sp-primary/40 rounded-sm">
            <button
              type="button" title="Supprimer le webpart" onClick={() => onRemoveWebpart(wp.id)}
              className="absolute -top-2 -right-2 z-20 hidden group-hover/wp:flex w-6 h-6 rounded-full bg-white border border-gray-300 text-[#605e5c] hover:text-red-600 hover:border-red-300 items-center justify-center text-caption shadow-sm"
            >🗑</button>
            <WebpartHost instance={wp} isEditMode />
          </div>
          {/* Zone d'ajout SOUS chaque webpart (insère à i+1). */}
          <AddWebpartZone compact onPick={(type) => onAdd(type, i + 1)} />
        </div>
      ))}
    </div>
  );
}

/** Zone d'ajout de webpart. `compact` = ligne fine (entre webparts, visible au survol de la colonne) ;
 *  sinon grand placeholder (colonne vide). */
function AddWebpartZone({ compact, onPick }: { compact: boolean; onPick: (type: string) => void }) {
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
      {open && <WebpartCatalog onPick={(t) => { onPick(t); setOpen(false); }} onClose={() => setOpen(false)} />}
    </div>
  );
}
