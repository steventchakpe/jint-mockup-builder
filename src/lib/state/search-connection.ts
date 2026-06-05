import { create } from 'zustand';

/**
 * Connexion entre les webparts de recherche (port du `autoConnect` jintan) :
 * la Search box publie la requête, Search filters publie les filtres actifs,
 * Search results consomme les deux. Store volatil (jamais persisté).
 */
interface SearchConnectionState {
  query: string;
  /** Filtres actifs par facette (ex: { fileType: ['docx','pdf'] }). */
  filters: Record<string, string[]>;
  setQuery: (query: string) => void;
  toggleFilter: (facet: string, value: string) => void;
  clearFilters: () => void;
}

export const useSearchConnection = create<SearchConnectionState>((set) => ({
  query: '',
  filters: {},
  setQuery: (query) => set({ query }),
  toggleFilter: (facet, value) =>
    set((s) => {
      const current = s.filters[facet] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { filters: { ...s.filters, [facet]: next } };
    }),
  clearFilters: () => set({ filters: {} }),
}));
