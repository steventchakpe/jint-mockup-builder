'use client';

import { useProjectStore } from '@/store/project.store';
import { useThemePalette } from '@/theme/useThemePalette';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = useProjectStore((s) => s.theme.primaryColor);
  useThemePalette(primaryColor, { injectCSSVars: true, cssVarPrefix: 'sp' });
  return <>{children}</>;
}
