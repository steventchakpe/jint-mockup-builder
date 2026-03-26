import { NewsActionButtons } from './NewsActionButtons';
import { NewsAuthorMeta } from './NewsAuthorMeta';
import type { NewsArticle, NewsRadius } from '../News.types';

const radiusClass: Record<NewsRadius, string> = {
  default: 'rounded-xl',
  normal:  'rounded-lg',
  large:   'rounded-md',
  none:    'rounded-none',
};

interface NewsArticleCardProps {
  article: NewsArticle;
  radius: NewsRadius;
  onClick?: () => void;
}

/**
 * Carte article verticale — image en haut, contenu en bas.
 * Fidèle au composant Figma "Top story - Items" (variant featured, VERTICAL).
 * Utilisé pour : featured Top Story, Hero, Tiles, Carousel.
 */
export function NewsArticleCard({ article, radius, onClick }: NewsArticleCardProps) {
  const r = radiusClass[radius];

  return (
    <article
      className={`group flex flex-col overflow-hidden bg-white cursor-pointer ${r}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className={`relative overflow-hidden shrink-0 aspect-[8/5] ${r}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-[8px] pt-[12px]">
        {/* Titre + boutons d'action */}
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
