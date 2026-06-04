// Helpers purs pour la manipulation de sections/colonnes (réutilisés par le store
// et l'éditeur). Aucune dépendance React/Zustand.
import type { Column, Section, SectionLayout } from '@/types/project';
import { getColumnCount } from '@/components/canvas/section-layout';

/** Choix de layout dans le picker : les 7 layouts + la section verticale. */
export type SectionChoice = SectionLayout | 'vertical';

let uid = 0;
/** Identifiant stable côté client (préfixe + compteur + timestamp). */
export const genId = (prefix: string): string => `${prefix}-${Date.now()}-${uid++}`;

/** Crée `n` colonnes vides indexées de 0 à n-1. */
export const emptyColumns = (n: number): Column[] =>
  Array.from({ length: n }, (_, i) => ({ id: genId('col'), index: i, webparts: [] }));

/** Crée une section neuve à partir d'un choix de layout. */
export function makeSection(choice: SectionChoice): Section {
  const layout: SectionLayout = choice === 'vertical' ? 'one-column' : choice;
  return {
    id: genId('section'),
    order: 0,
    layout,
    background: 'none',
    backgroundImage: null,
    collapsible: false,
    title: null,
    columns: emptyColumns(getColumnCount(layout)),
  };
}

/**
 * Change le layout d'une section en préservant les webparts.
 * Si le nouveau layout a moins de colonnes, les webparts des colonnes en trop
 * sont fusionnés dans la dernière colonne conservée.
 */
export function relayoutSection(section: Section, choice: SectionChoice): Section {
  const layout: SectionLayout = choice === 'vertical' ? 'one-column' : choice;
  const target = getColumnCount(layout);
  const cur = section.columns;
  let columns: Column[];
  if (target >= cur.length) {
    columns = [
      ...cur,
      ...emptyColumns(target - cur.length).map((c, i) => ({ ...c, index: cur.length + i })),
    ];
  } else {
    const kept = cur.slice(0, target).map((c) => ({ ...c, webparts: [...c.webparts] }));
    cur.slice(target).forEach((c) => kept[target - 1].webparts.push(...c.webparts));
    columns = kept;
  }
  return {
    ...section,
    layout,
    columns: columns.map((c, i) => ({ ...c, index: i, webparts: c.webparts.map((w, o) => ({ ...w, order: o })) })),
  };
}

/** Ré-ordonne les sections selon leur position dans le tableau. */
export const reorderSections = (sections: Section[]): Section[] =>
  sections.map((s, i) => ({ ...s, order: i }));
