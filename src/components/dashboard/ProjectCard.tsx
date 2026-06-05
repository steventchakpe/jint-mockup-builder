'use client';

import { useState } from 'react';
import { Users, MoreHorizontal, Copy, Trash2, Link2, ExternalLink, MonitorPlay, Eye, BarChart2, ArrowLeft } from 'lucide-react';
import { Button, Badge, DropdownMenu, DropdownItem } from './dashboard-ui';
import { currentUser, getRelativeTime, getGradientFromName, getInitials, type DashProject } from './dashboard-utils';
import type { ShareAnalytics } from '@/types/providers';

interface ProjectCardProps {
  project: DashProject;
  view: 'grid' | 'list';
  analytics?: ShareAnalytics;
  onOpen: (id: string) => void;
  onDuplicate: (project: DashProject) => void;
  onDelete: (project: DashProject) => void;
  onCopyShareLink: (project: DashProject) => void;
}

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning'> = {
  Brouillon: 'default',
  Partagée: 'warning',
  Vue: 'success',
};

/** Couleur de tag par département (équipe créatrice). */
const DEPT_TAG: Record<string, string> = {
  'Design': 'bg-[#F3E8FF] text-[#7E22CE]',
  'Customer Success': 'bg-[#DCFCE7] text-[#15803D]',
  'Sales': 'bg-[#DBEAFE] text-[#1D4ED8]',
  'Autre': 'bg-[#F5F4F0] text-[#4A5D58]',
};

/** Pastille colorée du département. */
function DepartmentTag({ department }: { department?: string }) {
  const dep = department ?? 'Autre';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${DEPT_TAG[dep] ?? DEPT_TAG['Autre']}`}>
      {dep}
    </span>
  );
}

/** Durée compacte : « 45 s » / « 12 min » / « 2 h 30 ». */
function fmtDuration(sec: number): string {
  if (sec < 60) return `${sec} s`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m}` : `${h} h`;
}

