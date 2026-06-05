'use client';

import { useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { CheckmarkIcon, ChevronDownIcon, ChevronRightIcon } from '../MyTasks.icons';
import {
  CHECKBOX_SIZE,
  CHECKBOX_TEXT_GAP,
  EXPANDED_HEADER_PADDING_BOTTOM,
  FONT_SIZE,
  GROUP_BORDER_WIDTH,
  GROUP_PADDING,
  HEADER_HEIGHT,
  ITEM_GAP,
  LIST_GAP,
  NEUTRAL_LIGHTER,
  NEUTRAL_TERTIARY,
  SUBITEM_PADDING_LEFT,
} from '../MyTasks.mozzaik';
import type { TaskItem } from '../MyTasks.types';

interface TaskGroupProps {
  task: TaskItem;
  listIndex: number;
  taskIndex: number;
  radius: number;
  locale?: string;
}

/** Checkbox Fluent 16px — coché : fond themePrimary, coche blanche. */
function TaskCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`shrink-0 inline-flex items-center justify-center border transition-colors ${
        checked ? 'bg-sp-primary border-sp-primary text-white' : 'bg-white border-[#605e5c] hover:border-[#323130]'
      }`}
      style={{ width: CHECKBOX_SIZE, height: CHECKBOX_SIZE, borderRadius: 2 }}
    >
      {checked && <CheckmarkIcon style={{ width: 12, height: 12 }} />}
    </button>
  );
}

/**
 * TaskGroup — port fidèle d'un groupe TreeView (groupsWithBorder) :
 * boîte bordure 1px neutralLighter, radius config, padding 12 ; header 32px
 * (chevron 12 si checklist + checkbox + titre BodyText / échéance MetadataLimited) ;
 * items de checklist indentés 46px, gap 4 ; coché → barré neutralTertiary.
 */
export function TaskGroup({ task, listIndex, taskIndex, radius, locale = 'fr-FR' }: TaskGroupProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [done, setDone] = useState(task.completed);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    Object.fromEntries((task.checklist ?? []).map((c) => [c.id, c.checked])),
  );
  const hasChildren = (task.checklist ?? []).length > 0;
  const doneStyle = done ? { textDecoration: 'line-through' as const, color: NEUTRAL_TERTIARY } : {};

  return (
    <div style={{ border: `${GROUP_BORDER_WIDTH}px solid ${NEUTRAL_LIGHTER}`, borderRadius: radius, padding: GROUP_PADDING }}>
      <div
        className={`flex items-center ${hasChildren ? 'cursor-pointer' : ''}`}
        style={{ gap: ITEM_GAP, height: HEADER_HEIGHT, paddingBottom: hasChildren && !collapsed ? EXPANDED_HEADER_PADDING_BOTTOM : 0 }}
        onClick={() => hasChildren && setCollapsed((c) => !c)}
      >
        {hasChildren && (collapsed
          ? <ChevronRightIcon style={{ width: 12, height: 12 }} />
          : <ChevronDownIcon style={{ width: 12, height: 12 }} />)}
        <div className="flex items-center min-w-0" style={{ gap: CHECKBOX_TEXT_GAP, paddingLeft: hasChildren ? 0 : 20 }}>
          <TaskCheckbox checked={done} onToggle={() => setDone((d) => !d)} />
          <div className="flex flex-col min-w-0">
            <InlineText
              as="span"
              path={['lists', listIndex, 'tasks', taskIndex, 'title']}
              value={task.title}
              placeholder="Tâche"
              className="truncate text-[#323130]"
              style={{ fontSize: FONT_SIZE.BodyText, ...doneStyle }}
            />
            {task.dueDate && (
              <span className="truncate" style={{ fontSize: FONT_SIZE.MetadataLimited, ...doneStyle }}>
                {new Date(task.dueDate).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {hasChildren && !collapsed && (
        <div className="flex flex-col" style={{ gap: LIST_GAP }}>
          {(task.checklist ?? []).map((item) => {
            const checked = checkedItems[item.id] ?? false;
            return (
              <div key={item.id} className="flex items-center" style={{ gap: CHECKBOX_TEXT_GAP, paddingLeft: SUBITEM_PADDING_LEFT }}>
                <TaskCheckbox checked={checked} onToggle={() => setCheckedItems((s) => ({ ...s, [item.id]: !checked }))} />
                <span
                  className="truncate text-[#323130]"
                  style={{ fontSize: FONT_SIZE.BodyText, ...(checked ? { textDecoration: 'line-through' as const, color: NEUTRAL_TERTIARY } : {}) }}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
