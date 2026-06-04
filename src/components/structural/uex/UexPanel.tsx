'use client';

import { useState } from 'react';
import { Star, Search, AlertCircle } from 'lucide-react';
import {
  NewsIcon,
  DocumentBulletListIcon,
  SettingsIcon,
  MailMultipleIcon,
  PhoneVibrateIcon,
  EngageIcon,
} from './UexContrib.icons';
import type { UexSection } from './Uex';

interface UexPanelProps {
  section: UexSection;
  onClose: () => void;
}

/**
 * Panneau UEX pleine hauteur — répliqué depuis Figma (Jint SharePoint Webpart's Library) :
 * Navigation (4064:11294), Recherche (4064:11319), Applications (4064:11153),
 * Contribution (4064:14353). Overlay au-dessus de la page (ne décale pas le contenu).
 * Contenu de démo neutre (éditable / piloté par le projet plus tard).
 */
export function UexPanel({ section }: UexPanelProps) {
  // Centre de contribution : Callout flottant ancré au bouton « + » (jintan AppMenu —
  // Callout Medium 360px, padding 16, RightTopEdge, gaps 12/12/8).
  if (section === 'add') {
    return (
      <div
        className="absolute left-14 z-30 w-[336px] bg-white rounded-sm p-lg flex flex-col gap-md"
        style={{ top: 148, boxShadow: '0 6.4px 14.4px rgba(0,0,0,.13), 0 1.2px 3.6px rgba(0,0,0,.11)' }}
      >
        <ContributePanel />
      </div>
    );
  }

  return (
    <aside className="absolute top-0 left-12 z-30 w-[320px] h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto shadow-xl">
      <div className="flex flex-col gap-xl p-[20px]">
        <AlertBanner />
        {section === 'navigate' && <NavigatePanel />}
        {section === 'apps' && <AppsPanel />}
        {section === 'search' && <SearchPanel />}
      </div>
    </aside>
  );
}

/* Bandeau d'alerte (haut de panneau) — fond primaire, texte blanc italique + pastille « ! ». */
function AlertBanner() {
  return (
    <div className="relative flex items-start gap-sm rounded-md p-md bg-sp-primary text-white" style={{ boxShadow: '0 1.6px 3.6px rgba(0,0,0,.13)' }}>
      <p className="italic text-body leading-snug pr-6">
        Information importante — consultez les dernières mises à jour du moment.
        <br />
        <a href="#" onClick={(e) => e.preventDefault()} className="underline font-medium">En savoir plus</a>
      </p>
      <span className="absolute top-md right-md inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-sp-primary shrink-0">
        <AlertCircle className="w-4 h-4" />
      </span>
    </div>
  );
}

const heading = 'text-[18px] font-bold text-[#201f1e]';

