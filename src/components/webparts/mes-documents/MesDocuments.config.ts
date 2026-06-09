import type { MesDocumentsConfig } from './MesDocuments.types';

/** Défauts manifest MzkMyDocumentsWebPart : nbItems 5. */
export const mesDocumentsDefaultConfig: MesDocumentsConfig = {
  title: '',
  nbItems: 5,
};

export const mesDocumentsConfigMeta = {
  typeId: 'mes-documents',
  displayName: 'My documents',
  category: 'productivite',
  wave: 3,
  icon: 'file-clock',
  description: 'Mes documents récents (consultés/modifiés), liste personnelle.',
  configurableProps: [
    { key: 'title', label: 'Titre', type: 'string' as const },
    {
      key: 'nbItems',
      label: 'Nombre de documents',
      type: 'select' as const,
      options: [
        { value: 3, label: '3' },
        { value: 5, label: '5' },
        { value: 10, label: '10' },
      ],
    },
  ],
};
