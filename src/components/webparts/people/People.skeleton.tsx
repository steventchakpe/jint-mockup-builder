/** Skeleton loader du webpart People (Newcomers / Anniversaries) — 4 cartes. */
export function PeopleSkeleton() {
  return (
    <section className="flex flex-col gap-xl p-md animate-pulse">
      <div className="h-7 w-48 bg-gray-200 rounded-md" />
      <div className="@container">
        <div className="grid grid-cols-1 gap-md @[312px]:grid-cols-2 @[636px]:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-sm p-md bg-white border border-gray-100 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
