'use client';

import { useProjectStore } from '@/lib/state/project-store';
import { useThemePalette } from '@/theme/useThemePalette';
import { useProspectFont } from '@/theme/useProspectFont';

/** Couleur SharePoint par défaut (pages démo sans projet chargé). */
const DEFAULT_PRIMARY = '#0078d4';

/**
 * Injecte les 9 slots de palette SharePoint (CSS vars `--sp-*`) depuis la
 * couleur primaire du PROJET édité — source de vérité unique. Toute modification
 * via le color picker se propage instantanément à tous les webparts.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useProjectStore((s) => s.project?.theme.primaryColor) ?? DEFAULT_PRIMARY;
  const prospectFontFamily = useProjectStore((s) => s.project?.theme.prospectFontFamily) ?? null;
  const prospectFontUrl = useProjectStore((s) => s.project?.theme.prospectFontUrl) ?? null;
  useThemePalette(primaryColor, { injectCSSVars: true, cssVarPrefix: 'sp' });
  // Font prospect (US-18) — exposée via --prospect-font, appliquée par .prospect-font
  useProspectFont(prospectFontFamily, prospectFontUrl);
  return <>{children}</>;
}
