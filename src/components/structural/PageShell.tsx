import type { ReactNode } from 'react';
import { SuiteHeader } from '@/components/structural/header/SuiteHeader';
import { SiteHeader, type SiteHeaderProps } from '@/components/structural/header/SiteHeader';
import { SiteFooter } from '@/components/structural/footer/SiteFooter';
import { Uex } from '@/components/structural/uex/Uex';

/** Ombre de la carte centrale (Figma : 0 8 10 / 0 20 25, noir 10%). */
const CARD_SHADOW = '0 8px 10px rgba(0,0,0,0.10), 0 20px 25px rgba(0,0,0,0.10)';

interface PageShellProps {
  /** Contenu de la page (sections / webparts), centré à 1204px. */
  children?: ReactNode;
  /** Props du header (layout, theme, contenu) — pour tester les variantes. */
  header?: SiteHeaderProps;
}

/**
 * PageShell — assemblage de la page intranet (reconstruit depuis Figma « Template »).
 *
 * Structure :
 *  Suite header (48, full width)
 *  └ [ UEX (48, re-thémée) | Page wrap (bg blanc, pt 16 / px 12) ]
 *        └ Carte centrale surélevée : coins HAUT arrondis 12px + ombre
 *            ├ Communication site header
 *            ├ Contenu (max 1204 centré)
 *            └ Footer (#0078d4)
 */
export function PageShell({ children, header }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SuiteHeader />
      <div className="flex flex-1">
        <Uex />
        {/* Page wrap : 16px haut, 12px côtés. flex-col pour le sticky-footer. */}
        <div className="flex-1 min-w-0 bg-white pt-4 px-3 flex flex-col">
          {/* Carte centrale flottante — remplit la hauteur (footer collé en bas si vide). */}
          <div className="flex flex-col flex-1 rounded-t-[12px] overflow-hidden" style={{ boxShadow: CARD_SHADOW }}>
            <SiteHeader {...header} />
            {/* main grandit → pousse le footer en bas ; le contenu scrolle s'il dépasse */}
            <main className="flex-1 bg-white">
              <div className="max-w-[1204px] mx-auto w-full">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
