'use client';

import { PropertyValue, ResultCard, ResultIcon } from './ResultCard';
import {
  ACTIONS_COLUMN_SIZE,
  CARDS_GAP,
  FONT_SIZE,
  LOGO_COLUMN_SIZE,
  NEUTRAL_LIGHTER,
  NEUTRAL_SECONDARY,
  SHADOW,
  TILES_GAP,
  TILE_PROPERTY_MIN_WIDTH,
} from '../SearchResults.mozzaik';
import type { SearchResultItem, SearchResultsConfig } from '../SearchResults.types';

interface ViewProps {
  items: SearchResultItem[];
  config: SearchResultsConfig;
  locale?: string;
}

/** Vue Cartes — grille container queries 1/2/3/4 colonnes (480/640/1024). */
export function CardsView({ items, config, locale }: ViewProps) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[640px]:grid-cols-3 @[1024px]:grid-cols-4" style={{ gap: CARDS_GAP }}>
        {items.map((item) => <ResultCard key={item.id} item={item} config={config} locale={locale} />)}
      </div>
    </div>
  );
}

/** Vue Tuiles — carte horizontale : vignette + titre + propriétés en grille 3/ligne. */
export function TilesView({ items, config, locale }: ViewProps) {
  const { radius, shadow } = config;
  return (
    <div className="flex flex-col" style={{ gap: TILES_GAP }}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.url ?? '#'}
          onClick={(e) => { if (!item.url || item.url === '#') e.preventDefault(); }}
          className="flex bg-white cursor-pointer"
          style={{ borderRadius: radius, boxShadow: SHADOW[shadow], border: `1px solid ${NEUTRAL_LIGHTER}`, padding: 8, gap: 12 }}
        >
          <span className="shrink-0 overflow-hidden" style={{ width: 160, aspectRatio: '4 / 3', borderRadius: radius }}>
            {item.thumbnailUrl
              ? <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
              : <span className="w-full h-full flex items-center justify-center bg-sp-primary text-white text-heading">{item.name.slice(0, 2).toUpperCase()}</span>}
          </span>
          <span className="flex flex-col min-w-0 grow" style={{ gap: 12 }}>
            <span className="flex items-center gap-sm">
              <ResultIcon item={item} size={20} />
              <span className="font-semibold truncate text-[#323130]" style={{ fontSize: FONT_SIZE.SubjectTitle }}>{item.name}</span>
            </span>
            <span className="flex flex-wrap" style={{ gap: TILES_GAP }}>
              {item.properties.filter((p) => p.value).map((p) => (
                <span key={p.name} className="flex flex-col" style={{ minWidth: TILE_PROPERTY_MIN_WIDTH, gap: 4, flexBasis: p.type === 'longtext' ? '100%' : `calc((100% - ${TILES_GAP}px * 3) / 3)` }}>
                  <span className="font-semibold" style={{ fontSize: FONT_SIZE.BodyText }}>{p.displayName}</span>
                  <PropertyValue property={p} locale={locale} />
                </span>
              ))}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

/** Vue Table — colonnes : icône 20, nom, propriétés, actions 60. */
export function TableView({ items, config, locale }: ViewProps) {
  const columns = items[0]?.properties.map((p) => ({ name: p.name, displayName: p.displayName })) ?? [];
  return (
    <table className="w-full border-collapse" style={{ fontSize: FONT_SIZE.BodyText }}>
      <thead>
        <tr className="text-left" style={{ color: NEUTRAL_SECONDARY }}>
          <th style={{ width: LOGO_COLUMN_SIZE, padding: '8px 4px' }} />
          <th className="font-semibold" style={{ padding: '8px 4px' }}>Nom</th>
          {columns.map((c) => (
            <th key={c.name} className="font-semibold" style={{ padding: '8px 4px' }}>{c.displayName}</th>
          ))}
          <th style={{ width: ACTIONS_COLUMN_SIZE }} />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-sp-lighter-alt cursor-pointer" style={{ borderTop: `1px solid ${NEUTRAL_LIGHTER}` }}>
            <td style={{ padding: '8px 4px' }}><ResultIcon item={item} size={20} /></td>
            <td className="font-semibold text-[#323130]" style={{ padding: '8px 4px' }}>{item.name}</td>
            {columns.map((c) => {
              const p = item.properties.find((x) => x.name === c.name);
              return <td key={c.name} style={{ padding: '8px 4px' }}>{p?.value ? <PropertyValue property={p} locale={locale} /> : null}</td>;
            })}
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
