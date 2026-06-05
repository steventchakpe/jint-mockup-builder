'use client';

import { useMemo } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useElementSize } from '@/components/webparts/focus/hooks/useElementSize';
import { PostCard } from './components/PostCard';
import {
  CARD_CONTAINER_GAP,
  CARD_CONTAINER_PADDING,
  COLUMNS_BREAKPOINTS,
  COLUMN_CONTAINER_PADDING,
  FADING_SIZE,
  FONT_SIZE,
  LAYOUT_TITLE_HEIGHT,
} from './Newshub.mozzaik';
import type { NewshubProps } from './Newshub.types';

/** Port de useDisposition + DISPOSITION_TO_COLUMNS_COUNT. */
function columnsForWidth(width: number): number {
  if (width >= COLUMNS_BREAKPOINTS.full) return 4;
  if (width >= COLUMNS_BREAKPOINTS.twoThird) return 3;
  if (width >= COLUMNS_BREAKPOINTS.half) return 2;
  return 1;
}

/**
 * Webpart Newshub — port fidèle de `MasonryColumns` (@mozzaik365/components/news-hub).
 *
 * Masonry séquentiel 1-4 colonnes selon la largeur (586/792/1204), gutter 16,
 * conteneur scrollable à hauteur fixe avec fondu bas 55px + bouton « Voir plus ».
 */
export function Newshub({ config, content, isEditMode = false, locale = 'fr-FR' }: NewshubProps) {
  const { title, height, maximumItems, showMoreResults } = config;
  const { ref, size } = useElementSize<HTMLDivElement>();
  const columns = columnsForWidth(size.width);

  const posts = content.posts.slice(0, maximumItems);
  // Distribution séquentielle (Masonry sequential) : poste i → colonne i % N
  const columnsContent = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [] as typeof posts);
    posts.forEach((p, i) => cols[i % columns].push(p));
    return cols;
  }, [posts, columns]);

  return (
    <section className="flex flex-col" ref={ref}>
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: LAYOUT_TITLE_HEIGHT, padding: '0 8px 0 0' }}>
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

      <div className="relative overflow-hidden" style={{ height }}>
        <div className="h-full overflow-y-auto" style={{ padding: CARD_CONTAINER_PADDING }}>
          <div className="flex" style={{ gap: CARD_CONTAINER_GAP, padding: COLUMN_CONTAINER_PADDING }}>
            {columnsContent.map((col, c) => (
              <div key={c} className="flex flex-col grow min-w-0" style={{ gap: CARD_CONTAINER_GAP, flexBasis: 0 }}>
                {col.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={content.posts.indexOf(post)}
                    config={config}
                    isEditMode={isEditMode}
                    locale={locale}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Fondu bas + Voir plus */}
        {showMoreResults && (
          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-center"
            style={{ height: FADING_SIZE, background: 'linear-gradient(360deg, #ffffff 0%, rgba(255,255,255,0.01) 100%)', zIndex: 1 }}
          >
            <button
              type="button"
              className="h-8 px-md bg-white border border-[#8a8886] rounded-sm text-[#323130] font-semibold hover:bg-sp-lighter-alt transition-colors"
              style={{ fontSize: FONT_SIZE.BodyText, borderRadius: 8 }}
            >
              Voir plus de résultats
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
