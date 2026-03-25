import { create } from 'zustand'

// ── Liste des webparts identifiées dans le fichier Figma ──────────────────────
export const WEBPARTS = [
  { id: 'hero-tiles',         label: 'Hero — Tiles',            category: 'Hero',        icon: '🖼️' },
  { id: 'news-sidebyside',    label: 'News — Side-by-side',     category: 'Actualités',  icon: '📰' },
  { id: 'news-hub',           label: 'News — Hub',              category: 'Actualités',  icon: '📰' },
  { id: 'quick-links',        label: 'Quick Links — Filmstrip', category: 'Navigation',  icon: '🔗' },
  { id: 'events-filmstrip',   label: 'Events — Filmstrip',      category: 'Événements',  icon: '📅' },
  { id: 'news-carousel',      label: 'News — Carousel',         category: 'Actualités',  icon: '📰' },
  { id: 'news-list',          label: 'News — List',             category: 'Actualités',  icon: '📋' },
  { id: 'hero-layers',        label: 'Hero — Layers',           category: 'Hero',        icon: '🖼️' },
  { id: 'events-compact',     label: 'Events — Compact',        category: 'Événements',  icon: '📅' },
]

const DEFAULT_WEBPARTS = {
  'hero-tiles':       true,
  'news-sidebyside':  true,
  'news-hub':         true,
  'quick-links':      true,
  'events-filmstrip': true,
  'news-carousel':    true,
  'news-list':        true,
  'hero-layers':      false,
  'events-compact':   false,
}

// ── Navigation links (configurable) ──────────────────────────────────────────
export const DEFAULT_NAV_LINKS = [
  { label: 'Accueil' },
  { label: 'Documents' },
  { label: 'Actualités' },
  { label: 'Pages' },
  { label: 'Contenu du site' },
]

export const useMockupStore = create((set, get) => ({
  // ── Config ─────────────────────────────────────────────────────────────────
  clientName:   'Contoso',
  primaryColor: '#C55000',   // accent brand → BrandBackground.Rest
  headerColor:  '#303952',   // suite header → brandPrimary
  webparts:     { ...DEFAULT_WEBPARTS },
  navLinks:     DEFAULT_NAV_LINKS,
  isPreviewMode: false,

  // ── Actions ────────────────────────────────────────────────────────────────
  setClientName: (name) => set({ clientName: name }),

  setPrimaryColor: (color) => {
    document.documentElement.style.setProperty('--brand-color', color)
    set({ primaryColor: color })
  },

  setHeaderColor: (color) => {
    document.documentElement.style.setProperty('--brand-primary', color)
    set({ headerColor: color })
  },

  toggleWebpart: (id) =>
    set((s) => ({ webparts: { ...s.webparts, [id]: !s.webparts[id] } })),

  enableAll:  () => set({ webparts: Object.fromEntries(WEBPARTS.map((w) => [w.id, true])) }),
  disableAll: () => set({ webparts: Object.fromEntries(WEBPARTS.map((w) => [w.id, false])) }),

  togglePreviewMode: () => set((s) => ({ isPreviewMode: !s.isPreviewMode })),
}))
