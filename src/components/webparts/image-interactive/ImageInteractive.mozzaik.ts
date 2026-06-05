/**
 * Constantes extraites À L'IDENTIQUE de `image-map.js` (@mozzaik365/components dist) :
 *  - PinPoint : groupe 32×32 (opacité 0.9), cercle intérieur r=5 plein,
 *    cercle extérieur r=9 contour 2px — couleur = fillColor de la forme ou
 *    themePrimary ; survol → opacité 50 %
 *  - Rectangle/Ellipse : centrés sur (x,y) %, remplissage couleur à 20 %,
 *    contour 2px (100 %, survol 50 %)
 *  - Stage : fit par min(scaleLargeur, scaleHauteur) ; fullWidth → ratio
 *    par largeur, hauteur auto
 *  - Callout (ShapeCallout) : TopCenter avec beak, gap contenu 16 ;
 *    titres H1→GreetingTitle, H2→PageTitle (28), H3→PaneHeader (20)
 *  - LayoutHeader : 48px, padding '0px 24px' (padding: true)
 *  - Clic forme → window.open(url, openInNewTab ? '_blank' : '_self')
 * Défauts manifest ImageMapWebPart : height M=416, fitLayoutToImageWidth false,
 * showTitle false, imageUrl '', sourcePinPoints [].
 */

export const PINPOINT_SIZE = 32;
export const INNER_CIRCLE_RADIUS = 5;
export const OUTER_CIRCLE_RADIUS = 9;
export const PINPOINT_OPACITY = 0.9;
export const SHAPE_STROKE_WIDTH = 2;
export const SHAPE_FILL_OPACITY = 0.2; // getColorFromHex(color, 20)
export const HOVER_OPACITY = 0.5; // getColorFromHex(color, 50)

export const CALLOUT_CONTENT_GAP = 16;
export const HEADER_HEIGHT = 48;
export const HEADER_PADDING = '0px 24px';

export const FONT_SIZE = { PaneHeader: 20, PageTitle: 28, GreetingTitle: 32, BodyText: 14 } as const;
