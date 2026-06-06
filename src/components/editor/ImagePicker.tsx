'use client';

import { useRef, useState } from 'react';
import { useProjectStore } from '@/lib/state/project-store';

type Tab = 'upload' | 'url' | 'unsplash';

interface UnsplashResult { url: string; thumbnailUrl: string; alt: string; credit: string }

/**
 * Sélecteur d'image réutilisable (US-10/48/49) — 3 sources : upload serveur
 * (POST /api/projects/{id}/images), URL directe, recherche Unsplash.
 * Compact : conçu pour le panneau de configuration (320px).
 */
export function ImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const projectId = useProjectStore((s) => s.project?.id);
  const [tab, setTab] = useState<Tab>('upload');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UnsplashResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const upload = async (file: File | undefined) => {
    if (!file || !projectId) return;
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`/api/projects/${projectId}/images`, { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "L'upload a échoué");
    } finally {
      setBusy(false);
    }
  };

  const search = async () => {
    if (!query.trim()) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/images/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResults(data.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Recherche impossible');
    } finally {
      setBusy(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'upload', label: 'Importer' },
    { id: 'url', label: 'URL' },
    { id: 'unsplash', label: 'Unsplash' },
  ];
  const inputCls =
    'w-full rounded-sm border border-gray-300 px-sm py-xs text-body text-sp-darker focus:outline-none focus:ring-2 focus:ring-sp-primary';

  return (
    <div className="flex flex-col gap-sm">
      {/* Aperçu */}
      {value && (
        <div className="rounded-sm border border-gray-200 overflow-hidden bg-sp-lighter-alt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full max-h-28 object-cover" />
        </div>
      )}

      <div className="flex rounded-sm border border-gray-300 overflow-hidden">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 px-sm py-xs text-caption font-semibold transition-colors ${tab === t.id ? 'bg-sp-primary text-white' : 'text-sp-darker hover:bg-sp-lighter-alt'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'upload' && (
        <div>
          <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
            className="w-full rounded-sm border border-gray-300 px-sm py-xs text-body text-sp-darker hover:bg-sp-lighter-alt disabled:opacity-50"
          >
            {busy ? 'Envoi…' : 'Choisir un fichier…'}
          </button>
        </div>
      )}

      {tab === 'url' && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className={inputCls}
        />
      )}

      {tab === 'unsplash' && (
        <div className="flex flex-col gap-sm">
          <div className="flex gap-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), search())}
              placeholder="ex : office team meeting"
              className={inputCls}
            />
            <button
              type="button"
              onClick={search}
              disabled={busy}
              className="shrink-0 rounded-sm bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark text-white px-sm py-xs text-body disabled:opacity-50"
            >
              {busy ? '…' : 'Chercher'}
            </button>
          </div>
          {results.length > 0 && (
            <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto">
              {results.map((r) => (
                <button
                  key={r.url}
                  type="button"
                  onClick={() => onChange(r.url)}
                  title={`${r.alt} — ${r.credit}`}
                  className={`aspect-square rounded-sm overflow-hidden border-2 transition-colors ${value === r.url ? 'border-sp-primary' : 'border-transparent hover:border-sp-tertiary'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.thumbnailUrl} alt={r.alt} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-caption text-[#d13438]">{error}</p>}
    </div>
  );
}
