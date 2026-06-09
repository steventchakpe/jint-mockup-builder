'use client';

import { useMemo, useState } from 'react';
import { SEARCH_BG, HEADER_MARGIN, BODY_COLOR } from './IdeaBox.mozzaik';
import { IdeaCard } from './components/IdeaCard';
import type { IdeaBoxProps } from './IdeaBox.types';

/** Libellés (i18n côté démo — repris de translation.json mzkSuggestionBox). */
const T = {
  search: 'Rechercher une idée…',
  add: 'Proposer une idée',
  vote: 'Voter',
  unvote: 'Annuler',
  voteWord: 'Vote',
  popular: 'Populaires',
  recent: 'Récentes',
  voteInvite: 'Votez pour une idée existante ou proposez la vôtre',
  noIdeas: 'Aucune idée pour le moment',
} as const;

/**
 * Webpart Idea box (Boîte à idées) — port fidèle de `webpart_legacy/mzkSuggestionBox`
 * (SuggestionBox.tsx). Barre de recherche (#eaeaea), en-tête (invite + bouton
 * « Proposer une idée » + tri Populaires/Récentes), puis la liste des idées.
 * Recherche et tri sont client-side (démo) ; le vote est éphémère (par carte).
 */
export function IdeaBox({ config, content, isEditMode = false }: IdeaBoxProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'votes' | 'recent'>('votes');

  // On porte l'index RÉEL (dans content.ideas) pour que l'édition inline cible la bonne idée.
  // En édition : pas de tri/filtre (l'index doit rester stable). En présentation : recherche + tri.
  const ideas = useMemo(() => {
    let list = (content.ideas ?? []).map((idea, realIndex) => ({ idea, realIndex }));
    if (!isEditMode) {
      const q = search.trim().toLowerCase();
      if (q.length > 2) list = list.filter(({ idea }) => idea.title.toLowerCase().includes(q) || idea.idea.toLowerCase().includes(q));
      if (sort === 'votes') list = [...list].sort((a, b) => b.idea.votes - a.idea.votes);
    }
    return list.slice(0, config.rowLimit);
  }, [content.ideas, search, sort, config.rowLimit, isEditMode]);

  const msg = ideas.length === 0 ? T.noIdeas : config.enableAddSuggestion ? T.voteInvite : '';

  return (
    <section style={{ color: BODY_COLOR }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={T.search}
        className="w-full px-md py-sm border-none outline-none"
        style={{ backgroundColor: SEARCH_BG }}
      />

      <div className="flex items-center justify-between" style={{ margin: HEADER_MARGIN }}>
        <div className="flex items-center gap-md">
          {config.enableAddSuggestion && (
            <button
              type="button"
              className="inline-flex items-center justify-center px-md py-sm font-semibold text-white bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark rounded-sm transition-colors"
              onClick={(e) => isEditMode && e.preventDefault()}
            >
              {T.add}
            </button>
          )}
          {msg && <span className="text-body" style={{ color: '#605e5c' }}>{msg}</span>}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'votes' | 'recent')}
          className="px-sm py-xs border border-[#605e5c]/30 rounded-sm bg-white text-body"
        >
          <option value="votes">{T.popular}</option>
          <option value="recent">{T.recent}</option>
        </select>
      </div>

      {ideas.map(({ idea, realIndex }) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          index={realIndex}
          canVote={config.enableAddSuggestion}
          voteLabel={T.vote}
          unvoteLabel={T.unvote}
          voteWord={T.voteWord}
          isEditMode={isEditMode}
        />
      ))}
    </section>
  );
}
