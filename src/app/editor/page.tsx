import { PageShell } from '@/components/structural/PageShell';
import { EditableCanvas } from '@/components/canvas/edit/EditableCanvas';

/**
 * Démo de l'expérience d'édition (Phase 1) : création/suppression de sections
 * (US-12) + ajout de webparts depuis le catalogue (US-08), dans la shell.
 */
export default function EditorDemo() {
  return (
    <PageShell>
      <EditableCanvas />
    </PageShell>
  );
}
