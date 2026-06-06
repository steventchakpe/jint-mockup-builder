'use client';

import { cn } from '@/lib/utils';
import { useProjectStore } from '@/lib/state/project-store';
import { useDemoStrings } from '@/lib/i18n';
import { AddIcon, AppsIcon, CompassIcon, SearchUexIcon } from './Uex.icons';

/** Sections UEX (icônes du pill). */
export type UexSection = 'navigate' | 'apps' | 'search' | 'add';

interface UexProps {
  /** Section dont le panneau est ouvert (null = fermé). */
  active?: UexSection | null;
  onSelect?: (section: UexSection) => void;
}

/**
 * UEX (Unified Experience Bar) — port fidèle de Figma « Experience unified ».
 * Colonne 48px (fond blanc) avec un pill foncé #3b5c76 (40px de large) groupant
 * 4 icônes blanches : Naviguer (compass), Applications, Rechercher, Contribuer (+).
 * Sticky sous le suite header, pleine hauteur.
 */
export function Uex({ active, onSelect }: UexProps) {
  // US-31 : « Contribuer » (+) réservé au profil contributeur.
  // Sans profils chargés (pages démo) : visible (comportement historique).
  const profiles = useProjectStore((s) => s.project?.profiles);
  const t = useDemoStrings().uex;
  const ITEMS: { key: UexSection; label: string; Icon: typeof CompassIcon }[] = [
    { key: 'navigate', label: t.navigate, Icon: CompassIcon },
    { key: 'apps', label: t.apps, Icon: AppsIcon },
    { key: 'search', label: t.search, Icon: SearchUexIcon },
    { key: 'add', label: t.contribute, Icon: AddIcon },
  ];
  const activeProfile = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  const isContributor = !activeProfile || activeProfile.role === 'contributor';
  const items = isContributor ? ITEMS : ITEMS.filter((i) => i.key !== 'add');

  return (
    <aside className="w-12 shrink-0 bg-white flex flex-col items-center pt-md sticky top-12 self-start h-[calc(100vh-48px)]">
      {/* Pill UEX — se re-theme avec la marque (slot sombre du thème) */}
      <div className="flex flex-col items-center gap-[4px] rounded-md p-[4px] bg-sp-darker">
        {items.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => onSelect?.(key)}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-sm text-white transition-colors',
              active === key ? 'bg-white/25' : 'hover:bg-white/15',
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </aside>
  );
}
