'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useSearchConnection } from '@/lib/state/search-connection';
import { FILTER_BY_FONT_SIZE, FONT_SIZE, GROUP_GAP, SHADOW, TITLE_GAP } from './SearchFilters.mozzaik';
import type { SearchFiltersProps } from './SearchFilters.types';

/**
 * Webpart Search filters — port fidèle de `SearchFiltersClassic` /
 * `AggregationsClassic` (jintan oldparts).
 *
 * « Filtrer par » (16 bold themeDarker) + lien « Réinitialiser » (themePrimary),
 * puis groupes de facettes : titre bold themeDarker, chips 24px (padding 4/6,
 * bordure 1px themeLighter, texte themeDarker ; sélectionné → fond themePrimary
 * texte blanc). Connecté aux résultats via le store de connexion.
 */
export function SearchFilters({ config, content, isEditMode = false }: SearchFiltersProps) {
  const { title, shadow } = config;
  const { filters, toggleFilter, clearFilters } = useSearchConnection();
  const hasActive = Object.values(filters).some((v) => v.length > 0);

  return (
    <section className="flex flex-col bg-white" style={{ boxShadow: SHADOW[shadow], borderRadius: config.radius, padding: 16, gap: GROUP_GAP }}>
      {(title || isEditMode) && (
        <InlineText as="h2" target="config" path={['title']} value={title} placeholder="Titre" className="font-semibold text-[#323130]" style={{ fontSize: FONT_SIZE.PaneHeader }} />
      )}

      <div className="flex items-center justify-between">
        <span className="font-bold text-sp-darker" style={{ fontSize: FILTER_BY_FONT_SIZE }}>Filtrer par</span>
        {hasActive && (
          <button type="button" onClick={clearFilters} className="text-sp-primary hover:underline cursor-pointer" style={{ fontSize: FONT_SIZE.BodyText }}>
            Réinitialiser
          </button>
        )}
      </div>

      {content.facets.map((facet) => {
        const active = filters[facet.name] ?? [];
        return (
          <div key={facet.name} className="flex flex-col" style={{ gap: TITLE_GAP }}>
            <span className="font-bold text-sp-darker" style={{ fontSize: FONT_SIZE.BodyText }}>{facet.displayName}</span>
            <div className="flex flex-wrap" style={{ gap: 6 }}>
              {facet.buckets.map((bucket) => {
                const checked = active.includes(bucket.key);
                return (
                  <button
                    key={bucket.key}
                    type="button"
                    onClick={() => { if (!isEditMode) toggleFilter(facet.name, bucket.key); }}
                    className={`inline-flex items-center transition-colors border border-sp-lighter ${
                      checked ? 'bg-sp-primary text-white' : 'bg-white text-sp-darker hover:bg-sp-lighter-alt'
                    }`}
                    style={{ height: 24, padding: '4px 6px', minWidth: 32, fontSize: FONT_SIZE.MetaData, borderRadius: 2 }}
                  >
                    {bucket.label}
                    {bucket.count !== undefined && <span className="opacity-70 ml-xs">({bucket.count})</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
