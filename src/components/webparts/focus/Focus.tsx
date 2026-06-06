'use client';

import { cn } from '@/lib/utils';
import { FocusCard } from './components/FocusCard';
import { SHADOW } from './Focus.mozzaik';
import type { CSSProperties } from 'react';
import type { FocusContentPosition, FocusProps } from './Focus.types';

/** getCardVerticalAlign — port fidèle. */
function getCardJustify(position?: FocusContentPosition): string {
  // flexDirection col (top/bottom) → justify ; row (left/right/fill) → justify
  return position === 'top' || position === 'left' ? 'flex-start' : 'flex-end';
}

/**
 * Webpart Focus — port fidèle de `FocusLayout` (@mozzaik365/components/focus).
 *
 * Enveloppe (BaseLayout) : header titre optionnel + zone de hauteur fixe.
 * La zone est un flex (colonne pour top/bottom, ligne sinon) qui positionne
 * la carte (flex-basis = 50% + 16px) au début ou à la fin de l'axe selon la
 * position du contenu. Si une redirection sans bouton est définie, toute la
 * zone devient cliquable.
 */
export function Focus({ config, content, isEditMode = false, onRedirect }: FocusProps) {
  const { title, height, radius, shadow = 'Strong', background, padding = true } = config;
  const { card, redirection } = content;
  const position = card.position;

  // BaseLayout container : hauteur, radius, ombre, fond (image plein cadre / couleur).
  // jintan : padding falsy → ni radius ni ombre (cas section full-width).
  const containerStyle: CSSProperties = {
    height,
    borderRadius: padding ? radius : undefined,
    boxShadow: padding ? SHADOW[shadow] : undefined,
    overflow: 'hidden',
  };
  if (background?.type === 'image') {
    containerStyle.backgroundImage = `url("${background.url}")`;
    containerStyle.backgroundPosition = background.position ?? 'center center';
    containerStyle.backgroundRepeat = 'no-repeat';
    containerStyle.backgroundSize = background.adjustment ?? 'cover';
  } else if (background?.type === 'color') {
    containerStyle.background = background.value;
  }

  const isColumn = position === 'top' || position === 'bottom';
  const shouldLayoutRedirect = !redirection?.buttonProps?.visible && !!redirection?.linkUrl;

  const handleRedirect = (url: string) => {
    if (isEditMode) return;
    onRedirect?.(url);
  };

  const layout = (
    <div
      data-testid="focus-layout-wrapper"
      className={cn('flex h-full w-full', isColumn ? 'flex-col' : 'flex-row')}
      style={{
        justifyContent: getCardJustify(position),
        cursor: shouldLayoutRedirect ? 'pointer' : 'default',
      }}
    >
      <FocusCard
        content={card}
        height={height}
        redirection={redirection}
        radius={radius}
        onRedirect={onRedirect ? handleRedirect : undefined}
      />
    </div>
  );

  return (
    <section className={cn('flex flex-col gap-md', padding && 'p-md')}>
      {title && <h2 className="text-heading font-semibold text-sp-darker">{title}</h2>}

      <div style={containerStyle}>
        {shouldLayoutRedirect && onRedirect ? (
          <button
            type="button"
            data-testid="focus-link-wrapper"
            onClick={() => handleRedirect(redirection!.linkUrl)}
            style={{
              display: 'block',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              width: '100%',
              height: '100%',
              textAlign: 'inherit',
            }}
          >
            {layout}
          </button>
        ) : shouldLayoutRedirect ? (
          <a
            href={redirection!.linkUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="focus-link-wrapper"
            className="block h-full w-full"
          >
            {layout}
          </a>
        ) : (
          layout
        )}
      </div>
    </section>
  );
}
