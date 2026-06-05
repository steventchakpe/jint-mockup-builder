'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProjectStore } from '@/lib/state/project-store';

/**
 * Barre d'édition (chrome, hors shell) : retour dashboard, nom de la maquette éditable,
 * paramètres prospect, état des modifications + bouton Sauvegarder (manuel, PRD §6.8).
 */
export function EditorToolbar() {
  const project = useProjectStore((s) => s.project);
  const isDirty = useProjectStore((s) => s.isDirty);
  const saveStatus = useProjectStore((s) => s.saveStatus);
  const save = useProjectStore((s) => s.saveProject);
  const setProjectName = useProjectStore((s) => s.setProjectName);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const label =
    saveStatus === 'saving' ? 'Enregistrement…'
    : saveStatus === 'error' ? 'Réessayer'
    : isDirty ? 'Sauvegarder'
    : 'Enregistré';

  return (
    <div
      className="relative z-[60] flex items-center justify-between gap-lg h-14 shrink-0 px-lg border-b border-[#E8E6DF] bg-[#F5F4F0] text-[#0A1F19]"
      style={{ fontFamily: "'Geist Sans', sans-serif" }}
    >
      <div className="flex items-center gap-lg min-w-0 flex-1">
        <Link
          href="/"
          onClick={(e) => {
            // Navigation client Next : beforeunload ne couvre pas ce cas → garde explicite (PRD §6.8)
            if (isDirty && !window.confirm('Des modifications ne sont pas sauvegardées. Quitter sans sauvegarder ?')) e.preventDefault();
          }}
          className="text-sm font-bold text-[#4A5D58] hover:text-[#0A1F19] shrink-0 whitespace-nowrap transition-colors"
        >← Mes maquettes</Link>
        <span className="h-6 w-px bg-[#E8E6DF] shrink-0" />
        {/* Nom de la maquette — éditable */}
        <input
          value={project?.name ?? ''}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nom de la maquette"
          aria-label="Nom de la maquette"
          className="text-base font-bold text-[#0A1F19] bg-transparent rounded-lg px-sm py-xs min-w-0 w-full max-w-[420px] hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC82C] transition-colors"
        />
      </div>

      <div className="flex items-center gap-lg shrink-0">
        <Link
          href={project ? `/preview/${project.id}` : '#'}
          className="text-sm font-bold text-[#4A5D58] hover:text-[#0A1F19] whitespace-nowrap transition-colors"
        >
          ▶ Présentation
        </Link>
        <button
          type="button"
          data-testid="params-btn"
          onClick={() => setSettingsOpen((o) => !o)}
          className="text-sm font-bold text-[#4A5D58] hover:text-[#0A1F19] whitespace-nowrap transition-colors"
        >
          ⚙ Paramètres
        </button>
        <span className="text-sm font-medium text-[#4A5D58] whitespace-nowrap">
          {isDirty ? 'Modifications non enregistrées'
            : saveStatus === 'error' ? 'Échec — réessayez' : 'À jour ✓'}
        </span>
        <button
          type="button"
          onClick={() => save()}
          disabled={saveStatus === 'saving' || (!isDirty && saveStatus !== 'error')}
          className="inline-flex items-center h-9 px-5 rounded-full text-sm font-bold text-[#0A1F19] bg-[#FFC82C] hover:bg-[#F2BD29] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {label}
        </button>
      </div>

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}

/** Panneau « Paramètres de la maquette » : prospect (société, secteur, langue, taille). */
function SettingsPanel({ onClose }: { onClose: () => void }) {
  const project = useProjectStore((s) => s.project);
  const updateProspect = useProjectStore((s) => s.updateProspect);
  const setProjectName = useProjectStore((s) => s.setProjectName);
  if (!project) return null;
  const p = project.prospect;

  const field = 'w-full rounded-lg border-2 border-[#E8E6DF] px-sm py-xs text-sm text-[#0A1F19] focus:outline-none focus:border-[#0A1F19] transition-colors';
  const lbl = 'text-xs font-bold text-[#0A1F19]';

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        className="absolute right-lg top-14 z-40 w-[340px] bg-white rounded-3xl shadow-xl border border-[#E8E6DF] p-lg flex flex-col gap-md text-[#0A1F19]"
        style={{ fontFamily: "'Geist Sans', sans-serif" }}
      >
        <p className="text-lg font-bold text-[#0A1F19]">Paramètres de la maquette</p>

        <label className="flex flex-col gap-xs">
          <span className={lbl}>Nom de la maquette</span>
          <input className={field} value={project.name} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex : Démo BanquePro" />
        </label>
        <label className="flex flex-col gap-xs">
          <span className={lbl}>Société (prospect)</span>
          <input className={field} value={p.company} onChange={(e) => updateProspect({ company: e.target.value })} placeholder="Ex : BanquePro" />
        </label>
        <label className="flex flex-col gap-xs">
          <span className={lbl}>Secteur</span>
          <input className={field} value={p.sector} onChange={(e) => updateProspect({ sector: e.target.value })} placeholder="Ex : Bancaire / Finance" />
        </label>
        <label className="flex flex-col gap-xs">
          <span className={lbl}>Nombre d’employés</span>
          <input type="number" min={0} className={field} value={p.employeeCount || ''} placeholder="0" onChange={(e) => updateProspect({ employeeCount: Number(e.target.value) })} />
        </label>
        <label className="flex flex-col gap-xs">
          <span className={lbl}>Langue du contenu</span>
          <select className={field} value={p.contentLanguage} onChange={(e) => updateProspect({ contentLanguage: e.target.value as typeof p.contentLanguage })}>
            <option value="fr-FR">Français (France)</option>
            <option value="fr-CA">Français (Canada)</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
    </>
  );
}
