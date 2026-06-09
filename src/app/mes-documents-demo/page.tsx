'use client';

import { MesDocuments, mesDocumentsDefaultConfig } from '@/components/webparts/mes-documents';
import { mesDocumentsSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Mes documents. */
export default function MesDocumentsDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg bg-[#faf9f8] min-h-screen">
      <div className="bg-white rounded-md p-lg">
        <MesDocuments
          config={{ ...mesDocumentsDefaultConfig, title: 'Mes documents récents' }}
          content={mesDocumentsSeed('fr-FR')}
        />
      </div>
    </main>
  );
}
