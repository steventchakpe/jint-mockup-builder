'use client';

import { useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { TaskGroup } from './components/TaskGroup';
import { ChevronDownIcon, ListKindIcon } from './MyTasks.icons';
import {
  CONTENT_GAP,
  CONTENT_PADDING_RIGHT,
  FONT_SIZE,
  GROUPS_GAP,
  NEUTRAL_LIGHTER,
  TITLE_HEIGHT,
} from './MyTasks.mozzaik';
import { useDemoStrings } from '@/lib/i18n';
import type { MyTasksProps } from './MyTasks.types';

/**
 * Webpart My tasks — port fidèle de `MyTasksTreeViewLayout`
 * (@mozzaik365/components/my-tasks).
 *
 * Header 48px : titre + lien « Ouvrir dans l'application ». Dropdown de listes
 * (icônes colorées : Important ⭐ violet, Planifié vert, dossiers themePrimary),
 * puis TreeView : un groupe bordé par tâche, items de checklist indentés,
 * cochage → barré (lineThroughOnSelect).
 */
export function MyTasks({ config, content, isEditMode = false, locale = 'fr-FR' }: MyTasksProps) {
  const { title, height, radius } = config;
  const tw = useDemoStrings().webparts;
  const lists = content.lists;
  const [currentId, setCurrentId] = useState(lists[0]?.id);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = lists.find((l) => l.id === currentId) ?? lists[0];

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between shrink-0" style={{ height: TITLE_HEIGHT, padding: '0 8px 0 0' }}>
        <InlineText
          as="h2"
          target="config"
          path={['title']}
          value={title}
          placeholder="Titre de la section"
          className="font-semibold text-[#323130]"
          style={{ fontSize: FONT_SIZE.PaneHeader }}
        />
        <a href="https://to-do.office.com/" target="_blank" rel="noreferrer" className="text-sp-primary hover:underline" style={{ fontSize: FONT_SIZE.BodyText }} onClick={(e) => { if (isEditMode) e.preventDefault(); }}>
          Ouvrir dans l’application
        </a>
      </div>

      <div className="flex flex-col overflow-y-auto" style={{ height: height - TITLE_HEIGHT, gap: CONTENT_GAP, paddingRight: CONTENT_PADDING_RIGHT }}>
        {/* Dropdown de listes (radius Medium = 8) */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center justify-between w-full h-8 px-sm bg-white hover:bg-sp-lighter-alt transition-colors"
            style={{ border: `1px solid #605e5c`, borderRadius: 8, fontSize: FONT_SIZE.BodyText }}
          >
            <span className="flex items-center gap-sm min-w-0">
              {current && <ListKindIcon kind={current.kind} active />}
              <span className="truncate text-[#323130]">{current?.name}</span>
            </span>
            <ChevronDownIcon style={{ width: 12, height: 12, color: '#605e5c' }} />
          </button>
          {menuOpen && (
            <div className="absolute inset-x-0 top-full mt-xs bg-white rounded-sm shadow-lg z-10 py-xs" style={{ border: `1px solid ${NEUTRAL_LIGHTER}` }}>
              {lists.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => { setCurrentId(l.id); setMenuOpen(false); }}
                  className={`flex items-center gap-sm w-full px-sm py-xs text-left hover:bg-sp-lighter-alt ${l.id === currentId ? 'bg-sp-lighter-alt' : ''}`}
                  style={{ fontSize: FONT_SIZE.BodyText }}
                >
                  <ListKindIcon kind={l.kind} active={l.id === currentId} />
                  <span className="truncate text-[#323130]">{l.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TreeView */}
        {current && current.tasks.length === 0 ? (
          <p className="text-body text-gray-500 py-xl text-center grow flex items-center justify-center">{tw.noTask}</p>
        ) : (
          <div className="flex flex-col" style={{ gap: GROUPS_GAP }}>
            {current?.tasks.map((task, t) => (
              <TaskGroup
                key={task.id}
                task={task}
                listIndex={lists.indexOf(current)}
                taskIndex={t}
                radius={radius}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
