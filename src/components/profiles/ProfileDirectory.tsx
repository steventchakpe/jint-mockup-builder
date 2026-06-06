'use client';

import { useState } from 'react';
import type { Profile } from '@/types/project';
import { useProjectStore } from '@/lib/state/project-store';
import { findProfileReferences } from '@/lib/profiles/profile-refs';
import { ProfileFormModal } from './ProfileFormModal';
import { ProfileCard, ProfileListRow } from './ProfileViews';

const MAX_PROFILES = 20;
const MAX_SWITCHABLE = 3;

/**
 * Annuaire des profils de la maquette — CRUD des 20 profils éditables.
 * Les webparts (anniversary, newcomers, news, org chart, trombinoscope…)
 * référencent ces profils par ID et sont hydratés au rendu (cf. hydrate.ts) :
 * toute modification ici se propage dans la maquette. Les profils
 * « switchables » apparaissent dans le login Microsoft simulé.
 */
export function ProfileDirectory() {
  const project = useProjectStore((s) => s.project);
  const addProfile = useProjectStore((s) => s.addProfile);
  const updateProfile = useProjectStore((s) => s.updateProfile);
  const removeProfile = useProjectStore((s) => s.removeProfile);
  const toggleSwitchable = useProjectStore((s) => s.toggleSwitchable);
  const setEmailDomain = useProjectStore((s) => s.setEmailDomain);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [domainDraft, setDomainDraft] = useState<string | null>(null);
  const [modal, setModal] = useState<{ open: boolean; profile: Profile | null }>({ open: false, profile: null });
  if (!project) return null;

  const { editable, switchable, activeProfileId } = project.profiles;
  const domain = project.prospect.emailDomain;

  const commitDomain = () => {
    if (domainDraft !== null && domainDraft.trim() && domainDraft.trim() !== domain) setEmailDomain(domainDraft);
    setDomainDraft(null);
  };

  const onDelete = (p: Profile) => {
    const refs = findProfileReferences(project, p.id);
    const refsMsg = refs.length
      ? `\n\nAttention : ce profil est utilisé par ${refs.length} webpart(s) :\n${refs.map((r) => `• ${r.webpartType} (page « ${r.pageTitle} »)`).join('\n')}\nCes webparts perdront leur référence.`
      : '';
    if (window.confirm(`Supprimer ${p.firstName} ${p.lastName} ?${refsMsg}`)) removeProfile(p.id);
  };

  const onToggleSwitchable = (p: Profile) => {
    const isIn = switchable.includes(p.id);
    if (isIn && p.id === activeProfileId) {
      window.alert('Ce profil est actuellement connecté dans la maquette — change d’abord de compte avant de le retirer du login.');
      return;
    }
    if (!isIn && switchable.length >= MAX_SWITCHABLE) {
      window.alert(`Maximum ${MAX_SWITCHABLE} comptes dans le login simulé — retire d’abord un profil.`);
      return;
    }
    toggleSwitchable(p.id);
  };

  const rowProps = (p: Profile) => ({
    profile: p,
    isSwitchable: switchable.includes(p.id),
    isActive: p.id === activeProfileId,
    onEdit: () => setModal({ open: true, profile: p }),
    onToggleSwitchable: () => onToggleSwitchable(p),
    onDelete: () => onDelete(p),
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F4F0]" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
      <div className="max-w-[80rem] mx-auto px-xl py-xl flex flex-col gap-lg text-[#0A1F19]">
        <div className="flex flex-wrap items-end justify-between gap-md">
          <div>
            <h1 className="text-2xl font-bold">Annuaire des profils</h1>
            <p className="text-sm text-[#4A5D58]">
              {editable.length}/{MAX_PROFILES} profils · référencés par ID dans les webparts ·{' '}
              {switchable.length}/{MAX_SWITCHABLE} comptes dans le login simulé
            </p>
          </div>
          <div className="flex items-center gap-md">
            {/* Domaine email — une seule saisie pour tous les profils */}
            <label className="flex items-center gap-sm text-sm">
              <span className="font-bold text-[#4A5D58]">Emails : prenom.nom@</span>
              <input
                value={domainDraft ?? domain}
                onChange={(e) => setDomainDraft(e.target.value)}
                onBlur={commitDomain}
                onKeyDown={(e) => e.key === 'Enter' && commitDomain()}
                placeholder="prospect.com"
                className="w-40 rounded-lg border-2 border-[#E8E6DF] bg-white px-sm py-xs text-sm focus:outline-none focus:border-[#0A1F19]"
              />
            </label>
            {/* Toggle vue grille / liste */}
            <div className="flex rounded-full border border-[#E8E6DF] bg-white p-0.5">
              {([['grid', '▦ Grille'], ['list', '☰ Liste']] as const).map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-sm py-1 rounded-full text-xs font-bold transition-colors ${view === v ? 'bg-[#0A1F19] text-white' : 'text-[#4A5D58] hover:text-[#0A1F19]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setModal({ open: true, profile: null })}
              disabled={editable.length >= MAX_PROFILES}
              className="rounded-full bg-[#FFC82C] px-lg py-2 text-sm font-bold whitespace-nowrap disabled:opacity-40"
              title={editable.length >= MAX_PROFILES ? `Maximum ${MAX_PROFILES} profils` : undefined}
            >
              + Nouveau profil
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {editable.map((p) => <ProfileCard key={p.id} {...rowProps(p)} />)}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#E8E6DF] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-[#4A5D58] border-b border-[#E8E6DF]">
                  <th className="py-sm pl-lg pr-sm" />
                  <th className="py-sm pr-md">Nom</th>
                  <th className="py-sm pr-md">Poste</th>
                  <th className="py-sm pr-md">Département</th>
                  <th className="py-sm pr-md">Email</th>
                  <th className="py-sm pr-md">Statut</th>
                  <th className="py-sm pr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {editable.map((p) => <ProfileListRow key={p.id} {...rowProps(p)} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal.open && (
        <ProfileFormModal
          profile={modal.profile}
          emailDomain={domain}
          onClose={() => setModal({ open: false, profile: null })}
          onSubmit={(p) => {
            if (modal.profile) updateProfile(p.id, p);
            else addProfile(p);
            setModal({ open: false, profile: null });
          }}
        />
      )}
    </div>
  );
}
