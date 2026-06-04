'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FONT_SIZE, NEUTRAL, SHADOW, radiusForStack } from '../News.mozzaik';
import { LikeIcon, FilledLikeIcon, ShareIcon, ViewIcon, PinIcon } from '../News.icons';
import type { NewsItem, NewsProps } from '../News.types';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : p[0]?.slice(0, 2) ?? '').toUpperCase();
};

interface FeedProps {
  articles: NewsItem[];
  config: NewsProps['config'];
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

/**
 * Layout Feed — port fidèle de `MzkFeedArticle`.
 * Cartes horizontales (image 264 à gauche, contenu à droite, hauteur 230) : 50% en
 * large (2 par ligne), 100% sinon ; repli vertical (image en haut h144) en étroit.
 * Contenu : tags + titre + like/partager, chapo, persona + métriques.
 */
export function NewsFeed({ articles, config, onArticleClick, onShareClick }: FeedProps) {
  const { rounded, shadow, customContent: cc, showPin } = config;
  const radius = radiusForStack(rounded);

  return (
    <div className="@container">
      <div className="flex flex-wrap gap-xl">
        {articles.map((a) => {
          const idx = articles.indexOf(a);
          const chapoLines = !cc.showTags || a.tags.length === 0 ? 4 : 2;
          return (
            <a
              key={a.id}
              href={a.url}
              onClick={(e) => { if (onArticleClick) { e.preventDefault(); onArticleClick(a.id); } }}
              className="block no-underline text-inherit w-full @[1024px]:w-[calc(50%-12px)]"
              style={{ boxShadow: SHADOW[shadow], borderRadius: radius }}
            >
              <div className="flex flex-col @[640px]:flex-row overflow-hidden @[640px]:min-h-[230px]" style={{ borderRadius: radius }}>
                {/* Image */}
                <div className="relative shrink-0">
                  <div
                    className="@[640px]:w-[264px] @[640px]:h-full h-[144px] w-full"
                    style={{ backgroundImage: `url("${a.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                  {a.pinned && showPin && (
                    <span className="absolute top-2 left-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sp-primary text-white">
                      <PinIcon style={{ width: 12, height: 12 }} />
                    </span>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex flex-col justify-between grow p-md bg-white min-w-0">
                  <div className="flex flex-col gap-sm">
                    <div className="flex items-start justify-between gap-sm">
                      {cc.showTags && a.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-xs overflow-hidden" style={{ height: 28 }}>
                          {a.tags.map((tag) => (
                            <span key={tag.id} className="inline-flex items-center bg-sp-lighter-alt text-sp-primary uppercase"
                              style={{ borderRadius: 5, fontSize: FONT_SIZE.size10, padding: '3px 12px', letterSpacing: '0.08em', height: 23 }}>
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      ) : <span />}
                      <div className="flex items-center gap-md shrink-0">
                        {cc.showLikeButton && (
                          <button type="button" aria-label="J'aime" onClick={(e) => e.preventDefault()}
                            className="w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt">
                            {a.isLikedByUser ? <FilledLikeIcon style={{ width: 16, height: 16 }} /> : <LikeIcon style={{ width: 16, height: 16 }} />}
                          </button>
                        )}
                        {cc.showShareButton && (
                          <button type="button" aria-label="Partager" onClick={(e) => { e.preventDefault(); onShareClick?.(a.url); }}
                            className="w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt">
                            <ShareIcon style={{ width: 15, height: 15 }} />
                          </button>
                        )}
                      </div>
                    </div>
                    <InlineText as="div" path={['news', idx, 'title']} value={a.title} placeholder="Titre de l'article"
                      className="line-clamp-2 [word-break:break-word]" style={{ fontSize: FONT_SIZE.size20, fontWeight: 700, color: 'var(--sp-theme-dark)' }} />
                    {a.chapo.length > 0 && (
                      <InlineText as="div" path={['news', idx, 'chapo']} value={a.chapo} placeholder="Résumé"
                        className="overflow-hidden [word-break:keep-all]"
                        style={{ fontSize: FONT_SIZE.medium, color: NEUTRAL.secondary, display: '-webkit-box', WebkitLineClamp: chapoLines, WebkitBoxOrient: 'vertical' }} />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-sm">
                    {cc.showAuthor && (
                      <span className="flex items-center gap-xs min-w-0">
                        <span className="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt text-sp-primary" style={{ width: 24, height: 24, fontSize: 10, fontWeight: 600 }}>
                          {a.authorAvatar ? <img src={a.authorAvatar} alt={a.author} className="w-full h-full object-cover" /> : getInitials(a.author)}
                        </span>
                        <span className="flex flex-col min-w-0 leading-tight">
                          <span className="truncate text-sp-darker" style={{ fontSize: FONT_SIZE.small }}>{a.author}</span>
                          {cc.showDate && a.date && <span className="truncate" style={{ fontSize: FONT_SIZE.small, color: NEUTRAL.secondary }}>{fmtDate(a.date)}</span>}
                        </span>
                      </span>
                    )}
                    {(cc.showViewCount || cc.showLikeCount) && (
                      <span className="flex items-center gap-md shrink-0 text-sp-darker">
                        {cc.showViewCount && a.viewCount > 0 && (
                          <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>{a.viewCount}<ViewIcon style={{ width: 14, height: 14 }} /></span>
                        )}
                        {cc.showLikeCount && a.likeCount >= 0 && (
                          <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>{a.likeCount}<LikeIcon style={{ width: 14, height: 13 }} /></span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
