'use client';

import { Users, MoreHorizontal, Copy, Trash2, Link2, ExternalLink, MonitorPlay, FolderOpen, Eye } from 'lucide-react';
import { Button, Badge, DropdownMenu, DropdownItem } from './dashboard-ui';
import { currentUser, getRelativeTime, getGradientFromName, getInitials, type DashProject } from './dashboard-utils';

interface ProjectCardProps {
  project: DashProject;
  view: 'grid' | 'list';
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

export function ProjectCard({ project, view, onOpen, onDuplicate, onDelete, onCopyShareLink }: ProjectCardProps) {
  const status = project.status ?? 'Brouillon';
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
    <div className="group flex flex-col bg-white border border-[#E8E6DF] rounded-3xl hover:shadow-xl hover:border-[#0A1F19]/10 transition-shadow duration-300">
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
                : <><FolderOpen className="h-4 w-4 mr-1.5 flex-shrink-0" /> Prospect non défini</>}
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
  );
}
