import { searchResultsDefaultConfig } from './SearchResults.config';
import type { SearchResultsConfig } from './SearchResults.types';

/** Skeleton — lignes de table (port de SearchResultsTableSkeleton). */
export function SearchResultsSkeleton({ config = searchResultsDefaultConfig }: { config?: SearchResultsConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse rounded-xs';
  return (
    <div className="flex flex-col" style={{ gap: 8, height: Math.min(config.height, 300), overflow: 'hidden' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex items-center" style={{ gap: 8 }}>
          <div className={pulse} style={{ width: 20, height: 20 }} />
          <div className={`${pulse} grow`} style={{ height: 20 }} />
        </div>
      ))}
    </div>
  );
}
