import { OPTION_MARGIN_BOTTOM } from './Poll.mozzaik';

/** Skeleton — question + 3 options bordées. */
export function PollSkeleton() {
  return (
    <div>
      <div className="h-5 w-1/2 bg-sp-lighter-alt animate-pulse" style={{ marginBottom: 18 }} />
      {[0, 1, 2].map((i) => (
        <div key={i} className="border border-sp-lighter animate-pulse" style={{ marginBottom: OPTION_MARGIN_BOTTOM }}>
          <div className="h-9" />
        </div>
      ))}
    </div>
  );
}
