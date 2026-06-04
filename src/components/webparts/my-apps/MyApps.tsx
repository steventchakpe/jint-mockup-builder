'use client';

import { LinkCard } from './components/LinkCard';
import { GRID_GAP, SIZE } from './MyApps.mozzaik';
import type { MyAppsProps } from './MyApps.types';

/**
 * Webpart My Apps — port fidèle de `CardsLayout` mode myApps
 * (@mozzaik365/components/links). Grille de cartes d'applications.
 *
 * Les breakpoints du GridCarousel (medium [216…1336] / large [200…720]) sont
 * reproduits via `auto-fill minmax(minSize, 1fr)` : autant de colonnes que la
 * largeur le permet, cartes de taille mini constante.
 */
export function MyApps({ config, content, onNavigate }: MyAppsProps) {
  const { title, cardSize, radius, shadow } = config;
  const links = content.links;
  const min = SIZE[cardSize].min;

  return (
    <section className="flex flex-col gap-xl p-md">
      {title && <h2 className="text-heading font-semibold text-sp-darker">{title}</h2>}

      {links.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">Aucune application.</p>
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
