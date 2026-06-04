import { create } from 'zustand';
import type { Project, Page, Section, WebpartInstance, Profile } from '@/types/project';
import { relayoutSection, reorderSections, type SectionChoice } from './section-ops';

interface ProjectStore {
  // State
  project: Project | null;
  activePageId: string | null; // page en cours d'édition
  selectedWebpartId: string | null; // webpart sélectionné (panneau de config)
  isLoading: boolean;
  isDirty: boolean; // unsaved changes
  error: string | null;

  // Project lifecycle
  loadProject: (project: Project) => void;
  resetProject: () => void;
  setError: (error: string | null) => void;
  setActivePage: (pageId: string) => void;
  selectWebpart: (webpartId: string | null) => void;

  // Édition de sections (par ID, sur une page) — utilisé par l'éditeur
  insertSection: (pageId: string, index: number, section: Section) => void;
  changeSectionLayout: (pageId: string, sectionId: string, choice: SectionChoice) => void;

  // Édition de webparts (par ID de colonne) — utilisé par l'éditeur + DnD
  insertWebpartAt: (pageId: string, sectionId: string, columnId: string, webpart: WebpartInstance, at?: number) => void;
  removeWebpartById: (pageId: string, sectionId: string, columnId: string, webpartId: string) => void;
  moveWebpartById: (
    pageId: string,
    from: { sectionId: string; columnId: string },
    to: { sectionId: string; columnId: string; index: number },
    webpartId: string,
  ) => void;
  // Position/taille d'un webpart dans une section flexible (grille 12 col).
  updateWebpartFlex: (pageId: string, sectionId: string, webpartId: string, flex: import('@/types/project').FlexPosition) => void;

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

/** Applique une transformation aux sections d'une page, marque le projet dirty. */
function mapPageSections(
  project: Project,
  pageId: string,
  fn: (sections: Section[]) => Section[],
): Project {
  return {
    ...project,
    pages: project.pages.map((p) => (p.id === pageId ? { ...p, sections: fn(p.sections) } : p)),
  };
}

/** Applique une transformation à une colonne donnée (section + colonne par ID). */
function mapColumn(
  sections: Section[],
  sectionId: string,
  columnId: string,
  fn: (webparts: WebpartInstance[]) => WebpartInstance[],
): Section[] {
  return sections.map((s) =>
    s.id !== sectionId
      ? s
      : {
          ...s,
          columns: s.columns.map((c) =>
            c.id !== columnId ? c : { ...c, webparts: fn(c.webparts).map((w, i) => ({ ...w, order: i })) },
          ),
        },
  );
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: null,
  activePageId: null,
  selectedWebpartId: null,
  isLoading: false,
  isDirty: false,
  error: null,

  loadProject: (project) =>
    set({ project, activePageId: project.pages[0]?.id ?? null, selectedWebpartId: null, isLoading: false, isDirty: false, error: null }),
  resetProject: () => set({ project: null, activePageId: null, selectedWebpartId: null, isLoading: false, isDirty: false, error: null }),
  setError: (error) => set({ error }),
  setActivePage: (activePageId) => set({ activePageId }),
  selectWebpart: (selectedWebpartId) => set({ selectedWebpartId }),

  insertSection: (pageId, index, section) => {
    const { project } = get();
    if (!project) return;
    set({
      project: mapPageSections(project, pageId, (secs) => {
        const next = [...secs];
        next.splice(index, 0, section);
        return reorderSections(next);
      }),
      isDirty: true,
    });
  },

  changeSectionLayout: (pageId, sectionId, choice) => {
    const { project } = get();
    if (!project) return;
    set({
      project: mapPageSections(project, pageId, (secs) =>
        secs.map((s) => (s.id === sectionId ? relayoutSection(s, choice) : s)),
      ),
      isDirty: true,
    });
  },

  insertWebpartAt: (pageId, sectionId, columnId, webpart, at) => {
    const { project } = get();
    if (!project) return;
    set({
      project: mapPageSections(project, pageId, (secs) =>
        mapColumn(secs, sectionId, columnId, (wps) => {
          const next = [...wps];
          next.splice(at ?? next.length, 0, webpart);
          return next;
        }),
      ),
      isDirty: true,
    });
  },

  removeWebpartById: (pageId, sectionId, columnId, webpartId) => {
    const { project, selectedWebpartId } = get();
    if (!project) return;
    set({
      project: mapPageSections(project, pageId, (secs) =>
        mapColumn(secs, sectionId, columnId, (wps) => wps.filter((w) => w.id !== webpartId)),
      ),
      selectedWebpartId: selectedWebpartId === webpartId ? null : selectedWebpartId,
      isDirty: true,
    });
  },

  moveWebpartById: (pageId, from, to, webpartId) => {
    const { project } = get();
    if (!project) return;
    // Récupère le webpart source.
    const page = project.pages.find((p) => p.id === pageId);
    const srcSection = page?.sections.find((s) => s.id === from.sectionId);
    const srcCol = srcSection?.columns.find((c) => c.id === from.columnId);
    const moving = srcCol?.webparts.find((w) => w.id === webpartId);
    if (!moving) return;
    // Même colonne + déplacement vers le bas : après retrait, l'index cible se décale de -1.
    const srcIndex = srcCol!.webparts.findIndex((w) => w.id === webpartId);
    const sameCol = from.sectionId === to.sectionId && from.columnId === to.columnId;
    const insertIndex = sameCol && srcIndex < to.index ? to.index - 1 : to.index;
    set({
      project: mapPageSections(project, pageId, (secs) => {
        // 1) retire de la colonne source
        let next = mapColumn(secs, from.sectionId, from.columnId, (wps) =>
          wps.filter((w) => w.id !== webpartId),
        );
        // 2) insère dans la colonne cible à l'index voulu
        next = mapColumn(next, to.sectionId, to.columnId, (wps) => {
          const arr = [...wps];
          arr.splice(insertIndex, 0, moving);
          return arr;
        });
        return next;
      }),
      isDirty: true,
    });
  },

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

  updateWebpartFlex: (pageId, sectionId, webpartId, flex) => {
    const { project } = get();
    if (!project) return;
    set({
      project: mapPageSections(project, pageId, (secs) =>
        secs.map((s) =>
          s.id !== sectionId
            ? s
            : {
                ...s,
                columns: s.columns.map((c) => ({
                  ...c,
                  webparts: c.webparts.map((w) => (w.id === webpartId ? { ...w, flex } : w)),
                })),
              },
        ),
      ),
      isDirty: true,
    });
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
