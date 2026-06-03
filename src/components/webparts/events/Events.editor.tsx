import type { EventsProps } from './Events.types';

interface EventsEditorProps {
  webpartId: string;
  config: EventsProps['config'];
  content: EventsProps['content'];
  onConfigChange: (key: string, value: unknown) => void;
  onContentChange: (content: EventsProps['content']) => void;
}

/**
 * Overlay d'édition inline du webpart Events (mode Édition uniquement).
 * Permet de modifier directement le titre et le lieu de chaque événement.
 * La sidebar de configuration gère les props visuelles (radius, maxItems…).
 */
export function EventsEditor({
  webpartId,
  config: _config,
  content,
  onContentChange,
}: EventsEditorProps) {
  const updateEvent = (index: number, field: string, value: unknown) => {
    const updated = content.events.map((e, i) =>
      i === index ? { ...e, [field]: value } : e,
    );
    onContentChange({ ...content, events: updated });
  };

  return (
    <div className="absolute inset-0 z-10">
      {content.events.map((event, index) => (
        <div
          key={event.id}
          className="group absolute"
          data-event-index={index}
          data-webpart-id={webpartId}
        >
          <div
            contentEditable
            suppressContentEditableWarning
            className="outline-none ring-2 ring-transparent focus:ring-sp-primary rounded cursor-text"
            onBlur={(e) => updateEvent(index, 'title', e.currentTarget.textContent ?? '')}
          >
            {event.title}
          </div>
        </div>
      ))}
    </div>
  );
}
