'use client';

import { Poll } from '@/components/webparts/poll';
import { pollSeed } from '@/config/webpart-seeds';
import { getSeedStrings } from '@/config/seed-strings';

/** Page démo temporaire — vérification visuelle du webpart Sondage (non voté + voté). */
export default function PollDemoPage() {
  const title = getSeedStrings('fr-FR').poll.title;
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg bg-[#faf9f8] min-h-screen grid grid-cols-2 gap-xl">
      <div className="bg-white rounded-md p-lg">
        <Poll config={{ title }} content={pollSeed('fr-FR')} />
      </div>
      <div className="bg-white rounded-md p-lg">
        <Poll config={{ title }} content={{ ...pollSeed('fr-FR'), userHasVoted: true }} />
      </div>
    </main>
  );
}
