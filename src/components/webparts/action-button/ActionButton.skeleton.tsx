import { LAYOUT_MIN_HEIGHT } from './ActionButton.mozzaik';
import { actionButtonDefaultConfig } from './ActionButton.config';
import type { ActionButtonConfig } from './ActionButton.types';

/** Skeleton — bouton centré. */
export function ActionButtonSkeleton({ config = actionButtonDefaultConfig }: { config?: ActionButtonConfig }) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: LAYOUT_MIN_HEIGHT, height: config.height }}>
      <div className="bg-sp-lighter-alt animate-pulse" style={{ width: 140, height: 32, borderRadius: config.radius }} />
    </div>
  );
}
