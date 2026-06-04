import type { PeopleConfig } from './People.types';

/**
 * Défauts repris du manifest people (2 preconfiguredEntries) :
 * height M (416 → cartes verticales), radius pill (12), shadow Medium.
 */
export const newcomersDefaultConfig: PeopleConfig = {
  mode: 'Newcomers',
  title: '',
  height: 416,
  radius: 12,
  shadow: 'medium',
};

export const anniversaryDefaultConfig: PeopleConfig = {
  mode: 'Anniversaries',
  title: '',
  height: 416,
  radius: 12,
  shadow: 'medium',
};

const sharedProps = [
  { key: 'title', label: 'Titre', type: 'string' as const },
  { key: 'height', label: 'Hauteur (px)', type: 'number' as const },
  { key: 'radius', label: 'Arrondis (px)', type: 'number' as const },
  {
    key: 'shadow',
    label: 'Ombre',
    type: 'select' as const,
    options: [
      { value: 'none', label: 'Aucune' },
      { value: 'light', label: 'Légère' },
      { value: 'medium', label: 'Moyenne' },
      { value: 'strong', label: 'Forte' },
    ],
  },
];

export const newcomersConfigMeta = {
  typeId: 'newcomers',
  displayName: 'Newcomers',
  category: 'annuaire',
  wave: 1,
  icon: 'user-plus',
  description: 'Nouveaux arrivants — met en avant les dernières recrues.',
  configurableProps: sharedProps,
};

export const anniversaryConfigMeta = {
  typeId: 'anniversary',
  displayName: 'Professional anniversaries',
  category: 'annuaire',
  wave: 1,
  icon: 'party-popper',
  description: 'Anniversaires professionnels — célèbre l’ancienneté des employés.',
  configurableProps: sharedProps,
};
