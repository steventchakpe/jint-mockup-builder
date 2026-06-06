'use client';

import { Newshub, newshubDefaultConfig } from '@/components/webparts/newshub';
import { newshubSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Newshub. */
export default function NewshubDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <Newshub config={{ ...newshubDefaultConfig, title: 'Sur les réseaux' }} content={newshubSeed('fr-FR')} />
      <div className="max-w-[560px]">
        <Newshub config={{ ...newshubDefaultConfig, radius: 4, shadow: 'medium' }} content={newshubSeed('fr-FR')} />
      </div>
    </main>
  );
}
