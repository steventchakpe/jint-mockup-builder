'use client';

import { useState } from 'react';
import type { Profile, ProfileRole } from '@/types/project';
import { genId } from '@/lib/state/section-ops';
import { buildEmail } from '@/lib/profiles/default-profiles';
import { AvatarPicker } from './AvatarPicker';

interface Props {
  /** Profil à éditer — null = création. */
  profile: Profile | null;
  /** Domaine email du prospect — l'email est dérivé (prenom.nom@domaine), pas saisi. */
  emailDomain: string;
  onSubmit: (profile: Profile) => void;
  onClose: () => void;
}

const emptyProfile = (): Profile => ({
  id: genId('profile'),
  firstName: '', lastName: '', role: 'user', jobTitle: '', department: '',
  email: '', phone: null, location: null, avatar: '', manager: null,
  startDate: null, birthDate: null, bio: null, skills: [], personalContent: null,
});

const field ='rounded-lg border-2 border-[#E8E6DF] px-sm py-xs text-sm focus:outline-none focus:border-[#0A1F19]';
const label = 'text-xs font-bold uppercase tracking-wide text-[#4A5D58]';

/** Modal de création/édition d'un profil de l'annuaire (nom, avatar, poste, département…). */
export function ProfileFormModal({ profile, emailDomain, onSubmit, onClose }: Props) {
  const [draft, setDraft] = useState<Profile>(profile ?? emptyProfile());
  const isNew = !profile;

  const patch = (updates: Partial<Profile>) => setDraft((d) => ({ ...d, ...updates }));
  // Email dérivé du domaine prospect (le store le recalcule aussi à l'enregistrement)
  const email = buildEmail(draft.firstName, draft.lastName, emailDomain);

  const valid = draft.firstName.trim() && draft.lastName.trim() && draft.jobTitle.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F19]/40 p-lg" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit(draft); }}
        className="w-full max-w-[520px] bg-white rounded-3xl p-xl flex flex-col gap-lg text-[#0A1F19] max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: "'Geist Sans', sans-serif" }}
      >
        <p className="text-lg font-bold">{isNew ? 'Nouveau profil' : `Modifier ${draft.firstName} ${draft.lastName}`}</p>

        <AvatarPicker value={draft.avatar} onChange={(avatar) => patch({ avatar })} />

        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-1">
            <span className={label}>Prénom *</span>
            <input value={draft.firstName} onChange={(e) => patch({ firstName: e.target.value })} className={field} autoFocus={isNew} />
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Nom *</span>
            <input value={draft.lastName} onChange={(e) => patch({ lastName: e.target.value })} className={field} />
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Poste *</span>
            <input value={draft.jobTitle} onChange={(e) => patch({ jobTitle: e.target.value })} className={field} placeholder="ex : Directrice communication" />
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Département</span>
            <input value={draft.department} onChange={(e) => patch({ department: e.target.value })} className={field} placeholder="ex : Communication" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <span className={label}>Email (dérivé du domaine prospect)</span>
            <span className="rounded-lg bg-[#F5F4F0] px-sm py-xs text-sm text-[#4A5D58]">{email || '—'}</span>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <span className={label}>Rôle (login simulé)</span>
            <div className="flex gap-sm">
              {(['user', 'contributor'] as ProfileRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => patch({ role: r })}
                  className={`flex-1 rounded-xl border-2 px-sm py-2 text-sm font-bold transition-colors ${draft.role === r ? 'border-[#0A1F19] bg-[#F5F4F0]' : 'border-[#E8E6DF] hover:border-[#0A1F19]/40'}`}
                >
                  {r === 'contributor' ? 'Contributeur' : 'Utilisateur'}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#4A5D58]">Le contributeur voit la toolbar d’édition SharePoint quand il est connecté.</span>
          </div>
        </div>

        <div className="flex justify-end gap-sm">
          <button type="button" onClick={onClose} className="rounded-full px-md py-xs text-sm font-bold text-[#4A5D58] hover:text-[#0A1F19]">
            Annuler
          </button>
          <button type="submit" disabled={!valid} className="rounded-full bg-[#FFC82C] px-lg py-xs text-sm font-bold disabled:opacity-40">
            {isNew ? 'Créer le profil' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}
