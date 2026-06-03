'use client';

import type { CSSProperties } from 'react';
import { WebpartHost } from './WebpartHost';
import type { WebpartInstance } from '@/types/project';

interface FlexibleSectionRendererProps {
  /** Webparts de la section flexible (chacun positionné via `flex`). */
  webparts: WebpartInstance[];
  isEditMode?: boolean;
}

/**
 * Section Flexible — réplique la feature native SharePoint (2024).
 * Source : https://techcommunity.microsoft.com/blog/spblog/introducing-flexible-sections-in-sharepoint-pages-and-news/4170031
 *
 * Grille 12 colonnes en 2D : chaque webpart est placé librement
 * (`flex.x` colonne de départ, `flex.w` largeur, `flex.y` ligne, `flex.z` chevauchement).
 * - Desktop (≥ 640px) : grille 12 colonnes, placement absolu dans la grille, overlap via z-index.
 * - Mobile (< 640px) : repli en 1 colonne (priorité par `order`).
 *
 * Le redimensionnement (4 largeurs pour les cards, libre sinon) et le drag/snap
 * sont des comportements d'ÉDITION ; ici on rend la position stockée dans le state.
 */
export function FlexibleSectionRenderer({ webparts, isEditMode = false }: FlexibleSectionRendererProps) {
  const ordered = [...webparts].sort((a, b) => a.order - b.order);

  return (
    <div
      data-testid="flexible-section"
      className="
        flex flex-col gap-md
        @[640px]:grid @[640px]:grid-cols-12 @[640px]:gap-x-[24px] @[640px]:gap-y-md
        @[640px]:[grid-auto-rows:minmax(0,auto)]
      "
    >
      {ordered.map((wp) => {
        const f = wp.flex;
        // Desktop : position dans la grille 12 col. Mobile : flux normal (1 col).
        const style: CSSProperties | undefined = f
          ? ({
              ['--col-start' as string]: f.x + 1,
              ['--col-span' as string]: f.w,
              ['--row-start' as string]: f.y,
              zIndex: f.z,
            } as CSSProperties)
          : undefined;

        return (
          <div
            key={wp.id}
            style={style}
            className={
              f
                ? '@[640px]:[grid-column:var(--col-start)/span_var(--col-span)] @[640px]:[grid-row-start:var(--row-start)]'
                : undefined
            }
          >
            <WebpartHost instance={wp} isEditMode={isEditMode} />
          </div>
        );
      })}
    </div>
  );
}
