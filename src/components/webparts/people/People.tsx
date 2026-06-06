'use client';

import { PeopleCard } from './components/PeopleCard';
import { CARD_SIZE_M_BREAKPOINT } from './People.mozzaik';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useDemoStrings } from '@/lib/i18n';
import type { PeopleProps } from './People.types';

/**
 * Webpart People — port fidèle de `CardsLayout` (@mozzaik365/components/people).
 * Deux modes : Newcomers (nouveaux arrivants) et Anniversaries (anniversaires pro).
 *
 * Grille responsive reproduisant les breakpoints du GridCarousel
 * (`columns: [312, 474, 636, 793, 955]`) via container queries.
 * Cartes horizontales compactes si height < 392, verticales sinon.
 */
export function People({ config, content, locale, onChatClick, isEditMode = false }: PeopleProps) {
  const { mode, title, height, radius, shadow, cardColor } = config;
  const tw = useDemoStrings().webparts;
  const horizontal = height < CARD_SIZE_M_BREAKPOINT;
  const people = content.people;

  const emptyText = mode === 'Newcomers' ? tw.noNewcomer : tw.noAnniversary;

  return (
    <section className="flex flex-col gap-xl p-md">
      {(title || isEditMode) && (
        <InlineText
          as="h2"
          target="config"
          path={['title']}
          value={title}
          placeholder="Titre de la section"
          className="text-heading font-semibold text-sp-darker"
        />
      )}

      {people.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">{emptyText}</p>
      ) : (
        <div className="@container">
          <div className="grid grid-cols-1 gap-md @[312px]:grid-cols-2 @[474px]:grid-cols-3 @[636px]:grid-cols-4 @[793px]:grid-cols-5 @[955px]:grid-cols-6">
            {people.map((person, i) => (
              <PeopleCard
                key={person.id}
                person={person}
                index={i}
                horizontal={horizontal}
                radius={radius}
                shadow={shadow}
                cardColor={cardColor}
                locale={locale}
                isEditMode={isEditMode}
                onChatClick={onChatClick}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
