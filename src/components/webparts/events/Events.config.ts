import type { EventsConfig } from './Events.types';

/**
 * Défauts repris du manifest events (preconfiguredEntries) :
 * radius "pill" = 12px, shadow "Strong", titre de section visible.
 */
export const eventsDefaultConfig: EventsConfig = {
  title: '',
  maxItems: 4,
  radius: 12,
  shadow: 'Strong',
  showAddToCalendar: true,
};

export const eventsConfigMeta = {
  typeId: 'events',
  displayName: 'Events',
  category: 'evenements',
  wave: 1,
  icon: 'calendar-days',
  description: "Affiche les prochains événements internes sous forme de tuiles.",
  configurableProps: [
    {
      key: 'title',
      label: 'Titre de section',
      type: 'string' as const,
      placeholder: 'Événements',
    },
    {
      key: 'maxItems',
      label: "Nombre d'événements",
      type: 'number' as const,
    },
    {
      key: 'radius',
      label: 'Arrondis (px)',
      type: 'number' as const,
    },
    {
      key: 'showAddToCalendar',
      label: 'Bouton « Ajouter au calendrier »',
      type: 'boolean' as const,
    },
  ],
};
