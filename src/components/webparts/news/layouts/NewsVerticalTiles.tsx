'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FONT_SIZE, NEUTRAL, SHADOW, radiusForStack } from '../News.mozzaik';
import { LikeIcon, ShareIcon, ViewIcon, PinIcon } from '../News.icons';
import type { NewsItem, NewsProps } from '../News.types';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : p[0]?.slice(0, 2) ?? '').toUpperCase();
};

interface VerticalTilesProps {
  articles: NewsItem[];
  config: NewsProps['config'];
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

/**
 * Layout VerticalTiles — port fidèle de `VerticalTile`.
 * Grille de tuiles : image (h144, radius haut) + contenu (bg blanc, bordure, radius bas,
 * padding 16) → tags + like/partager, titre 20/700 (2 lignes), persona + métriques.
 */
export function NewsVerticalTiles({ articles, config, onArticleClick, onShareClick }: VerticalTilesProps) {
  const { rounded, shadow, customContent: cc, showPin } = config;
  const radius = radiusForStack(rounded);

  return (
    <div className="grid gap-xl" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(264px, 1fr))' }}>
      {articles.map((a) => {
        const idx = articles.indexOf(a);
        const imageStyle: CSSProperties = {
          height: 144,
          borderRadius: `${radius}px ${radius}px 0 0`,
          backgroundImage: `url("${a.imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
        return (
          <a
            key={a.id}
            href={a.url}
            onClick={(e) => { if (onArticleClick) { e.preventDefault(); onArticleClick(a.id); } }}
            className="block no-underline text-inherit"
            style={{ boxShadow: SHADOW[shadow], borderRadius: radius }}
          >
            <div className="relative">
              <div style={imageStyle} />
              {a.pinned && showPin && (
                <span className="absolute top-2 left-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-sp-primary text-white">
                  <PinIcon style={{ width: 12, height: 12 }} />
                </span>
              )}
            </div>

            <div
              className="flex flex-col justify-between p-md"
              style={{
                background: '#ffffff',
                border: `1px solid ${NEUTRAL.lighter}`,
                borderRadius: `0 0 ${radius}px ${radius}px`,
                minHeight: 184,
              }}
            >
              <div className="flex flex-col gap-[9px]">
                <div className="flex items-start justify-between gap-sm">
                  {cc.showTags && a.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-xs overflow-hidden" style={{ height: 28 }}>
                      {a.tags.map((tag) => (
                        <span key={tag.id} className="inline-flex items-center bg-sp-lighter-alt text-sp-primary uppercase"
                          style={{ borderRadius: 5, fontSize: FONT_SIZE.size10, lineHeight: 1.4, padding: '3px 12px', letterSpacing: '0.08em' }}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  ) : <span />}
                  <div className="flex items-center gap-sm shrink-0">
                    {cc.showLikeButton && (
                      <button type="button" aria-label="J'aime" onClick={(e) => e.preventDefault()}
                        className="w-7 h-7 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt">
                        <LikeIcon style={{ width: 16, height: 16 }} />
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
                  className="[word-break:break-word] overflow-hidden"
                  style={{ fontSize: FONT_SIZE.size20, fontWeight: 700, color: 'var(--sp-theme-dark)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 8 }} />
              </div>

              <div className="flex items-center justify-between">
                {cc.showAuthor && (
                  <span className="flex items-center gap-xs min-w-0">
                    <span className="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt text-sp-primary" style={{ width: 16, height: 16, fontSize: 8, fontWeight: 600 }}>
                      {a.authorAvatar ? <img src={a.authorAvatar} alt={a.author} className="w-full h-full object-cover" /> : getInitials(a.author)}
                    </span>
                    <span className="truncate text-sp-darker" style={{ fontSize: FONT_SIZE.small }}>{a.author}</span>
                    {cc.showDate && a.date && <span className="shrink-0" style={{ fontSize: FONT_SIZE.small, color: NEUTRAL.secondary }}>· {fmtDate(a.date)}</span>}
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
          </a>
        );
      })}
    </div>
  );
}
