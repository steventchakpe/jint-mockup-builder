'use client';

import type { EventsProps } from './Events.types';
import { EventCard } from './components/EventCard';

/**
 * Webpart Events — port fidèle de `EventsTilesLayout` (@mozzaik365/components/events).
 *
 * Le rendu original s'appuie sur `GridCarousel` avec les breakpoints
 * `columns: [606, 915, 1224]` : la grille passe de 1 → 2 → 3 → 4 colonnes selon
 * la largeur du CONTENEUR (pas de la fenêtre). On reproduit ce comportement
 * responsive avec des container queries (`@container`), identiques aux paliers.
 */
export function Events({
  config,
  content,
  isEditMode = false,
  onEventClick,
  onAddToCalendar,
}: EventsProps) {
  const { title, radius, shadow, showAddToCalendar, maxItems = 4 } = config;
  const events = content.events.slice(0, maxItems);

  const handleClick = (eventId: string) => {
    if (isEditMode) return;
    onEventClick?.(eventId);
  };

  return (
    <section className="flex flex-col gap-xl p-md">
      {title && <h2 className="text-heading font-semibold text-sp-darker">{title}</h2>}

      {events.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">Aucun événement à venir.</p>
      ) : (
        <div className="@container">
          <div className="grid grid-cols-1 gap-md @[606px]:grid-cols-2 @[915px]:grid-cols-3 @[1224px]:grid-cols-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                radius={radius}
                shadow={shadow}
                showAddToCalendar={showAddToCalendar}
                onClick={() => handleClick(event.id)}
                onAddToCalendar={() => onAddToCalendar?.(event.id)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
