import { CARD_SHADOW, CARD_PADDING, CARD_MARGIN_BOTTOM } from './IdeaBox.mozzaik';
import { ideaBoxDefaultConfig } from './IdeaBox.config';
import type { IdeaBoxConfig } from './IdeaBox.types';

/** Skeleton — quelques cartes d'idée (titre + bloc vote + corps). */
export function IdeaBoxSkeleton({ config = ideaBoxDefaultConfig }: { config?: IdeaBoxConfig }) {
  return (
    <div>
      <div className="h-9 w-full bg-sp-lighter-alt animate-pulse" />
      <div className="h-9 my-sm w-40 bg-sp-lighter-alt animate-pulse rounded-sm" />
      {Array.from({ length: Math.min(config.rowLimit, 3) }).map((_, i) => (
        <div key={i} className="bg-white" style={{ boxShadow: CARD_SHADOW, padding: CARD_PADDING, marginBottom: CARD_MARGIN_BOTTOM }}>
          <div className="h-4 w-1/3 bg-sp-lighter-alt animate-pulse" />
          <div className="flex items-center gap-md" style={{ marginTop: 20 }}>
            <div className="h-8 w-6 bg-sp-lighter-alt animate-pulse" />
            <div className="h-4 w-12 bg-sp-lighter-alt animate-pulse" />
            <div className="h-10 w-24 bg-sp-lighter-alt animate-pulse rounded-sm" />
          </div>
          <div className="h-4 w-3/4 bg-sp-lighter-alt animate-pulse" style={{ margin: '32px 0' }} />
        </div>
      ))}
    </div>
  );
}
