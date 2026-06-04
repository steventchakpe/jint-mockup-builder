import type { MyAppsProps } from './MyApps.types';

interface MyAppsEditorProps {
  webpartId: string;
  config: MyAppsProps['config'];
  content: MyAppsProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: MyAppsProps['content']) => void;
}

/**
 * Overlay d'édition inline My Apps (mode Édition) — édition du titre.
 */
export function MyAppsEditor({ webpartId, config, onConfigChange }: MyAppsEditorProps) {
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
