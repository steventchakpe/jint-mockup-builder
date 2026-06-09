/** Skeleton — barre de composition + 2 cartes de conversation. */
export function VivaEngageSkeleton() {
  return (
    <div className="flex flex-col gap-lg">
      <div className="h-5 w-40 bg-sp-lighter-alt animate-pulse" />
      <div className="h-16 rounded-md bg-white animate-pulse" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.05)' }} />
      {[0, 1].map((i) => (
        <div key={i} className="rounded-md bg-white p-lg" style={{ boxShadow: '0 0 24px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-md">
            <div className="h-10 w-10 rounded-full bg-sp-lighter-alt animate-pulse" />
            <div className="h-4 w-40 bg-sp-lighter-alt animate-pulse" />
          </div>
          <div className="mt-md h-4 w-2/3 bg-sp-lighter-alt animate-pulse" />
        </div>
      ))}
    </div>
  );
}
