'use client';

import { useState } from 'react';
import { ImageInteractive, imageInteractiveDefaultConfig } from '@/components/webparts/image-interactive';
import type { ImageInteractiveContent } from '@/components/webparts/image-interactive';
import { WebpartEditProvider } from '@/components/canvas/edit/inline-edit';
import { imageInteractiveSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Image interactive (+ mode édition). */
export default function ImageInteractiveDemoPage() {
  const [content, setContent] = useState<ImageInteractiveContent>(imageInteractiveSeed('fr-FR') as ImageInteractiveContent);
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <ImageInteractive config={{ ...imageInteractiveDefaultConfig, title: 'Nos locaux' }} content={content} />

      <h2 className="text-heading-sm font-semibold">Mode Édition (pose de pins/zones, sélection, drag)</h2>
      <WebpartEditProvider
        content={content}
        config={imageInteractiveDefaultConfig}
        commitContent={(next) => setContent(next as ImageInteractiveContent)}
        commitConfig={() => {}}
      >
        <ImageInteractive config={{ ...imageInteractiveDefaultConfig, title: 'Nos locaux' }} content={content} isEditMode />
      </WebpartEditProvider>
    </main>
  );
}
