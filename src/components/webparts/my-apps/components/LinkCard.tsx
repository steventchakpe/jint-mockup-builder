'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { DefaultAppImage } from '../MyApps.icons';
import {
  CARD_PADDING,
  CONTENT_GAP,
  LARGE_TEXT_BAR_HEIGHT,
  LARGE_TEXT_COLOR,
  LARGE_TEXT_GRADIENT,
  SHADOW,
  SIZE,
} from '../MyApps.mozzaik';
import type { AppCardSize, AppLink, AppShadow } from '../MyApps.types';

interface LinkCardProps {
  item: AppLink;
  size: AppCardSize;
  radius: number;
  shadow: AppShadow;
  onNavigate?: (link: AppLink) => void;
}

const isValidUrl = (u?: string) => !!u && u.trim() !== '' && !u.toLowerCase().startsWith('javascript');

/**
 * Carte d'application — port fidèle de `LinkCard` (links.js).
 * medium : icône + nom dessous. large : icône + nom en bandeau bas (au survol).
 */
export function LinkCard({ item, size, radius, shadow, onNavigate }: LinkCardProps) {
  const [error, setError] = useState(false);
  const dims = SIZE[size];
  const clickable = isValidUrl(item.url);

  const cardStyle: CSSProperties = {
    padding: CARD_PADDING,
    borderRadius: radius,
    minHeight: dims.min,
    minWidth: dims.min,
    boxShadow: SHADOW[shadow],
  };

  const handleClick = () => {
    if (!clickable) return;
    onNavigate?.(item);
  };

  return (
    <div
      data-testid="links-card"
      onClick={handleClick}
      className={cn(
        'group relative flex flex-col items-center justify-center bg-white overflow-visible',
        clickable && 'cursor-pointer',
      )}
      style={{ ...cardStyle, gap: size === 'medium' ? CONTENT_GAP : 0 }}
    >
      {/* Conteneur image */}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ width: dims.container, height: dims.container, borderRadius: 4 }}
      >
        {item.photoUrl && !error ? (
          <img
            src={item.photoUrl}
            alt={item.altText ?? ''}
            onError={() => setError(true)}
            className="object-contain"
            style={{ height: dims.image, width: dims.image }}
            loading="lazy"
          />
        ) : (
          <div className="overflow-hidden rounded-sm" style={{ width: dims.image, height: dims.image }}>
            <DefaultAppImage />
          </div>
        )}
      </div>

      {/* Nom */}
      {size === 'medium' ? (
        <span className="text-center text-body text-sp-darker [word-break:break-all] line-clamp-1">{item.name}</span>
      ) : (
        <div
          className="application-name absolute bottom-0 left-0 w-full flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ height: LARGE_TEXT_BAR_HEIGHT, background: LARGE_TEXT_GRADIENT, padding: CARD_PADDING, borderRadius: `0 0 ${radius}px ${radius}px`, color: LARGE_TEXT_COLOR }}
        >
          <span className="font-semibold text-body line-clamp-1">{item.name}</span>
        </div>
      )}
    </div>
  );
}
