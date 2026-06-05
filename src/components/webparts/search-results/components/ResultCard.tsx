'use client';

import type { CSSProperties } from 'react';
import { FileKindIcon } from '@/components/webparts/docs/Docs.icons';
import { fileKindFromExtension } from '@/components/webparts/docs/Docs.mozzaik';
import {
  CARD_PADDING,
  CARD_TEXT_GAP,
  ICON_CONTAINER_PADDING,
  ICON_CONTAINER_RADIUS,
  IMAGE_RATIO,
  IMAGE_TEXT_GAP,
  NEUTRAL_LIGHTER,
  NEUTRAL_SECONDARY,
  OVERLAY_HEIGHT,
  OVERLAY_PADDING,
  FONT_SIZE,
  SHADOW,
} from '../SearchResults.mozzaik';
import type { ResultProperty, SearchResultItem, SearchResultsConfig } from '../SearchResults.types';

const initials = (name: string) =>
  name.trim().split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

/** Valeur de propriété (texte / date / user / tags). */
export function PropertyValue({ property, locale = 'fr-FR' }: { property: ResultProperty; locale?: string }) {
  if (property.type === 'tags') {
    const tags = Array.isArray(property.value) ? property.value : [property.value];
    return (
      <span className="flex flex-wrap" style={{ gap: 4 }}>
        {tags.map((t) => (
          <span key={t} className="bg-sp-lighter-alt text-sp-primary rounded-sm px-xs" style={{ fontSize: FONT_SIZE.MetaData }}>{t}</span>
        ))}
      </span>
    );
  }
  const text = property.type === 'date'
    ? new Date(String(property.value)).toLocaleDateString(locale)
    : String(property.value);
  return <span style={{ fontSize: FONT_SIZE.BodyText, color: NEUTRAL_SECONDARY }}>{text}</span>;
}

/** Icône de résultat selon contentType/extension (SearchResultIcon). */
export function ResultIcon({ item, size = 20 }: { item: SearchResultItem; size?: number }) {
  if (item.contentType === 'document' && item.extension) {
    return <FileKindIcon kind={fileKindFromExtension(item.extension)} size={size} />;
  }
  // site / news / page / person → initiales colorées (fallback CardSiteInitials)
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-sp-primary text-white font-semibold" style={{ width: size, height: size, fontSize: size * 0.45 }}>
      {initials(item.name)}
    </span>
  );
}

/**
 * ResultCard — port fidèle : carte cliquable padding 8, bordure 1px, vignette
 * 4/3 avec overlay (pastille icône fond noir 40 %, dégradé + actions au survol),
 * titre SubjectTitle semibold 2 lignes + propriétés (gap 8).
 * Site sans vignette → initiales sur fond themePrimary.
 */
export function ResultCard({ item, config, locale }: { item: SearchResultItem; config: SearchResultsConfig; locale?: string }) {
  const { radius, shadow } = config;
  const cardStyle: CSSProperties = { padding: CARD_PADDING, gap: IMAGE_TEXT_GAP, borderRadius: radius, border: `1px solid ${NEUTRAL_LIGHTER}` };

  return (
    <a
      href={item.url ?? '#'}
      onClick={(e) => { if (!item.url || item.url === '#') e.preventDefault(); }}
      className="group/card flex flex-col bg-white cursor-pointer transition-shadow hover:border-sp-light"
      style={cardStyle}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = SHADOW[shadow === 'none' ? 'medium' : shadow] ?? ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
      data-testid="search-result-card"
    >
      <span className="relative overflow-hidden" style={{ borderRadius: radius, aspectRatio: IMAGE_RATIO }}>
        {item.thumbnailUrl ? (
          <img src={item.thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-sp-primary text-white" style={{ fontSize: '3em' }}>
            {initials(item.name)}
          </span>
        )}
        {/* Overlay : pastille icône + dégradé au survol */}
        <span
          className="absolute inset-x-0 top-0 flex items-start justify-between transition-colors group-hover/card:bg-gradient-to-b group-hover/card:from-black/40 group-hover/card:to-transparent"
          style={{ height: OVERLAY_HEIGHT, padding: OVERLAY_PADDING, borderRadius: radius }}
        >
          <span className="inline-flex text-sp-lighter" style={{ padding: ICON_CONTAINER_PADDING, borderRadius: ICON_CONTAINER_RADIUS, background: 'rgba(0,0,0,0.4)' }}>
            <ResultIcon item={item} size={20} />
          </span>
        </span>
      </span>

      <span className="flex flex-col" style={{ gap: CARD_TEXT_GAP }}>
        <span
          className="font-semibold text-[#323130]"
          style={{ fontSize: FONT_SIZE.SubjectTitle, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
        >
          {item.name}
        </span>
        {item.properties.filter((p) => p.value).slice(0, 2).map((p) => (
          <PropertyValue key={p.name} property={p} locale={locale} />
        ))}
      </span>
    </a>
  );
}
