import { Docs, docsDefaultConfig } from '@/components/webparts/docs';
import { docsSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Docs. */
export default function DocsDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <Docs config={{ ...docsDefaultConfig, title: 'Mes fichiers récents' }} content={docsSeed('fr-FR')} />
      <Docs config={{ ...docsDefaultConfig, height: 208, padding: 16, shadow: 'strong' }} content={docsSeed('fr-FR')} />
    </main>
  );
}
