/**
 * Types portés de `@mozzaik365/components/my-meetings` (ListViewLayout / MeetingCard).
 * Agenda Outlook : cartes réunion (1 sélectionnée par slide) + navigation carousel.
 */

export type MyMeetingsShadow = 'none' | 'light' | 'medium' | 'strong';

/** Port de MeetingStatusType (getStatus). */
export type MeetingStatus = 'accepted' | 'tentativelyAccepted' | 'notResponded' | 'cancelled' | 'declined';

export interface MeetingAttendee {
  name: string;
  imageUrl?: string;
}

export interface MeetingItem {
  id: string;
  subject: string;
  /** Début/fin ISO. */
  startTime: string;
  endTime: string;
  isAllDay?: boolean;
  status: MeetingStatus;
  isOnlineMeeting?: boolean;
  /** Réunion récurrente (icône répétition). */
  isOccurrence?: boolean;
  hasAttachments?: boolean;
  attendees: MeetingAttendee[];
}

export interface MyMeetingsConfig {
  /** Titre (manifest : htmlTitle → « Mes réunions »). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : Strong). */
  shadow: MyMeetingsShadow;
}

export interface MyMeetingsContent {
  meetings: MeetingItem[];
}

export interface MyMeetingsProps {
  config: MyMeetingsConfig;
  content: MyMeetingsContent;
  isEditMode?: boolean;
  locale?: string;
}
