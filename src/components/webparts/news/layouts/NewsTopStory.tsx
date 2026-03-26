import { NewsArticleCard } from '../components/NewsArticleCard';
import { NewsArticleItem } from '../components/NewsArticleItem';
import type { NewsArticle, NewsFormat, NewsRadius } from '../News.types';

interface NewsTopStoryProps {
  articles: NewsArticle[];
  format: NewsFormat;
  radius: NewsRadius;
  onArticleClick?: (id: string) => void;
}

/**
 * Top Story layout — featured card left, vertical list right.
 * Format 3/3 : 3 equal columns (featured takes 2, list takes 1)
 * Format 1/2 : featured large left, 2 items stacked right
 * Format responsive : container query, stacks to single column on narrow containers
 */
export function NewsTopStory({ articles, format, radius, onArticleClick }: NewsTopStoryProps) {
  const [featured, ...rest] = articles;

  if (!featured) return null;

  const sideItems = rest.slice(0, format === '1/2' ? 2 : 3);

  if (format === 'responsive') {
    return (
      <div className="@container">
        <div className="flex flex-col @2xl:flex-row gap-2xl">
          <div className="@2xl:flex-[2]">
            <NewsArticleCard
              article={featured}
              radius={radius}
              onClick={() => onArticleClick?.(featured.id)}
            />
          </div>
          {sideItems.length > 0 && (
            <div className="flex flex-col gap-2xl @2xl:flex-1">
              {sideItems.map((article) => (
                <NewsArticleItem
                  key={article.id}
                  article={article}
                  radius={radius}
                  onClick={() => onArticleClick?.(article.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (format === '1/2') {
    return (
      <div className="grid grid-cols-3 gap-2xl">
        <div className="col-span-2">
          <NewsArticleCard
            article={featured}
            radius={radius}
            onClick={() => onArticleClick?.(featured.id)}
          />
        </div>
        {sideItems.length > 0 && (
          <div className="flex flex-col gap-2xl">
            {sideItems.map((article) => (
              <NewsArticleItem
                key={article.id}
                article={article}
                radius={radius}
                onClick={() => onArticleClick?.(article.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // 3/3 — 3 equal columns, featured spans 2
  return (
    <div className="grid grid-cols-3 gap-2xl">
      <div className="col-span-2">
        <NewsArticleCard
          article={featured}
          radius={radius}
          onClick={() => onArticleClick?.(featured.id)}
        />
      </div>
      {sideItems.length > 0 && (
        <div className="flex flex-col gap-2xl">
          {sideItems.map((article) => (
            <NewsArticleItem
              key={article.id}
              article={article}
              radius={radius}
              onClick={() => onArticleClick?.(article.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
