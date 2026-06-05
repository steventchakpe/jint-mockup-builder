'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { OpenIcon, PlayIcon, RetweetIcon, ShareIcon, SourceIcon } from '../Newshub.icons';
import {
  CARD_GAP,
  CARD_HEADER_GAP,
  CARD_HEADER_PADDING,
  CARD_HEADER_TITLE_GAP,
  CARD_BODY_GAP,
  CARD_PADDING,
  FONT_SIZE,
  HEADER_LOGO_SIZE,
  IMAGES_GAP,
  IMAGE_CONTAINER_HEIGHT,
  NEUTRAL_SECONDARY,
  SHADOW,
  SOURCE_ICON_SIZE,
  VIDEO_LAYER_SIZE,
  truncateContent,
} from '../Newshub.mozzaik';
import type { NewshubConfig, NewshubPost } from '../Newshub.types';

interface PostCardProps {
  post: NewshubPost;
  index: number;
  config: NewshubConfig;
  isEditMode?: boolean;
  locale?: string;
}

function GhostIconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} className="w-10 h-10 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt active:bg-sp-lighter transition-colors">
      {children}
    </button>
  );
}

/**
 * PostCard — port fidèle de `Card` (news-hub.js) : padding '16px 16px 8px',
 * gap 8, bg blanc, ombre Depth4. Header : logo 40 + nom semibold + date
 * MetadataLimited neutralSecondary + icône source 28. Body : texte tronqué 256,
 * mosaïque images 192px (gap 4, calque +N flouté) ou vignette vidéo (Play 48
 * dans un rond blanc flouté 64). Footer : Open | Share (+ Retweet si Twitter).
 */
export function PostCard({ post, index, config, isEditMode = false, locale = 'fr-FR' }: PostCardProps) {
  const { radius, shadow } = config;
  const cardStyle: CSSProperties = { padding: CARD_PADDING, gap: CARD_GAP, borderRadius: radius, boxShadow: SHADOW[shadow] };
  const images = post.images ?? [];
  const extraCount = post.isVideo ? 0 : Math.max(0, images.length - 2);
  const shown = post.isVideo ? images.slice(0, 1) : images.slice(0, 2);

  return (
    <div className="flex flex-col w-full bg-white" style={cardStyle} data-testid="masonry-card">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: CARD_HEADER_PADDING }}>
        <div className="flex" style={{ gap: CARD_HEADER_GAP }}>
          {post.logo && (
            <span className="shrink-0 rounded-full overflow-hidden border-2 border-white shadow-sm" style={{ width: HEADER_LOGO_SIZE, height: HEADER_LOGO_SIZE }}>
              <img src={post.logo} alt={post.author} className="w-full h-full object-cover" loading="lazy" />
            </span>
          )}
          <div className="flex flex-col justify-center" style={{ gap: CARD_HEADER_TITLE_GAP }}>
            <InlineText
              as="span"
              path={['posts', index, 'author']}
              value={post.author}
              placeholder="Compte"
              className="font-semibold text-[#323130]"
              style={{ fontSize: FONT_SIZE.BodyText }}
            />
            <span style={{ fontSize: FONT_SIZE.MetadataLimited, color: NEUTRAL_SECONDARY }}>
              {new Date(post.date).toLocaleDateString(locale)}
            </span>
          </div>
        </div>
        <SourceIcon source={post.source} size={SOURCE_ICON_SIZE} />
      </div>

      {/* Body */}
      <div className="flex flex-col" style={{ gap: CARD_BODY_GAP }}>
        {post.content && (
          <p className="break-words text-[#323130]" style={{ fontSize: FONT_SIZE.BodyText }}>
            {truncateContent(post.content)}
          </p>
        )}
        {shown.length > 0 && (
          <div className="flex w-full overflow-hidden" style={{ gap: IMAGES_GAP, height: IMAGE_CONTAINER_HEIGHT, borderRadius: radius }}>
            {shown.map((src, i) => (
              <span key={i} className="relative grow overflow-hidden" style={{ borderRadius: radius, flexBasis: 0 }}>
                <span className="absolute inset-0" style={{ backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {/* Calque +N (dernière vignette) */}
                {!post.isVideo && extraCount > 0 && i === shown.length - 1 && (
                  <span className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderRadius: radius }}>
                    <span className="text-white font-semibold rounded-full px-sm py-xs" style={{ fontSize: FONT_SIZE.BodyText, background: 'rgba(0,0,0,0.4)' }}>+{extraCount}</span>
                  </span>
                )}
                {/* Calque vidéo */}
                {post.isVideo && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center" style={{ width: VIDEO_LAYER_SIZE, height: VIDEO_LAYER_SIZE, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)', borderRadius: 100 }}>
                      <PlayIcon style={{ width: 48, height: 48, color: '#ffffff' }} />
                    </span>
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <GhostIconButton label="Ouvrir"><OpenIcon style={{ width: 20, height: 20 }} /></GhostIconButton>
        <span className="flex">
          <GhostIconButton label="Partager"><ShareIcon style={{ width: 20, height: 20 }} /></GhostIconButton>
          {post.source === 'Twitter' && (
            <GhostIconButton label="Retweeter"><RetweetIcon style={{ width: 20, height: 20 }} /></GhostIconButton>
          )}
        </span>
      </div>
    </div>
  );
}