/** Dos de la carte (grille) : statistiques de partage live. */
function StatsBack({ project, analytics, onBack }: { project: DashProject; analytics?: ShareAnalytics; onBack: () => void }) {
  const shared = !!analytics?.shareCreatedAt;
  return (
    <div className="absolute inset-0 flex flex-col bg-white border border-[#E8E6DF] rounded-3xl p-5 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-[#0A1F19] flex items-center gap-2"><BarChart2 className="h-4 w-4" /> Statistiques</h3>
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold text-[#4A5D58] hover:text-[#0A1F19] transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour
        </button>
      </div>

      {!shared ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <Link2 className="h-8 w-8 text-[#E8E6DF] mb-3" />
          <p className="text-sm font-bold text-[#4A5D58]">Aucun lien de partage</p>
          <p className="text-xs text-[#4A5D58]/80 mt-1">Copiez le lien de partage pour activer le suivi des consultations.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-extrabold text-[#0A1F19] leading-tight whitespace-nowrap tabular-nums">{analytics!.views}</p>
              <p className="text-[10px] font-bold text-[#4A5D58] uppercase tracking-wide mt-1">Vues</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#0A1F19] leading-tight whitespace-nowrap tabular-nums">{analytics!.avgSessionSeconds ? fmtDuration(analytics!.avgSessionSeconds) : '—'}</p>
              <p className="text-[10px] font-bold text-[#4A5D58] uppercase tracking-wide mt-1">Durée moy.</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#0A1F19] leading-tight whitespace-nowrap tabular-nums">{analytics!.pagesVisited.length}</p>
              <p className="text-[10px] font-bold text-[#4A5D58] uppercase tracking-wide mt-1">Pages vues</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8E6DF] space-y-1.5 text-xs">
            <p className="flex justify-between items-center"><span className="text-[#4A5D58] font-medium">Créée par</span><span className="flex items-center gap-1.5 ml-2 min-w-0"><span className="font-bold text-[#0A1F19] truncate">{project.createdBy || currentUser.name}</span><DepartmentTag department={project.department} /></span></p>
            <p className="flex justify-between"><span className="text-[#4A5D58] font-medium">Entreprise</span><span className="font-bold text-[#0A1F19] truncate ml-2">{project.prospectCompany || '—'}</span></p>
            <p className="flex justify-between"><span className="text-[#4A5D58] font-medium">Lien créé</span><span className="font-bold text-[#0A1F19]">{getRelativeTime(analytics!.shareCreatedAt!)}</span></p>
            <p className="flex justify-between"><span className="text-[#4A5D58] font-medium">Dernière vue</span><span className="font-bold text-[#0A1F19]">{analytics!.lastViewedAt ? getRelativeTime(analytics!.lastViewedAt) : '—'}</span></p>
          </div>

          {analytics!.pagesVisited.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#E8E6DF] flex-1 min-h-0 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <p className="text-[10px] font-bold text-[#4A5D58] uppercase tracking-wide mb-1.5">Pages consultées</p>
              <ul className="space-y-1">
                {analytics!.pagesVisited.map((p) => (
                  <li key={p.pageId} className="flex justify-between text-xs">
                    <span className="text-[#0A1F19] font-medium truncate mr-2">{p.title}</span>
                    <span className="text-[#4A5D58] font-bold shrink-0">{p.views}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, view, analytics, onOpen, onDuplicate, onDelete, onCopyShareLink }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const shared = !!analytics?.shareCreatedAt;
  const status = project.status ?? (shared ? (analytics!.views > 0 ? 'Vue' : 'Partagée') : 'Brouillon');
  const statusVariant = STATUS_VARIANT[status] ?? 'default';

  const ActionsMenu = () => (
    <DropdownMenu trigger={<Button variant="ghost" size="icon" data-testid="card-menu" className="h-9 w-9 text-[#4A5D58] hover:text-[#0A1F19]"><MoreHorizontal className="h-5 w-5" /></Button>}>
      <DropdownItem onClick={() => onOpen(project.id)}><ExternalLink className="mr-2 h-4 w-4" /> Ouvrir l’éditeur</DropdownItem>
      <DropdownItem onClick={() => onDuplicate(project)}><Copy className="mr-2 h-4 w-4" /> Dupliquer</DropdownItem>
      <DropdownItem onClick={() => window.open(`/preview/${project.id}`, '_blank')}>
        <Eye className="mr-2 h-4 w-4" /> Voir (Présentation)
      </DropdownItem>
      <DropdownItem onClick={() => onCopyShareLink(project)}>
        <Link2 className="mr-2 h-4 w-4" /> Copier le lien de partage
      </DropdownItem>
      <DropdownItem onClick={() => setFlipped(true)}>
        <BarChart2 className="mr-2 h-4 w-4" /> Statistiques
      </DropdownItem>
      <div className="h-px bg-[#E8E6DF] my-1 mx-2" />
      <DropdownItem danger onClick={() => onDelete(project)}><Trash2 className="mr-2 h-4 w-4" /> Supprimer</DropdownItem>
    </DropdownMenu>
  );

  if (view === 'list') {
    return (
      <div className="flex items-center justify-between p-4 bg-white border border-[#E8E6DF] rounded-2xl hover:shadow-md hover:border-[#0A1F19]/20 transition-all">
        <div className="flex items-center gap-5 min-w-0">
          <button onClick={() => onOpen(project.id)} className={`h-14 w-20 rounded-xl flex-shrink-0 bg-gradient-to-br ${getGradientFromName(project.name)} overflow-hidden`}>
            {project.thumbnail
              ? <img src={project.thumbnail} alt={project.name} className="h-full w-full object-cover" />
              : <div className="h-full w-full flex items-center justify-center text-[#0A1F19]/60 font-black text-sm tracking-wider">{getInitials(project.name)}</div>}
          </button>
          <div className="min-w-0">
            <button onClick={() => onOpen(project.id)} className="block text-left text-base font-bold text-[#0A1F19] truncate">{project.name || 'Sans titre'}</button>
            <p className="text-sm font-medium text-[#4A5D58] flex items-center mt-1 truncate">
              {project.prospectCompany && <><Users className="h-3.5 w-3.5 mr-1.5" /> {project.prospectCompany} <span className="mx-2 text-[#E8E6DF]">•</span></>}
              Modifié {getRelativeTime(project.updatedAt)}
              {shared && <><span className="mx-2 text-[#E8E6DF]">•</span> {analytics!.views} vue{analytics!.views > 1 ? 's' : ''}</>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Badge variant={statusVariant} className="hidden sm:inline-flex">{status}</Badge>
          <ActionsMenu />
        </div>
      </div>
    );
  }

  return (
    <div className="group [perspective:1600px]">
      <div className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* FACE AVANT */}
        <div className="flex flex-col bg-white border border-[#E8E6DF] rounded-3xl hover:shadow-xl hover:border-[#0A1F19]/10 transition-shadow duration-300 [backface-visibility:hidden]">
          <button onClick={() => onOpen(project.id)} className={`relative h-44 w-full rounded-t-3xl overflow-hidden bg-gradient-to-br ${getGradientFromName(project.name)}`}>
            {project.thumbnail
              ? <img src={project.thumbnail} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              : <span className="absolute inset-0 flex items-center justify-center"><MonitorPlay className="h-14 w-14 text-[#0A1F19]/20" /></span>}
            <span className="absolute top-4 left-4"><Badge variant={statusVariant} className="shadow-sm backdrop-blur-md bg-white/95">{status}</Badge></span>
          </button>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="min-w-0">
                <button onClick={() => onOpen(project.id)} className="block text-left text-lg font-extrabold text-[#0A1F19] leading-tight line-clamp-1">{project.name || 'Sans titre'}</button>
                <p className="text-sm font-medium text-[#4A5D58] mt-1.5 flex items-center line-clamp-1">
                  {project.prospectCompany
                    ? <><Users className="h-4 w-4 mr-1.5 flex-shrink-0" /> {project.prospectCompany}</>
                    : <DepartmentTag department={project.department} />}
                </p>
              </div>
              <div className="-mt-1 -mr-2"><ActionsMenu /></div>
            </div>
            <div className="mt-auto pt-5 flex items-center justify-between text-xs font-bold text-[#4A5D58]">
              <span>{getRelativeTime(project.updatedAt)}</span>
              <span className="flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="h-7 w-7 rounded-full bg-[#F5F4F0] flex items-center justify-center ring-2 ring-white shadow-sm" title={currentUser.name}>
                  <img src={currentUser.avatarUrl} alt="" className="h-full w-full rounded-full" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* DOS — statistiques */}
        <StatsBack project={project} analytics={analytics} onBack={() => setFlipped(false)} />
      </div>
    </div>
  );
}
