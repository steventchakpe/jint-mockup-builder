'use client';

import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { WebpartHost } from './WebpartHost';
import { useProjectStore } from '@/lib/state/project-store';
import type { FlexPosition, WebpartInstance } from '@/types/project';

interface FlexibleSectionRendererProps {
  /** Webparts de la section flexible (chacun positionné via `flex`). */
  webparts: WebpartInstance[];
  isEditMode?: boolean;
  /** Requis en édition pour persister les déplacements/resize dans le store. */
  pageId?: string;
  sectionId?: string;
}

const COLS = 12;
const GUTTER = 8; // px — gouttière entre webparts en section flexible
const Y_SNAP = 8; // px — pas de snap vertical
const MIN_H = 160; // hauteur min du conteneur

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const defaultFlex = (i: number): FlexPosition => ({ x: (i % 2) * 6, w: 6, y: Math.floor(i / 2) * 300, z: 1 });

/**
 * Section Flexible — réplique la feature native SharePoint (2024).
 * Grille 12 colonnes horizontale + placement vertical libre (px), overlap via z-index.
 * - Desktop (≥ 640px) : positionnement absolu (left/width par colonnes, top px).
 *   En édition : poignée de déplacement (snap 12 col + 8px vertical) + poignée de resize largeur.
 * - Mobile (< 640px) : repli en 1 colonne (priorité par `y` puis `order`).
 */
export function FlexibleSectionRenderer({
  webparts,
  isEditMode = false,
  pageId,
  sectionId,
}: FlexibleSectionRendererProps) {
  const updateFlex = useProjectStore((s) => s.updateWebpartFlex);
  const editable = isEditMode && !!pageId && !!sectionId;

  const ordered = [...webparts].sort(
    (a, b) => (a.flex?.y ?? 0) - (b.flex?.y ?? 0) || a.order - b.order,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});

  // Mesure des hauteurs d'items (pour dimensionner le conteneur en absolu).
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const h: Record<string, number> = {};
      el.querySelectorAll<HTMLElement>('[data-flex-item]').forEach((node) => {
        const itemId = node.getAttribute('data-id');
        if (itemId) h[itemId] = node.offsetHeight;
      });
      setHeights(h);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.querySelectorAll<HTMLElement>('[data-flex-item]').forEach((n) => ro.observe(n));
    measure();
    return () => ro.disconnect();
  }, [ordered.length]);

  const flexOf = (wp: WebpartInstance, i: number): FlexPosition => wp.flex ?? defaultFlex(i);
  const containerHeight = Math.max(
    MIN_H,
    ...ordered.map((wp, i) => flexOf(wp, i).y + (heights[wp.id] ?? 0)),
  ) + 8;

  // --- Drag (déplacement) & resize (largeur) ---
  function startMove(e: PointerEvent, wp: WebpartInstance, f: FlexPosition) {
    if (!editable) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const colStep = (containerRef.current?.clientWidth ?? 1) / COLS;
    const move = (ev: globalThis.PointerEvent) => {
      const dCols = Math.round((ev.clientX - startX) / colStep);
      const dY = ev.clientY - startY;
      const nx = clamp(f.x + dCols, 0, COLS - f.w);
      const ny = Math.max(0, Math.round((f.y + dY) / Y_SNAP) * Y_SNAP);
      updateFlex(pageId!, sectionId!, wp.id, { ...f, x: nx, y: ny });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function startResize(e: PointerEvent, wp: WebpartInstance, f: FlexPosition) {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const colStep = (containerRef.current?.clientWidth ?? 1) / COLS;
    const move = (ev: globalThis.PointerEvent) => {
      const dCols = Math.round((ev.clientX - startX) / colStep);
      const nw = clamp(f.w + dCols, 1, COLS - f.x);
      updateFlex(pageId!, sectionId!, wp.id, { ...f, w: nw });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  return (
    <>
      {/* Mobile (< 640px) : flux 1 colonne. */}
      <div className="flex flex-col gap-md @[640px]:hidden">
        {ordered.map((wp) => (
          <WebpartHost key={wp.id} instance={wp} isEditMode={isEditMode} />
        ))}
      </div>

      {/* Desktop (≥ 640px) : positionnement absolu sur grille 12 colonnes. */}
      <div
        ref={containerRef}
        data-testid="flexible-section"
        className="relative hidden @[640px]:block"
        style={{ height: containerHeight }}
      >
        {ordered.map((wp, i) => {
          const f = flexOf(wp, i);
          return (
            <div
              key={wp.id}
              data-flex-item
              data-id={wp.id}
              className="absolute box-border group/flex"
              style={{
                left: `${(f.x / COLS) * 100}%`,
                width: `${(f.w / COLS) * 100}%`,
                top: f.y,
                zIndex: f.z ?? 1,
                paddingInline: GUTTER / 2,
              }}
            >
              {editable && (
                <>
                  {/* Poignée de déplacement */}
                  <button
                    type="button"
                    title="Déplacer"
                    onPointerDown={(e) => startMove(e, wp, f)}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 hidden group-hover/flex:flex w-7 h-6 rounded-full bg-white border border-gray-300 text-[#605e5c] hover:text-sp-primary hover:border-sp-primary items-center justify-center text-caption shadow-sm cursor-grab active:cursor-grabbing"
                  >
                    ⠿
                  </button>
                  {/* Poignée de resize largeur (bord droit) */}
                  <div
                    title="Redimensionner"
                    onPointerDown={(e) => startResize(e, wp, f)}
                    className="absolute top-1/2 -translate-y-1/2 right-1 z-30 hidden group-hover/flex:block w-1.5 h-12 rounded-full bg-sp-primary/70 hover:bg-sp-primary cursor-ew-resize"
                  />
                  {/* Cadre de sélection */}
                  <div className="absolute inset-x-[12px] inset-y-0 rounded-sm pointer-events-none ring-1 ring-transparent group-hover/flex:ring-sp-primary/40" />
                </>
              )}
              <WebpartHost instance={wp} isEditMode={isEditMode} />
            </div>
          );
        })}
      </div>
    </>
  );
}
