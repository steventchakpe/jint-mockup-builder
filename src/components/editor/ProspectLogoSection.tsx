'use client';

import { useRef, useState } from 'react';
import { useProjectStore } from '@/lib/state/project-store';
import { btnCls } from './panel-styles';

/**
 * Logo du prospect (US-07/17) : upload SVG/PNG/JPG. Un SVG est stocké avec son
 * contenu brut pour être recoloré selon l'habillage du header (blanc sur fond sombre).
 */
export function ProspectLogoSection() {
  const project = useProjectStore((s) => s.project);
  const updateProspect = useProjectStore((s) => s.updateProspect);
  const updateHeader = useProjectStore((s) => s.updateHeader);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  if (!project) return null;

  const logo = project.prospect.logo;

  const removeLogo = () => {
    updateProspect({ logo: null });
    updateHeader({ siteLogo: { ...project.header.siteLogo, type: 'initials', imageUrl: null } });
  };

  const uploadLogo = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const isSvg = file.type === 'image/svg+xml';
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`/api/projects/${project.id}/images`, { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      const format = isSvg ? 'svg' : file.type === 'image/png' ? 'png' : 'jpg';
      updateProspect({
        logo: { url: data.url, format, svgContent: isSvg ? await file.text() : null },
      });
      // Le header affiche le logo uploadé (le rendu SVG recoloré est géré par SiteHeader)
      updateHeader({ siteLogo: { ...project.header.siteLogo, type: 'image', imageUrl: data.url } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "L'upload a échoué");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="flex flex-col gap-sm">
      <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Logo du prospect</span>
      <div className="flex items-center gap-md">
        {logo && (
          <div className="h-12 w-12 rounded-lg border border-[#E8E6DF] bg-white overflow-hidden flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.url} alt="Logo" className="max-h-full max-w-full object-contain" />
          </div>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/svg+xml,image/png,image/jpeg"
          className="hidden"
          onChange={(e) => uploadLogo(e.target.files?.[0])}
        />
        <button type="button" onClick={() => fileInput.current?.click()} disabled={busy} className={btnCls}>
          {busy ? 'Envoi…' : logo ? 'Remplacer…' : 'Importer un logo…'}
        </button>
        {logo && (
          <button type="button" onClick={removeLogo} className={btnCls}>
            Retirer
          </button>
        )}
      </div>
      {logo?.format === 'svg' && (
        <p className="text-[11px] text-[#4A5D58] leading-tight">
          SVG détecté : le logo s&apos;adapte au header (blanc sur fond sombre, couleur sur fond clair).
        </p>
      )}
      {error && <p className="text-xs text-[#d13438]">{error}</p>}
    </section>
  );
}
