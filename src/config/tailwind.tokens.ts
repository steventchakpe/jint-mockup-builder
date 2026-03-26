/**
 * tailwind.tokens.ts
 *
 * Maps Figma DS tokens to Tailwind CSS extend configuration.
 * Imported by tailwind.config.ts to make Figma tokens available as utility classes.
 *
 * Usage in components:
 *   className="text-body"         → Figma typography/body
 *   className="gap-md p-lg"       → Figma spacing/md, spacing/lg
 *   className="rounded-sm"        → Figma radius/sm
 *
 * RULE: Always use these Figma classes instead of Tailwind defaults.
 *   ✅ text-body gap-md p-lg rounded-sm
 *   ❌ text-sm gap-3 p-4 rounded
 *
 * Merge into tailwind.config.ts:
 *
 * ```ts
 * import type { Config } from 'tailwindcss';
 * import { spThemeColors } from './tailwind.theme-palette';
 * import { figmaTailwindExtend } from './tailwind.tokens';
 *
 * const config: Config = {
 *   theme: {
 *     extend: {
 *       colors: { ...spThemeColors },
 *       ...figmaTailwindExtend,
 *     },
 *   },
 * };
 *
 * export default config;
 * ```
 */

import { figmaTokens } from '../theme/tokens';

export const figmaTailwindExtend = {
  spacing: figmaTokens.spacing,
  fontSize: figmaTokens.fontSize,
  borderRadius: figmaTokens.borderRadius,
  // boxShadow: figmaTokens.shadow, // Uncomment when shadow tokens are available
} as const;
