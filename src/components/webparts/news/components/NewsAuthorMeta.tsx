import type { NewsAuthor, NewsEngagementData } from '../News.types';

interface NewsAuthorMetaProps {
  author: NewsAuthor;
  publishedAt: string;
  engagement?: NewsEngagementData;
}

/**
 * Ligne auteur : avatar initiales + nom (bleu) + date (gris) + stats vues/likes (droite)
 * Fidèle au composant Figma "Author + Date + Socials"
 */
export function NewsAuthorMeta({ author, publishedAt, engagement }: NewsAuthorMetaProps) {
  const initials = getInitials(author.name);

  return (
    <div className="flex items-center justify-between gap-sm">
      {/* Auteur + date */}
      <div className="flex items-center gap-[6px] min-w-0">
        {/* Cercle d'initiales — 20×20, bordure primary, fond darker */}
        <div className="w-5 h-5 rounded-full border-2 border-sp-primary bg-sp-darker flex items-center justify-center shrink-0">
          <span className="text-white font-bold leading-none" style={{ fontSize: '6px' }}>
            {initials}
          </span>
        </div>

        {/* Nom en bleu */}
        <span className="text-[12px] font-medium text-sp-primary truncate">
          {author.name}
        </span>

        {/* Séparateur + date */}
        <span className="shrink-0">
          <svg width="7" height="7" viewBox="0 0 7 7" className="inline-block">
            <circle cx="3.5" cy="3.5" r="3" fill="#d6d3d1" />
          </svg>
        </span>
        <span className="text-caption font-medium text-[#d6d3d1] shrink-0 whitespace-nowrap">
          {formatDate(publishedAt)}
        </span>
      </div>

      {/* Vues + Likes */}
      {engagement && (
        <div className="flex items-center gap-[5px] shrink-0">
          {/* Vues */}
          <div className="flex items-center gap-[5px]">
            <span className="text-caption font-semibold text-sp-darker">{engagement.views}</span>
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path d="M7 0C3.5 0 1 4.5 1 4.5S3.5 9 7 9s6-4.5 6-4.5S10.5 0 7 0Zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" fill="#004578"/>
            </svg>
          </div>
          {/* Likes */}
          <div className="flex items-center gap-[5px]">
            <span className="text-caption font-semibold text-sp-darker">{engagement.likes}</span>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M1 6H0v7h1M3 13h7.5a1 1 0 0 0 .95-.68l1.5-4A1 1 0 0 0 12 7H8V3a2 2 0 0 0-2-2L4 6v7H3Z" fill="#004578"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
