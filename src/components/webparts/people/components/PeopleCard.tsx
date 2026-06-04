'use client';

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { ChatIcon } from '../People.icons';
import {
  AVATAR_SHADOW,
  CARD_PADDING,
  FONT_SIZE,
  PERSONA_SIZE_LARGE,
  PERSONA_SIZE_SMALL,
  SHADOW,
} from '../People.mozzaik';
import type { PeoplePerson, PeopleShadow } from '../People.types';

interface PeopleCardProps {
  person: PeoplePerson;
  index: number;
  horizontal: boolean;
  radius: number;
  shadow: PeopleShadow;
  cardColor?: string;
  locale?: string;
  isEditMode?: boolean;
  onChatClick?: (email: string) => void;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * Libellé de date (port de PeopleCard) : Aujourd'hui / Demain / Hier sinon la date
 * d'arrivée formatée ; en disposition verticale, ajoute l'ancienneté « (N ans) ».
 */
function useWelcomeDate(dateStr: string | undefined, horizontal: boolean, locale: string) {
  return useMemo(() => {
    if (!dateStr) return '';
    const hireDate = new Date(dateStr);
    const now = new Date();
    const anniversary = new Date(now.getFullYear(), hireDate.getMonth(), hireDate.getDate());
    const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
    const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);

    let label: string;
    if (sameDay(anniversary, now)) label = "Aujourd'hui";
    else if (sameDay(anniversary, tomorrow)) label = 'Demain';
    else if (sameDay(anniversary, yesterday)) label = 'Hier';
    else label = hireDate.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

    const years = now.getFullYear() - hireDate.getFullYear();
    if (!horizontal && years > 0) label = `${label} (${years} ${years > 1 ? 'ans' : 'an'})`;
    return label;
  }, [dateStr, horizontal, locale]);
}

export function PeopleCard({ person, index, horizontal, radius, shadow, cardColor, locale = 'fr-FR', isEditMode = false, onChatClick }: PeopleCardProps) {
  const welcomeDate = useWelcomeDate(person.date, horizontal, locale);
  const personaSize = horizontal ? PERSONA_SIZE_SMALL : PERSONA_SIZE_LARGE;

  const cardStyle: CSSProperties = {
    padding: CARD_PADDING,
    borderRadius: radius,
    background: cardColor ?? '#ffffff',
    boxShadow: SHADOW[shadow],
  };

  const avatar = (
    <div
      className="shrink-0 rounded-full overflow-hidden bg-sp-lighter-alt"
      style={{ width: personaSize, height: personaSize, boxShadow: AVATAR_SHADOW }}
    >
      {person.imageUrl && <img src={person.imageUrl} alt={person.displayName} className="w-full h-full object-cover" loading="lazy" />}
    </div>
  );

  const dateTag = welcomeDate && (
    <span className="inline-flex items-center bg-sp-lighter-alt text-sp-primary rounded-sm px-sm py-[2px]" style={{ fontSize: FONT_SIZE.MetaData }}>
      {welcomeDate}
    </span>
  );

  const info = (
    <div className={cn('flex flex-col gap-[4px] min-w-0', horizontal ? 'items-start' : 'items-center text-center')}>
      <InlineText
        as="span"
        path={['people', index, 'displayName']}
        value={person.displayName}
        placeholder="Nom"
        className="font-bold text-sp-primary truncate max-w-full"
        style={{ fontSize: FONT_SIZE.BodyText }}
      />
      {(person.jobTitle || isEditMode) && (
        <InlineText
          as="span"
          path={['people', index, 'jobTitle']}
          value={person.jobTitle}
          placeholder="Poste"
          className="font-bold text-[#605e5c] uppercase truncate max-w-full"
          style={{ fontSize: FONT_SIZE.MetadataLimited, lineHeight: '12px' }}
        />
      )}
      {dateTag}
    </div>
  );

  const onMessage = () => onChatClick?.(person.email ?? '');

  return (
    <div className="flex h-full w-full items-center justify-center bg-white" style={cardStyle}>
      {horizontal ? (
        <div className="flex items-center gap-sm w-full">
          {avatar}
          {info}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-sm">
          {/* spacer (gauche) et bouton chat (droite) de MÊME largeur (36px) → avatar centré */}
          <div className="flex items-center justify-between w-full">
            <span className="w-9 shrink-0" aria-hidden />
            {avatar}
            <button
              type="button"
              aria-label="Discuter"
              onClick={onMessage}
              className="w-9 h-9 shrink-0 inline-flex items-center justify-center text-sp-primary hover:opacity-80"
            >
              <ChatIcon className="w-5 h-5" />
            </button>
          </div>
          {info}
        </div>
      )}
    </div>
  );
}
