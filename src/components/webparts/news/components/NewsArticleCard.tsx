'use client';

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FONT_SIZE, NEUTRAL, radiusForStack } from '../News.mozzaik';
import { LikeIcon, FilledLikeIcon, ShareIcon, ViewIcon, PinIcon } from '../News.icons';
import type { NewsCustomContent, NewsItem, NewsRounded } from '../News.types';

interface NewsArticleCardProps {
  article: NewsItem;
  index: number; // index dans content.news (chemin d'édition inline)
  isFirst: boolean;
  rounded: NewsRounded;
  customContent: NewsCustomContent;
  topImageHeight: number;
  sideImage: { width: number; height: number };
  titleSize: string;
  showPin: boolean;
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : p[0]?.slice(0, 2) ?? '').toUpperCase();
};

/**
 * Carte article du layout TopStory — port fidèle de `MzkTopStoryArticle`.
 * - 1er article : vertical (image au-dessus, gap 12) ; autres : horizontal (image à gauche, gap 20).
 * - En-tête : tags (ou titre) + boutons like/partager ; titre sous les tags si tags présents.
 * - Pied : persona (auteur + date) · métriques (vues, j'aime).
 */
export function NewsArticleCard({
  article, index, isFirst, rounded, customContent: cc,
  topImageHeight, sideImage, titleSize, showPin, onArticleClick, onShareClick,
}: NewsArticleCardProps) {
  const radius = radiusForStack(rounded);
  const hasTags = cc.showTags && article.tags.length > 0;
  const chapoMaxLine = isFirst ? 4 : hasTags ? 2 : 4;

  const imageStyle: CSSProperties = {
    borderRadius: radius,
    backgroundImage: `url("${article.imageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: isFirst ? topImageHeight : sideImage.height,
    width: isFirst ? '100%' : sideImage.width,
    minWidth: isFirst ? undefined : sideImage.width,
  };

  const titleEl = (
    <InlineText
      as="div"
      path={['news', index, 'title']}
      value={article.title}
      placeholder="Titre de l'article"
      className="line-clamp-2 [word-break:break-word]"
      style={{ fontSize: titleSize, fontWeight: 700, color: 'var(--sp-theme-dark)' }}
    />
  );

  const tagsEl = hasTags && (
    <div className="flex flex-wrap gap-xs overflow-hidden" style={{ height: 28 }}>
      {article.tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center bg-sp-lighter-alt text-sp-primary uppercase"
          style={{ borderRadius: 5, fontSize: FONT_SIZE.size10, padding: '3px 12px', letterSpacing: '0.08em', height: 23 }}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );

  return (
    <a
      href={article.url}
      onClick={(e) => { if (onArticleClick) { e.preventDefault(); onArticleClick(article.id); } }}
      target="_blank"
      rel="noreferrer"
      className={cn('block no-underline text-inherit', isFirst && 'h-full')}
    >
      <div className={cn('flex', isFirst ? 'flex-col gap-md' : 'flex-row gap-xl')}>
        {/* Image + épingle */}
        <div className="relative shrink-0">
          {article.pinned && showPin && (
            <span
              className="absolute top-2 left-2 z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sp-primary text-white"
              title="Épinglé"
            >
              <PinIcon style={{ width: 12, height: 12 }} />
            </span>
          )}
          <div style={imageStyle} />
        </div>

        {/* Infos */}
        <div className={cn('flex flex-col justify-between w-full min-w-0', isFirst && 'h-full')}>
          <div className="flex flex-col gap-sm">
            <div className="flex items-start justify-between gap-sm">
              <div className="min-w-0">{hasTags ? tagsEl : titleEl}</div>
              <div className="flex items-center gap-xs shrink-0">
                {cc.showLikeButton && (
                  <button
                    type="button" aria-label="J'aime"
                    onClick={(e) => e.preventDefault()}
                    className="w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt"
                  >
                    {article.isLikedByUser ? <FilledLikeIcon style={{ width: 16, height: 16 }} /> : <LikeIcon style={{ width: 16, height: 16 }} />}
                  </button>
                )}
                {cc.showShareButton && (
                  <button
                    type="button" aria-label="Partager"
                    onClick={(e) => { e.preventDefault(); onShareClick?.(article.url); }}
                    className="w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt"
                  >
                    <ShareIcon style={{ width: 15, height: 15 }} />
                  </button>
                )}
              </div>
            </div>
            {hasTags && titleEl}
            {article.chapo.length > 0 && (
              <InlineText
                as="div"
                path={['news', index, 'chapo']}
                value={article.chapo}
                placeholder="Résumé de l'article"
                className="overflow-hidden [word-break:keep-all]"
                style={{
                  fontSize: FONT_SIZE.medium,
                  color: NEUTRAL.secondary,
                  display: '-webkit-box',
                  WebkitLineClamp: chapoMaxLine,
                  WebkitBoxOrient: 'vertical',
                }}
              />
            )}
          </div>

          {/* Pied : persona + métriques */}
          <div className="flex items-center justify-between pt-md">
            {cc.showAuthor && (
              <div className="flex items-center gap-xs min-w-0">
                <span
                  className="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt text-sp-primary"
                  style={{ width: 16, height: 16, fontSize: 8, fontWeight: 600 }}
                >
                  {article.authorAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(article.author)
                  )}
                </span>
                <span className="truncate text-sp-primary" style={{ fontSize: FONT_SIZE.small }}>
                  {article.author}
                </span>
                {cc.showDate && (
                  <>
                    <span className="shrink-0 rounded-full" style={{ width: 3, height: 3, background: NEUTRAL.tertiary }} />
                    <span className="shrink-0" style={{ fontSize: FONT_SIZE.small, color: NEUTRAL.secondary }}>
                      {fmtDate(article.date)}
                    </span>
                  </>
                )}
              </div>
            )}
            {(cc.showViewCount || cc.showLikeCount) && (
              <div className="flex items-center gap-md shrink-0 text-sp-darker">
                {cc.showViewCount && article.viewCount > 0 && (
                  <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>
                    {article.viewCount}
                    <ViewIcon style={{ width: 14, height: 14 }} />
                  </span>
                )}
                {cc.showLikeCount && article.likeCount >= 0 && (
                  <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>
                    {article.likeCount}
                    <LikeIcon style={{ width: 14, height: 13 }} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
