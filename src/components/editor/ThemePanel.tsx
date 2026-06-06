'use client';

import { useState } from 'react';
import { useProjectStore } from '@/lib/state/project-store';
import { ProspectFontSection } from './ProspectFontSection';
import { ProspectLogoSection } from './ProspectLogoSection';
import type { HeaderLayout, HeaderTheme, Locale } from '@/types/project';

/** Couleurs de marque courantes (SharePoint + variantes vives). */
const PRESETS = ['#0078d4', '#038387', '#498205', '#8764b8', '#ca5010', '#e3008c', '#d13438', '#005b70', '#5c2e91', '#986f0b'];

/** 9 slots de palette injectés en CSS vars — aperçu de la propagation. */
const SLOTS = ['lighter-alt', 'lighter', 'light', 'tertiary', 'secondary', 'primary', 'dark-alt', 'dark', 'darker'] as const;

const LAYOUTS: { value: HeaderLayout; label: string }[] = [
  { value: 'extended', label: 'Étendu' },
  { value: 'compact', label: 'Compact' },
];
const LOCALES: { value: Locale; label: string; hint: string }[] = [
  { value: 'fr-FR', label: 'FR', hint: 'Français (France)' },
  { value: 'fr-CA', label: 'FR-CA', hint: 'Français (Canada)' },
  { value: 'en', label: 'EN', hint: 'English' },
];
const THEMES: { value: HeaderTheme; label: string; hint: string }[] = [
  { value: 'neutral', label: 'Neutre', hint: 'Fond blanc, texte sombre' },
  { value: 'soft', label: 'Doux', hint: 'Fond teinté clair' },
  { value: 'strong', label: 'Intense', hint: 'Fond couleur, texte blanc' },
  { value: 'mixed', label: 'Mixte', hint: 'Hub bar colorée' },
];

/**
 * Panneau Thème (US-15/16) : color picker (presets + hex/natif) avec aperçu
 * instantané des 9 slots, et choix de la variante de header (layout × thème).
 * Pilote `theme.primaryColor` et `header.layout`/`header.theme` du projet.
 */
export function ThemePanel({ onClose }: { onClose: () => void }) {
  const project = useProjectStore((s) => s.project);
  const updateTheme = useProjectStore((s) => s.updateTheme);
  const updateHeader = useProjectStore((s) => s.updateHeader);
  const updateProspect = useProjectStore((s) => s.updateProspect);
  // Saisie hex locale : on n'applique au store qu'un hex complet (#RRGGBB),
  // sinon la palette serait régénérée sur une valeur invalide pendant la frappe.
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  if (!project) return null;

  const primary = project.theme.primaryColor;
  const setPrimary = (primaryColor: string) => {
    setHexDraft(null);
    updateTheme({ primaryColor });
  };
  const onHexChange = (v: string) => {
    if (!/^#[0-9a-fA-F]{0,6}$/.test(v)) return;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) setPrimary(v);
    else setHexDraft(v);
  };

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        className="absolute right-lg top-14 z-40 w-[360px] bg-white rounded-3xl shadow-xl border border-[#E8E6DF] p-lg flex flex-col gap-lg text-[#0A1F19] max-h-[80vh] overflow-y-auto"
        style={{ fontFamily: "'Geist Sans', sans-serif" }}
      >
        <p className="text-lg font-bold">Thème de la maquette</p>

        {/* COULEUR PRIMAIRE */}
        <section className="flex flex-col gap-sm">
          <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Couleur primaire</span>
          <div className="grid grid-cols-10 gap-1.5">
            {PRESETS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={c}
                onClick={() => setPrimary(c)}
                className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${primary.toLowerCase() === c ? 'ring-2 ring-offset-2 ring-[#0A1F19]' : ''}`}
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-sm">
            <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="h-9 w-9 rounded-lg border border-[#E8E6DF] cursor-pointer bg-transparent p-0.5" />
            <input
              value={hexDraft ?? primary}
              onChange={(e) => onHexChange(e.target.value)}
              onBlur={() => setHexDraft(null)}
              className="flex-1 rounded-lg border-2 border-[#E8E6DF] px-sm py-xs text-sm font-mono uppercase focus:outline-none focus:border-[#0A1F19]"
              placeholder="#0078D4"
            />
          </div>
          {/* Aperçu des 9 slots générés */}
          <div className="flex rounded-lg overflow-hidden border border-[#E8E6DF]">
            {SLOTS.map((s) => <div key={s} className="h-6 flex-1" style={{ background: `var(--sp-theme-${s})` }} title={s} />)}
          </div>
        </section>

        {/* VARIANTE DE HEADER */}
        <section className="flex flex-col gap-sm">
          <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Disposition du header</span>
          <div className="grid grid-cols-2 gap-2">
            {LAYOUTS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => updateHeader({ layout: l.value })}
                className={`rounded-xl border-2 px-sm py-2 text-sm font-bold transition-colors ${project.header.layout === l.value ? 'border-[#0A1F19] bg-[#F5F4F0]' : 'border-[#E8E6DF] hover:border-[#0A1F19]/40'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </section>

        {/* LANGUE DU CONTENU */}
        <section className="flex flex-col gap-sm">
          <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Langue du contenu</span>
          <div className="grid grid-cols-3 gap-2">
            {LOCALES.map((l) => (
              <button
                key={l.value}
                type="button"
                title={l.hint}
                onClick={() => updateProspect({ contentLanguage: l.value })}
                className={`flex flex-col items-start rounded-xl border-2 px-sm py-2 text-left transition-colors ${project.prospect.contentLanguage === l.value ? 'border-[#0A1F19] bg-[#F5F4F0]' : 'border-[#E8E6DF] hover:border-[#0A1F19]/40'}`}
              >
                <span className="text-sm font-bold">{l.label}</span>
                <span className="text-[11px] text-[#4A5D58] leading-tight">{l.hint}</span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#4A5D58] leading-tight">
            S’applique à l’interface de la maquette et aux nouveaux webparts. Le contenu déjà posé n’est pas retraduit.
          </p>
        </section>

        {/* FONT PROSPECT (US-18) */}
        <ProspectFontSection />

        {/* LOGO DU PROSPECT (US-07/17) */}
        <ProspectLogoSection />

        <section className="flex flex-col gap-sm">
          <span className="text-xs font-bold uppercase tracking-wide text-[#4A5D58]">Habillage du header</span>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => updateHeader({ theme: t.value })}
                className={`flex flex-col items-start rounded-xl border-2 px-sm py-2 text-left transition-colors ${project.header.theme === t.value ? 'border-[#0A1F19] bg-[#F5F4F0]' : 'border-[#E8E6DF] hover:border-[#0A1F19]/40'}`}
              >
                <span className="text-sm font-bold">{t.label}</span>
                <span className="text-[11px] text-[#4A5D58] leading-tight">{t.hint}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
