import type { SeparatorProps } from './Separator.types';

interface SeparatorEditorProps {
  webpartId: string;
  config: SeparatorProps['config'];
  content: SeparatorProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: SeparatorProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart Separator (mode Édition uniquement).
 * Édition directe du texte du séparateur.
 */
export function SeparatorEditor({
  webpartId,
  config: _config,
  content,
  onContentChange,
}: SeparatorEditorProps) {
  if (!content.showText) return null;

  const updateText = (value: string) => {
    onContentChange({ ...content, text: { ...content.text, value, html: undefined } });
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center" data-webpart-id={webpartId}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text px-lg"
        onBlur={(e) => updateText(e.currentTarget.textContent ?? '')}
      >
        {content.text.value ?? content.text.html?.replace(/<[^>]+>/g, '')}
      </div>
    </div>
  );
}
