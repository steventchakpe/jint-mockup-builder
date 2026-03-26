import { NewsArticleCard } from '../components/NewsArticleCard';
import type { NewsArticle, NewsFormat, NewsRadius } from '../News.types';

interface NewsHeroProps {
  articles: NewsArticle[];
  format: NewsFormat;
  radius: NewsRadius;
  onArticleClick?: (id: string) => void;
}

/**
 * Hero layout — full-width featured article + secondary cards below.
 * Format 3/3 : hero full-width + 3 equal columns below
 * Format 1/2 : hero full-width + 1 large + 2 small below
 * Format responsive : hero + stacking columns
 */
export function NewsHero({ articles, format, radius, onArticleClick }: NewsHeroProps) {
  const [hero, ...rest] = articles;

  if (!hero) return null;

  const secondaryItems = rest.slice(0, 3);

  const secondaryGrid =
    format === '3/3'
      ? 'grid-cols-3'
      : format === '1/2'
      ? 'grid-cols-3'
      : 'grid-cols-1 @xl:grid-cols-3';

  return (
    <div className={format === 'responsive' ? '@container' : undefined}>
      <div className="flex flex-col gap-2xl">
        {/* Hero — full width */}
        <NewsArticleCard
          article={hero}
          radius={radius}
          onClick={() => onArticleClick?.(hero.id)}
        />

        {/* Secondary row */}
        {secondaryItems.length > 0 && (
          <div className={`grid ${secondaryGrid} gap-2xl`}>
            {format === '1/2' ? (
              <>
                {secondaryItems[0] && (
                  <div className="col-span-2">
                    <NewsArticleCard
                      article={secondaryItems[0]}
                      radius={radius}
                      onClick={() => onArticleClick?.(secondaryItems[0].id)}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2xl">
                  {secondaryItems.slice(1).map((article) => (
                    <NewsArticleCard
                      key={article.id}
                      article={article}
                      radius={radius}
                      onClick={() => onArticleClick?.(article.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              secondaryItems.map((article) => (
                <NewsArticleCard
                  key={article.id}
                  article={article}
                  radius={radius}
                  onClick={() => onArticleClick?.(article.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
