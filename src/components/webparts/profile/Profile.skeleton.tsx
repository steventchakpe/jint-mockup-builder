import type { CSSProperties } from 'react';
import {
  CONTAINER_GAP,
  PERSONA_SIZE,
  PROFILE_CARD_PADDING,
  SHADOW,
  SUB_TEXT_GAP,
} from './Profile.mozzaik';
import { profileDefaultConfig } from './Profile.config';
import type { ProfileConfig } from './Profile.types';

/** Skeleton — même structure que ProfileCardSkeleton (cercle 100 + lignes 250/175/2×100/80). */
export function ProfileSkeleton({ config = profileDefaultConfig }: { config?: ProfileConfig }) {
  const { height, radius, shadow } = config;
  const cardStyle: CSSProperties = {
    height,
    gap: CONTAINER_GAP,
    padding: PROFILE_CARD_PADDING,
    borderRadius: radius,
    boxShadow: SHADOW[shadow],
  };
  const line = 'rounded-xs bg-sp-lighter-alt animate-pulse';
  return (
    <div className="flex w-full items-center justify-center bg-white" style={cardStyle}>
      <div className="flex items-center" style={{ gap: CONTAINER_GAP }}>
        <div className={`${line} rounded-full shrink-0`} style={{ width: PERSONA_SIZE, height: PERSONA_SIZE }} />
        <div className="flex flex-col" style={{ gap: SUB_TEXT_GAP }}>
          <div className={line} style={{ width: 250, height: 25 }} />
          <div className={line} style={{ width: 175, height: 16 }} />
          <div className="flex" style={{ gap: 12 }}>
            <div className={line} style={{ width: 100, height: 20 }} />
            <div className={line} style={{ width: 100, height: 20 }} />
          </div>
          <div className={line} style={{ width: 80, height: 32 }} />
        </div>
      </div>
    </div>
  );
}
