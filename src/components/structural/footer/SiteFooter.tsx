'use client';

import { useDemoStrings } from '@/lib/i18n';

/**
 * Footer — reconstruit depuis Figma (Template / Footer).
 * Fond themePrimary (re-thémable), texte blanc. Gauche : footer-logo + nom +
 * logo marque + description. Droite : 3 colonnes de liens séparées par des lignes
 * verticales (blanc 40%).
 */

export interface FooterLinkGroup {
  header: string;
  links: string[];
}

export interface SiteFooterProps {
  footerLogoText?: string;
  displayName?: string;
  brandLogo?: string;
  description?: string;
  linkGroups?: FooterLinkGroup[];
}

export function SiteFooter({
  footerLogoText = 'FOOTER LOGO',
  displayName = 'Footer display name',
  brandLogo,
  description,
  linkGroups,
}: SiteFooterProps) {
  // Groupes par défaut localisés (langue du projet)
  const t = useDemoStrings().footer;
  const defaultGroup: FooterLinkGroup = { header: t.groupHeader, links: [1, 2, 3, 4].map(t.link) };
  linkGroups ??= [defaultGroup, defaultGroup, defaultGroup];
  return (
    <footer className="w-full bg-sp-primary text-white shrink-0 prospect-font">
      <div className="flex justify-between gap-2xl px-[100px] py-2xl">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-lg min-w-0">
          <div className="flex items-center gap-sm pt-sm">
            <div className="border border-white px-xs py-2xs shrink-0">
              <span className="text-caption font-bold uppercase tracking-wide">{footerLogoText}</span>
            </div>
            <span className="text-body font-semibold">{displayName}</span>
          </div>
          {brandLogo && <span className="text-[24px] leading-none">{brandLogo}</span>}
          {description && <p className="text-body max-w-[420px] text-white/95">{description}</p>}
        </div>

        {/* Colonnes de liens (droite) */}
        <div className="flex shrink-0">
          {linkGroups.map((group, gi) => (
            <div key={gi} className="flex">
              {gi > 0 && <div className="self-stretch w-px bg-white/40 mx-[28px]" />}
              <div className="flex flex-col gap-[17px] min-w-[99px]">
                <span className="text-[24px] font-normal leading-tight">{group.header}</span>
                <nav className="flex flex-col gap-lg">
                  {group.links.map((link, li) => (
                    <button key={li} type="button" className="text-left text-body font-semibold hover:underline">
                      {link}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
