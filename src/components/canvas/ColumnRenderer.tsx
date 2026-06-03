import { WebpartHost } from './WebpartHost';
import type { Column } from '@/types/project';

interface ColumnRendererProps {
  column: Column;
  isEditMode?: boolean;
}

/**
 * Rend une colonne : empile verticalement ses webparts (triés par `order`).
 */
export function ColumnRenderer({ column, isEditMode = false }: ColumnRendererProps) {
  const webparts = [...column.webparts].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-md min-w-0">
      {webparts.map((wp) => (
        <WebpartHost key={wp.id} instance={wp} isEditMode={isEditMode} />
      ))}
    </div>
  );
}
