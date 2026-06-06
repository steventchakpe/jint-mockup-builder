'use client';

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { ColumnRenderer } from './ColumnRenderer';
import { FlexibleSectionRenderer } from './FlexibleSectionRenderer';
import {
  SECTION_GAP,
  getColumnCount,
  getSectionBackgroundClass,
  getSectionGridClass,
} from './section-layout';
import type { Section } from '@/types/project';

interface SectionRendererProps {
  section: Section;
  isEditMode?: boolean;
}

/**
 * SectionRenderer — réplique le système de sections natif SharePoint.
 *
 * - Grille 12 col / proportions par layout, gouttières 16→24→32 (container queries).
 * - 7 layouts : flexible, 1 col, 2 col (6/6), 3 col (4/4/4), 1/3 gauche (4/8),
 *   1/3 droite (8/4), pleine largeur (bleed sur toute la largeur du canvas).
 * - Fond : none / neutral / soft / strong (thème) / image.
 * - La zone de contenu reste à max 1204px (gérée par le canvas) ; `full-width`
 *   sort de cette contrainte (bleed pleine largeur).
 */
export function SectionRenderer({ section, isEditMode = false }: SectionRendererProps) {
  const { layout, background, backgroundImage, title, columns } = section;
  const isFullWidth = layout === 'full-width';
  const isFlexible = layout === 'flexible';
  // Full-width ET flexible s'étendent bord à bord du canvas (comme SharePoint)
  const isBleed = isFullWidth || isFlexible;
  const hasFill = background !== 'none';

  // Section flexible : les webparts (toutes colonnes confondues) sont positionnés
  // librement dans une grille 12 col 2D, pas en colonnes fixes.
  const flexWebparts = isFlexible ? columns.flatMap((c) => c.webparts) : [];

  const orderedColumns = [...columns]
    .sort((a, b) => a.index - b.index)
    .slice(0, getColumnCount(layout));

  const style: CSSProperties = {};
  if (background === 'image' && backgroundImage) {
    style.backgroundImage = `url("${backgroundImage}")`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center center';
    style.backgroundRepeat = 'no-repeat';
  }

  return (
    <section
      data-testid="section"
      data-layout={layout}
      className={cn(
        '@container',
        // bleed sur toute la largeur du canvas (100cqw = container ancêtre,
        // posé sur le <main> du PageShell) — pas le viewport, sinon rognage par le card.
        isBleed && 'relative left-1/2 w-[100cqw] -translate-x-1/2',
        getSectionBackgroundClass(background),
        // padding quand un fond est appliqué (comme SharePoint)
        hasFill && 'p-xl',
      )}
      style={style}
    >
      {/* full-width : bleed pur — le webpart colle les bords du canvas (comme SharePoint) */}
      <div>
        {title && (
          <h2 className="text-heading-sm font-semibold text-sp-darker mb-md">{title}</h2>
        )}
        {isFlexible ? (
          <FlexibleSectionRenderer webparts={flexWebparts} isEditMode={isEditMode} />
        ) : (
          <div className={cn(getSectionGridClass(layout), SECTION_GAP)}>
            {orderedColumns.map((column) => (
              <ColumnRenderer key={column.id} column={column} isEditMode={isEditMode} fullWidth={isFullWidth} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
