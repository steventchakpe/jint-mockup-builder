'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { NewsTopStory } from './layouts/NewsTopStory';
import { NewsCarousel } from './layouts/NewsCarousel';
import { NewsVerticalTiles } from './layouts/NewsVerticalTiles';
import { NewsFeed } from './layouts/NewsFeed';
import { NewsHero } from './layouts/NewsHero';
import type { NewsProps } from './News.types';

/**
 * Webpart News (News Gallery) — réplique jintan. Dispatcher de layouts.
 * Le contenu (articles) arrive en props, pas de fetch. `newsAmount` borne l'affichage.
 * Layouts portés progressivement : TopStory (✓), Hero/Carousel/VerticalTiles/Feed (à venir).
 */
export function News({ config, content, isEditMode = false, onArticleClick, onShareClick }: NewsProps) {
  const { layout, newsAmount, title } = config;
  const articles = content.news.slice(0, newsAmount);

  const handleClick = (id: string) => {
    if (isEditMode) return;
    onArticleClick?.(id);
  };

  return (
    <section className="flex flex-col gap-xl p-md w-full">
      {(title || isEditMode) && (
        <InlineText
          as="h2"
          target="config"
          path={['title']}
          value={title}
          placeholder="Titre de la section"
          className="text-heading-sm font-semibold text-sp-darker"
        />
      )}

      {articles.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">Aucune actualité à afficher.</p>
      ) : (
        <>
          {layout === 'topStory' && <NewsTopStory articles={articles} config={config} onArticleClick={handleClick} onShareClick={onShareClick} />}
          {layout === 'carousel' && <NewsCarousel articles={articles} config={config} onArticleClick={handleClick} onShareClick={onShareClick} />}
          {layout === 'verticalTiles' && <NewsVerticalTiles articles={articles} config={config} onArticleClick={handleClick} onShareClick={onShareClick} />}
          {layout === 'feed' && <NewsFeed articles={articles} config={config} onArticleClick={handleClick} onShareClick={onShareClick} />}
          {layout === 'hero' && <NewsHero articles={articles} config={config} onArticleClick={handleClick} onShareClick={onShareClick} />}
        </>
      )}
    </section>
  );
}
