import { useMemo, useEffect } from 'react';
import { generateThemePalette, type ThemePalette } from './generateThemePalette';

interface UseThemePaletteOptions {
  /** If true, injects CSS custom properties on :root */
  injectCSSVars?: boolean;
  /** Prefix for CSS variable names (default: 'sp') */
  cssVarPrefix?: string;
}

/**
 * React hook that generates the SharePoint theme palette from a primary color
 * and optionally injects it as CSS custom properties on :root.
 *
 * Usage:
 * ```tsx
 * function ThemeLayer({ children }) {
 *   const primaryColor = useProjectStore(s => s.project?.theme.primaryColor ?? '#0078d4');
 *   useThemePalette(primaryColor, { injectCSSVars: true, cssVarPrefix: 'sp' });
 *   return <>{children}</>;
 * }
 * ```
 *
 * Generated CSS variables (with prefix 'sp'):
 * --sp-theme-primary, --sp-theme-lighter-alt, --sp-theme-lighter,
 * --sp-theme-light, --sp-theme-tertiary, --sp-theme-secondary,
 * --sp-theme-dark-alt, --sp-theme-dark, --sp-theme-darker
 */
export function useThemePalette(
  primaryColor: string,
  options: UseThemePaletteOptions = {},
): ThemePalette {
  const { injectCSSVars = false, cssVarPrefix = 'sp' } = options;

  const palette = useMemo(
    () => generateThemePalette(primaryColor),
    [primaryColor],
  );

  useEffect(() => {
    if (!injectCSSVars) return;

    const root = document.documentElement;
    const vars = getThemeCssVars(palette, cssVarPrefix);
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, [palette, injectCSSVars, cssVarPrefix]);

  return palette;
}

/**
 * Returns the CSS variable map for a given palette.
 * Use this for SSR (inline style on <html>) in the Presentation mode route.
 *
 * ```tsx
 * // In a Next.js layout or page:
 * const palette = generateThemePalette(project.theme.primaryColor);
 * const vars = getThemeCssVars(palette);
 * return <html style={vars}>...</html>;
 * ```
 */
export function getThemeCssVars(
  palette: ThemePalette,
  prefix = 'sp',
): Record<string, string> {
  return {
    [`--${prefix}-theme-primary`]:     palette.themePrimary,
    [`--${prefix}-theme-lighter-alt`]: palette.themeLighterAlt,
    [`--${prefix}-theme-lighter`]:     palette.themeLighter,
    [`--${prefix}-theme-light`]:       palette.themeLight,
    [`--${prefix}-theme-tertiary`]:    palette.themeTertiary,
    [`--${prefix}-theme-secondary`]:   palette.themeSecondary,
    [`--${prefix}-theme-dark-alt`]:    palette.themeDarkAlt,
    [`--${prefix}-theme-dark`]:        palette.themeDark,
    [`--${prefix}-theme-darker`]:      palette.themeDarker,
  };
}
