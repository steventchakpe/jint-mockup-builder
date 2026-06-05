'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import {
  ACTION_BUTTONS_GAP,
  AVATAR_SHADOW,
  CONTAINER_GAP,
  FONT_SIZE,
  INFO_CONTAINER_GAP,
  NEUTRAL_SECONDARY,
  NEUTRAL_TERTIARY,
  PERSONA_BORDER_WIDTH,
  PERSONA_SIZE,
  PROFILE_CARD_PADDING,
  SHADOW,
  SUB_TEXT_CONTAINER_GAP,
  SUB_TEXT_GAP,
  TEXT_GAP,
} from '../Profile.mozzaik';
import { ChatIcon, EditIcon, LocationIcon, MailIcon, PeopleCommunityIcon } from '../Profile.icons';
import type { ProfileConfig, ProfilePerson } from '../Profile.types';

interface ProfileCardProps {
  config: ProfileConfig;
  profile: ProfilePerson;
  isEditMode?: boolean;
  onChatClick?: (email: string) => void;
}

/** IconButton ghost tertiaryTheme (ActionButtons) — Chat / Mail pour un autre utilisateur. */
function GhostIconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="w-8 h-8 inline-flex items-center justify-center rounded-sm text-sp-primary hover:bg-sp-lighter-alt active:bg-sp-lighter transition-colors"
    >
      {children}
    </button>
  );
}

/**
 * ProfileCard — port fidèle (profile.js) : carte centrée (gap/padding 16),
 * Persona 100px (cercle, bordure 2px blanche, ombre Medium), nom PaneHeader
 * bold themePrimary, poste MetaData bold neutralSecondary MAJUSCULES,
 * département/lieu MetaData + icônes 16 neutralTertiary séparés d'un divider 16px.
 */
export function ProfileCard({ config, profile, isEditMode = false, onChatClick }: ProfileCardProps) {
  const { radius, shadow, specificProfile } = config;

  const cardStyle: CSSProperties = {
    gap: CONTAINER_GAP,
    padding: PROFILE_CARD_PADDING,
    borderRadius: radius,
    boxShadow: SHADOW[shadow],
  };

  const onMessage = () => {
    if (isEditMode) return;
    onChatClick?.(profile.email ?? '');
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-white" style={cardStyle} data-testid="profile-card-container">
      <div className="flex items-center" style={{ gap: CONTAINER_GAP }}>
        {/* Persona Size100 */}
        <div
          className="shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt border-white"
          style={{ width: PERSONA_SIZE, height: PERSONA_SIZE, borderWidth: PERSONA_BORDER_WIDTH, boxShadow: AVATAR_SHADOW }}
          data-testid="profile-card-persona"
        >
          {profile.avatar && <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />}
        </div>

        <div className="flex flex-col items-start min-w-0" style={{ gap: INFO_CONTAINER_GAP }}>
          <div className="flex flex-col" style={{ gap: TEXT_GAP }}>
            <div className="flex flex-col" style={{ gap: SUB_TEXT_GAP }}>
              <InlineText
                as="span"
                path={['profile', 'name']}
                value={profile.name}
                placeholder="Nom du collaborateur"
                className="font-bold text-sp-primary truncate"
                style={{ fontSize: FONT_SIZE.PaneHeader }}
              />
              {(profile.jobTitle || isEditMode) && (
                <InlineText
                  as="span"
                  path={['profile', 'jobTitle']}
                  value={profile.jobTitle}
                  placeholder="Poste"
                  className="font-bold uppercase truncate"
                  style={{ fontSize: FONT_SIZE.MetaData, color: NEUTRAL_SECONDARY }}
                />
              )}
            </div>

            {(profile.department || profile.location || isEditMode) && (
              <div className="flex items-center" style={{ gap: SUB_TEXT_CONTAINER_GAP }}>
                {(profile.department || isEditMode) && (
                  <span className="flex items-center" style={{ gap: SUB_TEXT_GAP }}>
                    <PeopleCommunityIcon className="shrink-0" style={{ width: 16, height: 16, color: NEUTRAL_TERTIARY }} aria-hidden />
                    <InlineText
                      as="span"
                      path={['profile', 'department']}
                      value={profile.department}
                      placeholder="Département"
                      className="truncate text-[#323130]"
                      style={{ fontSize: FONT_SIZE.MetaData }}
                    />
                  </span>
                )}
                {profile.department && profile.location && (
                  <span className="w-px" style={{ height: 16, background: NEUTRAL_TERTIARY }} aria-hidden />
                )}
                {(profile.location || isEditMode) && (
                  <span className="flex items-center" style={{ gap: SUB_TEXT_GAP }}>
                    <LocationIcon className="shrink-0" style={{ width: 16, height: 16, color: NEUTRAL_TERTIARY }} aria-hidden />
                    <InlineText
                      as="span"
                      path={['profile', 'location']}
                      value={profile.location}
                      placeholder="Lieu"
                      className="truncate text-[#323130]"
                      style={{ fontSize: FONT_SIZE.MetaData }}
                    />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ActionButtons */}
          {specificProfile ? (
            <div className="flex" style={{ gap: ACTION_BUTTONS_GAP }} data-testid="action-buttons-another-user">
              <GhostIconButton label="Chat" onClick={onMessage}>
                <ChatIcon style={{ width: 20, height: 20 }} />
              </GhostIconButton>
              <GhostIconButton label="Mail" onClick={() => { if (!isEditMode && profile.email) window.location.href = `mailto:${profile.email}`; }}>
                <MailIcon style={{ width: 20, height: 20 }} />
              </GhostIconButton>
            </div>
          ) : (
            <button
              type="button"
              data-testid="action-buttons-edit"
              className="inline-flex items-center gap-xs h-8 px-sm rounded-sm text-sp-primary hover:bg-sp-lighter-alt active:bg-sp-lighter transition-colors font-semibold"
              style={{ fontSize: 14, borderRadius: 8 }}
            >
              <EditIcon style={{ width: 16, height: 16 }} />
              Modifier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
