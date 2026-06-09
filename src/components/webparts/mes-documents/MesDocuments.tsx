'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { DocumentLinkCard } from './components/DocumentLinkCard';
import { FONT_SIZE, BODY_COLOR } from './MesDocuments.mozzaik';
import type { MesDocumentsProps } from './MesDocuments.types';

const MODIFIED_LABEL = 'Modifié le';

/**
 * Webpart Mes documents — port fidèle de `webpart_legacy/mzkMyDocuments`
 * rendu via le visuel Links L. Titre (WebPartTitle) + liste de cartes
 * horizontales qui wrap (3 colonnes ≥1024px, 2 ≥640px, 1 sinon).
 */
export function MesDocuments({ config, content, isEditMode = false }: MesDocumentsProps) {
  const documents = content.documents.slice(0, config.nbItems);

  return (
    <section style={{ color: BODY_COLOR }}>
      {(config.title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: 48, padding: '0 8px 0 0' }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={config.title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.paneHeader }}
          />
        </div>
      )}

      <div className="@container flex flex-wrap">
        {documents.map((document, i) => (
          <DocumentLinkCard
            key={document.id}
            document={document}
            index={i}
            modifiedLabel={MODIFIED_LABEL}
            isEditMode={isEditMode}
          />
        ))}
      </div>
    </section>
  );
}
