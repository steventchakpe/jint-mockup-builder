'use client';

import { useMemo, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { EmployeeCard } from './components/EmployeeCard';
import { TreeNode, TreeNodeStyles } from './components/TreeNode';
import { AddIcon, ArrowDownloadIcon, CenterIcon, SubtractIcon } from './OrgChart.icons';
import {
  CONTENT_PADDING,
  CONTROLS_GAP,
  CONTROLS_OFFSET,
  FONT_SIZE,
  NEUTRAL_LIGHTER_ALT,
  TITLE_HEIGHT,
} from './OrgChart.mozzaik';
import type { OrgChartEmployee, OrgChartProps } from './OrgChart.types';

/**
 * Webpart Org chart — port fidèle de `OrganizationChartTreechartLayout`
 * (@mozzaik365/components/organization-chart).
 *
 * Header 48px : titre + export PDF. Zone fond neutralLighterAlt (padding 32),
 * arbre de cartes reliées par connecteurs 1px, racine dépliée par défaut,
 * pilule headcount pour déplier/replier ; contrôles zoom (centrer/+/−) en bas
 * à droite (zoom par transform, pan par scroll).
 */
export function OrgChart({ config, content, isEditMode = false }: OrgChartProps) {
  const { title, height } = config;
  const employees = content.employees;
  const root = employees.find((e) => e.managerId === null) ?? employees[0];
  const [expanded, setExpanded] = useState<Record<string, boolean>>(root ? { [root.id]: true } : {});
  const [scale, setScale] = useState(1);

  const childrenOf = useMemo(() => {
    const map = new Map<string, OrgChartEmployee[]>();
    employees.forEach((e) => {
      if (!e.managerId) return;
      map.set(e.managerId, [...(map.get(e.managerId) ?? []), e]);
    });
    return map;
  }, [employees]);

  const renderNode = (employee: OrgChartEmployee, opts: { isFirst?: boolean; isLast?: boolean; isUnique?: boolean; isRoot?: boolean }) => {
    const reports = childrenOf.get(employee.id) ?? [];
    const isExpanded = expanded[employee.id] ?? false;
    return (
      <TreeNode
        key={employee.id}
        {...opts}
        collapsed={!isExpanded}
        label={
          <EmployeeCard
            employee={employee}
            index={employees.indexOf(employee)}
            config={config}
            headcount={reports.length}
            isExpanded={isExpanded}
            onExpandClick={() => setExpanded((s) => ({ ...s, [employee.id]: !isExpanded }))}
          />
        }
      >
        {isExpanded && reports.length > 0
          ? reports.map((r, i) =>
              renderNode(r, { isFirst: i === 0, isLast: i === reports.length - 1, isUnique: reports.length === 1 }),
            )
          : undefined}
      </TreeNode>
    );
  };

  return (
    <section className="flex flex-col">
      <TreeNodeStyles />
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
        <button type="button" aria-label="Télécharger en PDF" className="w-10 h-10 inline-flex items-center justify-center rounded-sm text-[#323130] hover:bg-sp-lighter-alt transition-colors">
          <ArrowDownloadIcon style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <div className="relative overflow-hidden" style={{ height: height - TITLE_HEIGHT, background: NEUTRAL_LIGHTER_ALT }}>
        <div className="jint-orgchart h-full w-full overflow-auto" style={{ padding: CONTENT_PADDING }}>
          <ul className="inline-flex min-w-full justify-center" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            {root && renderNode(root, { isUnique: true, isRoot: true })}
          </ul>
        </div>

        {/* Contrôles zoom */}
        <div className="absolute flex flex-col" style={{ bottom: CONTROLS_OFFSET, right: CONTROLS_OFFSET, gap: CONTROLS_GAP }}>
          {[
            { label: 'Centrer', icon: <CenterIcon style={{ width: 14, height: 14 }} />, onClick: () => setScale(1) },
            { label: 'Zoomer', icon: <AddIcon style={{ width: 16, height: 16 }} />, onClick: () => setScale((s) => Math.min(3, s * 1.25)) },
            { label: 'Dézoomer', icon: <SubtractIcon style={{ width: 16, height: 16 }} />, onClick: () => setScale((s) => Math.max(0.3, s / 1.25)) },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={b.onClick}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white text-sp-primary hover:bg-sp-lighter-alt transition-colors"
              style={{ boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 0.05)' }}
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
