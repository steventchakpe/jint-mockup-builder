'use client';

import { useState } from 'react';
import { useProjectStore } from '@/lib/state/project-store';
import { useDemoStrings } from '@/lib/i18n';
import type { DemoStrings } from '@/lib/i18n';
import type { Profile } from '@/types/project';

type AccountStrings = DemoStrings['account'];

/** Initiales d'un profil. */
const initials = (p: Profile) => `${p.firstName[0] ?? ''}${p.lastName[0] ?? ''}`.toUpperCase();

function Avatar({ profile, size }: { profile: Profile; size: number }) {
  return (
    <span className="rounded-full overflow-hidden bg-[#ca5010] inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      {profile.avatar
        ? <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="w-full h-full object-cover" />
        : <span className="text-white font-semibold" style={{ fontSize: size * 0.35 }}>{initials(profile)}</span>}
    </span>
  );
}

/** Logo Microsoft (4 carrés officiels). */
function MicrosoftLogo({ size = 21 }: { size?: number }) {
  const s = Math.floor((size - 1) / 2);
  return (
    <span className="inline-flex items-center gap-xs">
      <span className="grid grid-cols-2" style={{ gap: 1 }} aria-hidden>
        <span style={{ width: s, height: s, background: '#f25022' }} />
        <span style={{ width: s, height: s, background: '#7fba00' }} />
        <span style={{ width: s, height: s, background: '#00a4ef' }} />
        <span style={{ width: s, height: s, background: '#ffb900' }} />
      </span>
      <span className="font-semibold text-[#5e5e5e]" style={{ fontSize: size * 0.9, letterSpacing: '-0.02em' }}>Microsoft</span>
    </span>
  );
}

/** Icône « personne + » (Utiliser un autre compte) — style Fluent login. */
function PersonAddIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" aria-hidden>
      <path d="M9 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1.5 3A2.5 2.5 0 0 0 2 14.5c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 9 19.5c.41 0 .82-.02 1.21-.06a5.48 5.48 0 0 1-.97-1A12 12 0 0 1 9 18.5c-1.85 0-3.58-.39-4.87-1.2A3.35 3.35 0 0 1 3 14.5 1.5 1.5 0 0 1 4.5 13h5.76c.18-.36.4-.7.66-1H4.5Zm10 7.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-7a.5.5 0 0 1 .5.5V14h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 .5-.5Z" />
    </svg>
  );
}

/**
 * Page « Choisir un compte » — réplique de login.microsoftonline.com :
 * fond bleu dégradé (illustration MS), carte blanche 440px (padding 44px,
 * ombre), logo Microsoft, titre 24 semibold, tuiles de compte (avatar 48,
 * filet, hover gris), « Utiliser un autre compte », footer liens légaux.
 */
