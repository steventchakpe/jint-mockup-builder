/**
 * Constantes extraites À L'IDENTIQUE de `webpart_legacy/mzkSurvey`
 * (MzkSurvey.module.scss + theming.module.scss) :
 *  - .sondageText margin-bottom 18 ; .question font-size 18, font-weight 100
 *  - WebPartTitle = mixin webpartTitle : 20px / 600 / margin-bottom 16
 *  - Option non votée (.borderTheme) : border 1px solid themePrimary, margin-bottom 16,
 *    cursor pointer ; .values padding 8px 0 8px 16px ; .response webpartDescription
 *    (17px / 300) couleur themePrimary ; hover : fond themePrimary, texte blanc
 *  - Résultat (.wraper) : flex ; .borderThemePercentage width 85%,
 *    bg neutralTertiaryAlt #c8c8c8, boxShadow (0 0 24px rgba(0,0,0,.05)), margin-bottom 16 ;
 *    .fillPercentage bg themePrimary, transition width 0.9s ; .response blanc, nowrap ;
 *    .valuePercentage 17px/300, margin 8px 0 0 8px
 *  - .votes flex justify-center
 * Neutres Fluent : neutralTertiaryAlt #c8c8c8.
 */

export const CARD_SHADOW = '0 0 24px rgba(0,0,0,0.05)';
export const BAR_TRACK_BG = '#c8c8c8';
export const BAR_WIDTH = '85%';

export const QUESTION_MARGIN_BOTTOM = 18;
export const OPTION_MARGIN_BOTTOM = 16;
export const OPTION_PADDING = '8px 0 8px 16px';
export const PERCENT_MARGIN = '8px 0 0 8px';

export const FONT_SIZE = { title: 20, question: 18, response: 17 } as const;
export const FONT_WEIGHT = { title: 600, question: 100, response: 300 } as const;
