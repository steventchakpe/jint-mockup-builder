/**
 * Recoloration d'un logo SVG (US-17) : force tous les remplissages/contours
 * à `currentColor` pour que le logo suive la couleur du conteneur
 * (blanc sur header sombre, couleur d'origine sinon — PRD §6.3).
 */
export function svgToCurrentColor(svg: string): string {
  return svg
    // fill/stroke en attribut (sauf none / url(#gradient))
    .replace(/\b(fill|stroke)="(?!none|url\()[^"]*"/gi, '$1="currentColor"')
    // fill/stroke en style inline
    .replace(/\b(fill|stroke):\s*(?!none|url\()[^;"']+/gi, '$1:currentColor');
}
