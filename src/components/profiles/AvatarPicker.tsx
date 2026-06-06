'use client';

import { useRef, useState } from 'react';

type Tab = 'url' | 'upload' | 'unsplash';

interface UnsplashResult { url: string; thumbnailUrl: string; alt: string; credit: string }

/**
 * Sélecteur d'avatar — 3 sources au choix : URL directe, upload de fichier
 * (converti en data URL, persisté dans project.json) ou recherche Unsplash.
 */
export function AvatarPicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [tab, setTab] = useState<Tab>('url');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UnsplashResult[]>([]);
  const [searchState, setSearchState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [searchError, setSearchError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const onFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const search = async () => {
    if (!query.trim()) return;
    setSearchState('loading');
    try {
      const res = await fetch(`/api/images/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResults(data.results);
      setSearchState('idle');
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Recherche impossible');
      setSearchState('error');
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'url', label: 'URL' },
    { id: 'upload', label: 'Importer' },
    { id: 'unsplash', label: 'Unsplash' },
  ];

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center gap-md">
        {/* Aperçu */}
        <div className="h-16 w-16 rounded-full bg-[#E8E6DF] overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value && <img src={value} alt="Avatar" className="h-full w-full object-cover" />}
        </div>
        <div className="flex rounded-full border border-[#E8E6DF] p-0.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-sm py-1 rounded-full text-xs font-bold transition-colors ${tab === t.id ? 'bg-[#0A1F19] text-white' : 'text-[#4A5D58] hover:text-[#0A1F19]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'url' && (
        <input
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="rounded-lg border-2 border-[#E8E6DF] px-sm py-xs text-sm focus:outline-none focus:border-[#0A1F19]"
        />
      )}

      {tab === 'upload' && (
        <div>
          <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="rounded-full border-2 border-[#E8E6DF] px-md py-xs text-sm font-bold hover:border-[#0A1F19] transition-colors"
          >
            Choisir une image…
          </button>
        </div>
      )}

      {tab === 'unsplash' && (
        <div className="flex flex-col gap-sm">
          <div className="flex gap-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), search())}
              placeholder="ex : portrait woman professional"
              className="flex-1 rounded-lg border-2 border-[#E8E6DF] px-sm py-xs text-sm focus:outline-none focus:border-[#0A1F19]"
            />
            <button
              type="button"
              onClick={search}
              disabled={searchState === 'loading'}
              className="rounded-full bg-[#0A1F19] text-white px-md py-xs text-sm font-bold disabled:opacity-50"
            >
              {searchState === 'loading' ? '…' : 'Chercher'}
            </button>
          </div>
          {searchState === 'error' && <p className="text-xs text-[#d13438]">{searchError}</p>}
          {results.length > 0 && (
            <div className="grid grid-cols-6 gap-1.5 max-h-40 overflow-y-auto">
              {results.map((r) => (
                <button
                  key={r.url}
                  type="button"
                  onClick={() => onChange(r.url)}
                  title={`${r.alt} — ${r.credit}`}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${value === r.url ? 'border-[#0A1F19]' : 'border-transparent hover:border-[#0A1F19]/40'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.thumbnailUrl} alt={r.alt} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
