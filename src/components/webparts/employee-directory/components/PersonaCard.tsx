import type { CSSProperties, ReactNode } from 'react';
import { PeopleIcon, PlaceIcon } from '../EmployeeDirectory.icons';
import {
  AVATAR_RING,
  AVATAR_SIZE,
  CARD_BORDER_COLOR,
  CARD_HEIGHT,
  CARD_PADDING,
  CARD_WIDTH,
  ROUNDED_PX,
  SHADOW,
  TAG_GAP,
  TAG_PADDING_X,
  TAG_PADDING_Y,
  TITLEBAR_PADDING_X,
  TITLEBAR_PADDING_Y,
} from '../EmployeeDirectory.mozzaik';
import type { DirectoryPerson, DirectoryRounded, DirectoryShadow } from '../EmployeeDirectory.types';

interface PersonaCardProps {
  person: DirectoryPerson;
  rounded: DirectoryRounded;
  shadow: DirectoryShadow;
  onClick?: () => void;
}

/** Tag département / lieu — MzkTag default : bg themeLighterAlt, texte themePrimary, 12px, uppercase. */
function MetaTag({ icon, text, radius }: { icon: ReactNode; text: string; radius: number }) {
  return (
    <span
      className="inline-flex items-center bg-sp-lighter-alt text-sp-primary uppercase max-w-[90px]"
      style={{ gap: TAG_GAP, padding: `${TAG_PADDING_Y}px ${TAG_PADDING_X}px`, fontSize: 12, borderRadius: radius }}
    >
      <span className="shrink-0 inline-flex">{icon}</span>
      <span className="truncate">{text}</span>
    </span>
  );
}

/**
 * Carte personne — port fidèle de `PersonaCard` (whoiswho/classic).
 * 283×224, padding 24, bordure #F1F1F1, ombre. Avatar 72 (anneau themePrimary 3px),
 * nom gras, barre de poste themePrimary/blanc, tags département + lieu.
 */
export function PersonaCard({ person, rounded, shadow, onClick }: PersonaCardProps) {
  const radius = ROUNDED_PX[rounded];
  const cardStyle: CSSProperties = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: CARD_PADDING,
    border: `1px solid ${CARD_BORDER_COLOR}`,
    boxShadow: SHADOW[shadow],
  };

  return (
    <div
      data-testid="persona-card"
      onClick={onClick}
      className="flex flex-col items-center gap-[4px] bg-white cursor-pointer overflow-hidden text-center"
      style={cardStyle}
    >
      {/* Avatar 72 + anneau themePrimary */}
      <div
        className="shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, border: `${AVATAR_RING}px solid var(--sp-theme-primary)` }}
      >
        {person.imageUrl && (
          <img src={person.imageUrl} alt={person.displayName} className="w-full h-full object-cover" loading="lazy" />
        )}
      </div>

      {/* Nom */}
      <span className="font-bold truncate max-w-full">{person.displayName}</span>

      {/* Barre de poste */}
      {person.title && (
        <span
          className="font-bold text-white bg-sp-primary truncate max-w-full"
          style={{ padding: `${TITLEBAR_PADDING_Y}px ${TITLEBAR_PADDING_X}px` }}
        >
          {person.title}
        </span>
      )}

      {/* Département + lieu */}
      {(person.department || person.location) && (
        <div className="flex items-center justify-center flex-wrap" style={{ gap: 7, padding: '0px 13px' }}>
          {person.department && <MetaTag icon={<PeopleIcon />} text={person.department} radius={radius} />}
          {person.location && <MetaTag icon={<PlaceIcon />} text={person.location} radius={radius} />}
        </div>
      )}
    </div>
  );
}
