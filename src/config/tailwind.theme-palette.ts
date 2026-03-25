/**
 * tailwind.config.theme-palette.ts
 *
 * Partial Tailwind config for Jint Builder — SharePoint theme palette integration.
 *
 * Merge this into the existing tailwind.config.ts:
 *
 * ```ts
 * import type { Config } from 'tailwindcss';
 * import { spThemeColors } from './tailwind.config.theme-palette';
 *
 * const config: Config = {
 *   // ...existing config
 *   theme: {
 *     extend: {
 *       colors: {
 *         ...spThemeColors,
 *         // ...other custom colors
 *       },
 *     },
 *   },
 * };
 *
 * export default config;
 * ```
 *
 * Usage in components:
 *   className="bg-sp-primary"
 *   className="hover:bg-sp-dark-alt"
 *   className="text-sp-darker"
 *   className="border-sp-light"
 */

export const spThemeColors = {
  sp: {
    /** themePrimary — primary actions, links, selected states */
    primary: 'var(--sp-theme-primary)',

    /** themeLighterAlt — lightest tint, subtle backgrounds */
    'lighter-alt': 'var(--sp-theme-lighter-alt)',

    /** themeLighter — hover backgrounds, soft fills */
    lighter: 'var(--sp-theme-lighter)',

    /** themeLight — disabled states, subtle fills */
    light: 'var(--sp-theme-light)',

    /** themeTertiary — secondary indicators, progress bars */
    tertiary: 'var(--sp-theme-tertiary)',

    /** themeSecondary — secondary buttons, less prominent actions */
    secondary: 'var(--sp-theme-secondary)',

    /** themeDarkAlt — hover on primary buttons */
    'dark-alt': 'var(--sp-theme-dark-alt)',

    /** themeDark — active/pressed states */
    dark: 'var(--sp-theme-dark)',

    /** themeDarker — dark headers, high-contrast text on light bg */
    darker: 'var(--sp-theme-darker)',
  },
} as const;