const NAV_LINKS = ['Accueil', 'Actualités', 'Événements', 'Annuaire', 'Documents'];
const FEED = [
  { title: 'Lancement de notre nouvelle plateforme intranet', img: 'photo-1486406146926-c627a92ad1ab' },
  { title: 'Résultats du trimestre : une croissance soutenue', img: 'photo-1611974789855-9c2a0a7236a3' },
  { title: 'Formation cybersécurité : session de juin', img: 'photo-1550751827-4bd374c3f58b' },
  { title: 'Retour en images sur notre séminaire annuel', img: 'photo-1497366216548-37526070297c' },
];
function NavigatePanel() {
  return (
    <>
      <section className="flex flex-col gap-sm">
        <h2 className={heading}>Naviguer</h2>
        <nav className="flex flex-col gap-2xs">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} className="py-xs text-body text-[#323130] hover:text-sp-primary">{l}</a>
          ))}
        </nav>
      </section>
      <section className="flex flex-col gap-md">
        <h2 className={heading}>S’informer</h2>
        <div className="flex flex-col gap-md">
          {FEED.map((a) => (
            <a key={a.title} href="#" onClick={(e) => e.preventDefault()} className="flex items-start gap-md group">
              <span
                className="shrink-0 w-[76px] h-[57px] bg-cover bg-center bg-sp-lighter-alt"
                style={{ backgroundImage: `url("https://images.unsplash.com/${a.img}?w=200&auto=format")` }}
              />
              <span className="text-body text-[#323130] leading-snug line-clamp-3 group-hover:text-sp-primary">{a.title}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function SearchPanel() {
  return (
    <div className="flex items-center gap-sm rounded-sm bg-[#f3f2f1] border border-sp-primary px-sm h-10">
      <Search className="w-4 h-4 text-[#605e5c]" />
      <input placeholder="Aller à" className="flex-1 bg-transparent outline-none text-body text-[#323130] placeholder:text-[#605e5c]" />
    </div>
  );
}

/* Applications — listes groupées (icône + nom + étoile favori). Icônes = pastilles colorées (logos de marque à brancher). */
type App = { name: string; color: string; fav: boolean };
const APP_GROUPS: { title: string; apps: App[] }[] = [
  { title: 'Mes applications', apps: [
    { name: 'Outlook', color: '#0F6CBD', fav: true }, { name: 'SAP', color: '#0FAAFF', fav: true },
    { name: 'Service Now', color: '#62D84E', fav: true }, { name: 'ADP Canada', color: '#D0021B', fav: true },
    { name: 'EdCast', color: '#111827', fav: true }, { name: 'Support IT', color: '#F2A60C', fav: true },
    { name: 'Espace RH', color: '#F2A60C', fav: true },
  ] },
  { title: 'Communication', apps: [
    { name: 'SAP', color: '#0FAAFF', fav: true }, { name: 'Service Now', color: '#62D84E', fav: true }, { name: 'Outlook', color: '#0F6CBD', fav: true },
  ] },
  { title: 'RH', apps: [
    { name: 'ADP Canada', color: '#D0021B', fav: true }, { name: 'Espace RH', color: '#F2A60C', fav: true },
  ] },
  { title: 'Formation', apps: [
    { name: 'EdCast', color: '#111827', fav: true }, { name: 'Formations', color: '#F2A60C', fav: false },
  ] },
  { title: 'Support', apps: [
    { name: 'Base Doc', color: '#F2A60C', fav: false }, { name: 'Support IT', color: '#F2A60C', fav: true },
  ] },
];
function AppsPanel() {
  return (
    <div className="flex flex-col gap-lg">
      {APP_GROUPS.map((g) => (
        <section key={g.title} className="flex flex-col gap-xs">
          <h2 className={heading}>{g.title}</h2>
          {g.apps.map((a, i) => <AppRow key={`${a.name}-${i}`} app={a} />)}
        </section>
      ))}
    </div>
  );
}
function AppRow({ app }: { app: App }) {
  const [fav, setFav] = useState(app.fav);
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-sm py-xs group">
      <span className="shrink-0 w-6 h-6 rounded-sm flex items-center justify-center text-white text-caption font-bold" style={{ background: app.color }}>{app.name[0]}</span>
      <span className="flex-1 text-body text-[#201f1e]">{app.name}</span>
      <button type="button" aria-label="Favori" onClick={(e) => { e.preventDefault(); setFav((f) => !f); }} className="shrink-0 text-[#201f1e]">
        <Star className="w-5 h-5" fill={fav ? 'currentColor' : 'none'} />
      </button>
    </a>
  );
}

/* Centre de contribution — réplique de jintan AppMenu (contribution-center-extension).
   SquareButton large : 96×96, radius 8, gap interne 4, bord neutralLight, hover
   themeLight + themeLighterAlt ; icône 24 ; label BodyText (14) Semibold, 1 ligne.
   Titres : SubjectTitle (16) Semibold. Gaps : sections 12, boutons 8. */
function SquareButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer bg-white border border-[#edebe9] hover:border-sp-light hover:bg-sp-lighter-alt transition-colors"
      style={{ borderRadius: 8, gap: 4, padding: '0 8px' }}
    >
      <span className="text-[24px] leading-none">{children}</span>
      <span className="w-full text-center text-body font-semibold text-[#323130] truncate [word-break:keep-all]">{label}</span>
    </button>
  );
}

function ContributePanel() {
  return (
    <>
      <section className="flex flex-col" style={{ gap: 12 }}>
        <h2 className="font-semibold text-[#323130]" style={{ fontSize: 18 }}>Centre de contribution</h2>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          <SquareButton label="Article"><NewsIcon style={{ color: '#201f1e' }} /></SquareButton>
          <SquareButton label="Page"><DocumentBulletListIcon style={{ color: '#201f1e' }} /></SquareButton>
          <SquareButton label="Paramètres"><SettingsIcon style={{ color: '#201f1e' }} /></SquareButton>
        </div>
      </section>
      <section className="flex flex-col" style={{ gap: 12 }}>
        <h2 className="font-semibold text-[#323130]" style={{ fontSize: 18 }}>Partage du contenu</h2>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {/* Teams : SVG exact exporté du Figma (public/icons/teams.svg) */}
          <SquareButton label="Teams"><img src="/icons/teams.svg" alt="" style={{ width: 24, height: 24 }} /></SquareButton>
          <SquareButton label="Engage"><EngageIcon /></SquareButton>
          <SquareButton label="Newsletter"><MailMultipleIcon style={{ color: '#201f1e' }} /></SquareButton>
          <SquareButton label="Notification"><PhoneVibrateIcon style={{ color: '#201f1e' }} /></SquareButton>
        </div>
      </section>
    </>
  );
}
