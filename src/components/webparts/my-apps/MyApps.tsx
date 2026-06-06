'use client';

import { LinkCard } from './components/LinkCard';
import { GRID_GAP, SIZE } from './MyApps.mozzaik';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useDemoStrings } from '@/lib/i18n';
import type { MyAppsProps } from './MyApps.types';

/**
 * Webpart My Apps — port fidèle de `CardsLayout` mode myApps
 * (@mozzaik365/components/links). Grille de cartes d'applications.
 *
 * Les breakpoints du GridCarousel (medium [216…1336] / large [200…720]) sont
 * reproduits via `auto-fill minmax(minSize, 1fr)` : autant de colonnes que la
 * largeur le permet, cartes de taille mini constante.
 */
export function MyApps({ config, content, onNavigate, isEditMode = false }: MyAppsProps) {
  const { title, cardSize, radius, shadow } = config;
  const tw = useDemoStrings().webparts;
  const links = content.links;
  const min = SIZE[cardSize].min;

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

      {links.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">{tw.noApps}</p>
      ) : (
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap: GRID_GAP }}
        >
          {links.map((link) => (
            <LinkCard key={link.id} item={link} size={cardSize} radius={radius} shadow={shadow} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </section>
  );
}
