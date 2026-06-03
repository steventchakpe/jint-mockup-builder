/**
 * Skeleton loader du webpart Events — chargement progressif.
 * Reproduit la grille responsive (1 → 2 → 3 → 4 colonnes) et la forme d'une
 * carte événement (vignette 64 + 2 lignes de texte), comme `EventCardSkeleton`.
 */
export function EventsSkeleton() {
  return (
    <section className="flex flex-col gap-xl p-md animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-md" />

      <div className="@container">
        <div className="grid grid-cols-1 gap-md @[606px]:grid-cols-2 @[915px]:grid-cols-3 @[1224px]:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-sm p-sm min-h-24 bg-white border border-gray-200 rounded-md"
            >
              <div className="w-16 h-16 shrink-0 bg-gray-200 rounded-sm" />
              <div className="flex flex-1 flex-col justify-between min-w-0 py-xs">
                <div className="flex flex-col gap-sm">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                </div>
                <div className="h-3 w-24 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
