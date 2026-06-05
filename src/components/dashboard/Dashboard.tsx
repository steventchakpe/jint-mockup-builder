'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Search, LayoutGrid, List, Sparkles, Users, BarChart2,
  Clock, Settings, MonitorPlay, ChevronDown, FolderOpen, AlertCircle,
} from 'lucide-react';
import { createBlankProject } from '@/lib/state/blank-project';
import { useProjectStore } from '@/lib/state/project-store';
import { Button, Input, Skeleton, Modal, MetricCard, SidebarItem, JintLogo } from './dashboard-ui';
import { ProjectCard } from './ProjectCard';
import { currentUser, mockMetrics, type DashProject } from './dashboard-utils';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * Dashboard multi-maquettes (PRD §6.10) — design Jint.
 * Branché sur l'API réelle (`/api/projects`) + création via createBlankProject + navigation Next.
 * Métriques de partage = mock (Phase 4 / PostHog).
 */
export function Dashboard() {
  const router = useRouter();
  const loadProjectIntoStore = useProjectStore((s) => s.loadProject);

  const [projects, setProjects] = useState<DashProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [projectToDelete, setProjectToDelete] = useState<DashProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    const res = await fetch('/api/projects');
    setProjects(res.ok ? await res.json() : []);
    setIsLoading(false);
  };
  useEffect(() => { loadProjects(); }, []);

  const openProject = (id: string) => router.push(`/edit/${id}`);

  const handleCreateProject = () => {
    setIsCreating(true);
    // Pas de POST ici : la maquette n'est persistée qu'au premier clic sur « Sauvegarder » (PRD §6.8).
    const project = createBlankProject();
    loadProjectIntoStore(project, { dirty: true });
    router.push(`/edit/${project.id}`);
  };

  const handleDuplicate = async (project: DashProject) => {
    const res = await fetch(`/api/projects/${project.id}/duplicate`, { method: 'POST', headers: JSON_HEADERS, body: '{}' });
    if (res.ok) loadProjects();
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    await fetch(`/api/projects/${projectToDelete.id}`, { method: 'DELETE' });
    setIsDeleting(false);
    setProjectToDelete(null);
    loadProjects();
  };

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || (p.prospectCompany ?? '').toLowerCase().includes(q));
    }
    return [...result].sort((a, b) =>
      sortBy === 'date' ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() : a.name.localeCompare(b.name),
    );
  }, [projects, searchQuery, sortBy]);

  const recentCount = projects.filter((p) => (Date.now() - new Date(p.updatedAt).getTime()) / 86400000 <= 7).length;

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col md:flex-row text-[#0A1F19]" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/style.css');` }} />

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[#E8E6DF] bg-white px-5 py-8 z-10 sticky top-0 h-screen">
        <div className="flex items-center gap-1 px-2 mb-10"><JintLogo className="h-8 w-auto" /></div>
        <nav className="space-y-1.5 flex-1">
          <SidebarItem icon={LayoutGrid} label="Mes maquettes" active />
          <SidebarItem icon={FolderOpen} label="Modèles" />
          <SidebarItem icon={BarChart2} label="Analytiques" />
        </nav>
        <div className="mt-auto pt-6 border-t border-[#E8E6DF]"><SidebarItem icon={Settings} label="Paramètres" /></div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP NAV */}
        <header className="h-20 border-b border-[#E8E6DF] bg-[#F5F4F0]/80 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between md:justify-end">
          <div className="md:hidden flex items-center gap-1"><JintLogo className="h-7 w-auto" /></div>
          <div className="flex items-center gap-5">
            <button className="relative text-[#0A1F19] hover:bg-[#E8E6DF] p-2 rounded-full transition-colors">
              <AlertCircle className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-[#F5F4F0]" />
            </button>
            <div className="h-8 w-px bg-[#E8E6DF]" />
            <button className="flex items-center gap-3 hover:bg-[#E8E6DF] py-1.5 px-3 rounded-full transition-colors">
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-9 w-9 rounded-full border border-[#E8E6DF]" />
              <span className="text-sm font-bold hidden sm:block">{currentUser.name}</span>
              <ChevronDown className="h-4 w-4 text-[#4A5D58]" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10 lg:max-w-[80rem] lg:mx-auto w-full">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Mes maquettes</h1>
              <p className="text-[#4A5D58] font-medium mt-2 text-lg">Bonjour {currentUser.name} 👋, prêt à impressionner vos prospects ?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Button variant="outline" className="pointer-events-none opacity-50"><Sparkles className="mr-2 h-4 w-4" /> Créer avec l’IA</Button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-[#0A1F19] text-white font-bold text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Disponible prochainement</div>
              </div>
              <Button onClick={handleCreateProject} disabled={isCreating}>
                {isCreating ? <div className="h-5 w-5 rounded-full border-2 border-[#0A1F19]/30 border-t-[#0A1F19] animate-spin mr-2" /> : <Plus className="mr-2 h-5 w-5" />}
                Nouvelle maquette
              </Button>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <MetricCard title="Total maquettes" value={isLoading ? '—' : projects.length} icon={LayoutGrid} />
            <MetricCard title="Modifiées récemment" value={isLoading ? '—' : recentCount} icon={Clock} />
            <MetricCard title="Vues des partages" value={mockMetrics.totalViews.value} trend={mockMetrics.totalViews.trend} isPositive={mockMetrics.totalViews.isPositive} icon={Users} />
            <MetricCard title="Dernière consultation" value={mockMetrics.lastProspectView.value} trend={mockMetrics.lastProspectView.trend} isPositive={mockMetrics.lastProspectView.isPositive} icon={MonitorPlay} />
          </div>

          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-2.5 border border-[#E8E6DF] rounded-2xl shadow-sm">
            <div className="w-full sm:w-96">
              <Input icon={Search} placeholder="Rechercher une maquette, un prospect…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-none bg-transparent" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto px-2 sm:px-0">
              <div className="h-8 w-px bg-[#E8E6DF] mx-2 hidden sm:block" />
              <select className="text-sm font-bold bg-transparent border-none text-[#4A5D58] cursor-pointer outline-none" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}>
                <option value="date">Trier par : Récent</option>
                <option value="name">Trier par : Nom (A-Z)</option>
              </select>
              <div className="flex items-center bg-[#F5F4F0] rounded-xl p-1 ml-auto sm:ml-4 border border-[#E8E6DF]">
                <button className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#0A1F19]' : 'text-[#4A5D58] hover:text-[#0A1F19]'}`} onClick={() => setViewMode('grid')}><LayoutGrid className="h-4 w-4" /></button>
                <button className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[#0A1F19]' : 'text-[#4A5D58] hover:text-[#0A1F19]'}`} onClick={() => setViewMode('list')}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          {isLoading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {[1, 2, 3, 4].map((i) => viewMode === 'grid' ? (
                <div key={i} className="bg-white border border-[#E8E6DF] rounded-3xl overflow-hidden">
                  <Skeleton className="h-44 w-full rounded-none" />
                  <div className="p-5 space-y-4"><Skeleton className="h-6 w-2/3" /><Skeleton className="h-4 w-1/2" /><div className="pt-5 flex justify-between"><Skeleton className="h-4 w-20" /><Skeleton className="h-7 w-7 rounded-full" /></div></div>
                </div>
              ) : <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white border border-dashed border-[#E8E6DF] rounded-3xl">
              <div className="h-24 w-24 bg-[#F5F4F0] rounded-full flex items-center justify-center mb-6"><FolderOpen className="h-10 w-10 text-[#0A1F19]" /></div>
              <h3 className="text-2xl font-extrabold mb-3">Aucune maquette trouvée</h3>
              <p className="text-[#4A5D58] font-medium max-w-[28rem] mx-auto text-center mb-8 text-base">{searchQuery ? 'Aucune maquette ne correspond à votre recherche.' : 'Vous n’avez pas encore créé de maquette. Commencez pour vos prospects.'}</p>
              {!searchQuery && <Button onClick={handleCreateProject}><Plus className="mr-2 h-5 w-5" /> Créer ma première maquette</Button>}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {filteredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} view={viewMode} onOpen={openProject} onDuplicate={handleDuplicate} onDelete={setProjectToDelete} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Supprimer la maquette ?"
        description={`Êtes-vous sûr de vouloir supprimer « ${projectToDelete?.name} » ? Cette action est irréversible.`}
      >
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <Button variant="outline" onClick={() => setProjectToDelete(null)} disabled={isDeleting} className="w-full sm:w-auto">Annuler</Button>
          <Button variant="danger" onClick={confirmDelete} disabled={isDeleting} className="w-full sm:w-auto">{isDeleting ? 'Suppression…' : 'Oui, supprimer'}</Button>
        </div>
      </Modal>
    </div>
  );
}
