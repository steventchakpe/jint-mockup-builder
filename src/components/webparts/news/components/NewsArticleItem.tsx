import { NewsActionButtons } from './NewsActionButtons';
import { NewsAuthorMeta } from './NewsAuthorMeta';
import type { NewsArticle, NewsRadius } from '../News.types';

const radiusClass: Record<NewsRadius, string> = {
  default: 'rounded-xl',
  normal:  'rounded-lg',
  large:   'rounded-md',
  none:    'rounded-none',
};

interface NewsArticleItemProps {
  article: NewsArticle;
  radius: NewsRadius;
  onClick?: () => void;
}

/**
 * Item article horizontal — thumbnail carré gauche, contenu droite.
 * Fidèle au composant Figma "Top story - Items" (variant side, HORIZONTAL).
 * Thumbnail : 150×150 (w-36 h-36), gap 20px avec le contenu.
 * Contenu : SPACE_BETWEEN vertical (titre haut, auteur bas).
 */
export function NewsArticleItem({ article, radius, onClick }: NewsArticleItemProps) {
  const r = radiusClass[radius];

  return (
    <article
      className={`group flex gap-[20px] cursor-pointer overflow-hidden ${r}`}
      onClick={onClick}
    >
      {/* Thumbnail carré 150×150 */}
      <div className={`w-36 h-36 shrink-0 overflow-hidden ${r}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenu — SPACE_BETWEEN vertical */}
      <div className="flex flex-col justify-between flex-1 h-36 min-w-0">
        {/* Titre + boutons */}
        <div className="flex items-start gap-[30px]">
          <h3 className="flex-1 text-heading font-normal text-sp-darker leading-snug line-clamp-2">
            {article.title}
          </h3>
          <NewsActionButtons />
        </div>

        {/* Auteur + date + stats */}
        <NewsAuthorMeta
          author={article.author}
          publishedAt={article.publishedAt}
          engagement={article.engagement}
        />
      </div>
    </article>
  );
}
