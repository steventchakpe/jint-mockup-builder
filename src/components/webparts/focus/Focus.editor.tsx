import type { FocusProps } from './Focus.types';

interface FocusEditorProps {
  webpartId: string;
  config: FocusProps['config'];
  content: FocusProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: FocusProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart Focus (mode Édition uniquement).
 * Permet de modifier le titre et la description du card directement.
 */
export function FocusEditor({
  webpartId,
  config: _config,
  content,
  onContentChange,
}: FocusEditorProps) {
  const updateTitle = (value: string) => {
    onContentChange({
      ...content,
      card: { ...content.card, title: { ...content.card.title, value } },
    });
  };

  return (
    <div className="absolute inset-0 z-10" data-webpart-id={webpartId}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text inline-block"
        onBlur={(e) => updateTitle(e.currentTarget.textContent ?? '')}
      >
        {content.card.title.value}
      </div>
    </div>
  );
}
