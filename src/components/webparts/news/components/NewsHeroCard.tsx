'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FONT_SIZE, SHADOW, radiusForStack } from '../News.mozzaik';
import { LikeIcon, FilledLikeIcon, ThumbLikeIcon, ShareIcon, ViewIcon, PinIcon } from '../News.icons';
import type { NewsItem, NewsProps } from '../News.types';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
const getInitials = (name: string) => {
  const p = name.trim().split(' ').filter(Boolean);
  return (p.length >= 2 ? p[0][0] + p[p.length - 1][0] : p[0]?.slice(0, 2) ?? '').toUpperCase();
};

interface HeroCardProps {
  article: NewsItem;
  index: number;
  config: NewsProps['config'];
  onArticleClick?: (id: string) => void;
  onShareClick?: (url: string) => void;
}

/**
 * Carte Hero — port fidèle de `NewsGalleryHeroCard`.
 * Tuile image plein cadre + masque dégradé bas + contenu superposé (tags, titre blanc,
 * persona + métriques). Boutons like/partager au survol. Remplit sa cellule de grille.
 */
export function NewsHeroCard({ article: a, index, config, onArticleClick, onShareClick }: HeroCardProps) {
  const { rounded, shadow, customContent: cc, showPin } = config;
  const radius = radiusForStack(rounded);

  // jintan: showAuthor = !isSmall && customContent.showAuthor (isSmall = carte < 380px).
  const ref = useRef<HTMLAnchorElement>(null);
  const [isSmall, setIsSmall] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setIsSmall(el.clientWidth < 380));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const showAuthor = !isSmall && cc.showAuthor;

  return (
    <a
      ref={ref}
      href={a.url}
      onClick={(e) => { if (onArticleClick) { e.preventDefault(); onArticleClick(a.id); } }}
      className="group/hero relative block w-full h-full min-h-[200px] overflow-hidden no-underline"
      style={{ borderRadius: radius, boxShadow: SHADOW[shadow] }}
    >
      {/* Image + masque */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover/hero:scale-105"
        style={{ backgroundImage: `url("${a.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, color-mix(in srgb, var(--sp-theme-darker) 78%, transparent) 0%, transparent 60%)' }} />

      {a.pinned && showPin && (
        <span className="absolute top-3 left-3 z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-sp-primary text-white">
          <PinIcon style={{ width: 13, height: 13 }} />
        </span>
      )}

      {/* Boutons (survol) */}
      {(cc.showLikeButton || cc.showShareButton) && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-sm opacity-0 group-hover/hero:opacity-100 transition-opacity">
          {cc.showShareButton && (
            <button type="button" aria-label="Partager" onClick={(e) => { e.preventDefault(); onShareClick?.(a.url); }}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/90 text-sp-darker hover:bg-white">
              <ShareIcon style={{ width: 15, height: 15 }} />
            </button>
          )}
          {cc.showLikeButton && (
            <button type="button" aria-label="J'aime" onClick={(e) => e.preventDefault()}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/90 text-sp-primary hover:bg-white">
              {a.isLikedByUser ? <FilledLikeIcon style={{ width: 16, height: 15 }} /> : <LikeIcon style={{ width: 16, height: 15 }} />}
            </button>
          )}
        </div>
      )}

      {/* Contenu superposé */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-sm text-white" style={{ padding: 20 }}>
        {cc.showTags && a.tags.length > 0 && (
          <div className="flex flex-wrap gap-xs">
            {a.tags.map((tag) => (
              <span key={tag.id} className="inline-flex items-center bg-sp-primary text-white uppercase"
                style={{ borderRadius: 5, padding: '3px 12px', letterSpacing: '0.08em', fontSize: FONT_SIZE.size10, lineHeight: 1.4, opacity: 0.85 }}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <InlineText as="div" path={['news', index, 'title']} value={a.title} placeholder="Titre de l'article"
          className="line-clamp-2 [word-break:break-word]" style={{ fontSize: isSmall ? FONT_SIZE.size20 : FONT_SIZE.size24, fontWeight: 700 }} />
        <div className="flex items-center justify-between">
          {(showAuthor || (cc.showDate && a.date)) && (
            <span className="flex items-center gap-xs min-w-0">
              {/* Avatar + nom : masqués sur les petites tuiles (isSmall), comme jintan. */}
              {showAuthor && (
                <>
                  <span className="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white/30 text-white" style={{ width: 16, height: 16, fontSize: 8, fontWeight: 600 }}>
                    {a.authorAvatar ? <img src={a.authorAvatar} alt={a.author} className="w-full h-full object-cover" /> : getInitials(a.author)}
                  </span>
                  <span className="truncate" style={{ fontSize: FONT_SIZE.small }}>{a.author}</span>
                </>
              )}
              {cc.showDate && a.date && (
                <span className="opacity-90" style={{ fontSize: FONT_SIZE.small }}>{showAuthor ? '· ' : ''}{fmtDate(a.date)}</span>
              )}
            </span>
          )}
          {(cc.showViewCount || cc.showLikeCount) && (
            <span className="flex items-center gap-md shrink-0">
              {cc.showViewCount && a.viewCount > 0 && (
                <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>{a.viewCount}<ViewIcon style={{ width: 14, height: 14 }} /></span>
              )}
              {cc.showLikeCount && a.likeCount >= 0 && (
                <span className="inline-flex items-center gap-xs" style={{ fontSize: FONT_SIZE.xSmall }}>{a.likeCount}<ThumbLikeIcon style={{ width: 14, height: 14 }} /></span>
              )}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
