import { create } from 'zustand';

interface ProjectTheme {
  primaryColor: string;
}

interface ProjectStore {
  theme: ProjectTheme;
  setThemePrimaryColor: (color: string) => void;
}

export const useProjectStore = create<ProjectStore>()((set) => ({
  theme: {
    primaryColor: '#0078d4',
  },
  setThemePrimaryColor: (primaryColor) =>
    set((s) => ({ theme: { ...s.theme, primaryColor } })),
}));
