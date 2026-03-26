/** Skeleton loader affiché pendant le chargement progressif du webpart News */
export function NewsSkeleton() {
  return (
    <section className="flex flex-col gap-2xl p-md animate-pulse">
      {/* Title placeholder */}
      <div className="h-8 w-48 bg-gray-200 rounded-md" />

      {/* Top Story skeleton: featured left + list right */}
      <div className="grid grid-cols-3 gap-2xl">
        {/* Featured card */}
        <div className="col-span-2 flex flex-col gap-md">
          <div className="aspect-[8/5] bg-gray-200 rounded-xl" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-full bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="flex gap-sm items-center">
            <div className="w-5 h-5 rounded-full bg-gray-200" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Side items */}
        <div className="flex flex-col gap-2xl">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-xl">
              <div className="w-24 aspect-video bg-gray-200 rounded-lg shrink-0" />
              <div className="flex flex-col gap-xs flex-1">
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
