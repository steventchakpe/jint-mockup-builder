import { CARD_GAP, CONTENT_PADDING, NEUTRAL_LIGHTER, calcCardHeight, rowsForHeight } from './MyEmails.mozzaik';
import { myEmailsDefaultConfig } from './MyEmails.config';
import type { MyEmailsConfig } from './MyEmails.types';

/** Skeleton — port de CardSkeleton (cercle 32 + nom 30% + lignes 16). */
export function MyEmailsSkeleton({ config = myEmailsDefaultConfig }: { config?: MyEmailsConfig }) {
  const rows = rowsForHeight(config.height);
  const cardHeight = calcCardHeight(config.height, rows);
  const pulse = 'bg-sp-lighter-alt animate-pulse';
  return (
    <div className="flex flex-col" style={{ gap: CARD_GAP, padding: CONTENT_PADDING }}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex flex-col bg-white" style={{ height: cardHeight, padding: 7, gap: 4, borderRadius: config.radius, border: `solid 1px ${NEUTRAL_LIGHTER}` }}>
          <div className="flex items-center" style={{ gap: 10, height: 32 }}>
            <div className={`rounded-full shrink-0 ${pulse}`} style={{ width: 32, height: 32 }} />
            <div className={`${pulse}`} style={{ width: '30%', height: 20, borderRadius: 100 }} />
          </div>
          <div className="flex flex-col" style={{ gap: 7 }}>
            <div className={pulse} style={{ width: '30%', height: 16, borderRadius: 100 }} />
            <div className={pulse} style={{ width: '100%', height: 16, borderRadius: 100 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
