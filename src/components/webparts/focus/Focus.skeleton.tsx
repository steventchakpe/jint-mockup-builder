/**
 * Skeleton loader du webpart Focus — reproduit la zone hero (texte | image).
 */
export function FocusSkeleton() {
  return (
    <section className="flex flex-col gap-md p-md animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-md" />
      <div className="h-[360px] w-full">
        <div className="flex h-full w-full gap-lg p-lg">
          <div className="flex flex-col justify-between flex-1 py-md">
            <div className="flex flex-col gap-md">
              <div className="h-5 w-24 bg-gray-200 rounded-full" />
              <div className="h-7 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-md" />
          </div>
          <div className="w-1/2 h-full bg-gray-200 rounded-md shrink-0" />
        </div>
      </div>
    </section>
  );
}
