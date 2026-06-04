import type { SearchProps } from './Search.types';

interface SearchEditorProps {
  webpartId: string;
  config: SearchProps['config'];
  content?: SearchProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange?: (content: SearchProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart Search (mode Édition).
 * Édition directe du titre de la bannière.
 */
export function SearchEditor({ webpartId, config, onConfigChange }: SearchEditorProps) {
  return (
    <div className="absolute inset-0 z-10" data-webpart-id={webpartId}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="inline-block outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text text-white"
        onBlur={(e) => onConfigChange('title', e.currentTarget.textContent ?? '')}
      >
        {config.title}
      </div>
    </div>
  );
}
