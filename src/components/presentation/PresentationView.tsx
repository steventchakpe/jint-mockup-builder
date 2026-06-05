'use client';

import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/structural/PageShell';
import { PageRenderer } from '@/components/canvas/PageRenderer';
import { useProjectStore } from '@/lib/state/project-store';

interface PresentationViewProps {
  /** Renseigné UNIQUEMENT en preview depuis l'éditeur — active l'easter egg de retour.
   *  Absent sur le lien partagé au prospect (lecture seule stricte, PRD §6.6). */
  editReturnId?: string;
}

/**
 * Mode Présentation (US-19/20) — même renderer que le canvas, sans aucun overlay
 * d'édition. Navigation entre pages via la nav locale du header (store).
 * Le prospect voit « un intranet », pas un outil.
 */
export function PresentationView({ editReturnId }: PresentationViewProps) {
  const router = useRouter();
  const project = useProjectStore((s) => s.project);
  const activePageId = useProjectStore((s) => s.activePageId);

  if (!project) return null;
  const page = project.pages.find((p) => p.id === activePageId) ?? project.pages[0];

  return (
    <div className="relative">
      <PageShell>
        {page && <PageRenderer page={page} isEditMode={false} />}
      </PageShell>

      {/* Easter egg : l'icône Microsoft (waffle, coin supérieur gauche du suite
          header) → retour à l'éditeur. Zone invisible superposée — présente
          uniquement en preview Sales, jamais sur le lien partagé. */}
      {editReturnId && (
        <button
          type="button"
          aria-label="Retour à l’édition"
          onClick={() => router.push(`/edit/${editReturnId}`)}
          className="fixed top-0 left-0 z-50"
          style={{ width: 48, height: 48, opacity: 0, cursor: 'pointer' }}
        />
      )}
    </div>
  );
}
