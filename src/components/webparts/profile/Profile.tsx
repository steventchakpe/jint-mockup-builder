'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { ProfileCard } from './components/ProfileCard';
import { FONT_SIZE, HEADER_HEIGHT } from './Profile.mozzaik';
import type { ProfileProps } from './Profile.types';

/**
 * Webpart Profile — port fidèle de `CompactLayout` (@mozzaik365/components/profile).
 *
 * BaseLayout : le manifest ne définit pas de padding → l'ombre et le radius
 * s'appliquent à la ProfileCard (contentShadow), pas au conteneur.
 * Header (LayoutHeader) : titre PaneHeader (20) semibold, hauteur 48.
 * Carte : disposition horizontale (horizontalLayout = true), centrée dans la zone.
 */
export function Profile({ config, content, isEditMode = false, onChatClick }: ProfileProps) {
  const { title, height } = config;

  const zoneStyle: CSSProperties = { height };

  return (
    <section className="flex flex-col">
      {(title || isEditMode) && (
        <div className="flex items-center" style={{ height: HEADER_HEIGHT, padding: '0 8px 0 0' }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.PaneHeader }}
          />
        </div>
      )}

      <div style={zoneStyle}>
        <ProfileCard config={config} profile={content.profile} isEditMode={isEditMode} onChatClick={onChatClick} />
      </div>
    </section>
  );
}
