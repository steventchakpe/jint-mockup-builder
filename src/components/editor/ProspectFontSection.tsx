'use client';

import { useRef, useState } from 'react';
import { useProjectStore } from '@/lib/state/project-store';
import { familyFromGoogleFontsUrl } from '@/theme/useProspectFont';
import { inputCls, btnCls } from './panel-styles';

/**
 * Font prospect (US-18) : URL Google Fonts OU upload de fichier (woff2/woff/ttf).
 * S'applique au contenu (webparts, footer, nav locale) — pas au reste du header.
 */
export function ProspectFontSection() {
  const project = useProjectStore((s) => s.project);
  const updateTheme = useProjectStore((s) => s.updateTheme);
  const [urlDraft, setUrlDraft] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  if (!project) return null;

  const current = project.theme.prospectFontFamily;

  const applyGoogleUrl = () => {
    setError('');
    const family = familyFromGoogleFontsUrl(urlDraft);
    if (!family) {
      setError('URL Google Fonts invalide (attendu : …?family=Montserrat)');
      return;
    }
    updateTheme({ prospectFontFamily: family, prospectFontUrl: urlDraft });
    setUrlDraft('');
  };

  const uploadFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`/api/projects/${project.id}/images`, { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      // Nom de famille dérivé du nom de fichier (ex: Montserrat-Bold.woff2 → Montserrat-Bold)
      const family = file.name.replace(/\.[^.]+$/, '');
      updateTheme({ prospectFontFamily: family, prospectFontUrl: data.url });
    } catch (e) {
      setError(e instanceof Error ? e.message : "L'upload a échoué");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="flex flex-col gap-sm">
      <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Font du prospect</span>
      {current ? (
        <div className="flex items-center justify-between gap-sm">
          <span className="text-sm" style={{ fontFamily: `'${current}', sans-serif` }}>{current}</span>
          <button
            type="button"
            onClick={() => updateTheme({ prospectFontFamily: null, prospectFontUrl: null })}
            className={btnCls}
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-sm">
            <input
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), applyGoogleUrl())}
              placeholder="URL Google Fonts…"
              className={inputCls}
            />
            <button type="button" onClick={applyGoogleUrl} disabled={!urlDraft.trim()} className={btnCls}>
              Appliquer
            </button>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept=".woff2,.woff,.ttf,.otf"
            className="hidden"
            onChange={(e) => uploadFile(e.target.files?.[0])}
          />
          <button type="button" onClick={() => fileInput.current?.click()} disabled={busy} className={btnCls}>
            {busy ? 'Envoi…' : 'Importer un fichier de font…'}
          </button>
          <p className="text-[11px] text-[#4A5D58] leading-tight">
            Sans font chargée, tout reste en Segoe UI. La font s&apos;applique au contenu des webparts, au footer et à la navigation locale.
          </p>
        </>
      )}
      {error && <p className="text-xs text-[#d13438]">{error}</p>}
    </section>
  );
}

