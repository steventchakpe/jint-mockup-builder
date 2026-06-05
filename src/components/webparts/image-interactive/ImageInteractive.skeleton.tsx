import { imageInteractiveDefaultConfig } from './ImageInteractive.config';
import type { ImageInteractiveConfig } from './ImageInteractive.types';

/** Skeleton — zone image centrée. */
export function ImageInteractiveSkeleton({ config = imageInteractiveDefaultConfig }: { config?: ImageInteractiveConfig }) {
  return (
    <div className="flex justify-center" style={{ height: config.height }}>
      <div className="bg-sp-lighter-alt animate-pulse rounded-xs w-full h-full" />
    </div>
  );
}
