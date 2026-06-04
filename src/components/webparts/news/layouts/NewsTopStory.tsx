'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { TOPSTORY } from '../News.mozzaik';
import { NewsArticleCard } from '../components/NewsArticleCard';
import type { NewsItem, NewsProps } from '../News.types';

/** Répartition jintan (getTopStoryNewsArrays) : 0 = top · 1-3 = side · 4+ = bottom. */
function splitNews(news: NewsItem[]) {
  return {
    top: news[0],
    side: news.slice(1, 4),
    bottom: news.slice(4),
  };
}

/**
 * Layout TopStory — port fidèle de `TopStory` (jintan).
 * Disposition Full (≥1024px) = horizontal (top 50% / side 50%, bottom en 2 colonnes) ;
 * sinon vertical (top puis side/bottom empilés). Tailles d'image/police selon la disposition.
 */
export function NewsTopStory({ articles, config, isFirstIndex = 0, onArticleClick, onShareClick }: TopStoryLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFull, setIsFull] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setIsFull(el.clientWidth >= 1024));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const props = isFull ? TOPSTORY.full : TOPSTORY.compact;
  const { top, side, bottom } = splitNews(articles);
  const idxOf = (a: NewsItem) => articles.indexOf(a) + isFirstIndex;

  const card = (a: NewsItem, isFirst: boolean, titleSize: string) => (
    <NewsArticleCard
      article={a}
      index={idxOf(a)}
      isFirst={isFirst}
      rounded={config.rounded}
      customContent={config.customContent}
      topImageHeight={props.topImageHeight}
      sideImage={props.sideImage}
      titleSize={titleSize}
      showPin={config.showPin}
      onArticleClick={onArticleClick}
      onShareClick={onShareClick}
    />
  );

  return (
    <div ref={ref} className="@container">
      <div className="flex flex-col gap-2xl @[1024px]:flex-row @[1024px]:gap-0">
        {top && <div className="@[1024px]:w-1/2 @[1024px]:p-3">{card(top, true, props.topFont)}</div>}
        {side.length > 0 && (
          <div className="flex flex-col gap-xl @[1024px]:w-1/2 @[1024px]:p-3">
            {side.map((a) => (
              <div key={a.id}>{card(a, false, props.sideFont)}</div>
            ))}
            {/* En vertical, le bottom s'empile sous le side (en horizontal, il passe en ligne dédiée). */}
            {!isFull && bottom.map((a) => <div key={a.id}>{card(a, false, props.sideFont)}</div>)}
          </div>
        )}
      </div>

      {isFull && bottom.length > 0 && (
        <div className="flex flex-wrap">
          {bottom.map((a) => (
            <div key={a.id} className="w-1/2 p-3">
              {card(a, false, props.sideFont)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface TopStoryLayoutProps {
  articles: NewsItem[];
  config: NewsProps['config'];
  /** Décalage d'index si la liste affichée est tronquée (édition inline). */
  isFirstIndex?: number;
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}
