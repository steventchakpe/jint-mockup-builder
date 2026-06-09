'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { radiusForStack } from './News.mozzaik';
import { NewsTopStory } from './layouts/NewsTopStory';
import { NewsCarousel } from './layouts/NewsCarousel';
import { NewsVerticalTiles } from './layouts/NewsVerticalTiles';
import { NewsFeed } from './layouts/NewsFeed';
import { NewsHero } from './layouts/NewsHero';
import { useDemoStrings } from '@/lib/i18n';
import type { NewsProps } from './News.types';

/**
 * Webpart News (News Gallery) — réplique jintan. Dispatcher de layouts.
 * Le contenu (articles) arrive en props, pas de fetch. `newsAmount` borne l'affichage.
 * Layouts portés progressivement : TopStory (✓), Hero/Carousel/VerticalTiles/Feed (à venir).
 */
export function News({ config, content, isEditMode = false, onArticleClick, onShareClick }: NewsProps) {
  const { layout, newsAmount, title, subscriptionButton, rounded } = config;
  const tw = useDemoStrings().webparts;
  const articles = content.news.slice(0, newsAmount);

  const handleClick = (id: string) => {
    if (isEditMode) return;
    onArticleClick?.(id);
  };

  const titleEl = (title || isEditMode) && (
    <InlineText
      as="h2"
      target="config"
      path={['title']}
      value={title}
      placeholder="Titre de la section"
      className="text-heading-sm font-semibold text-sp-darker"
    />
  );

  return (
    <section className="flex flex-col gap-xl p-md w-full">
      {/* Mode Mes abonnements (MyFeed) : titre + bouton « Choisir mes abonnements ». */}
      {subscriptionButton?.show ? (
        <div className="flex items-center justify-between gap-md">
          {titleEl ?? <span />}
          {/* StandardButton type=Primary (jintan) : plein, h32, hover themeTertiary, active themeDark.
              Radius LIÉ au radius du webpart (rounded → radiusForStack), comme jintan. */}
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="shrink-0 inline-flex items-center justify-center px-md text-white bg-sp-primary hover:bg-sp-tertiary active:bg-sp-dark transition-colors"
            style={{ height: 32, borderRadius: radiusForStack(rounded), fontSize: 14, fontWeight: 400, border: 'none' }}
          >
            <InlineText
              as="span"
              target="config"
              path={['subscriptionButton', 'text']}
              value={subscriptionButton.text}
              placeholder="Choisir mes abonnements"
            />
          </button>
        </div>
      ) : (
        titleEl
      )}

      {articles.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">{tw.noNews}</p>
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
