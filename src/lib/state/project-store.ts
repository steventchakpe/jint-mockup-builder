import { create } from 'zustand';
import type { Project, Page, Section, WebpartInstance, Profile } from '@/types/project';

interface ProjectStore {
  // State
  project: Project | null;
  isLoading: boolean;
  isDirty: boolean; // unsaved changes
  error: string | null;

  // Project lifecycle
  loadProject: (project: Project) => void;
  resetProject: () => void;
  setError: (error: string | null) => void;

  // Theme
  updateTheme: (theme: Partial<Project['theme']>) => void;

  // Header
  updateHeader: (header: Partial<Project['header']>) => void;

  // Pages
  addPage: (page: Page) => void;
  removePage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<Page>) => void;
  reorderPages: (pageIds: string[]) => void;

  // Sections
  addSection: (pageId: string, section: Section) => void;
  removeSection: (pageId: string, sectionId: string) => void;
  updateSection: (pageId: string, sectionId: string, updates: Partial<Section>) => void;

  // Webparts
  addWebpart: (pageId: string, sectionId: string, columnIndex: number, webpart: WebpartInstance) => void;
  removeWebpart: (pageId: string, sectionId: string, columnIndex: number, webpartId: string) => void;
  updateWebpartConfig: (webpartId: string, config: Record<string, unknown>) => void;
  updateWebpartContent: (webpartId: string, content: Record<string, unknown>) => void;
  moveWebpart: (
    fromPage: string, fromSection: string, fromColumn: number,
    toPage: string, toSection: string, toColumn: number,
    webpartId: string, newOrder: number,
  ) => void;

  // Profiles
  switchProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updates: Partial<Profile>) => void;

  // UEX
  updateUEX: (uex: Partial<Project['uex']>) => void;

  // Metadata
  markSaved: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: null,
  isLoading: false,
  isDirty: false,
  error: null,

  loadProject: (project) => set({ project, isLoading: false, isDirty: false, error: null }),
  resetProject: () => set({ project: null, isLoading: false, isDirty: false, error: null }),
  setError: (error) => set({ error }),

  updateTheme: (theme) => {
    const { project } = get();
    if (!project) return;
    set({ project: { ...project, theme: { ...project.theme, ...theme } }, isDirty: true });
  },

  updateHeader: (header) => {
    const { project } = get();
    if (!project) return;
    set({ project: { ...project, header: { ...project.header, ...header } }, isDirty: true });
  },

  addPage: (page) => {
    const { project } = get();
    if (!project) return;
    set({ project: { ...project, pages: [...project.pages, page] }, isDirty: true });
  },

  removePage: (pageId) => {
    const { project } = get();
    if (!project) return;
    set({ project: { ...project, pages: project.pages.filter((p) => p.id !== pageId) }, isDirty: true });
  },

  updatePage: (pageId, updates) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) => (p.id === pageId ? { ...p, ...updates } : p)),
      },
      isDirty: true,
    });
  },

  reorderPages: (pageIds) => {
    const { project } = get();
    if (!project) return;
    const reordered = pageIds.map((id, i) => {
      const page = project.pages.find((p) => p.id === id);
      return page ? { ...page, order: i } : null;
    }).filter(Boolean) as Page[];
    set({ project: { ...project, pages: reordered }, isDirty: true });
  },

  addSection: (pageId, section) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) =>
          p.id === pageId ? { ...p, sections: [...p.sections, section] } : p
        ),
      },
      isDirty: true,
    });
  },

  removeSection: (pageId, sectionId) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) =>
          p.id === pageId
            ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) }
            : p
        ),
      },
      isDirty: true,
    });
  },

  updateSection: (pageId, sectionId, updates) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) =>
          p.id === pageId
            ? { ...p, sections: p.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)) }
            : p
        ),
      },
      isDirty: true,
    });
  },

  addWebpart: (pageId, sectionId, columnIndex, webpart) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                sections: p.sections.map((s) =>
                  s.id === sectionId
                    ? {
                        ...s,
                        columns: s.columns.map((c) =>
                          c.index === columnIndex
                            ? { ...c, webparts: [...c.webparts, webpart] }
                            : c
                        ),
                      }
                    : s
                ),
              }
            : p
        ),
      },
      isDirty: true,
    });
  },

  removeWebpart: (pageId, sectionId, columnIndex, webpartId) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                sections: p.sections.map((s) =>
                  s.id === sectionId
                    ? {
                        ...s,
                        columns: s.columns.map((c) =>
                          c.index === columnIndex
                            ? { ...c, webparts: c.webparts.filter((w) => w.id !== webpartId) }
                            : c
                        ),
                      }
                    : s
                ),
              }
            : p
        ),
      },
      isDirty: true,
    });
  },

  updateWebpartConfig: (webpartId, config) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) => ({
          ...p,
          sections: p.sections.map((s) => ({
            ...s,
            columns: s.columns.map((c) => ({
              ...c,
              webparts: c.webparts.map((w) =>
                w.id === webpartId ? { ...w, config: { ...w.config, ...config } } : w
              ),
            })),
          })),
        })),
      },
      isDirty: true,
    });
  },

  updateWebpartContent: (webpartId, content) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        pages: project.pages.map((p) => ({
          ...p,
          sections: p.sections.map((s) => ({
            ...s,
            columns: s.columns.map((c) => ({
              ...c,
              webparts: c.webparts.map((w) =>
                w.id === webpartId ? { ...w, content: { ...w.content, ...content } } : w
              ),
            })),
          })),
        })),
      },
      isDirty: true,
    });
  },

  moveWebpart: (fromPage, fromSection, fromColumn, toPage, toSection, toColumn, webpartId, newOrder) => {
    // TODO: Implement drag & drop reordering
    // This will be implemented in Phase 2
  },

  switchProfile: (profileId) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        profiles: { ...project.profiles, activeProfileId: profileId },
      },
      isDirty: true,
    });
  },

  updateProfile: (profileId, updates) => {
    const { project } = get();
    if (!project) return;
    set({
      project: {
        ...project,
        profiles: {
          ...project.profiles,
          editable: project.profiles.editable.map((p) =>
            p.id === profileId ? { ...p, ...updates } : p
          ),
        },
      },
      isDirty: true,
    });
  },

  updateUEX: (uex) => {
    const { project } = get();
    if (!project) return;
    set({
      project: { ...project, uex: { ...project.uex, ...uex } },
      isDirty: true,
    });
  },

  markSaved: () => set({ isDirty: false }),
}));
