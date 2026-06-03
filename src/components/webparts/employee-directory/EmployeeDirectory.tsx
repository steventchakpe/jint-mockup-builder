'use client';

import { useMemo, useState } from 'react';
import { PersonaCard } from './components/PersonaCard';
import { DirectorySearchBox } from './components/DirectorySearchBox';
import { RESULTS_GAP } from './EmployeeDirectory.mozzaik';
import type { DirectoryPerson, EmployeeDirectoryProps } from './EmployeeDirectory.types';

/**
 * Webpart Employee Directory / Trombinoscope — port fidèle de `mzkWhoIsWho`
 * (layout whoiswho/classic), Phase A : titre/description + barre de recherche
 * (filtrage côté client) + grille de PersonaCards + « Afficher plus » + état vide.
 *
 * Structure : Stack gap 24 → [ gap 12 → (titre/desc gap 8) + recherche ] + résultats.
 * La fiche profil détaillée (clic carte) = Phase B (`onSelectPerson`).
 */
export function EmployeeDirectory({
  config,
  content,
  isEditMode = false,
  onSelectPerson,
}: EmployeeDirectoryProps) {
  const { title, description, pageSize, rounded, shadow } = config;
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo<DirectoryPerson[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return content.people;
    return content.people.filter((p) =>
      [p.displayName, p.title, p.department, p.location]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q)),
    );
  }, [content.people, query]);

  const visible = filtered.slice(0, pageSize * page);
  const hasMore = visible.length < filtered.length;

  const handleSelect = (id: string) => {
    if (isEditMode) return;
    onSelectPerson?.(id);
  };

  return (
    <div className="flex flex-col gap-2xl">
      <div className="flex flex-col gap-md">
        {(title || description) && (
          <div className="flex flex-col gap-sm">
            {title && <h2 className="text-heading-sm font-semibold text-sp-darker">{title}</h2>}
            {description && <p className="text-body text-gray-600">{description}</p>}
          </div>
        )}
        <DirectorySearchBox
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          rounded={rounded}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-body text-gray-500 py-xl text-center">Aucune personne trouvée.</p>
      ) : (
        <div className="flex flex-col gap-2xl">
          <div className="flex flex-wrap justify-center" style={{ gap: RESULTS_GAP }}>
            {visible.map((person) => (
              <PersonaCard
                key={person.id}
                person={person}
                rounded={rounded}
                shadow={shadow}
                onClick={() => handleSelect(person.id)}
              />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="text-sp-primary font-semibold hover:underline"
              >
                Afficher plus
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
