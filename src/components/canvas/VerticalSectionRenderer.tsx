import { WebpartHost } from './WebpartHost';
import type { VerticalSection } from '@/types/project';

interface VerticalSectionRendererProps {
  verticalSection: VerticalSection;
  isEditMode?: boolean;
}

/**
 * Section verticale — réplique le comportement natif SharePoint.
 * Sidebar persistante à DROITE de la page (sous le header). Elle repasse
 * EN BAS de la page quand la largeur < 1024px (cf. doc Microsoft).
 *
 * NB : ce n'est pas un `layout` de section mais une zone de page
 * (`page.verticalSection`). Le PageRenderer la place à droite des sections
 * normales ; ce composant ne rend que son contenu (pile de webparts).
 */
export function VerticalSectionRenderer({ verticalSection, isEditMode = false }: VerticalSectionRendererProps) {
  const webparts = [...verticalSection.webparts].sort((a, b) => a.order - b.order);
  if (webparts.length === 0) return null;

  return (
    <aside data-testid="vertical-section" className="flex flex-col gap-md min-w-0">
      {webparts.map((wp) => (
        <WebpartHost key={wp.id} instance={wp} isEditMode={isEditMode} />
      ))}
    </aside>
  );
}
