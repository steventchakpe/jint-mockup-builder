'use client';

import { useMemo, useState } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import {
  CARD_SHADOW,
  BAR_TRACK_BG,
  BAR_WIDTH,
  QUESTION_MARGIN_BOTTOM,
  OPTION_MARGIN_BOTTOM,
  OPTION_PADDING,
  PERCENT_MARGIN,
  FONT_SIZE,
  FONT_WEIGHT,
} from './Poll.mozzaik';
import type { PollProps } from './Poll.types';

const VOTE_WORD = { one: 'vote', many: 'votes' } as const;

/**
 * Webpart Poll (Sondage) — port fidèle de `webpart_legacy/mzkSurvey` (MzkSurvey.tsx).
 * Titre + question, puis options : non voté = cases cliquables bordées themePrimary
 * (hover plein) ; voté = barres de progression themePrimary (largeur = %) sur fond
 * neutralTertiaryAlt, avec le % à droite, et le total des votes centré dessous.
 * Le vote est éphémère côté démo (clic sur une option → bascule en résultats).
 */
export function Poll({ config, content, isEditMode = false }: PollProps) {
  const [votes, setVotes] = useState<number[]>(content.options.map((o) => o.votes));
  const [voted, setVoted] = useState(Boolean(content.userHasVoted));

  const total = useMemo(() => votes.reduce((a, b) => a + b, 0), [votes]);
  const pct = (i: number) => (total === 0 ? 0 : (votes[i] * 100) / total);

  const onVote = (i: number) => {
    if (isEditMode || voted) return;
    setVotes((prev) => prev.map((v, idx) => (idx === i ? v + 1 : v)));
    setVoted(true);
  };

  return (
    <section>
      {(config.title || isEditMode) && (
        <InlineText
          as="h2"
          target="config"
          path={['title']}
          value={config.title}
          placeholder="Titre du sondage"
          className="font-semibold text-[#323130]"
          style={{ fontSize: FONT_SIZE.title, fontWeight: FONT_WEIGHT.title, marginBottom: 16, display: 'block' }}
        />
      )}

      <div style={{ marginBottom: QUESTION_MARGIN_BOTTOM, color: '#333' }}>
        <InlineText
          as="span"
          path={['question']}
          value={content.question}
          placeholder="Posez votre question…"
          style={{ fontSize: FONT_SIZE.question, fontWeight: FONT_WEIGHT.question }}
        />
      </div>

      {content.options.map((option, i) =>
        !voted ? (
          <div
            key={option.id}
            onClick={() => onVote(i)}
            className="group cursor-pointer border border-sp-primary hover:bg-sp-primary transition-colors"
            style={{ marginBottom: OPTION_MARGIN_BOTTOM }}
          >
            <div
              className="text-sp-primary group-hover:text-white"
              style={{ padding: OPTION_PADDING, fontSize: FONT_SIZE.response, fontWeight: FONT_WEIGHT.response }}
            >
              <InlineText as="span" path={['options', i, 'label']} value={option.label} placeholder="Option" />
            </div>
          </div>
        ) : (
          <div key={option.id} className="flex items-start">
            <div
              className="overflow-hidden"
              style={{ width: BAR_WIDTH, backgroundColor: BAR_TRACK_BG, boxShadow: CARD_SHADOW, marginBottom: OPTION_MARGIN_BOTTOM }}
            >
              <div className="bg-sp-primary transition-[width] duration-700" style={{ width: `${pct(i)}%` }}>
                <div
                  className="text-white whitespace-nowrap"
                  style={{ padding: OPTION_PADDING, fontSize: FONT_SIZE.response, fontWeight: FONT_WEIGHT.response }}
                >
                  {option.label}
                </div>
              </div>
            </div>
            <div style={{ fontSize: FONT_SIZE.response, fontWeight: FONT_WEIGHT.response, margin: PERCENT_MARGIN, color: '#333' }}>
              {Math.round(pct(i))}%
            </div>
          </div>
        ),
      )}

      {voted && (
        <div className="flex justify-center" style={{ color: '#333' }}>
          <span>
            {total} {total > 1 ? VOTE_WORD.many : VOTE_WORD.one}
          </span>
        </div>
      )}
    </section>
  );
}
