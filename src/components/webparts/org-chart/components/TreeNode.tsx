'use client';

import { cn } from '@/lib/utils';
import {
  LINE_HEIGHT,
  LINE_WIDTH,
  NEUTRAL_QUATERNARY,
  NODE_BORDER_RADIUS,
  NODE_SPACING,
} from '../OrgChart.mozzaik';

/**
 * Connecteurs TreeNode — port fidèle des pseudo-éléments du bundle :
 * lignes 1px neutralQuaternary, hauteur 15px, espacement 20px, coins 3px.
 * Injecté une fois via <style> (les ::before/::after ne s'écrivent pas inline).
 */
export function TreeNodeStyles() {
  const css = `
.jint-orgchart ul, .jint-orgchart li { list-style: none; margin: 0; padding: 0; }
.jint-orgchart .oc-children { display: flex; gap: ${NODE_SPACING}px; margin: ${NODE_SPACING}px 0 0; padding-top: ${LINE_HEIGHT}px; position: relative; }
.jint-orgchart .oc-children:before { content: ''; position: absolute; top: 0; overflow: hidden; height: ${LINE_HEIGHT}px; box-sizing: border-box; left: 50%; width: 0; border-left: ${LINE_WIDTH}px solid ${NEUTRAL_QUATERNARY}; }
.jint-orgchart .oc-children.oc-collapsed:before { display: none; }
.jint-orgchart .oc-node { flex: auto; text-align: center; list-style-type: none; position: relative; padding: ${NODE_SPACING}px 0 0; }
.jint-orgchart .oc-node:before { content: ''; position: absolute; top: 0; height: ${LINE_HEIGHT}px; box-sizing: border-box; right: 50%; width: 57%; border-top: ${LINE_WIDTH}px solid ${NEUTRAL_QUATERNARY}; }
.jint-orgchart .oc-node:after { content: ''; position: absolute; top: 0; width: 57%; height: ${LINE_HEIGHT}px; box-sizing: border-box; left: 50%; border-left: ${LINE_WIDTH}px solid ${NEUTRAL_QUATERNARY}; border-top: ${LINE_WIDTH}px solid ${NEUTRAL_QUATERNARY}; }
.jint-orgchart .oc-node.oc-last:before { border-right: ${LINE_WIDTH}px solid ${NEUTRAL_QUATERNARY}; border-radius: 0 ${NODE_BORDER_RADIUS}px 0 0; }
.jint-orgchart .oc-node.oc-last:after { border: 0 none; }
.jint-orgchart .oc-node.oc-first:after { border-radius: ${NODE_BORDER_RADIUS}px 0 0 0; }
.jint-orgchart .oc-node.oc-first:before { border: 0 none; }
.jint-orgchart .oc-node.oc-unique:before, .jint-orgchart .oc-node.oc-unique:after { border-top: 0 none; }
.jint-orgchart .oc-node.oc-root { padding-top: 0; }
.jint-orgchart .oc-node.oc-root:before, .jint-orgchart .oc-node.oc-root:after { display: none; }
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

interface TreeNodeProps {
  label: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isUnique?: boolean;
  isRoot?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
}

export function TreeNode({ label, isFirst, isLast, isUnique, isRoot, collapsed, children }: TreeNodeProps) {
  return (
    <li className={cn('oc-node', isFirst && 'oc-first', isLast && 'oc-last', isUnique && 'oc-unique', isRoot && 'oc-root')}>
      <div className="inline-block">{label}</div>
      {children && <ul className={cn('oc-children', collapsed && 'oc-collapsed')}>{children}</ul>}
    </li>
  );
}
