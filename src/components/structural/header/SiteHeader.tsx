'use client';

import { cn } from '@/lib/utils';
import { useProjectStore } from '@/lib/state/project-store';
import {
  ChevronDownIcon,
  FollowIcon,
  MembersIcon,
  MoreIcon,
  NavigationIcon,
  ShareIcon,
} from './SiteHeader.icons';

export type HeaderTheme = 'none' | 'neutral' | 'soft' | 'strong';

export interface SiteHeaderNavItem {
  label: string;
  active?: boolean;
  /** Id de page (si la nav locale est pilotée par les pages du projet). */
  pageId?: string;
}

export interface SiteHeaderProps {
  /** Fond (variante « Background color » Figma). */
  theme?: HeaderTheme;
  /** Affiche la barre hub (≥1024 uniquement). */
  showHubNav?: boolean;
  hubTitle?: string;
  hubLinks?: string[];
  logoInitials?: string;
  logoImageUrl?: string;
  siteTitle?: string;
  labels?: string[];
  localNav?: SiteHeaderNavItem[];
  following?: boolean;
  showShare?: boolean;
  membersCount?: number;
}

const THEME: Record<HeaderTheme, { bg: string; text: string; muted: string }> = {
  none: { bg: 'bg-transparent', text: 'text-[#3b3a39]', muted: 'text-[#605e5c]' },
  neutral: { bg: 'bg-white', text: 'text-[#3b3a39]', muted: 'text-[#605e5c]' },
  soft: { bg: 'bg-sp-lighter-alt', text: 'text-[#3b3a39]', muted: 'text-[#605e5c]' },
  strong: { bg: 'bg-sp-primary', text: 'text-white', muted: 'text-white/85' },
};

/**
 * Communication site header — reconstruit depuis Figma (component set responsive).
 *
 * Responsive (container queries, axe « Size » du composant) :
 *  - ≥ 1024px : hub nav (si activée) + nav locale inline + actions complètes
 *  - 640–1023px : pas de hub nav, HAMBURGER à gauche (nav locale repliée), actions
 * Fond : none / neutral / soft / strong.
 */
export function SiteHeader({
  theme = 'neutral',
  showHubNav = true,
  hubTitle = 'Hub site title',
  hubLinks = ['Primary link', 'Primary link', 'Primary link', 'Primary group'],
  logoInitials = 'CS',
  logoImageUrl,
  siteTitle = 'SharePoint site title',
  labels = ['Confidential', 'Corporate Advisory +2'],
  localNav = [
    { label: 'Home', active: true },
    { label: 'Documents' },
    { label: 'Pages' },
    { label: 'Site contents' },
  ],
  following = false,
  showShare = true,
  membersCount = 27,
}: SiteHeaderProps) {
  const t = THEME[theme];
  const strong = theme === 'strong';

  // Nav locale pilotée par les pages du projet (si chargé) — sinon libellés par défaut.
  const pages = useProjectStore((s) => s.project?.pages);
  const activePageId = useProjectStore((s) => s.activePageId);
  const setActivePage = useProjectStore((s) => s.setActivePage);
  // US-31 : « Edit » de la nav locale réservé au contributeur (visible aussi sans profils — pages démo)
  const profiles = useProjectStore((s) => s.project?.profiles);
  const activeProfile = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  const canEdit = !activeProfile || activeProfile.role === 'contributor';
  const nav: SiteHeaderNavItem[] =
    pages && pages.length > 0
      ? [...pages].sort((a, b) => a.order - b.order).map((p) => ({ label: p.title, active: p.id === activePageId, pageId: p.id }))
      : localNav;

  return (
    <div className={cn('@container w-full', t.bg, t.text)}>
      {/* Hub nav — ≥1024 uniquement */}
      {showHubNav && (
        <div className="hidden @[1024px]:flex items-center gap-5 h-10 px-8">
          <div className="flex items-center gap-sm shrink-0">
            <span className={cn('w-6 h-6 rounded-sm shrink-0', strong ? 'bg-white/30' : 'bg-sp-primary')} aria-hidden />
            <span className="text-body">{hubTitle}</span>
          </div>
          <nav className="flex items-center gap-lg overflow-hidden">
            {hubLinks.map((l, i) => (
              <button key={i} type="button" className="flex items-center gap-[4px] text-body whitespace-nowrap hover:underline">
                {l}
                <ChevronDownIcon className="w-3 h-3 opacity-70" />
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Comm header */}
      <div className="flex items-center gap-5 px-8 py-md">
        {/* Hamburger — <1024 uniquement */}
        <button type="button" aria-label="Menu" className="@[1024px]:hidden shrink-0 text-current">
          <NavigationIcon className="w-6 h-6" />
        </button>

        {/* Logo 64 */}
        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-sp-primary overflow-hidden" aria-hidden>
          {logoImageUrl ? (
            <img src={logoImageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white" style={{ fontSize: 28 }}>{logoInitials}</span>
          )}
        </div>

        <div className="flex flex-1 items-start justify-between gap-lg min-w-0">
          <div className="flex flex-col gap-sm min-w-0">
            {/* Titre + labels */}
            <div className="flex items-baseline gap-lg flex-wrap">
              <span className="font-semibold" style={{ fontSize: 24, color: strong ? '#fff' : '#3b3a39' }}>
                {siteTitle}
              </span>
              <div className={cn('flex items-center gap-sm text-body', t.muted)}>
                {labels.map((l, i) => (
                  <span key={i} className="flex items-center gap-sm whitespace-nowrap">
                    <span className="opacity-60">|</span>
                    {l}
                  </span>
                ))}
              </div>
            </div>
            {/* Nav locale — ≥1024 uniquement (repliée dans le hamburger en dessous) */}
            <nav className="hidden @[1024px]:flex items-center gap-lg flex-wrap">
              {nav.map((item, i) => (
                <button
                  key={item.pageId ?? i}
                  type="button"
                  onClick={() => { if (item.pageId) setActivePage(item.pageId); }}
                  className={cn('relative text-body pb-[2px] whitespace-nowrap hover:opacity-80', item.active && 'font-semibold')}
                >
                  {item.label}
                  {item.active && (
                    <span className={cn('absolute left-0 -bottom-[1px] w-full h-[2px]', strong ? 'bg-white' : 'bg-sp-primary')} />
                  )}
                </button>
              ))}
              <button type="button" className="text-current hover:opacity-80"><MoreIcon className="w-4 h-4" /></button>
              {canEdit && (
                <button type="button" className={cn('text-body hover:underline', strong ? 'text-white' : 'text-sp-primary')}>Edit</button>
              )}
            </nav>
          </div>

          {/* Actions */}
          <div className={cn('flex items-center gap-lg shrink-0', t.text)}>
            <button type="button" className="flex items-center gap-[6px] text-body whitespace-nowrap hover:opacity-80">
              <FollowIcon className="w-3.5 h-3.5" />
              <span className="hidden @[1024px]:inline">{following ? 'Following' : 'Not following'}</span>
            </button>
            {showShare && (
              <button type="button" className="flex items-center gap-[6px] text-body hover:opacity-80">
                <ShareIcon className="w-3.5 h-3" />
                <span className="hidden @[1024px]:inline">Share</span>
              </button>
            )}
            {typeof membersCount === 'number' && (
              <button type="button" className="hidden @[1024px]:flex items-center gap-[6px] text-body whitespace-nowrap hover:opacity-80">
                <MembersIcon className="w-3 h-3.5" />
                {membersCount} members
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
