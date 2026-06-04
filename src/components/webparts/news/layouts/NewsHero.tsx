'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { NewsHeroCard } from '../components/NewsHeroCard';
import type { NewsItem, NewsProps } from '../News.types';

/** Position (col/row) d'un article dans une mosaïque. Valeurs portées de NewsGalleryHeroGrid.styles. */
type Cell = { col: string; row: string };
type Grid = { cols: number; cells: Cell[] };

/** Templates mosaïque par nombre d'articles (corrections des spans invalides du source). */
const GRIDS: Record<number, Grid> = {
  1: { cols: 1, cells: [{ col: '1 / 2', row: '1 / 4' }] },
  2: { cols: 2, cells: [{ col: '1 / 2', row: '1 / 3' }, { col: '2 / 3', row: '1 / 3' }] },
  3: { cols: 4, cells: [{ col: '1 / 5', row: '1 / 3' }, { col: '1 / 3', row: '3 / 5' }, { col: '3 / 5', row: '3 / 5' }] },
  4: { cols: 4, cells: [{ col: '1 / 3', row: '1 / 5' }, { col: '3 / 5', row: '1 / 3' }, { col: '3 / 4', row: '3 / 5' }, { col: '4 / 5', row: '3 / 5' }] },
  5: { cols: 6, cells: [{ col: '1 / 3', row: '1 / 5' }, { col: '3 / 5', row: '1 / 5' }, { col: '5 / 7', row: '1 / 3' }, { col: '5 / 6', row: '3 / 5' }, { col: '6 / 7', row: '3 / 5' }] },
  6: { cols: 6, cells: [{ col: '1 / 3', row: '1 / 5' }, { col: '3 / 5', row: '1 / 3' }, { col: '5 / 7', row: '1 / 3' }, { col: '3 / 5', row: '3 / 5' }, { col: '5 / 6', row: '3 / 5' }, { col: '6 / 7', row: '3 / 5' }] },
  7: { cols: 6, cells: [{ col: '1 / 3', row: '1 / 5' }, { col: '3 / 5', row: '1 / 3' }, { col: '5 / 7', row: '1 / 3' }, { col: '3 / 4', row: '3 / 5' }, { col: '4 / 5', row: '3 / 5' }, { col: '5 / 6', row: '3 / 5' }, { col: '6 / 7', row: '3 / 5' }] },
};

/** Variantes "small" (largeur réduite) pour 6 et 7 articles : grille 4 colonnes. */
const GRIDS_SMALL: Record<number, Grid> = {
  6: { cols: 4, cells: [{ col: '1 / 3', row: '1 / 3' }, { col: '3 / 4', row: '1 / 3' }, { col: '4 / 5', row: '1 / 3' }, { col: '1 / 2', row: '3 / 5' }, { col: '2 / 3', row: '3 / 5' }, { col: '3 / 5', row: '3 / 5' }] },
  7: { cols: 4, cells: [{ col: '1 / 3', row: '1 / 3' }, { col: '3 / 4', row: '1 / 3' }, { col: '4 / 5', row: '1 / 3' }, { col: '1 / 2', row: '3 / 5' }, { col: '2 / 3', row: '3 / 5' }, { col: '3 / 4', row: '3 / 5' }, { col: '4 / 5', row: '3 / 5' }] },
};

interface HeroProps {
  articles: NewsItem[];
  config: NewsProps['config'];
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

/**
 * Layout Hero — port fidèle de `NewsGalleryHero` (mosaïque).
 * Affiche jusqu'à 7 articles dans une grille dont le gabarit dépend du nombre d'articles
 * (et de la largeur pour 6/7). Sous 640px : disposition verticale (1 grand + lignes de 2).
 */
export function NewsHero({ articles, config, onArticleClick, onShareClick }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1280);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const items = articles.slice(0, 7);
  const n = items.length;
  const vertical = width < 640;

  const card = (a: NewsItem) => (
    <NewsHeroCard article={a} index={articles.indexOf(a)} config={config} onArticleClick={onArticleClick} onShareClick={onShareClick} />
  );

  if (n === 0) return <div ref={ref} />;

  // Vertical : 1er article pleine largeur, puis lignes de 2.
  if (vertical) {
    const [first, ...rest] = items;
    return (
      <div ref={ref} className="flex flex-col gap-[10px]">
        <div className="min-h-[240px]">{card(first)}</div>
        <div className="grid grid-cols-2 gap-[10px] [grid-auto-rows:minmax(160px,auto)]">
          {rest.map((a) => <div key={a.id}>{card(a)}</div>)}
        </div>
      </div>
    );
  }

  const grid = (n === 6 && width < 1100) || (n === 7 && width < 1200)
    ? GRIDS_SMALL[n]
    : GRIDS[n] ?? GRIDS[7];

  const wrapperStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
    gap: 10,
    gridAutoRows: 'minmax(100px, auto)',
  };

  return (
    <div ref={ref} style={wrapperStyle}>
      {items.map((a, i) => {
        const cell = grid.cells[i];
        return (
          <div key={a.id} style={{ gridColumn: cell.col, gridRow: cell.row }}>
            {card(a)}
          </div>
        );
      })}
    </div>
  );
}
