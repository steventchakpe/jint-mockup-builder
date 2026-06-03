import type { EmployeeDirectoryProps } from './EmployeeDirectory.types';

interface EmployeeDirectoryEditorProps {
  webpartId: string;
  config: EmployeeDirectoryProps['config'];
  content: EmployeeDirectoryProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: EmployeeDirectoryProps['content']) => void;
}

/**
 * Overlay d'édition inline du Trombinoscope (mode Édition).
 * Édition du titre ; le contenu (profils) est édité au niveau du Project
 * (les profils sont partagés entre webparts, référencés par ID).
 */
export function EmployeeDirectoryEditor({
  webpartId,
  config,
  onConfigChange,
}: EmployeeDirectoryEditorProps) {
  return (
    <div className="absolute inset-0 z-10" data-webpart-id={webpartId}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="inline-block outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text"
        onBlur={(e) => onConfigChange('title', e.currentTarget.textContent ?? '')}
      >
        {config.title}
      </div>
    </div>
  );
}
