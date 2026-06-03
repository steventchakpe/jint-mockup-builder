export type EventsShadow = 'None' | 'Light' | 'Medium' | 'Strong';

/**
 * Un événement affiché par le webpart Events.
 * Porté depuis `IEvent` (@mozzaik365/components/events), dépouillé de tout
 * couplage SharePoint : le contenu arrive en props, jamais d'appel de service.
 */
export interface EventItem {
  id: string;
  title: string;
  /** Lieu de l'événement (affiché à côté de l'icône Location). */
  location?: string;
  /** Date de début ISO 8601 (ex: "2026-05-14T09:00:00"). */
  startDate: string;
  /** Date de fin ISO 8601 (optionnelle). */
  endDate?: string;
  /** Événement sur toute la journée → on masque l'heure. */
  isAllDay?: boolean;
  /** Image de vignette (URL Unsplash résolue ou uploadée). */
  imageUrl?: string;
  /** Lien cliquable de l'événement (ouvert en mode Présentation). */
  url?: string;
}

export interface EventsConfig {
  /** Titre de section affiché au-dessus de la grille. */
  title?: string;
  /** Nombre maximum d'événements rendus. */
  maxItems?: number;
  /** Arrondi des cartes en px (pill=12, rounded=8, semiRounded=4). */
  radius: number;
  /** Intensité de l'ombre des cartes. */
  shadow?: EventsShadow;
  /** Affiche le bouton « Ajouter au calendrier » sur chaque carte. */
  showAddToCalendar: boolean;
}

export interface EventsContent {
  events: EventItem[];
}

export interface EventsProps {
  config: EventsConfig;
  content: EventsContent;
  isEditMode?: boolean;
  /** Clic sur une carte (navigation simulée en mode Présentation). */
  onEventClick?: (eventId: string) => void;
  /** Clic sur « Ajouter au calendrier ». */
  onAddToCalendar?: (eventId: string) => void;
}
