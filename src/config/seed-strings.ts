import type { Locale } from '@/types/project';
import type { SeedStrings } from './seed-strings.types';
import { seedFrFR } from './seed-strings.fr-FR';
import { seedEn } from './seed-strings.en';

export type { SeedStrings } from './seed-strings.types';

/** Français canadien : hérite de fr-FR, surcharge les régionalismes (courriel, infolettre, 5 à 7, lieux québécois…). */
const seedFrCA: SeedStrings = {
  ...seedFrFR,
  events: [
    { title: 'Assemblée générale annuelle', location: 'Auditorium' },
    { title: 'Atelier conformité & Loi 25', location: 'Salle Mont-Royal' },
    { title: '5 à 7 d’équipe', location: 'Terrasse' },
  ],
  myEmails: seedFrFR.myEmails.map((m, i) => {
    if (i === 2) return { subject: 'Rappel : formation cybersécurité', preview: 'La session de sensibilisation a lieu jeudi à 14 h en salle Mont-Royal. Inscription obligatoire.' };
    if (i === 0) return { ...m, preview: 'Bonjour, peux-tu relire la note avant l’envoi du courriel à l’ensemble des équipes ? Merci !' };
    return m;
  }),
  newshub: seedFrFR.newshub.map((c, i) => {
    if (i === 1) return 'Notre équipe sera présente au salon Digital Workplace Montréal la semaine prochaine. Venez nous rencontrer au kiosque B12 ! #DigitalWorkplace #Intranet';
    if (i === 2) return 'Nouveau tutoriel : créer une infolettre interne en 5 minutes.';
    return c;
  }),
  myTasks: seedFrFR.myTasks.map((l, i) =>
    i === 1 ? { ...l, tasks: [{ title: 'Réserver la salle pour l’atelier Loi 25' }, { title: 'Mettre à jour le bottin des équipes' }] } : l,
  ),
  docs: ['Plan stratégique 2026', 'Budget prévisionnel T3', 'Compte-rendu comité de direction', 'Politique de télétravail'],
};

const DICTIONARIES: Record<Locale, SeedStrings> = {
  'fr-FR': seedFrFR,
  'fr-CA': seedFrCA,
  'en': seedEn,
};

/** Textes des seeds pour une locale (fallback fr-FR). */
export function getSeedStrings(locale?: Locale | null): SeedStrings {
  return DICTIONARIES[locale ?? 'fr-FR'] ?? seedFrFR;
}
