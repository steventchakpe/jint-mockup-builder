import { SIZE_HEIGHT } from './Search.mozzaik';

/** Skeleton loader du webpart Search — bannière + barre. */
export function SearchSkeleton() {
  return (
    <div className="w-full flex items-center justify-center bg-gray-200 animate-pulse" style={{ height: SIZE_HEIGHT.XS, padding: '0 32px' }}>
      <div className="w-full max-w-[760px] h-10 bg-white/70 rounded-md" />
    </div>
  );
}
