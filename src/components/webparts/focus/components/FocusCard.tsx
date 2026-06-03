import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FocusTextContent } from './FocusTextContent';
import { FocusImageContent } from './FocusImageContent';
import type { FocusCardContent, FocusRedirection } from '../Focus.types';

/** Constantes portées à l'identique de FocusCard.constants. */
const LAYOUT_PADDING = 16;
const CARD_CONTAINER_GAP = 16;
const CARD_PADDING = 12;

interface FocusCardProps {
  content: FocusCardContent;
  height: number;
  redirection?: FocusRedirection;
  radius: number;
  onRedirect?: (url: string) => void;
}

/**
 * Port fidèle de `FocusCard`.
 * - flex-basis = `calc(50% + 16px)` (sauf `fill` → 100%)
 * - padding carte = 16, gap conteneur = 16, padding interne = 12 si fond/glass
 * - hauteur image dérivée selon la position du contenu
 * - conteneur en row / row-reverse selon la position de l'image
 */
export function FocusCard({ content, height, redirection, radius, onRedirect }: FocusCardProps) {
  const position = content.position;

  const imageHeight = useMemo(() => {
    const cardPadding = content.backgroundColor ? 2 * CARD_PADDING : 0;
    if (position === 'top' || position === 'bottom') {
      return height / 2 - LAYOUT_PADDING - cardPadding;
    }
    return height - 2 * LAYOUT_PADDING - cardPadding;
  }, [height, position, content.backgroundColor]);

  const contentImagePosition = content.image?.position || 'right';
  const hasBg = !!(content.backgroundColor || content.glassmorphism);

  const flexBasis =
    position && ['top', 'bottom', 'right', 'left'].includes(position)
      ? `calc(50% + ${LAYOUT_PADDING}px)`
      : '100%';

  return (
    <div
      className="h-full overflow-hidden p-lg"
      style={{ borderRadius: radius, flexBasis, flexDirection: position === 'bottom' || position === 'top' ? 'column' : 'row' }}
    >
      <div
        className={cn('flex h-full w-full overflow-hidden', hasBg && 'p-md')}
        style={{
          gap: CARD_CONTAINER_GAP,
          flexDirection: contentImagePosition === 'left' ? 'row-reverse' : 'row',
          maxHeight: '100%',
          maxWidth: '100%',
          borderRadius: radius,
          overflow: position === 'top' || position === 'bottom' ? 'hidden' : undefined,
          background: content.backgroundColor,
          ...(content.glassmorphism ? { backdropFilter: `blur(${content.glassmorphism}px)` } : {}),
        }}
      >
        <FocusTextContent
          cardContent={content}
          redirection={redirection}
          radius={radius}
          onRedirect={onRedirect}
        />
        {content.image?.url && (
          <FocusImageContent image={content.image} imageHeight={imageHeight} radius={radius} />
        )}
      </div>
    </div>
  );
}
