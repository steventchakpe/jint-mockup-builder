import { GRID_GAP, SIZE } from './MyApps.mozzaik';

/** Skeleton loader My Apps — grille de cartes. */
export function MyAppsSkeleton() {
  const min = SIZE.medium.min;
  return (
    <section className="flex flex-col gap-xl p-md animate-pulse">
      <div className="h-7 w-40 bg-gray-200 rounded-md" />
      <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: GRID_GAP }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-sm p-sm bg-white" style={{ minHeight: min }}>
            <div className="w-[50px] h-[50px] rounded bg-gray-200" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}
