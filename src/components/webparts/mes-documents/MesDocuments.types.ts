/**
 * Types portés de `webpart_legacy/mzkMyDocuments` (Mes documents).
 * Rendu via le visuel Links variante L (`src/visuals/links/Link.L.tsx`).
 * Item = MzkDocumentCard : { Title, URL, FileType, LastModificationDate, ModifiedBy }.
 */

export interface MesDocumentsItem {
  id: string;
  title: string;
  url: string;
  /** Extension sans point (ex : "docx", "pdf"). */
  fileType: string;
  /** Date de dernière modification (ISO). */
  modifiedDate: string;
  /** Nom de la personne ayant modifié le document. */
  modifiedBy: string;
}

export interface MesDocumentsConfig {
  /** Titre du webpart (WebPartTitle). */
  title?: string;
  /** Nombre de documents affichés (manifest : 5). */
  nbItems: number;
}

export interface MesDocumentsContent {
  documents: MesDocumentsItem[];
}

export interface MesDocumentsProps {
  config: MesDocumentsConfig;
  content: MesDocumentsContent;
  isEditMode?: boolean;
}
