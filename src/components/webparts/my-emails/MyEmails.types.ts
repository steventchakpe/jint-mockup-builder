/**
 * Types portés de `@mozzaik365/components/my-emails` (ListViewLayout / CardMail).
 * Boîte de réception Outlook : cartes mail empilées + navigation carousel.
 */

export type MyEmailsShadow = 'none' | 'light' | 'medium' | 'strong';

export interface MailItem {
  id: string;
  /** Expéditeur. */
  displayName: string;
  /** Avatar de l'expéditeur (sinon initiales). */
  imageUrl?: string;
  /** Date/heure de réception (ISO). */
  receptHour: string;
  subject: string;
  bodyPreview: string;
  isRead: boolean;
  hasAttachments?: boolean;
  webLink?: string;
}

export interface MyEmailsConfig {
  /** Titre (manifest : htmlTitle → « Mes e-mails »). */
  title?: string;
  /** Hauteur de la zone en px (manifest : M = 416). */
  height: number;
  /** Rayon des cartes en px (manifest : pill = 12). */
  radius: number;
  /** Ombre des cartes (manifest : Strong). */
  shadow: MyEmailsShadow;
}

export interface MyEmailsContent {
  emails: MailItem[];
}

export interface MyEmailsProps {
  config: MyEmailsConfig;
  content: MyEmailsContent;
  isEditMode?: boolean;
  locale?: string;
}
