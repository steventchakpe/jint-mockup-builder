import { CARD_CONTAINER_GAP, CARD_PADDING, IMAGE_CONTAINER_HEIGHT, SHADOW } from './Newshub.mozzaik';
import { newshubDefaultConfig } from './Newshub.config';
import type { NewshubConfig } from './Newshub.types';

/** Skeleton — 3 colonnes de cartes (header persona + texte + image 192). */
export function NewshubSkeleton({ config = newshubDefaultConfig }: { config?: NewshubConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse';
  return (
    <div className="flex overflow-hidden" style={{ gap: CARD_CONTAINER_GAP, height: config.height, padding: '4px 24px' }}>
      {[0, 1, 2].map((c) => (
        <div key={c} className="flex flex-col grow" style={{ gap: CARD_CONTAINER_GAP, flexBasis: 0 }}>
          <div className="flex flex-col bg-white" style={{ padding: CARD_PADDING, gap: 8, borderRadius: config.radius, boxShadow: SHADOW[config.shadow] }}>
            <div className="flex items-center gap-sm">
              <div className={`rounded-full shrink-0 ${pulse}`} style={{ width: 40, height: 40 }} />
              <div className={`${pulse} rounded-sm`} style={{ width: '50%', height: 14 }} />
            </div>
            <div className={`${pulse} rounded-sm`} style={{ height: 42 }} />
            <div className={pulse} style={{ height: IMAGE_CONTAINER_HEIGHT, borderRadius: config.radius }} />
          </div>
        </div>
      ))}
    </div>
  );
}