function AccountPicker({ profiles, t, onPick, onClose }: { profiles: Profile[]; t: AccountStrings; onPick: (id: string) => void; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/ms-login-background.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div className="bg-white w-[440px] max-w-[calc(100vw-32px)]" style={{ padding: 44, boxShadow: '0 2px 6px rgba(0,0,0,0.2)', minHeight: 338 }}>
        <MicrosoftLogo />
        <h1 className="font-semibold text-[#1b1b1b]" style={{ fontSize: 24, margin: '16px 0 12px' }}>{t.chooseAccount}</h1>

        <div className="flex flex-col -mx-[44px]">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPick(p.id)}
              className="flex items-center gap-md text-left hover:bg-[#f2f2f2] transition-colors border-b border-[#f2f2f2]"
              style={{ padding: '12px 44px' }}
            >
              <Avatar profile={p} size={48} />
              <span className="flex flex-col min-w-0">
                <span className="text-[#1b1b1b] truncate" style={{ fontSize: 15, fontWeight: 600 }}>{p.firstName} {p.lastName}</span>
                <span className="text-[#5e5e5e] truncate" style={{ fontSize: 13 }}>{p.email}</span>
                <span className="text-[#5e5e5e]" style={{ fontSize: 13 }}>{t.signedIn}</span>
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-md text-left hover:bg-[#f2f2f2] transition-colors text-[#5e5e5e]"
            style={{ padding: '14px 44px' }}
          >
            <span className="inline-flex items-center justify-center" style={{ width: 48 }}><PersonAddIcon /></span>
            <span className="text-[#1b1b1b]" style={{ fontSize: 15 }}>{t.useAnother}</span>
          </button>
        </div>
      </div>

      {/* Footer légal (bas droite, comme login.microsoftonline.com) */}
      <div className="fixed bottom-0 right-0 flex" style={{ fontSize: 12 }}>
        {[t.terms, t.privacy, '···'].map((l) => (
          <span key={l} className="text-white/90 hover:bg-black/20 cursor-pointer" style={{ padding: '8px 12px' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Me control M365 — réplique du panneau de compte Microsoft 365 :
 * 320px, bandeau organisation + « Se déconnecter », avatar 88px, nom 18
 * semibold, email 12, liens « Afficher le compte » / « Mon profil Microsoft
 * 365 », pied « Se connecter avec un autre compte ».
 */
function MeControl({ active, company, t, onSignOut, onSwitch, onClose }: { active: Profile; company: string; t: AccountStrings; onSignOut: () => void; onSwitch: () => void; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      <div className="absolute right-0 top-12 z-[95] w-[320px] bg-white text-[#323130]" style={{ fontFamily: 'Segoe UI, sans-serif', boxShadow: '0 6.4px 14.4px rgba(0,0,0,0.13), 0 1.2px 3.6px rgba(0,0,0,0.11)' }}>
        {/* Bandeau organisation */}
        <div className="flex items-center justify-between" style={{ height: 48, padding: '0 12px 0 16px' }}>
          <span className="font-semibold truncate" style={{ fontSize: 14 }}>{company || 'Contoso'}</span>
          <button type="button" onClick={onSignOut} className="text-[#323130] hover:underline shrink-0" style={{ fontSize: 12 }}>
            {t.signOut}
          </button>
        </div>

        {/* Identité */}
        <div className="flex" style={{ padding: '4px 16px 16px', gap: 16 }}>
          <Avatar profile={active} size={88} />
          <span className="flex flex-col min-w-0 justify-center" style={{ gap: 2 }}>
            <span className="font-bold truncate" style={{ fontSize: 18 }}>{active.firstName} {active.lastName}</span>
            <span className="text-[#605e5c] truncate" style={{ fontSize: 12 }}>{active.email}</span>
            <span className="text-sp-primary hover:underline cursor-pointer" style={{ fontSize: 12 }}>{t.viewAccount}</span>
            <span className="text-sp-primary hover:underline cursor-pointer" style={{ fontSize: 12 }}>{t.myProfile}</span>
          </span>
        </div>

        {/* Pied : autre compte */}
        <button
          type="button"
          onClick={onSwitch}
          className="flex items-center gap-md w-full text-left border-t border-[#edebe9] hover:bg-[#f3f2f1] transition-colors"
          style={{ padding: '12px 16px', fontSize: 14 }}
        >
          <span className="text-[#605e5c]"><PersonAddIcon /></span>
          {t.signInAnother}
        </button>
      </div>
    </>
  );
}

/**
 * Avatar du suite header + Me control + page « Choisir un compte » (US-28).
 * Sans projet chargé (pages démo) : avatar statique « JD ».
 */
export function AccountSwitcher() {
  const project = useProjectStore((s) => s.project);
  const setActiveProfile = useProjectStore((s) => s.setActiveProfile);
  const t = useDemoStrings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const profiles = project?.profiles;
  const active = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  const switchable = (profiles?.switchable ?? [])
    .map((id) => profiles?.editable.find((p) => p.id === id))
    .filter((p): p is Profile => !!p);

  if (!active) {
    return (
      <button className="w-12 h-12 flex items-center justify-center shrink-0" aria-label={t.suite.account}>
        <span className="w-8 h-8 rounded-full bg-[#ca5010] flex items-center justify-center">
          <span className="text-white text-caption font-semibold">JD</span>
        </span>
      </button>
    );
  }

  return (
    <>
      <button className="w-12 h-12 flex items-center justify-center shrink-0 hover:bg-white/10" aria-label={t.suite.account} onClick={() => setMenuOpen((o) => !o)}>
        <Avatar profile={active} size={32} />
      </button>

      {menuOpen && (
        <MeControl
          active={active}
          t={t.account}
          company={project?.prospect.company ?? ''}
          onSignOut={() => { setMenuOpen(false); setPickerOpen(true); }}
          onSwitch={() => { setMenuOpen(false); setPickerOpen(true); }}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {pickerOpen && (
        <AccountPicker
          profiles={switchable}
          t={t.account}
          onPick={(id) => { setActiveProfile(id); setPickerOpen(false); }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}
