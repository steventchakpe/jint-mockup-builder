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
    const prefix = cssVarPrefix;

    root.style.setProperty(`--${prefix}-theme-primary`, palette.themePrimary);
    root.style.setProperty(`--${prefix}-theme-lighter-alt`, palette.themeLighterAlt);
    root.style.setProperty(`--${prefix}-theme-lighter`, palette.themeLighter);
    root.style.setProperty(`--${prefix}-theme-light`, palette.themeLight);
    root.style.setProperty(`--${prefix}-theme-tertiary`, palette.themeTertiary);
    root.style.setProperty(`--${prefix}-theme-secondary`, palette.themeSecondary);
    root.style.setProperty(`--${prefix}-theme-dark-alt`, palette.themeDarkAlt);
    root.style.setProperty(`--${prefix}-theme-dark`, palette.themeDark);
    root.style.setProperty(`--${prefix}-theme-darker`, palette.themeDarker);
  }, [palette, injectCSSVars, cssVarPrefix]);

  return palette;
}
