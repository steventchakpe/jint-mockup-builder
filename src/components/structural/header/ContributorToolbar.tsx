'use client';

import { useProjectStore } from '@/lib/state/project-store';
import { useDemoStrings } from '@/lib/i18n';

/**
 * Toolbar contributeur SharePoint (US-31) — command bar au-dessus du contenu,
 * visible UNIQUEMENT quand le profil actif est contributeur. Réplique la barre
 * SharePoint moderne : « + Nouveau ∨ · Détails de la page · Analyse » à gauche,
 * « Publié le {date} · Partager · Modifier » à droite (Segoe UI, 14, fond blanc,
 * filet bas neutralLighter).
 */
export function ContributorToolbar() {
  const profiles = useProjectStore((s) => s.project?.profiles);
  const updatedAt = useProjectStore((s) => s.project?.metadata.updatedAt);
  const { toolbar: t, dateLocale } = useDemoStrings();
  const active = profiles?.editable.find((p) => p.id === profiles.activeProfileId);
  if (!active || active.role !== 'contributor') return null;

  const item = 'inline-flex items-center gap-xs h-10 px-sm text-[#323130] hover:bg-[#f3f2f1] transition-colors whitespace-nowrap';
  const published = updatedAt
    ? new Date(updatedAt).toLocaleDateString(dateLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '';

  return (
    <div
      className="flex items-center justify-between bg-white border-b border-[#f3f2f1] px-md shrink-0"
      style={{ fontFamily: 'Segoe UI, sans-serif', fontSize: 14, height: 40 }}
      data-testid="contributor-toolbar"
    >
      <div className="flex items-center min-w-0">
        <button type="button" className={item}>
          <span className="text-sp-primary font-semibold" style={{ fontSize: 16 }}>+</span>
          {t.newItem}
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-[#605e5c]" aria-hidden>
            <path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z" />
          </svg>
        </button>
        <button type="button" className={item}>{t.promote}</button>
        <button type="button" className={item}>{t.translation}</button>
        <button type="button" className={`${item} hidden md:inline-flex`}>{t.pageDetails}</button>
        <button type="button" className={`${item} hidden lg:inline-flex`}>{t.analytics}</button>
      </div>
      <div className="flex items-center shrink-0">
        {published && <span className="text-[#605e5c] px-sm hidden sm:inline">{t.publishedOn(published)}</span>}
        <button type="button" className={item}>{t.share}</button>
        <button type="button" className="inline-flex items-center h-7 px-md ml-sm bg-sp-primary text-white rounded-xs font-semibold hover:bg-sp-dark-alt active:bg-sp-dark transition-colors">
          {t.edit}
        </button>
      </div>
    </div>
  );
}
