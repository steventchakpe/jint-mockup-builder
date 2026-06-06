'use client';

import type { Profile } from '@/types/project';

/** Actions et drapeaux communs aux deux vues de l'annuaire. */
export interface ProfileRowProps {
  profile: Profile;
  isSwitchable: boolean;
  isActive: boolean;
  onEdit: () => void;
  onToggleSwitchable: () => void;
  onDelete: () => void;
}

function Avatar({ profile, size }: { profile: Profile; size: number }) {
  return (
    <div className="rounded-full bg-[#E8E6DF] overflow-hidden shrink-0" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {profile.avatar && <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="h-full w-full object-cover" />}
    </div>
  );
}

function Badges({ profile, isSwitchable, isActive }: Pick<ProfileRowProps, 'profile' | 'isSwitchable' | 'isActive'>) {
  return (
    <>
      {isSwitchable && (
        <span className="rounded-full bg-[#0A1F19] text-white text-[11px] font-bold px-sm py-0.5 whitespace-nowrap">
          {profile.role === 'contributor' ? 'Login · Contributeur' : 'Login · Utilisateur'}
        </span>
      )}
      {isActive && <span className="rounded-full bg-[#FFC82C] text-[11px] font-bold px-sm py-0.5">Connecté</span>}
    </>
  );
}

function Actions({ isSwitchable, onEdit, onToggleSwitchable, onDelete }: ProfileRowProps) {
  return (
    <>
      <button type="button" onClick={onEdit} className="text-[#0A1F19] hover:underline">Modifier</button>
      <button type="button" onClick={onToggleSwitchable} className="text-[#4A5D58] hover:text-[#0A1F19]">
        {isSwitchable ? 'Retirer du login' : 'Ajouter au login'}
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isSwitchable}
        title={isSwitchable ? 'Retire d’abord ce profil du login simulé' : undefined}
        className="ml-auto text-[#d13438] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Supprimer
      </button>
    </>
  );
}

/** Carte de la vue grille. */
export function ProfileCard(props: ProfileRowProps) {
  const { profile: p } = props;
  return (
    <div className="bg-white rounded-3xl border border-[#E8E6DF] p-lg flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Avatar profile={p} size={48} />
        <div className="min-w-0">
          <p className="font-bold truncate">{p.firstName} {p.lastName}</p>
          <p className="text-sm text-[#4A5D58] truncate">{p.jobTitle}</p>
          {p.department && <p className="text-xs text-[#4A5D58] truncate">{p.department}</p>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 min-h-6"><Badges {...props} /></div>
      <div className="flex items-center gap-sm text-sm font-bold border-t border-[#E8E6DF] pt-sm"><Actions {...props} /></div>
    </div>
  );
}

/** Ligne de la vue liste (tableau). */
export function ProfileListRow(props: ProfileRowProps) {
  const { profile: p } = props;
  return (
    <tr className="border-b border-[#E8E6DF] last:border-0 hover:bg-[#F5F4F0]/60 transition-colors">
      <td className="py-sm pl-lg pr-sm"><Avatar profile={p} size={36} /></td>
      <td className="py-sm pr-md font-bold whitespace-nowrap">{p.firstName} {p.lastName}</td>
      <td className="py-sm pr-md text-[#4A5D58]">{p.jobTitle}</td>
      <td className="py-sm pr-md text-[#4A5D58]">{p.department}</td>
      <td className="py-sm pr-md text-[#4A5D58] whitespace-nowrap">{p.email}</td>
      <td className="py-sm pr-md"><div className="flex items-center gap-1.5"><Badges {...props} /></div></td>
      <td className="py-sm pr-lg"><div className="flex items-center gap-sm text-sm font-bold min-w-[280px]"><Actions {...props} /></div></td>
    </tr>
  );
}
