'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { useElementSize } from '@/components/webparts/focus/hooks/useElementSize';
import { Shape } from './components/Shape';
import { EditToolbar, ShapeEditorPanel, useShapeEditing } from './ImageInteractive.editor';
import { FONT_SIZE, HEADER_HEIGHT, HEADER_PADDING } from './ImageInteractive.mozzaik';
import type { ImageInteractiveProps } from './ImageInteractive.types';

/** Port de useImage : dimensions naturelles de l'image. */
function useImageDimensions(url: string) {
  const [dims, setDims] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => setDims({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = url;
  }, [url]);
  return dims;
}

/**
 * Webpart Image interactive — port fidèle de `ImageMapLayout`
 * (@mozzaik365/components/image-map).
 *
 * Stage dimensionné comme getStageSize : fullWidth → ratio par largeur (hauteur
 * auto) ; sinon échelle = min(largeur dispo / largeur image, hauteur / hauteur
 * image). Formes positionnées en % du stage, clic → lien, survol → infobulle.
 * Mode Édition : toolbar « + Pin / + Zone », pose au clic, sélection → panneau
 * (infobulle, lien), déplacement par glisser (rôle d'ImageMapEditionLayout).
 */
export function ImageInteractive({ config, content, isEditMode = false }: ImageInteractiveProps) {
  const { title, height, fullWidth } = config;
  const { imageUrl, altText, shapes } = content;
  const { ref, size } = useElementSize<HTMLDivElement>();
  const dims = useImageDimensions(imageUrl);
  const edit = useShapeEditing(content);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragId = useRef<string | null>(null);

  // getStageSize — port fidèle
  const stage = useMemo(() => {
    if (!dims.width || !size.width) return { width: 0, height: 0 };
    if (fullWidth) return { width: size.width, height: (dims.height * size.width) / dims.width };
    const scale = Math.min(size.width / dims.width, height / dims.height);
    return { width: dims.width * scale, height: dims.height * scale };
  }, [dims, size.width, height, fullWidth]);

  const pctFromEvent = (e: React.PointerEvent | React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)),
    };
  };

  const onStageClick = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    const p = pctFromEvent(e);
    if (!p) return;
    if (edit.arming) edit.placeShape(p.x, p.y);
    else edit.setSelectedId(null);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragId.current) return;
    const p = pctFromEvent(e);
    if (p) edit.updateShape(dragId.current, { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 });
  };

  const selectedShape = shapes.find((s) => s.id === edit.selectedId);

  return (
    <section className="flex flex-col" ref={ref}>
      {(title || isEditMode) && (
        <div className="flex items-center shrink-0" style={{ height: HEADER_HEIGHT, padding: HEADER_PADDING }}>
          <InlineText
            as="h2"
            target="config"
            path={['title']}
            value={title}
            placeholder="Titre de la section"
            className="font-semibold text-[#323130]"
            style={{ fontSize: FONT_SIZE.PaneHeader }}
          />
        </div>
      )}

      <div className="relative flex justify-center" style={{ height: fullWidth ? 'auto' : height }}>
        {isEditMode && imageUrl && <EditToolbar edit={edit} />}
        {!imageUrl ? (
          <p className="text-body text-gray-500 py-xl text-center self-center">
            {isEditMode
              ? 'Renseignez l’URL de l’image dans le panneau de configuration pour créer des zones interactives.'
              : 'Aucune image configurée.'}
          </p>
        ) : (
          <div
            ref={stageRef}
            className="relative"
            style={{ width: stage.width || undefined, height: stage.height || undefined, cursor: edit.arming ? 'crosshair' : undefined }}
            onClick={onStageClick}
            onPointerMove={onPointerMove}
            onPointerUp={() => { dragId.current = null; }}
            onPointerLeave={() => { dragId.current = null; }}
          >
            <img src={imageUrl} alt={altText ?? ''} className="w-full h-full" draggable={false} />
            {shapes.map((shape) => (
              <Shape
                key={shape.id}
                shape={shape}
                isEditMode={isEditMode}
                isSelected={shape.id === edit.selectedId}
                onSelect={isEditMode ? () => edit.setSelectedId(shape.id) : undefined}
                onDragStart={isEditMode ? () => { dragId.current = shape.id; } : undefined}
              />
            ))}
            {isEditMode && selectedShape && <ShapeEditorPanel shape={selectedShape} edit={edit} />}
          </div>
        )}
      </div>
    </section>
  );
}
