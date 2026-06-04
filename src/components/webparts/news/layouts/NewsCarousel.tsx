'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FONT_SIZE, SHADOW, radiusForStack } from '../News.mozzaik';
import { LikeIcon, ShareIcon, ViewIcon, PinIcon } from '../News.icons';
import type { NewsItem, NewsProps } from '../News.types';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : p[0]?.slice(0, 2) ?? '').toUpperCase();
};

interface CarouselProps {
  articles: NewsItem[];
  config: NewsProps['config'];
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

/**
 * Layout Carousel — port fidèle de `NewsGalleryCarousel` / `CarouselSlideCard`.
 * Image plein cadre (opacité .9) + dégradé bas (themeDarker 70%→0%), contenu superposé
 * en bas (tags, titre sur fond blanc 40%, persona + compteurs), boutons like/partager
 * centrés au survol, flèches + pagination en bas.
 */
export function NewsCarousel({ articles, config, onArticleClick, onShareClick }: CarouselProps) {
  const { rounded, shadow, customContent: cc, showPin } = config;
  const [current, setCurrent] = useState(0);
  const count = articles.length;
  const single = count <= 1;
  const radius = radiusForStack(rounded);

  if (count === 0) return null;
  const go = (d: number) => setCurrent((c) => (c + d + count) % count);

  return (
    <div
      className="relative w-full h-[420px] overflow-hidden"
      style={{ borderRadius: radius, boxShadow: SHADOW[shadow] }}
    >
      {articles.map((a, i) => {
        const idx = articles.indexOf(a);
        return (
          <a
            key={a.id}
            href={a.url}
            onClick={(e) => { if (onArticleClick) { e.preventDefault(); onArticleClick(a.id); } }}
            className="group/slide absolute inset-0 block cursor-pointer"
            style={{ transform: `translateX(${(i - current) * 100}%)`, transition: 'transform 380ms cubic-bezier(0.4,0,0.2,1)' }}
          >
            {/* Image + dégradé */}
            <div className="absolute inset-0" style={{ backgroundImage: `url("${a.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.9 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, color-mix(in srgb, var(--sp-theme-darker) 70%, transparent) 0%, transparent 100%)' }} />

            {/* Épingle */}
            {a.pinned && showPin && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-sp-primary text-white">
                <PinIcon style={{ width: 13, height: 13 }} />
              </span>
            )}

            {/* Boutons like / partager — centrés, apparaissent au survol */}
            <div className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-center gap-[80px] overflow-hidden h-0 group-hover/slide:h-[70px] transition-all duration-500">
              {cc.showShareButton && (
                <button type="button" aria-label="Partager" onClick={(e) => { e.preventDefault(); onShareClick?.(a.url); }}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/90 text-sp-darker hover:bg-white">
                  <ShareIcon style={{ width: 16, height: 16 }} />
                </button>
              )}
              {cc.showLikeButton && (
                <button type="button" aria-label="J'aime" onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/90 text-sp-primary hover:bg-white">
                  <LikeIcon style={{ width: 18, height: 17 }} />
                </button>
              )}
            </div>

            {/* Contenu superposé */}
            <div
              className={cn('absolute left-10 right-10 z-[1] text-white flex flex-col gap-lg transition-all duration-500',
                single ? 'bottom-8 group-hover/slide:bottom-[72px]' : 'bottom-[102px] group-hover/slide:bottom-[142px]')}
            >
              {cc.showTags && a.tags.length > 0 && (
                <div className="flex flex-wrap gap-xs">
                  {a.tags.map((tag) => (
                    <span key={tag.id} className="inline-flex items-center bg-sp-primary text-white uppercase"
                      style={{ borderRadius: 5, padding: '3px 12px', letterSpacing: '0.08em', fontSize: FONT_SIZE.small, opacity: 0.8 }}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              <span className="w-fit max-w-full" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: radius, padding: 10 }}>
                <InlineText as="div" path={['news', idx, 'title']} value={a.title} placeholder="Titre de l'article"
                  className="line-clamp-2 [word-break:break-word]" style={{ fontSize: '28px', lineHeight: 1.3, fontWeight: 700, color: 'var(--sp-theme-darker)' }} />
              </span>
              <div className="flex items-center justify-between">
                {cc.showAuthor && (
                  <span className="flex items-center gap-xs min-w-0">
                    <span className="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white/30 text-white" style={{ width: 20, height: 20, fontSize: 9, fontWeight: 600 }}>
                      {a.authorAvatar ? <img src={a.authorAvatar} alt={a.author} className="w-full h-full object-cover" /> : getInitials(a.author)}
                    </span>
                    <span className="truncate font-semibold" style={{ fontSize: FONT_SIZE.small }}>{a.author}</span>
                    {cc.showDate && <span className="opacity-90" style={{ fontSize: FONT_SIZE.small }}>· {fmtDate(a.date)}</span>}
                  </span>
                )}
                {(cc.showViewCount || cc.showLikeCount) && (
                  <span className="flex items-center gap-[15px] shrink-0">
                    {cc.showViewCount && a.viewCount > 0 && (
                      <span className="inline-flex items-center gap-xs rounded-sm" style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 8px', fontSize: FONT_SIZE.xSmall }}>
                        {a.viewCount}<ViewIcon style={{ width: 14, height: 14 }} />
                      </span>
                    )}
                    {cc.showLikeCount && a.likeCount >= 0 && (
                      <span className="inline-flex items-center gap-xs rounded-sm" style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 8px', fontSize: FONT_SIZE.xSmall }}>
                        {a.likeCount}<LikeIcon style={{ width: 14, height: 13 }} />
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </a>
        );
      })}

      {/* Contrôles */}
      {!single && (
        <div className="absolute bottom-8 left-10 right-10 z-20 flex items-center justify-between" onClick={(e) => e.preventDefault()}>
          <button type="button" aria-label="Précédent" onClick={() => go(-1)} className="w-12 h-9 flex items-center justify-center bg-[#f3f2f1]">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex items-center gap-xs">
            {articles.map((_, i) => (
              <span key={i} className={cn('rounded-full', i === current ? 'w-2 h-2 bg-white' : 'w-[5px] h-[5px] bg-white/50')} />
            ))}
          </div>
          <button type="button" aria-label="Suivant" onClick={() => go(1)} className="w-12 h-9 flex items-center justify-center bg-[#f3f2f1]">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
