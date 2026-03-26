/**
 * generateThemePalette.ts
 *
 * FROZEN — Do not modify without explicit instruction from Steven.
 *
 * Pure function that generates 9 SharePoint Fabric theme palette slots
 * from a single hex color using the exact Fluent UI shading algorithm.
 *
 * Source: @fluentui/react — packages/react/src/utilities/color/shades.ts
 *
 * Zero dependencies. Zero side effects. <1ms per call.
 */

export interface ThemePalette {
  themePrimary: string;
  themeLighterAlt: string;
  themeLighter: string;
  themeLight: string;
  themeTertiary: string;
  themeSecondary: string;
  themeDarkAlt: string;
  themeDark: string;
  themeDarker: string;
}

/**
 * Generate 9 SharePoint theme palette slots from a single hex color.
 *
 * @param primaryColor - Hex color string (e.g. '#0078d4')
 * @param isInverted - If true, swaps soften/strongen for dark mode
 * @returns ThemePalette object with 9 hex color strings
 *
 * Algorithm:
 * 1. Convert hex → RGB → HSV (integer rounding on hue, matching Fluent UI's rgb2hsv)
 * 2. Soften (lighter shades): S_new = S × (1−factor), V_new = V + (1−V) × factor
 * 3. Strongen (darker shades): V_new = V × (1−factor), S unchanged
 *
 * Factor table (verified against Fluent UI reference output for #0078d4):
 *   lighterAlt  soften  0.96  →  #f3f9fd
 *   lighter     soften  0.84  →  #d0e7f8
 *   light       soften  0.70  →  #a9d3f2
 *   tertiary    soften  0.40  →  #5ca9e5
 *   secondary   soften  0.12  →  #1a86d9
 *   primary     —       —     →  #0078d4 (unmodified)
 *   darkAlt     strongen 0.10 →  #006cbe
 *   dark        strongen 0.24 →  #005ba1
 *   darker      strongen 0.44 →  #004377
 */
export function generateThemePalette(
  primaryColor: string,
  isInverted: boolean = false,
): ThemePalette {
  const [r, g, b] = hexToRgb(primaryColor);
  const [h, s, v] = rgb2hsv(r, g, b);

  if (isInverted) {
    // Dark mode: lighterAlt becomes the darkest, darker becomes the lightest
    return {
      themePrimary: primaryColor,
      themeLighterAlt: strongen(h, s, v, 0.44),
      themeLighter:    strongen(h, s, v, 0.24),
      themeLight:      strongen(h, s, v, 0.10),
      themeTertiary:   soften(h, s, v, 0.12),
      themeSecondary:  soften(h, s, v, 0.40),
      themeDarkAlt:    soften(h, s, v, 0.70),
      themeDark:       soften(h, s, v, 0.84),
      themeDarker:     soften(h, s, v, 0.96),
    };
  }

  return {
    themePrimary:    primaryColor,
    themeLighterAlt: soften(h, s, v, 0.96),
    themeLighter:    soften(h, s, v, 0.84),
    themeLight:      soften(h, s, v, 0.70),
    themeTertiary:   soften(h, s, v, 0.40),
    themeSecondary:  soften(h, s, v, 0.12),
    themeDarkAlt:    strongen(h, s, v, 0.10),
    themeDark:       strongen(h, s, v, 0.24),
    themeDarker:     strongen(h, s, v, 0.44),
  };
}

// ─── Colour conversion helpers ──────────────────────────────────────────────

/** Parse '#rrggbb' or '#rgb' → [r, g, b] (0–255) */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

/**
 * RGB → HSV, matching Fluent UI's integer hue rounding.
 * h: 0–359 (integer), s: 0–1 (float), v: 0–1 (float)
 */
function rgb2hsv(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  const s = max === 0 ? 0 : delta / max;
  const v = max / 255;

  let h = 0;
  if (delta !== 0) {
    if (max === r)      h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else                h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return [h, s, v];
}

/** HSV → RGB (0–255) */
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const hi = Math.floor(h / 60) % 6;
  const f  = h / 60 - Math.floor(h / 60);
  const p  = v * (1 - s);
  const q  = v * (1 - f * s);
  const t  = v * (1 - (1 - f) * s);

  const [r, g, b] = (
    hi === 0 ? [v, t, p] :
    hi === 1 ? [q, v, p] :
    hi === 2 ? [p, v, t] :
    hi === 3 ? [p, q, v] :
    hi === 4 ? [t, p, v] :
               [v, p, q]
  ) as [number, number, number];

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
}

// ─── Shade operations ────────────────────────────────────────────────────────

/**
 * Soften: mix the color towards white.
 * S_new = S × (1 − factor)   — desaturate
 * V_new = V + (1 − V) × factor — push value toward 1
 */
function soften(h: number, s: number, v: number, factor: number): string {
  const sNew = s * (1 - factor);
  const vNew = v + (1 - v) * factor;
  const [r, g, b] = hsv2rgb(h, sNew, vNew);
  return rgbToHex(r, g, b);
}

/**
 * Strongen: darken by reducing value, keeping saturation.
 * V_new = V × (1 − factor)
 */
function strongen(h: number, s: number, v: number, factor: number): string {
  const vNew = v * (1 - factor);
  const [r, g, b] = hsv2rgb(h, s, vNew);
  return rgbToHex(r, g, b);
}
