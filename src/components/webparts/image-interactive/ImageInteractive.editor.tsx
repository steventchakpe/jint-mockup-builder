'use client';

import { useState } from 'react';
import { useInlineEdit } from '@/components/canvas/edit/inline-edit';
import type { ImageInteractiveContent, ImageMapShape, ShapeType } from './ImageInteractive.types';

/**
 * Édition des zones interactives (port du rôle d'ImageMapEditionLayout, adapté
 * au canvas Jint Builder) : barre d'outils « + Pin / + Zone », pose au clic sur
 * l'image (coordonnées %), sélection d'une forme → panneau (titre, texte, lien,
 * nouvel onglet, suppression), déplacement par glisser.
 */
export function useShapeEditing(content: ImageInteractiveContent) {
  const ctx = useInlineEdit();
  const [arming, setArming] = useState<ShapeType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const commit = (shapes: ImageMapShape[]) => ctx?.commitContent({ ...content, shapes });

  const placeShape = (x: number, y: number) => {
    if (!arming) return;
    const shape: ImageMapShape = {
      id: `shape-${Date.now()}`,
      type: arming,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      ...(arming !== 'pinpoint' ? { width: 15, height: 15 } : {}),
      showTooltip: true,
      url: '',
      tooltipItems: [
        { type: 'title', value: 'Nouvelle zone', size: 'H3' },
        { type: 'paragraph', value: '' },
      ],
    };
    commit([...content.shapes, shape]);
    setArming(null);
    setSelectedId(shape.id);
  };

  const updateShape = (id: string, patch: Partial<ImageMapShape>) =>
    commit(content.shapes.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const removeShape = (id: string) => {
    commit(content.shapes.filter((s) => s.id !== id));
    setSelectedId(null);
  };

  return { editing: !!ctx?.editing, arming, setArming, selectedId, setSelectedId, placeShape, updateShape, removeShape };
}

type Editing = ReturnType<typeof useShapeEditing>;

/** Barre d'outils d'édition (haut-gauche de l'image). */
export function EditToolbar({ edit }: { edit: Editing }) {
  const btn = (type: ShapeType, label: string) => (
    <button
      type="button"
      onClick={() => edit.setArming(edit.arming === type ? null : type)}
      className={`h-7 px-sm rounded-sm text-caption font-semibold transition-colors ${
        edit.arming === type ? 'bg-sp-primary text-white' : 'bg-white text-sp-darker hover:bg-sp-lighter-alt'
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="absolute top-sm left-sm z-20 flex gap-xs p-xs bg-white/90 rounded-sm shadow-md" onClick={(e) => e.stopPropagation()}>
      {btn('pinpoint', '+ Pin')}
      {btn('rectangle', '+ Zone')}
      {edit.arming && <span className="self-center text-caption text-gray-500 px-xs">Cliquez sur l’image…</span>}
    </div>
  );
}

/** Panneau d'édition de la forme sélectionnée. */
export function ShapeEditorPanel({ shape, edit }: { shape: ImageMapShape; edit: Editing }) {
  const items = shape.tooltipItems ?? [];
  const title = items.find((i) => i.type === 'title')?.value ?? '';
  const paragraph = items.find((i) => i.type === 'paragraph')?.value ?? '';

  const setTooltip = (nextTitle: string, nextParagraph: string) =>
    edit.updateShape(shape.id, {
      tooltipItems: [
        { type: 'title', value: nextTitle, size: 'H3' },
        { type: 'paragraph', value: nextParagraph },
      ],
      showTooltip: !!(nextTitle || nextParagraph),
    });

  const field = 'w-full h-7 px-sm rounded-xs border border-gray-300 text-caption focus:outline-none focus:border-sp-primary';

  return (
    <div
      className="absolute z-30 w-[240px] bg-white rounded-sm shadow-xl border border-gray-200 p-sm flex flex-col gap-xs"
      style={{ left: `min(max(${shape.x}%, 10%), 75%)`, top: `${shape.y}%`, transform: 'translate(-50%, 24px)' }}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <label className="flex flex-col gap-[2px] text-caption text-gray-500">
        Titre de l’infobulle
        <input className={field} value={title} onChange={(e) => setTooltip(e.target.value, paragraph)} />
      </label>
      <label className="flex flex-col gap-[2px] text-caption text-gray-500">
        Texte
        <input className={field} value={paragraph} onChange={(e) => setTooltip(title, e.target.value)} />
      </label>
      <label className="flex flex-col gap-[2px] text-caption text-gray-500">
        Lien (URL)
        <input className={field} value={shape.url ?? ''} placeholder="https://…" onChange={(e) => edit.updateShape(shape.id, { url: e.target.value })} />
      </label>
      <label className="flex items-center gap-xs text-caption text-gray-600">
        <input
          type="checkbox"
          checked={shape.openInNewTab ?? false}
          onChange={(e) => edit.updateShape(shape.id, { openInNewTab: e.target.checked })}
        />
        Ouvrir dans un nouvel onglet
      </label>
      {shape.type !== 'pinpoint' && (
        <div className="flex gap-xs">
          <label className="flex flex-col gap-[2px] text-caption text-gray-500 grow">
            Largeur (%)
            <input type="number" min={2} max={100} className={field} value={shape.width ?? 10} onChange={(e) => edit.updateShape(shape.id, { width: Number(e.target.value) })} />
          </label>
          <label className="flex flex-col gap-[2px] text-caption text-gray-500 grow">
            Hauteur (%)
            <input type="number" min={2} max={100} className={field} value={shape.height ?? 10} onChange={(e) => edit.updateShape(shape.id, { height: Number(e.target.value) })} />
          </label>
        </div>
      )}
      <div className="flex justify-between pt-xs">
        <button type="button" className="text-caption text-red-600 hover:underline" onClick={() => edit.removeShape(shape.id)}>
          Supprimer
        </button>
        <button type="button" className="text-caption text-sp-primary font-semibold hover:underline" onClick={() => edit.setSelectedId(null)}>
          Fermer
        </button>
      </div>
    </div>
  );
}
