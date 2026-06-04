import type { PeopleProps } from './People.types';

interface PeopleEditorProps {
  webpartId: string;
  config: PeopleProps['config'];
  content: PeopleProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: PeopleProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart People (mode Édition).
 * Édition du titre ; les personnes sont des profils du Project (par ID).
 */
export function PeopleEditor({ webpartId, config, onConfigChange }: PeopleEditorProps) {
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
