/**
 * Constantes portées de jintan (News Gallery + mozzaik-ui).
 * SOURCES :
 * - getRadiusForStack (themeStyleHelper) : none=0 · normal=12 · large=24
 * - getTopStoryLayoutProperties / getTopStoryFontSize (newsHelper)
 * - FontSizes (mozzaik-ui), neutres Fluent
 * - getElevation (Elevation) : Strong = 0 1.2px 3.6px α.17, 0 6.4px 14.4px α.15
 */
import type { NewsRounded, NewsShadow } from './News.types';

/** Neutres Fluent (fixes, hors thème). */
export const NEUTRAL = {
  dark: '#201f1e',
  primary: '#323130',
  secondary: '#605e5c',
  tertiary: '#a19f9d',
  lighter: '#f3f2f1',
} as const;

/** Tailles de police (mozzaik-ui FontSizes). */
export const FONT_SIZE = {
  size10: '10px',
  xSmall: '10px',
  small: '12px',
  medium: '14px',
  size20: '20px',
  size24: '24px',
} as const;

export const radiusForStack = (rounded: NewsRounded): number =>
  rounded === 'none' ? 0 : rounded === 'large' ? 24 : 12;

export const SHADOW: Record<NewsShadow, string> = {
  None: 'none',
  Light: '0 0.3px 0.9px rgba(0,0,0,0.07), 0 1.6px 3.6px rgba(0,0,0,0.05)',
  Medium: '0 0.6px 1.8px rgba(0,0,0,0.12), 0 3.2px 7.2px rgba(0,0,0,0.10)',
  Strong: '0 1.2px 3.6px rgba(0,0,0,0.17), 0 6.4px 14.4px rgba(0,0,0,0.15)',
};

/**
 * Propriétés du layout TopStory selon la disposition (getTopStoryLayoutProperties + FontSizes).
 * Full (large) = horizontal ; sinon vertical.
 */
export const TOPSTORY = {
  full: {
    topImageHeight: 375,
    sideImage: { width: 248, height: 176 },
    topFont: FONT_SIZE.size24,
    sideFont: FONT_SIZE.size20,
  },
  compact: {
    topImageHeight: 281,
    sideImage: { width: 150, height: 150 },
    topFont: FONT_SIZE.size24,
    sideFont: FONT_SIZE.size24,
  },
} as const;
