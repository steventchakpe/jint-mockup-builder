import { CARD_MAX_WIDTH, NEUTRAL_LIGHTER_ALT, TITLE_HEIGHT } from './OrgChart.mozzaik';
import { orgChartDefaultConfig } from './OrgChart.config';
import type { OrgChartConfig } from './OrgChart.types';

/** Skeleton — racine + 3 cartes filles sur fond neutralLighterAlt. */
export function OrgChartSkeleton({ config = orgChartDefaultConfig }: { config?: OrgChartConfig }) {
  const pulse = 'bg-white animate-pulse';
  const card = { width: CARD_MAX_WIDTH, height: 150, borderRadius: config.radius };
  return (
    <div className="flex flex-col items-center justify-center" style={{ height: config.height - TITLE_HEIGHT, background: NEUTRAL_LIGHTER_ALT, gap: 35 }}>
      <div className={pulse} style={card} />
      <div className="flex" style={{ gap: 20 }}>
        {[0, 1, 2].map((i) => <div key={i} className={pulse} style={card} />)}
      </div>
    </div>
  );
}
