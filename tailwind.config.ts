import type { Config } from 'tailwindcss';
import { spThemeColors } from './src/config/tailwind.theme-palette';
import { figmaTailwindExtend } from './src/config/tailwind.tokens';

/**
 * Tailwind configuration for Jint Builder.
 *
 * Two token sources:
 *   1. tailwind.theme-palette  → sp-* colors (CSS var chain, dynamic at runtime)
 *   2. tailwind.tokens         → Figma spacing / fontSize / borderRadius (static)
 *
 * The sp-* color chain is also declared in globals.css @theme with fallbacks
 * so that bg-sp-primary works even before useThemePalette injects the runtime vars.
 * CSS @theme takes precedence over this config — no conflict.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...spThemeColors,
      },
      ...figmaTailwindExtend,
    },
  },
};

export default config;
