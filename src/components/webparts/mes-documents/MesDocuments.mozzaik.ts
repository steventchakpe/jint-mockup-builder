/**
 * Constantes extraites À L'IDENTIQUE de `webpart_legacy/src/visuals/links/Link.L`
 * (Link.L.tsx + Link.L.module.scss) :
 *  - .result : margin 0 16px 16px 0 ; min-width calc(33% - 16px)
 *    (≤ break-large 1024 → 50% ; ≤ break-medium 640 → 100%) ; overflow hidden
 *  - .itemarea : flex row
 *  - .imageContainer : 103×103, fond disabledBackground #f4f4f4 ; icône Icon44 (44px)
 *  - .item : flex col, margin 8px 0 8px 16px
 *  - .title : font-weight bold, font-size 16, clamp 2 lignes (height 42)
 *  - .footer : border-top 2px solid neutralLight #edebe9, font-size 13, padding-top 8, nowrap ellipsis
 * Header WebPartTitle = mixin webpartTitle : 20px / 600.
 * Neutres Fluent : neutralPrimary #323130 (texte), neutralLight #edebe9, disabledBackground #f4f4f4.
 */

export const IMAGE_BOX = 103;
export const IMAGE_BG = '#f4f4f4';
export const ICON_SIZE = 44;

export const CARD_MARGIN_RIGHT = 16;
export const CARD_MARGIN_BOTTOM = 16;

export const ITEM_MARGIN = '8px 0 8px 16px';
export const TITLE_HEIGHT = 42;

export const FONT_SIZE = { title: 16, footer: 13, paneHeader: 20 } as const;

export const FOOTER_BORDER = '#edebe9';
export const BODY_COLOR = '#323130';
