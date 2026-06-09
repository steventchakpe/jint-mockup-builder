/**
 * Constantes extraites À L'IDENTIQUE de `webpart_legacy/mzkSuggestionBox` :
 *  - boxShadow mixin (theming.module.scss) : `0 0 24px rgba(0,0,0,0.05)`
 *  - Suggestion.module.scss : card padding 16, margin-bottom 16 ;
 *    .title 14px bold ; .idea pre-wrap padding 32px 0 (clear both)
 *  - SuggestionVote.module.scss : .container margin-top 20, min-height 40 ;
 *    .count 24px bold (float left, margin-right 4, margin-top -10) ;
 *    .vote button height 40, margin-left 16, margin-top -10
 *  - SuggestionAnswer.module.scss : .container padding-left 24, min-height 40 ;
 *    .state font-weight 600, padding 8px 16, font-size 12, margin 8px 8px 8px 16 ;
 *    .answer pre-wrap, padding-top 16 (clear both)
 *  - SuggestionBox.module.scss : .header margin 8px 0 (flow-root) ;
 *    .noideas margin-top 16 ; .searchbox bg #eaeaea, input transparent sans bordure
 * Défauts manifest MzkSuggestionBoxWebPart : enableAddSuggestion true, rowLimit 5.
 * Neutre Fluent : neutralPrimary #323130 (bodyText).
 */

export const CARD_SHADOW = '0 0 24px rgba(0,0,0,0.05)';
export const CARD_PADDING = 16;
export const CARD_MARGIN_BOTTOM = 16;

export const SEARCH_BG = '#eaeaea';
export const HEADER_MARGIN = '8px 0';

export const FONT_SIZE = { title: 14, count: 24, state: 12, body: 14 } as const;

/** Vote : valeurs exactes du .container / .count / .vote. */
export const VOTE = {
  containerMarginTop: 20,
  minHeight: 40,
  countMarginRight: 4,
  countMarginTop: -10,
  buttonHeight: 40,
  buttonMarginLeft: 16,
  buttonMarginTop: -10,
} as const;

/** Réponse : indentation + badge de statut. */
export const ANSWER = {
  indent: 24,
  minHeight: 40,
  ideaPaddingY: 32,
  answerPaddingTop: 16,
  badgePadding: '8px 16px',
  badgeMargin: '8px 8px 8px 16px',
} as const;

/** neutralPrimary Fluent (bodyText, fixe hors thème). */
export const BODY_COLOR = '#323130';
