'use client';

import { useProjectStore } from '@/lib/state/project-store';
import { useThemePalette } from '@/theme/useThemePalette';

/** Couleur SharePoint par défaut (pages démo sans projet chargé). */
const DEFAULT_PRIMARY = '#0078d4';

/**
 * Injecte les 9 slots de palette SharePoint (CSS vars `--sp-*`) depuis la
 * couleur primaire du PROJET édité — source de vérité unique. Toute modification
 * via le color picker se propage instantanément à tous les webparts.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useProjectStore((s) => s.project?.theme.primaryColor) ?? DEFAULT_PRIMARY;
  useThemePalette(primaryColor, { injectCSSVars: true, cssVarPrefix: 'sp' });
  return <>{children}</>;
}
