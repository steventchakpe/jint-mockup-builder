'use client';

import { PeopleCard } from './components/PeopleCard';
import { CARD_SIZE_M_BREAKPOINT } from './People.mozzaik';
import type { PeopleProps } from './People.types';

/**
 * Webpart People — port fidèle de `CardsLayout` (@mozzaik365/components/people).
 * Deux modes : Newcomers (nouveaux arrivants) et Anniversaries (anniversaires pro).
 *
 * Grille responsive reproduisant les breakpoints du GridCarousel
 * (`columns: [312, 474, 636, 793, 955]`) via container queries.
 * Cartes horizontales compactes si height < 392, verticales sinon.
 */
export function People({ config, content, locale, onChatClick }: PeopleProps) {
  const { mode, title, height, radius, shadow, cardColor } = config;
  const horizontal = height < CARD_SIZE_M_BREAKPOINT;
  const people = content.people;

  const emptyText = mode === 'Newcomers' ? 'Aucun nouvel arrivant' : 'Aucun anniversaire à venir';

  return (
    <section className="flex flex-col gap-xl p-md">
      {title && <h2 className="text-heading font-semibold text-sp-darker">{title}</h2>}

      {people.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">{emptyText}</p>
      ) : (
        <div className="@container">
          <div className="grid grid-cols-1 gap-md @[312px]:grid-cols-2 @[474px]:grid-cols-3 @[636px]:grid-cols-4 @[793px]:grid-cols-5 @[955px]:grid-cols-6">
            {people.map((person) => (
              <PeopleCard
                key={person.id}
                person={person}
                horizontal={horizontal}
                radius={radius}
                shadow={shadow}
                cardColor={cardColor}
                locale={locale}
                onChatClick={onChatClick}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
