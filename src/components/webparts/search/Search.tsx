'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { SearchIcon } from './Search.icons';
import {
  BANNER_PADDING_X,
  BLUR,
  CONTENT_GAP,
  INPUT_PADDING,
  NEUTRAL,
  SHADOW,
  SIZE_HEIGHT,
  TITLE_FONT_SIZE,
} from './Search.mozzaik';
import type { SearchProps } from './Search.types';

/**
 * Webpart Search — port fidèle de `mzkSearchBox` (layout searchBox/SearchBox).
 * Bannière (fond couleur/image, hauteur XS=104 / S=208, ombre) avec titre optionnel
 * et barre de recherche. Deux thèmes : Glassmorphism (translucide + flou 8px) ou
 * Classic (fond blanc).
 */
export function Search({ config, onSearch }: SearchProps) {
  const { title, watermark, size, searchBoxTheme, radius, shadow, bkgColor, backgroundImage } = config;
  const [query, setQuery] = useState('');

  const bannerStyle: CSSProperties = {
    height: SIZE_HEIGHT[size],
    padding: `0 ${BANNER_PADDING_X}px`,
    boxShadow: SHADOW[shadow],
    background: bkgColor ?? 'var(--sp-theme-primary)',
  };
  if (backgroundImage) {
    bannerStyle.backgroundImage = `url("${backgroundImage}")`;
    bannerStyle.backgroundSize = 'cover';
    bannerStyle.backgroundPosition = 'center center';
  }

  const isGlass = searchBoxTheme === 'Glassmorphism';
  const inputWrapStyle: CSSProperties = {
    padding: INPUT_PADDING,
    borderRadius: radius,
    border: `1px solid ${NEUTRAL.light}`,
    background: isGlass ? 'rgba(255,255,255,0.8)' : '#ffffff',
    ...(isGlass ? { backdropFilter: `blur(${BLUR}px)` } : {}),
  };

  return (
    <div className="flex items-center justify-center w-full" style={bannerStyle}>
      <div className="flex flex-col w-full max-w-[760px]" style={{ gap: CONTENT_GAP }}>
        {title && (
          <span className="font-semibold text-white truncate" style={{ fontSize: TITLE_FONT_SIZE }}>
            {title}
          </span>
        )}
        <div
          className="flex items-center gap-sm transition-shadow focus-within:ring-2 focus-within:ring-sp-lighter hover:ring-2 hover:ring-sp-lighter"
          style={inputWrapStyle}
        >
          <SearchIcon className={cn('w-5 h-5 shrink-0')} style={{ color: NEUTRAL.tertiary }} />
          <input
            type="search"
            role="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch?.(query);
            }}
            placeholder={watermark ?? 'Rechercher'}
            className="flex-1 min-w-0 bg-transparent outline-none text-body placeholder:text-[#a19f9d] [&::-webkit-search-cancel-button]:hidden"
            style={{ color: NEUTRAL.primary }}
          />
        </div>
      </div>
    </div>
  );
}
