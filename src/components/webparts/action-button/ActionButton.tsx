'use client';

import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import {
  FONT_SIZE,
  HEADER_HEIGHT,
  LAYOUT_MIN_HEIGHT,
  PADDING_LEFT_RIGHT,
  SHADOW,
  SIZE_TO_PADDING,
} from './ActionButton.mozzaik';
import type { ActionButtonProps } from './ActionButton.types';

const POSITION_CLASS = { start: 'justify-start', center: 'justify-center', end: 'justify-end' } as const;

/**
 * Webpart Action button — port fidèle de `ActionButtonStandardLayout`
 * (@mozzaik365/components/action-button).
 *
 * Zone à hauteur fixe (min 80), bouton StyledButton centré verticalement et
 * positionné horizontalement (start/center/end). Padding `{S=2,M=6,L=10}px 15px`,
 * radius/ombre sur le bouton. Couleur personnalisée possible, sinon thème.
 */
export function ActionButton({ config, content, isEditMode = false }: ActionButtonProps) {
  const { title, height, radius, shadow, type, position, size, customColor } = config;
  const padding = `${SIZE_TO_PADDING[size]}px ${PADDING_LEFT_RIGHT}px`;

  const isPrimary = type === 'Primary';
  const style: React.CSSProperties = {
    padding,
    borderRadius: radius,
    boxShadow: SHADOW[shadow],
    fontSize: FONT_SIZE.BodyText,
    minHeight: 32,
  };
  if (customColor) {
    if (isPrimary) style.background = customColor;
    else { style.color = customColor; style.borderColor = customColor; }
  }

  return (
    <section className="flex flex-col">
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: HEADER_HEIGHT, padding: '0 8px 0 0' }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.PaneHeader }}
          />
        </div>
      )}

      <div
        className={cn('flex items-center', POSITION_CLASS[position])}
        style={{ minHeight: LAYOUT_MIN_HEIGHT, height: height - HEADER_HEIGHT }}
      >
        <a
          href={content.url ?? '#'}
          target={content.openInNewTab ? '_blank' : '_self'}
          rel={content.openInNewTab ? 'noreferrer' : undefined}
          onClick={(e) => { if (isEditMode || !content.url) e.preventDefault(); }}
          className={cn(
            'inline-flex items-center justify-center font-semibold transition-colors',
            isPrimary
              ? !customColor && 'bg-sp-primary text-white hover:bg-sp-dark-alt active:bg-sp-dark'
              : !customColor && 'bg-white text-sp-primary border border-sp-primary hover:bg-sp-lighter-alt',
            isPrimary && customColor && 'text-white hover:opacity-90',
            !isPrimary && customColor && 'bg-white border hover:opacity-80',
          )}
          style={style}
          data-testid="action-button"
        >
          <InlineText as="span" path={['text']} value={content.text} placeholder="Libellé du bouton" />
        </a>
      </div>
    </section>
  );
}
