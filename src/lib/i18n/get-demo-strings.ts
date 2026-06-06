// Accès aux dictionnaires SANS 'use client' — utilisable côté serveur
// (createBlankProject, API routes) comme côté client (hooks de index.ts).
import { frFR } from './demo-strings.fr-FR';
import { frCA } from './demo-strings.fr-CA';
import { en } from './demo-strings.en';
import type { DemoStrings } from './demo-strings.types';
import type { Locale } from '@/types/project';

const DICTIONARIES: Record<Locale, DemoStrings> = {
  'fr-FR': frFR,
  'fr-CA': frCA,
  'en': en,
};

/** Dictionnaire d'une locale (fallback fr-FR). Utilisable hors React (seeds, utils). */
export function getDemoStrings(locale?: Locale | null): DemoStrings {
  return DICTIONARIES[locale ?? 'fr-FR'] ?? frFR;
}
