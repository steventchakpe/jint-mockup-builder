'use client';

import { cn } from '@/lib/utils';
import { SectionRenderer } from './SectionRenderer';
import { VerticalSectionRenderer } from './VerticalSectionRenderer';
import type { Page } from '@/types/project';

interface PageRendererProps {
  page: Page;
  isEditMode?: boolean;
}

/**
 * PageRenderer — assemble les sections d'une page + la section verticale.
 *
 * - Sections normales empilées verticalement (max 1204px, géré ici).
 * - Section verticale = sidebar DROITE (≥ 1024px) qui repasse EN BAS (< 1024px),
 *   conforme au comportement natif SharePoint.
 * - SharePoint interdit full-width + section verticale simultanés (non géré ici,
 *   contrainte d'édition).
 */
export function PageRenderer({ page, isEditMode = false }: PageRendererProps) {
  const sections = [...page.sections].sort((a, b) => a.order - b.order);
  const hasVertical = !!page.verticalSection && page.verticalSection.webparts.length > 0;

  const main = (
    <div className="flex flex-col gap-2xl min-w-0 flex-1">
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} isEditMode={isEditMode} />
      ))}
    </div>
  );

  return (
    <div className="@container w-full">
      <div className="max-w-[1204px] mx-auto px-lg py-xl">
        <div className={cn('flex flex-col gap-2xl', hasVertical && '@[1024px]:flex-row')}>
          {main}
          {hasVertical && (
            <div className="w-full @[1024px]:w-[290px] @[1024px]:shrink-0">
              <VerticalSectionRenderer verticalSection={page.verticalSection!} isEditMode={isEditMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
