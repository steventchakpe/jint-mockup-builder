'use client';

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  ChatIcon,
  CopyIcon,
  InfoIcon,
  MailIcon,
  PeopleIcon,
  PeopleInfoIcon,
  PlaceIcon,
  TreeIcon,
} from '../EmployeeDirectory.icons';
import { ROUNDED_PX, SHADOW } from '../EmployeeDirectory.mozzaik';
import type { DirectoryPerson, DirectoryRounded, DirectoryShadow } from '../EmployeeDirectory.types';

interface ProfileDetailProps {
  person: DirectoryPerson;
  people: DirectoryPerson[];
  rounded: DirectoryRounded;
  shadow: DirectoryShadow;
  onBack: () => void;
  onSelectPerson?: (id: string) => void;
}

/** Carte de section (padding 16, fond blanc, ombre) avec en-tête optionnel. */
function SectionCard({
  icon,
  label,
  shadow,
  className,
  center,
  children,
}: {
  icon?: ReactNode;
  label?: string;
  shadow: DirectoryShadow;
  className?: string;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn('bg-white p-lg flex flex-col gap-md', center && 'items-center text-center', className)}
      style={{ boxShadow: SHADOW[shadow] }}
    >
      {label && (
        <div className="flex items-center gap-sm">
          {icon && (
            <span className="inline-flex items-center justify-center w-[18px] h-[18px] shrink-0 text-sp-darker [&>svg]:w-full [&>svg]:h-full">
              {icon}
            </span>
          )}
          <span className="text-body-lg font-semibold text-[#605e5c]">{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

/** Ligne label/valeur (coordonnées). */
function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="text-caption text-[#a19f9d]">{label}</span>
      <span className="text-body text-sp-darker break-words">{value}</span>
    </div>
  );
}

/** Badge personne (organigramme) — avatar 72, nom + poste, cliquable. */
function TeamBadge({ person, onClick }: { person: DirectoryPerson; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn('flex flex-col items-center text-center w-32 gap-[4px] py-md', onClick && 'cursor-pointer')}
    >
      <div
        className="w-[72px] h-[72px] rounded-full overflow-hidden bg-sp-lighter-alt"
        style={{ border: '3px solid var(--sp-theme-primary)' }}
      >
        {person.imageUrl && <img src={person.imageUrl} alt={person.displayName} className="w-full h-full object-cover" loading="lazy" />}
      </div>
      <span className="text-caption font-bold text-sp-darker truncate max-w-full">{person.displayName}</span>
      {person.title && <span className="text-[10px] font-bold text-[#a19f9d] uppercase truncate max-w-full">{person.title}</span>}
    </div>
  );
}

const actionBtn = 'w-8 h-8 inline-flex items-center justify-center rounded-sm text-sp-darker bg-white shadow-sm hover:bg-sp-lighter-alt transition-colors';

/**
 * Fiche profil détaillée — port fidèle de `ProfileDetails` (whoiswho/classic).
 * 2 colonnes (gauche 30% : Informations + Coordonnées · droite 70% : À propos + Organigramme),
 * gap 32, repli en 1 colonne < 1024px. Données = profils du state (pas de Graph).
 */
export function ProfileDetail({ person, people, rounded, shadow, onBack, onSelectPerson }: ProfileDetailProps) {
  const radius = ROUNDED_PX[rounded];
  const manager = person.managerId ? people.find((p) => p.id === person.managerId) : undefined;
  const colleagues = person.managerId
    ? people.filter((p) => p.managerId === person.managerId && p.id !== person.id)
    : [];

  const tag = (icon: ReactNode, text?: string) =>
    text ? (
      <span className="inline-flex items-center gap-[6px] px-[12px] py-[6px] text-sp-darker uppercase text-[12px]" style={{ borderRadius: radius }}>
        <span className="shrink-0 inline-flex">{icon}</span>
        {text}
      </span>
    ) : null;

  const detailStyle: CSSProperties = {};

  return (
    <div className="w-full @container" style={detailStyle}>
      <button type="button" onClick={onBack} className="mb-lg text-sp-primary font-semibold hover:underline">
        ← Retour à l’annuaire
      </button>

      <div className="flex flex-col @[1024px]:flex-row gap-[32px]">
        {/* Colonne gauche (30%) */}
        <div className="flex flex-col gap-[32px] @[1024px]:max-w-[30%] grow">
          <SectionCard shadow={shadow} center>
            <div
              className="w-[120px] h-[120px] rounded-full overflow-hidden bg-sp-lighter-alt"
              style={{ border: '3px solid var(--sp-theme-primary)' }}
            >
              {person.imageUrl && <img src={person.imageUrl} alt={person.displayName} className="w-full h-full object-cover" loading="lazy" />}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-heading-sm font-bold text-sp-darker">{person.displayName}</span>
              {person.title && <span className="text-[10px] font-bold text-[#a19f9d] uppercase">{person.title}</span>}
            </div>
            <div className="flex flex-col items-center">
              {tag(<PeopleIcon />, person.department)}
              {tag(<PlaceIcon />, person.location)}
            </div>
            <div className="flex items-center justify-center gap-md">
              {person.email && (
                <a className={actionBtn} href={`mailto:${person.email}`} aria-label="Envoyer un e-mail"><MailIcon className="w-4 h-4" /></a>
              )}
              <button type="button" className={actionBtn} aria-label="Discuter"><ChatIcon className="w-4 h-4" /></button>
              <button type="button" className={actionBtn} aria-label="Copier le lien du profil"><CopyIcon className="w-4 h-4" /></button>
            </div>
          </SectionCard>

          {(person.email || person.phone || person.location) && (
            <SectionCard shadow={shadow} icon={<InfoIcon />} label="Coordonnées">
              <InfoRow label="E-mail" value={person.email} />
              <InfoRow label="Téléphone" value={person.phone} />
              <InfoRow label="Bureau" value={person.location} />
            </SectionCard>
          )}
        </div>

        {/* Colonne droite (70%) */}
        <div className="flex flex-col gap-[32px] @[1024px]:max-w-[calc(70%-32px)] grow">
          {(person.bio || (person.skills && person.skills.length > 0)) && (
            <SectionCard shadow={shadow} icon={<PeopleInfoIcon />} label="À propos">
              {person.bio && <p className="text-body text-sp-darker">{person.bio}</p>}
              {person.skills && person.skills.length > 0 && (
                <div className="flex flex-wrap gap-sm">
                  {person.skills.map((s) => (
                    <span key={s} className="px-[12px] py-[6px] text-[12px] bg-sp-lighter-alt text-sp-primary" style={{ borderRadius: radius }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>
          )}

          <SectionCard shadow={shadow} icon={<TreeIcon />} label="Organigramme">
            <div className="flex flex-col items-center">
              {manager && (
                <>
                  <TeamBadge person={manager} onClick={onSelectPerson ? () => onSelectPerson(manager.id) : undefined} />
                  <div className="w-px h-6 bg-gray-200" />
                </>
              )}
              <TeamBadge person={person} />
              {colleagues.length > 0 && (
                <>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="flex flex-wrap justify-center gap-md">
                    {colleagues.map((c) => (
                      <TeamBadge key={c.id} person={c} onClick={onSelectPerson ? () => onSelectPerson(c.id) : undefined} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
