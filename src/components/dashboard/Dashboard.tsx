'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlankProject } from '@/lib/state/blank-project';
import { useProjectStore } from '@/lib/state/project-store';
import type { ProjectMeta } from '@/types/providers';

/**
 * Dashboard multi-maquettes (`/`) — liste les maquettes enregistrées (cartes),
 * permet d'en créer, ouvrir, dupliquer, supprimer. Point d'entrée de l'app (PRD §6.10).
 * Visuel volontairement sobre (à peaufiner) ; la logique d'expérience est complète.
 */
export function Dashboard() {
  const router = useRouter();
  const loadProject = useProjectStore((s) => s.loadProject);
  const [projects, setProjects] = useState<ProjectMeta[] | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const res = await fetch('/api/projects');
    setProjects(res.ok ? await res.json() : []);
  };
  useEffect(() => { refresh(); }, []);

  const createNew = async () => {
    setBusy(true);
    const project = createBlankProject();
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    loadProject(project); // pré-charge pour éviter un refetch
    router.push(`/edit/${project.id}`);
  };

  const duplicate = async (id: string) => {
    setBusy(true);
    const res = await fetch(`/api/projects/${id}/duplicate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    setBusy(false);
    if (res.ok) refresh();
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Supprimer « ${name} » ? Cette action est définitive.`)) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-2xl py-lg border-b border-gray-200 bg-white">
        <h1 className="text-heading font-semibold text-sp-darker">Mes maquettes</h1>
        <button
          type="button"
          onClick={createNew}
          disabled={busy}
          className="px-lg py-sm rounded-md text-body font-semibold text-white bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark disabled:opacity-50 transition-colors"
        >
          + Nouvelle maquette
        </button>
      </header>

      <main className="p-2xl">
        {projects === null ? (
          <p className="text-body text-gray-500">Chargement…</p>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-md py-3xl text-center">
            <p className="text-body-lg text-gray-600">Aucune maquette pour l’instant.</p>
            <button type="button" onClick={createNew} className="text-sp-primary font-semibold hover:underline">
              Créer ma première maquette
            </button>
          </div>
        ) : (
          <div className="grid gap-lg" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {projects.map((p) => (
              <div key={p.id} className="group flex flex-col rounded-md border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <button
                  type="button"
                  onClick={() => router.push(`/edit/${p.id}`)}
                  className="block text-left"
                >
                  <div className="h-[140px] bg-gradient-to-br from-sp-lighter-alt to-sp-lighter flex items-center justify-center">
                    <span className="text-heading-lg font-bold text-sp-primary/60">
                      {(p.name || '?').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="p-md">
                    <p className="text-body font-semibold text-sp-darker truncate">{p.name || 'Sans titre'}</p>
                    <p className="text-caption text-gray-500 truncate">{p.prospectCompany || 'Prospect non défini'}</p>
                    <p className="text-caption text-gray-400 mt-xs">
                      Modifié le {new Date(p.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </button>
                <div className="flex items-center gap-md px-md pb-md mt-auto">
                  <button type="button" onClick={() => router.push(`/edit/${p.id}`)} className="text-caption text-sp-primary hover:underline">Ouvrir</button>
                  <button type="button" onClick={() => duplicate(p.id)} className="text-caption text-gray-500 hover:text-sp-primary">Dupliquer</button>
                  <button type="button" onClick={() => remove(p.id, p.name)} className="text-caption text-gray-500 hover:text-red-600 ml-auto">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
