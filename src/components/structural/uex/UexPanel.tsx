'use client';

import type { UexSection } from './Uex';

interface UexPanelProps {
  section: UexSection;
  onClose: () => void;
}

const TITLES: Record<UexSection, string> = {
  navigate: 'Naviguer',
  apps: 'Applications',
  search: 'Rechercher',
  add: 'Centre de contribution',
};

/**
 * Panneau UEX pleine hauteur (ouvert au clic sur une icône de la barre).
 * Contenu démo crédible par section (navigation rapide, apps, recherche, contribution).
 */
export function UexPanel({ section, onClose }: UexPanelProps) {
  return (
    <aside className="w-[320px] shrink-0 bg-white border-r border-gray-200 flex flex-col sticky top-12 self-start h-[calc(100vh-48px)] overflow-y-auto">
      <header className="flex items-center justify-between px-lg h-12 border-b border-gray-200">
        <h2 className="text-body-lg font-semibold text-sp-darker">{TITLES[section]}</h2>
        <button type="button" aria-label="Fermer" onClick={onClose} className="w-7 h-7 rounded-sm text-[#605e5c] hover:bg-sp-lighter-alt flex items-center justify-center">✕</button>
      </header>
      <div className="p-lg">
        {section === 'navigate' && <NavigatePanel />}
        {section === 'apps' && <AppsPanel />}
        {section === 'search' && <SearchPanel />}
        {section === 'add' && <ContributePanel />}
      </div>
    </aside>
  );
}

const NAV_LINKS = ['Accueil', 'Actualités', 'Événements', 'Annuaire', 'Documents', 'Ressources RH', 'Support IT', 'Mon profil'];
function NavigatePanel() {
  return (
    <nav className="flex flex-col gap-2xs">
      {NAV_LINKS.map((l) => (
        <a key={l} href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-sm px-sm py-xs rounded-sm text-body text-sp-darker hover:bg-sp-lighter-alt">
          <span className="w-2 h-2 rounded-full bg-sp-primary/60 shrink-0" />
          {l}
        </a>
      ))}
    </nav>
  );
}

const APPS = ['Portail RH', 'Support IT', 'Notes de frais', 'Annuaire', 'Documents', 'Congés', 'Réservations', 'Wiki'];
function AppsPanel() {
  return (
    <div className="grid grid-cols-3 gap-md">
      {APPS.map((a) => (
        <a key={a} href="#" onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-xs text-center group">
          <span className="w-12 h-12 rounded-md bg-sp-lighter-alt text-sp-primary flex items-center justify-center text-body-lg font-bold group-hover:bg-sp-lighter">
            {a.slice(0, 1)}
          </span>
          <span className="text-caption text-sp-darker leading-tight">{a}</span>
        </a>
      ))}
    </div>
  );
}

function SearchPanel() {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm rounded-sm border border-gray-300 px-sm py-xs">
        <span className="text-gray-400">🔍</span>
        <input placeholder="Rechercher dans tout l’intranet…" className="flex-1 bg-transparent outline-none text-body" />
      </div>
      <div>
        <p className="text-caption font-semibold text-gray-400 mb-xs">Recherches récentes</p>
        <div className="flex flex-col gap-2xs">
          {['Congés payés', 'Note de frais', 'Organigramme', 'Plan d’accès'].map((s) => (
            <button key={s} type="button" className="text-left px-sm py-xs rounded-sm text-body text-sp-darker hover:bg-sp-lighter-alt">{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const CONTRIBUTE = [
  { label: 'Créer un article', desc: 'Rédiger et publier une actualité', icon: '📝' },
  { label: 'Créer une page', desc: 'Nouvelle page de l’intranet', icon: '📄' },
  { label: 'Créer une infolettre', desc: 'Composer et envoyer une newsletter', icon: '✉️' },
  { label: 'Paramètres du site', desc: 'Configurer l’espace', icon: '⚙️' },
];
function ContributePanel() {
  return (
    <div className="flex flex-col gap-sm">
      {CONTRIBUTE.map((c) => (
        <button key={c.label} type="button" className="flex items-start gap-sm p-sm rounded-md text-left border border-gray-200 hover:border-sp-primary hover:bg-sp-lighter-alt transition-colors">
          <span className="text-body-lg shrink-0">{c.icon}</span>
          <span className="flex flex-col">
            <span className="text-body font-semibold text-sp-darker">{c.label}</span>
            <span className="text-caption text-gray-500">{c.desc}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
