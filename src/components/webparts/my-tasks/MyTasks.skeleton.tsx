import type { MyTasksConfig } from './MyTasks.types';

/** Skeleton — port de MyTasksTreeViewSkeleton (3 lignes : carré 20 + ligne 20). */
export function MyTasksSkeleton(_props: { config?: MyTasksConfig }) {
  const pulse = 'bg-sp-lighter-alt animate-pulse rounded-xs';
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center" style={{ gap: '2%' }}>
          <div className={pulse} style={{ width: 20, height: 20 }} />
          <div className={`${pulse} grow`} style={{ height: 20 }} />
        </div>
      ))}
    </div>
  );
}
