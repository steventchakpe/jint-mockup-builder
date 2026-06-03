import type { EmployeeDirectoryConfig } from './EmployeeDirectory.types';

/**
 * Défauts repris du manifest mzkWhoIsWho (preconfiguredEntries) :
 * pageSize 10, rounded "normal", shadow "medium".
 */
export const employeeDirectoryDefaultConfig: EmployeeDirectoryConfig = {
  title: '',
  description: '',
  pageSize: 10,
  rounded: 'normal',
  shadow: 'medium',
};

export const employeeDirectoryConfigMeta = {
  typeId: 'employee-directory',
  displayName: 'Employee Directory',
  category: 'annuaire',
  wave: 1,
  icon: 'users',
  description: 'Trombinoscope — annuaire d’employés avec recherche et fiches profil.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const, placeholder: 'Trombinoscope' },
    { key: 'description', label: 'Description', type: 'string' as const },
    { key: 'pageSize', label: 'Cartes par page', type: 'number' as const },
    {
      key: 'rounded',
      label: 'Arrondis',
      type: 'select' as const,
      options: [
        { value: 'none', label: 'Aucun' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Grand' },
      ],
    },
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
  ],
};
