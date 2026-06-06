'use client';

import { MyTasks, myTasksDefaultConfig } from '@/components/webparts/my-tasks';
import { myTasksSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart My tasks. */
export default function MyTasksDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <div className="grid grid-cols-2 gap-xl">
        <MyTasks config={myTasksDefaultConfig} content={myTasksSeed('fr-FR')} />
        <MyTasks config={{ ...myTasksDefaultConfig, radius: 8, height: 300 }} content={myTasksSeed('fr-FR')} />
      </div>
    </main>
  );
}
