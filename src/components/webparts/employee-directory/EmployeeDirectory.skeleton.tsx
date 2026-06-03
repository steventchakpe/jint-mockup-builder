import { CARD_HEIGHT, CARD_WIDTH, RESULTS_GAP } from './EmployeeDirectory.mozzaik';

/** Skeleton loader du Trombinoscope — barre de recherche + grille de cartes. */
export function EmployeeDirectorySkeleton() {
  return (
    <div className="flex flex-col gap-2xl animate-pulse">
      <div className="h-10 w-full bg-gray-200 rounded-md" />
      <div className="flex flex-wrap justify-center" style={{ gap: RESULTS_GAP }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-md p-lg bg-white border border-gray-100"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            <div className="w-[72px] h-[72px] rounded-full bg-gray-200" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-28 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
