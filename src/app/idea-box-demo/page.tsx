'use client';

import { IdeaBox, ideaBoxDefaultConfig } from '@/components/webparts/idea-box';
import { ideaBoxSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Boîte à idées. */
export default function IdeaBoxDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg bg-[#faf9f8] min-h-screen">
      <div className="bg-white rounded-md p-lg">
        <IdeaBox config={ideaBoxDefaultConfig} content={ideaBoxSeed('fr-FR')} />
      </div>
    </main>
  );
}
