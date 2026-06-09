'use client';

import { VivaEngage, vivaEngageDefaultConfig } from '@/components/webparts/viva-engage';
import { vivaEngageSeed } from '@/config/webpart-seeds';

/** Page démo — Viva Engage (Conversations). */
export default function VivaEngageDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg bg-[#faf9f8] min-h-screen">
      <VivaEngage config={vivaEngageDefaultConfig} content={vivaEngageSeed('fr-FR')} />
    </main>
  );
}
