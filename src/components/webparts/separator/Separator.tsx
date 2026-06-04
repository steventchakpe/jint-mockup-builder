'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import type { SeparatorAlignment, SeparatorProps } from './Separator.types';

/** Constantes portées à l'identique de SeparatorDefaultLayout. */
const BAR_HEIGHT = { thin: 4, large: 20 } as const; // separatorBarHeight
const BAR_MIN_WIDTH = 16;
const RICHTEXT_MAXLINE = 2;

const justifyClass: Record<SeparatorAlignment, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/** Texte riche (RichText) — html ou valeur brute, max 2 lignes. */
function RichText({ html, value, color }: { html?: string; value?: string; color?: string }) {
  const style: CSSProperties = {
    color,
    display: '-webkit-box',
    WebkitLineClamp: RICHTEXT_MAXLINE,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  return html ? (
    <div style={style} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <InlineText as="div" path={['text', 'value']} value={value} style={style} placeholder="Texte" />
  );
}

/**
 * Webpart Separator — port fidèle de `SeparatorDefaultLayout`
 * (@mozzaik365/components/separator).
 *
 * Barre horizontale (épaisseur thin=4 / large=20, longueur en %, alignée G/C/D)
 * avec texte optionnel positionné : au milieu (inBetween), au-dessus (onTop)
 * ou à l'intérieur de la barre (inside).
 */
export function Separator({ config, content }: SeparatorProps) {
  const { alignment, barHeight, barLength, textPosition, barColor } = config;
  const { text, showText } = content;

  const height = BAR_HEIGHT[barHeight];
  const alignLeft = alignment === 'left';
  const alignRight = alignment === 'right';
  const alignCenter = alignment === 'center';

  const barStyle: CSSProperties = { height, minWidth: BAR_MIN_WIDTH, background: barColor };
  const Bar = ({ testid }: { testid: string }) => (
    <div data-testid={testid} className="flex-1" style={barStyle} />
  );
  const richText = <RichText html={text.html} value={text.value} color={text.color} />;

  return (
    <div data-testid="separator" className={`flex ${justifyClass[alignment]}`}>
      <div
        className={`flex flex-row items-center ${justifyClass[alignment]}`}
        style={{ width: `${barLength}%` }}
      >
        {!showText && <Bar testid="separator-notext-bar" />}

        {showText && textPosition === 'inBetween' && (
          <>
            {(alignLeft || alignCenter) && <Bar testid="separator-left-bar" />}
            <div className="px-lg">{richText}</div>
            {(alignRight || alignCenter) && <Bar testid="separator-right-bar" />}
          </>
        )}

        {showText && textPosition === 'onTop' && (
          <div data-testid="separator-ontop-bar" className="flex flex-1 flex-col items-stretch gap-lg">
            {richText}
            <Bar testid="separator-ontop-line" />
          </div>
        )}

        {showText && textPosition === 'inside' && (
          <div
            data-testid="separator-inside-bar"
            className="flex flex-1 flex-col gap-[10px]"
            style={{ padding: '8px 10px', minWidth: BAR_MIN_WIDTH, background: barColor }}
          >
            {richText}
          </div>
        )}
      </div>
    </div>
  );
}
