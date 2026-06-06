'use client';

import { useEffect } from 'react';

const STYLE_ID = 'prospect-font';

/** Extrait le nom de famille d'une URL Google Fonts (?family=Montserrat:wght@400). */
export function familyFromGoogleFontsUrl(url: string): string | null {
  try {
    const family = new URL(url).searchParams.get('family');
    return family ? family.split(':')[0].replace(/\+/g, ' ') : null;
  } catch {
    return null;
  }
}

/**
 * Charge la font prospect (US-18) et expose `--prospect-font` sur :root.
 * - URL Google Fonts (fonts.googleapis.com) → @import de la feuille CSS
 * - Fichier (woff2/woff/ttf/otf, y compris /api/projects/{id}/images/…) → @font-face
 * - null → nettoyage (retour Segoe UI via le fallback CSS `inherit`)
 *
 * L'application est sélective via la classe `.prospect-font` (globals.css) :
 * webparts, footer, nav locale du header — jamais hub nav / titre du site (PRD §6.4).
 */
export function useProspectFont(family: string | null, url: string | null) {
  useEffect(() => {
    const root = document.documentElement;
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

    if (!family || !url) {
      style?.remove();
      root.style.removeProperty('--prospect-font');
      return;
    }

    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    const isGoogle = /fonts\.googleapis\.com/.test(url);
    style.textContent = isGoogle
      ? `@import url('${url}');`
      : `@font-face { font-family: '${family.replace(/'/g, '')}'; src: url('${url}'); font-display: swap; }`;
    root.style.setProperty('--prospect-font', `'${family.replace(/'/g, '')}', 'Segoe UI', sans-serif`);
  }, [family, url]);
}
