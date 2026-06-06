'use client';

'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { DocCard } from './components/DocCard';
import {
  FONT_SIZE,
  GRID_GAP,
  HEADER_HEIGHT,
  ROWS_BREAKPOINTS,
  SHADOW,
} from './Docs.mozzaik';
import { useDemoStrings } from '@/lib/i18n';
import type { DocsProps } from './Docs.types';

/** getGridTemplateRowsByHeight — port fidèle (mozzaik-ui Grid). */
function rowsForHeight(height: number): number {
  for (let i = ROWS_BREAKPOINTS.length; i >= 1; i--) {
    if (height >= ROWS_BREAKPOINTS[i - 1]) return i + 1;
  }
  return 1;
}

/**
 * Webpart Docs — port fidèle de `MyFilesCardLayout` (@mozzaik365/components/my-files).
 *
 * BaseLayout : header (titre PaneHeader 20 semibold, 48px) + zone hauteur fixe ;
 * padding optionnel (ombre/radius conteneur seulement si padding, trimPaddingBottom).
 * Grille GridCarousel : colonnes via container queries (breakpoints 480/768/1024
 * → 1/2/3/4 colonnes), lignes calculées depuis la hauteur (283/464/698), gap 8.
 */
export function Docs({ config, content, isEditMode = false, onFileClick }: DocsProps) {
  const { title, height, padding, radius, shadow } = config;
  const tw = useDemoStrings().webparts;
  const files = content.files;

  // BaseLayout container — boxShadow/borderRadius seulement si padding (fidèle)
  const containerStyle: CSSProperties = {
    paddingLeft: padding || undefined,
    paddingRight: padding || undefined,
    paddingTop: title || isEditMode ? 0 : padding || undefined,
    paddingBottom: padding ? padding / 2 : undefined, // trimPaddingBottom
    boxShadow: padding ? SHADOW[shadow] : undefined,
    borderRadius: padding ? radius : undefined,
  };

  const rows = rowsForHeight(height);

  return (
    <section className="flex flex-col bg-white" style={containerStyle}>
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: HEADER_HEIGHT, padding: '0 8px 0 0' }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.PaneHeader }}
          />
        </div>
      )}

      <div className="@container" style={{ height }}>
        {files.length === 0 ? (
          <p className="text-body text-gray-500 py-xl text-center">{tw.noFiles}</p>
        ) : (
          <div
            className="grid h-full grid-cols-1 @[480px]:grid-cols-2 @[768px]:grid-cols-3 @[1024px]:grid-cols-4"
            style={{ gap: GRID_GAP, gridTemplateRows: `repeat(${rows}, 1fr)` }}
          >
            {files.map((file, i) => (
              <DocCard key={file.id} file={file} index={i} isEditMode={isEditMode} onFileClick={onFileClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
