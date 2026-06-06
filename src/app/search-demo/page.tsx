'use client';

import { Search, searchDefaultConfig } from '@/components/webparts/search';
import { SearchResults, searchResultsDefaultConfig } from '@/components/webparts/search-results';
import { SearchFilters, searchFiltersDefaultConfig } from '@/components/webparts/search-filters';
import { searchResultsSeed, searchFiltersSeed } from '@/config/webpart-seeds';

/** Page démo — expérience de recherche complète (box + filtres + résultats connectés). */
export default function SearchDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-xl bg-[#faf9f8] min-h-screen">
      <Search config={searchDefaultConfig} />
      <div className="flex gap-xl items-start">
        <div className="w-[280px] shrink-0">
          <SearchFilters config={searchFiltersDefaultConfig} content={searchFiltersSeed('fr-FR')} />
        </div>
        <div className="grow min-w-0">
          <SearchResults config={{ ...searchResultsDefaultConfig, height: 700, layout: 'cards' }} content={searchResultsSeed('fr-FR')} />
        </div>
      </div>
    </main>
  );
}
