'use client';

import { ActionButton, actionButtonDefaultConfig } from '@/components/webparts/action-button';
import { actionButtonSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Action button. */
export default function ActionButtonDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <div className="grid grid-cols-3 gap-xl bg-white rounded-md">
        <ActionButton config={{ ...actionButtonDefaultConfig, height: 128 }} content={actionButtonSeed} />
        <ActionButton config={{ ...actionButtonDefaultConfig, height: 128, type: 'Secondary', size: 'medium' }} content={actionButtonSeed} />
        <ActionButton config={{ ...actionButtonDefaultConfig, height: 128, size: 'large', position: 'end', radius: 4, customColor: '#e04b2c' }} content={actionButtonSeed} />
      </div>
    </main>
  );
}
