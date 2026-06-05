import {
  CARD_BORDER_RADIUS,
  CARD_BORDER_WIDTH,
  CARD_GAP,
  CARD_IMAGE_RADIUS,
  CARD_INFORMATIONS_GAP,
  CARD_PADDING,
  GRID_GAP,
  NEUTRAL_LIGHTER,
} from './Docs.mozzaik';
import { docsDefaultConfig } from './Docs.config';
import type { DocsConfig } from './Docs.types';

/** Skeleton — port de MyFilesCardSkeleton (4 cartes : zone image + cercle 24 + ligne 24). */
export function DocsSkeleton({ config = docsDefaultConfig }: { config?: DocsConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse';
  return (
    <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[768px]:grid-cols-3 @[1024px]:grid-cols-4" style={{ gap: GRID_GAP, height: config.height }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col h-full"
          style={{ padding: CARD_PADDING, gap: CARD_GAP, borderRadius: CARD_BORDER_RADIUS, border: `solid ${CARD_BORDER_WIDTH}px ${NEUTRAL_LIGHTER}` }}
        >
          <div className={`grow ${pulse}`} style={{ borderRadius: CARD_IMAGE_RADIUS }} />
          <div className="flex items-center shrink-0" style={{ gap: CARD_INFORMATIONS_GAP }}>
            <div className={`rounded-full ${pulse}`} style={{ width: 24, height: 24 }} />
            <div className={`grow rounded-sm ${pulse}`} style={{ height: 24 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
