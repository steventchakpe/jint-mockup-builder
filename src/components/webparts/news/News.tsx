'use client';

import type { NewsProps } from './News.types';
import { NewsTopStory } from './layouts/NewsTopStory';
import { NewsHero } from './layouts/NewsHero';
import { NewsTiles } from './layouts/NewsTiles';
import { NewsCarousel } from './layouts/NewsCarousel';

export function News({ config, content, isEditMode = false, onArticleClick }: NewsProps) {
  const { layout, format, radius, title, maxItems = 4 } = config;
  const articles = content.articles.slice(0, maxItems);

  const handleClick = (articleId: string) => {
    if (isEditMode) return;
    onArticleClick?.(articleId);
  };

  const layoutProps = { articles, format, radius, onArticleClick: handleClick };

  return (
    <section className="flex flex-col gap-2xl p-md">
      {title && (
        <h2 className="text-heading font-semibold text-sp-darker">{title}</h2>
      )}

      {layout === 'top-story' && <NewsTopStory {...layoutProps} />}
      {layout === 'hero' && <NewsHero {...layoutProps} />}
      {layout === 'tiles-verticales' && <NewsTiles {...layoutProps} />}
      {layout === 'carousel' && <NewsCarousel {...layoutProps} />}
    </section>
  );
}
