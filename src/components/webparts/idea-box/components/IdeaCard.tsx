'use client';

import { useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { CARD_SHADOW, CARD_PADDING, CARD_MARGIN_BOTTOM, FONT_SIZE, VOTE, ANSWER, BODY_COLOR } from '../IdeaBox.mozzaik';
import type { Idea } from '../IdeaBox.types';

interface IdeaCardProps {
  idea: Idea;
  index: number;
  /** Invite au vote / bouton de vote affichés (config.enableAddSuggestion). */
  canVote: boolean;
  voteLabel: string;
  unvoteLabel: string;
  voteWord: string;
  isEditMode: boolean;
}

/**
 * Une idée — port fidèle de Suggestion.tsx + SuggestionVote.tsx + SuggestionAnswer.tsx.
 * Carte ombrée (boxShadow mixin), titre 14px bold, bloc vote (count 24px), corps
 * pre-wrap (padding 32px 0), puis réponse officielle (persona + badge de statut + texte).
 */
export function IdeaCard({ idea, index, canVote, voteLabel, unvoteLabel, voteWord, isEditMode }: IdeaCardProps) {
  const [votes, setVotes] = useState(idea.votes);
  const [voted, setVoted] = useState(Boolean(idea.userHasVoted));

  const toggleVote = () => {
    if (isEditMode) return;
    setVoted((v) => !v);
    setVotes((n) => (voted ? n - 1 : n + 1));
  };

  return (
    <div
      className="bg-white"
      style={{ boxShadow: CARD_SHADOW, padding: CARD_PADDING, marginBottom: CARD_MARGIN_BOTTOM, color: BODY_COLOR }}
    >
      <InlineText
        as="div"
        path={['ideas', index, 'title']}
        value={idea.title}
        placeholder="Titre de l’idée"
        className="font-bold"
        style={{ fontSize: FONT_SIZE.title }}
      />

      {canVote && (
        <div
          className="flex items-center"
          style={{ marginTop: VOTE.containerMarginTop, minHeight: VOTE.minHeight, fontSize: FONT_SIZE.body }}
        >
          <span className="font-bold" style={{ fontSize: FONT_SIZE.count, marginRight: VOTE.countMarginRight }}>
            {votes}
          </span>
          <span>
            {voteWord}
            {votes > 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={toggleVote}
            className="inline-flex items-center justify-center px-md font-semibold text-white bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark rounded-sm transition-colors"
            style={{ height: VOTE.buttonHeight, marginLeft: VOTE.buttonMarginLeft }}
          >
            {voted ? unvoteLabel : voteLabel}
          </button>
        </div>
      )}

      <InlineText
        as="p"
        path={['ideas', index, 'idea']}
        value={idea.idea}
        placeholder="Décrivez l’idée…"
        style={{ whiteSpace: 'pre-wrap', padding: `${ANSWER.ideaPaddingY}px 0` }}
      />

      {idea.answer && (
        <div style={{ paddingLeft: ANSWER.indent, minHeight: ANSWER.minHeight }}>
          <div className="flex items-center gap-sm">
            <img
              src={idea.answer.authorAvatar}
              alt={idea.answer.authorName}
              width={40}
              height={40}
              loading="lazy"
              className="rounded-full object-cover shrink-0"
              style={{ width: 40, height: 40 }}
            />
            <div className="leading-tight">
              <div className="font-semibold" style={{ fontSize: FONT_SIZE.body }}>
                {idea.answer.authorName}
              </div>
              <div style={{ fontSize: FONT_SIZE.state, color: '#605e5c' }}>
                {idea.answer.authorTitle}
              </div>
            </div>
            <InlineText
              as="span"
              path={['ideas', index, 'answer', 'state']}
              value={idea.answer.state}
              placeholder="Statut"
              className="font-semibold text-white bg-sp-primary"
              style={{ fontSize: FONT_SIZE.state, padding: ANSWER.badgePadding, margin: ANSWER.badgeMargin }}
            />
          </div>
          <InlineText
            as="p"
            path={['ideas', index, 'answer', 'text']}
            value={idea.answer.text}
            placeholder="Réponse de l’équipe…"
            style={{ whiteSpace: 'pre-wrap', paddingTop: ANSWER.answerPaddingTop }}
          />
        </div>
      )}
    </div>
  );
}
