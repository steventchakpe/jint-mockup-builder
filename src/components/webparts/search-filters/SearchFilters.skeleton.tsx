import type { SearchFiltersConfig } from './SearchFilters.types';

/** Skeleton — 2 groupes de chips. */
export function SearchFiltersSkeleton(_props: { config?: SearchFiltersConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse rounded-xs';
  return (
    <div className="flex flex-col p-lg" style={{ gap: 12 }}>
      <div className={pulse} style={{ width: 80, height: 18 }} />
      {[0, 1].map((g) => (
        <div key={g} className="flex flex-col" style={{ gap: 8 }}>
          <div className={pulse} style={{ width: 100, height: 14 }} />
          <div className="flex" style={{ gap: 6 }}>
            {[0, 1, 2].map((i) => <div key={i} className={pulse} style={{ width: 64, height: 24 }} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
