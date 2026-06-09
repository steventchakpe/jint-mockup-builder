'use client';

import { MesAbonnements, mesAbonnementsDefaultConfig } from '@/components/webparts/mes-abonnements';
import { newsSeed } from '@/config/webpart-seeds';

/** Page démo — Mes abonnements (= News + paramètre my-feed). */
export default function MesAbonnementsDemoPage() {
  const content = newsSeed('fr-FR');
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg bg-[#faf9f8] min-h-screen flex flex-col gap-2xl">
      <div className="bg-white rounded-md">
        <MesAbonnements config={{ ...mesAbonnementsDefaultConfig, title: 'Mes abonnements' }} content={content} />
      </div>
      <div className="bg-white rounded-md">
        <MesAbonnements config={{ ...mesAbonnementsDefaultConfig, layout: 'topStory', title: 'Mes abonnements' }} content={content} />
      </div>
    </main>
  );
}
