import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { LocationRegular, ClockRegular, CalendarAddRegular } from '../Events.icons';
import {
  CARD_CONTAINER_GAP,
  CARD_CONTAINER_MIN_HEIGHT,
  CARD_CONTAINER_PADDING,
  DATE_MARGIN_LEFT,
  FONT_SIZE,
  FONT_WEIGHT,
  IMAGE_BORDER_RADIUS,
  IMAGE_GRADIENT,
  IMAGE_SIZE,
  NEUTRAL,
  SHADOW,
  TITLE_LOCATION_GAP,
} from '../Events.mozzaik';
import type { EventItem, EventsShadow } from '../Events.types';

interface EventCardProps {
  event: EventItem;
  index: number;
  radius: number;
  shadow?: EventsShadow;
  showAddToCalendar?: boolean;
  locale?: string;
  onClick?: () => void;
  onAddToCalendar?: () => void;
}

/**
 * Carte événement — port fidèle de `CardEvent` (@mozzaik365/components/events).
 * Disposition horizontale : vignette 64 (overlay date) | titre+lieu / date | bouton calendrier.
 * Valeurs exactes : gap 8, padding 8, minHeight 96, image 64/radius 4, marges 4,
 * typo SubjectTitle(16)/BodyText(14)/MetaData(12)/PaneHeader(20), neutres Fluent.
 */
export function EventCard({
  event,
  index,
  radius,
  shadow = 'Strong',
  showAddToCalendar = true,
  locale = 'fr-FR',
  onClick,
  onAddToCalendar,
}: EventCardProps) {
  const { title, location, startDate, isAllDay, imageUrl } = event;
  const start = new Date(startDate);

  const dayStr = start.toLocaleDateString(locale, { day: '2-digit' });
  const monthStr = start.toLocaleDateString(locale, { month: 'short' });
  const fullDateString = isAllDay
    ? start.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : start.toLocaleString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCalendar?.();
  };

  const cardStyle: CSSProperties = {
    gap: CARD_CONTAINER_GAP,
    padding: CARD_CONTAINER_PADDING,
    minHeight: CARD_CONTAINER_MIN_HEIGHT,
    borderRadius: radius,
    border: `1px solid ${NEUTRAL.lighter}`,
    boxShadow: SHADOW[shadow],
  };

  const imageStyle: CSSProperties = {
    width: IMAGE_SIZE,
    minWidth: IMAGE_SIZE,
    maxWidth: IMAGE_SIZE,
    borderRadius: IMAGE_BORDER_RADIUS,
    ...(imageUrl
      ? { background: `url("${imageUrl}") no-repeat center center / cover` }
      : undefined),
  };

  return (
    <div
      data-testid="event-card"
      onClick={onClick}
      className="flex bg-white cursor-pointer"
      style={cardStyle}
    >
      {/* Vignette 64×64 + overlay date */}
      <div
        className={cn(
          'relative flex shrink-0 items-center justify-center self-stretch overflow-hidden',
          !imageUrl && 'bg-sp-primary',
        )}
        style={imageStyle}
      >
        {imageUrl && <div className="absolute inset-0" style={{ background: IMAGE_GRADIENT }} />}
        <div className="relative flex flex-col items-center text-white leading-none">
          <span style={{ fontSize: FONT_SIZE.PaneHeader, fontWeight: FONT_WEIGHT.Bold }}>{dayStr}</span>
          <span style={{ fontSize: FONT_SIZE.MetaData, fontWeight: FONT_WEIGHT.Semibold }}>{monthStr}</span>
        </div>
      </div>

      {/* Centre — titre/lieu (haut) · date (bas) */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex flex-col" style={{ gap: TITLE_LOCATION_GAP }}>
          <InlineText
            as="h3"
            path={['events', index, 'title']}
            value={title}
            placeholder="Titre de l'événement"
            className="line-clamp-2 [word-break:keep-all]"
            style={{ fontSize: FONT_SIZE.SubjectTitle, fontWeight: FONT_WEIGHT.Semibold, color: NEUTRAL.dark }}
          />
          <div className="flex items-center min-w-0">
            <LocationRegular style={{ width: 16, height: 16, flexShrink: 0, color: NEUTRAL.secondary }} />
            <InlineText
              as="span"
              path={['events', index, 'location']}
              value={location ?? 'Aucun lieu'}
              placeholder="Lieu"
              className="truncate"
              style={{
                marginLeft: DATE_MARGIN_LEFT,
                fontSize: FONT_SIZE.BodyText,
                fontWeight: FONT_WEIGHT.Semibold,
                color: NEUTRAL.tertiary,
              }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <ClockRegular style={{ width: 16, height: 16, flexShrink: 0, color: NEUTRAL.secondary }} />
          <span
            style={{
              marginLeft: DATE_MARGIN_LEFT,
              fontSize: FONT_SIZE.MetaData,
              fontWeight: FONT_WEIGHT.Semibold,
              color: NEUTRAL.secondary,
            }}
          >
            {fullDateString}
          </span>
        </div>
      </div>

      {/* Bouton ajouter au calendrier */}
      {showAddToCalendar && (
        <button
          type="button"
          aria-label="Ajouter au calendrier"
          data-testid="add-to-calendar-button"
          onClick={handleAddToCalendar}
          className="shrink-0 self-start p-xs rounded-sm hover:bg-sp-lighter-alt transition-colors"
          style={{ color: NEUTRAL.primary }}
        >
          <CalendarAddRegular style={{ width: 20, height: 20 }} />
        </button>
      )}
    </div>
  );
}
