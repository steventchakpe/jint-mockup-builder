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
    <div className="relative z-[60] flex items-center justify-between gap-lg h-14 shrink-0 px-lg border-b border-gray-200 bg-white">
      <div className="flex items-center gap-lg min-w-0 flex-1">
        <Link href="/" className="text-body text-sp-primary hover:underline shrink-0 whitespace-nowrap">← Mes maquettes</Link>
        {/* Nom de la maquette — éditable */}
        <input
          value={project?.name ?? ''}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nom de la maquette"
          aria-label="Nom de la maquette"
          className="text-body-lg font-semibold text-sp-darker bg-transparent rounded-sm px-sm py-xs min-w-0 w-full max-w-[420px] hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-sp-primary"
        />
      </div>

      <div className="flex items-center gap-lg shrink-0">
        <button
          type="button"
          data-testid="params-btn"
          onClick={() => setSettingsOpen((o) => !o)}
          className="text-body text-gray-600 hover:text-sp-primary whitespace-nowrap"
        >
          ⚙ Paramètres
        </button>
        <span className="text-body text-gray-400 whitespace-nowrap">
          {isDirty ? 'Modifications non enregistrées'
            : saveStatus === 'error' ? 'Échec — réessayez' : 'À jour ✓'}
        </span>
        <button
          type="button"
          onClick={() => save()}
          disabled={saveStatus === 'saving' || (!isDirty && saveStatus !== 'error')}
          className="px-lg py-xs rounded-sm text-body font-semibold text-white bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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

  const field = 'w-full rounded-sm border border-gray-300 px-sm py-xs text-body text-sp-darker focus:outline-none focus:ring-2 focus:ring-sp-primary';
  const lbl = 'text-caption font-semibold text-sp-darker';

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-lg top-14 z-40 w-[320px] bg-white rounded-md shadow-xl border border-gray-200 p-lg flex flex-col gap-md">
        <p className="text-body-lg font-semibold text-sp-darker">Paramètres de la maquette</p>

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
