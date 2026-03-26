import { NewsArticleCard } from '../components/NewsArticleCard';
import type { NewsArticle, NewsFormat, NewsRadius } from '../News.types';

interface NewsTilesProps {
  articles: NewsArticle[];
  format: NewsFormat;
  radius: NewsRadius;
  onArticleClick?: (id: string) => void;
}

/**
 * Tiles verticales layout — all cards in a grid, no featured article.
 * Format 3/3 : 3 equal columns
 * Format 1/2 : first card spans 2 cols, rest in 1 col each
 * Format responsive : container query, 1→2→3 columns
 */
export function NewsTiles({ articles, format, radius, onArticleClick }: NewsTilesProps) {
  if (articles.length === 0) return null;

  if (format === 'responsive') {
    return (
      <div className="@container">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3 gap-2xl">
          {articles.map((article) => (
            <NewsArticleCard
              key={article.id}
              article={article}
              radius={radius}
              onClick={() => onArticleClick?.(article.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (format === '1/2') {
    const [first, ...rest] = articles;
    return (
      <div className="grid grid-cols-3 gap-2xl">
        {first && (
          <div className="col-span-2">
            <NewsArticleCard
              article={first}
              radius={radius}
              onClick={() => onArticleClick?.(first.id)}
            />
          </div>
        )}
        {rest.map((article) => (
          <NewsArticleCard
            key={article.id}
            article={article}
            radius={radius}
            onClick={() => onArticleClick?.(article.id)}
          />
        ))}
      </div>
    );
  }

  // 3/3 — uniform 3-column grid
  return (
    <div className="grid grid-cols-3 gap-2xl">
      {articles.map((article) => (
        <NewsArticleCard
          key={article.id}
          article={article}
          radius={radius}
          onClick={() => onArticleClick?.(article.id)}
        />
      ))}
    </div>
  );
}
