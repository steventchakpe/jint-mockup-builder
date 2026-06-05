import { myResumeDefaultConfig } from './MyResume.config';
import type { MyResumeConfig } from './MyResume.types';

/** Skeleton — port de MySummaryListViewSkeleton (titre 43 %, sous-titre 74 %, 3 cartes). */
export function MyResumeSkeleton({ config = myResumeDefaultConfig }: { config?: MyResumeConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse';
  return (
    <div className="flex flex-col overflow-hidden" style={{ gap: 16, height: config.height }}>
      <div className="flex flex-col" style={{ gap: 8 }}>
        <div className={pulse} style={{ width: '43%', height: 27, borderRadius: 16 }} />
        {config.height > 192 && <div className={pulse} style={{ width: '74%', height: 18, borderRadius: 16 }} />}
      </div>
      <div className="flex grow" style={{ gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`grow ${pulse}`} style={{ borderRadius: 16, flexBasis: 0 }} />
        ))}
      </div>
    </div>
  );
}
