'use client';

import { MyResume, myResumeDefaultConfig } from '@/components/webparts/my-resume';
import { myResumeSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart My resume. */
export default function MyResumeDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <div className="grid grid-cols-2 gap-xl">
        <MyResume config={myResumeDefaultConfig} content={myResumeSeed('fr-FR')} />
        <MyResume config={{ ...myResumeDefaultConfig, height: 240, radius: 8, shadow: 'light' }} content={myResumeSeed('fr-FR')} />
      </div>
    </main>
  );
}
