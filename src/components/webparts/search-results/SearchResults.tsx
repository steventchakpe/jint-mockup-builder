'use client';

import { useEffect, useMemo, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useSearchConnection } from '@/lib/state/search-connection';
import { CardsView, TableView, TilesView } from './components/ResultViews';
import {
  CONTAINER_PADDING,
  FONT_SIZE,
  HEADER_HEIGHT,
  NEUTRAL_SECONDARY,
  TOTAL_COUNT_MARGIN,
} from './SearchResults.mozzaik';
import { useDemoStrings } from '@/lib/i18n';
import type { SearchResultsLayout, SearchResultsProps } from './SearchResults.types';

const VIEWS: Array<{ key: SearchResultsLayout; label: string }> = [
  { key: 'cards', label: '▦' },
  { key: 'tiles', label: '☰' },
  { key: 'table', label: '▤' },
];

/**
 * Webpart Search results — port fidèle de `SearchResultsDefaultLayout`
 * (@mozzaik365/components/search-results).
 *
 * Navigation : onglets de verticales + bouton de tri + switcher de vue
 * (cards/tiles/table). Compteur de résultats, contenu scrollable
 * (padding '0 12px 12px'), « Afficher plus ». Connecté à la Search box et aux
 * filtres via le store de connexion (autoConnect).
 */
export function SearchResults({ config, content, isEditMode = false, locale = 'fr-FR' }: SearchResultsProps) {
  const { title, height, showVerticals, enableViewSwitch, layout, autoConnect } = config;
  const tw = useDemoStrings().webparts;
  const [view, setView] = useState<SearchResultsLayout>(layout);
  // La « Vue par défaut » du panneau de config doit s'appliquer immédiatement
  // (le switcher du toolbar reste prioritaire jusqu'au prochain changement de config)
  useEffect(() => setView(layout), [layout]);
  const [vertical, setVertical] = useState(0);
  const [shown, setShown] = useState(8);
  const { query, filters } = useSearchConnection();

  const items = useMemo(() => {
    let result = content.items;
    if (autoConnect && query) {
      const q = query.toLowerCase();
      result = result.filter((i) =>
        i.name.toLowerCase().includes(q) ||
        i.properties.some((p) => String(p.value).toLowerCase().includes(q)),
      );
    }
    if (autoConnect) {
      for (const [facet, values] of Object.entries(filters)) {
        if (!values.length) continue;
        result = result.filter((i) => {
          if (facet === 'fileType') return values.includes(i.extension ?? '');
          if (facet === 'contentType') return values.includes(i.contentType);
          const p = i.properties.find((x) => x.name === facet);
          const v = p ? (Array.isArray(p.value) ? p.value : [String(p.value)]) : [];
          return values.some((val) => v.includes(val));
        });
      }
    }
    return result;
  }, [content.items, autoConnect, query, filters]);

  const visible = items.slice(0, shown);
  const View = view === 'cards' ? CardsView : view === 'tiles' ? TilesView : TableView;

  return (
    <section className="flex flex-col">
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: HEADER_HEIGHT, padding: '0 8px 0 0' }}>
          <InlineText as="h2" target="config" path={['title']} value={title} placeholder="Titre de la section" className="font-semibold text-[#323130]" style={{ fontSize: FONT_SIZE.PaneHeader }} />
        </div>
      )}

      <div className="flex flex-col overflow-hidden" style={{ height }}>
        {/* Navigation : verticales + tri + switcher */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex">
            {showVerticals && content.verticals.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={() => setVertical(i)}
                className={`h-9 px-md font-semibold transition-colors border-b-2 ${
                  i === vertical ? 'border-sp-primary text-sp-primary' : 'border-transparent text-[#605e5c] hover:text-[#323130]'
                }`}
                style={{ fontSize: FONT_SIZE.BodyText }}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-sm buttons-container">
            <button type="button" className="h-7 px-sm rounded-xs text-[#323130] hover:bg-sp-lighter-alt" style={{ fontSize: FONT_SIZE.BodyText, width: 'auto' }}>
              Pertinence
            </button>
            {enableViewSwitch && (
              <div className="flex bg-sp-lighter-alt rounded-sm p-[2px]" style={{ gap: 2 }}>
                {VIEWS.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    aria-label={v.key}
                    onClick={() => setView(v.key)}
                    className={`w-7 h-7 rounded-xs text-[14px] ${view === v.key ? 'bg-white shadow-sm text-sp-primary' : 'text-[#605e5c]'}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p style={{ margin: `${TOTAL_COUNT_MARGIN}px 0`, fontSize: FONT_SIZE.BodyText, color: NEUTRAL_SECONDARY }}>
          {items.length} résultat{items.length > 1 ? 's' : ''}
        </p>

        <div className="overflow-y-auto grow" style={{ padding: CONTAINER_PADDING }}>
          {visible.length === 0 ? (
            <p className="text-body text-gray-500 py-xl text-center">{tw.noResult}</p>
          ) : (
            <View items={visible} config={config} locale={locale} />
          )}
          {items.length > shown && (
            <div className="flex justify-center items-center" style={{ minHeight: 64, padding: 8 }}>
              <button type="button" onClick={() => setShown((s) => s + 8)} className="h-8 px-md bg-white border border-[#8a8886] rounded-xs text-[#323130] font-semibold hover:bg-sp-lighter-alt" style={{ fontSize: FONT_SIZE.BodyText }}>
                {tw.showMore}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
