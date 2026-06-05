'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  CALLOUT_CONTENT_GAP,
  FONT_SIZE,
  HOVER_OPACITY,
  INNER_CIRCLE_RADIUS,
  OUTER_CIRCLE_RADIUS,
  PINPOINT_OPACITY,
  PINPOINT_SIZE,
  SHAPE_FILL_OPACITY,
  SHAPE_STROKE_WIDTH,
} from '../ImageInteractive.mozzaik';
import type { ImageMapShape, ShapeTooltipItem } from '../ImageInteractive.types';

interface ShapeProps {
  shape: ImageMapShape;
  isEditMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDragStart?: () => void;
}

const titleSize = (size?: ShapeTooltipItem['size']) =>
  size === 'H1' ? FONT_SIZE.GreetingTitle : size === 'H2' ? FONT_SIZE.PageTitle : FONT_SIZE.PaneHeader;

/** ShapeCallout — Callout Fluent TopCenter avec beak, gap 16. */
function ShapeTooltip({ items }: { items: ShapeTooltipItem[] }) {
  return (
    <div
      className="absolute left-1/2 bottom-full -translate-x-1/2 mb-sm z-20 bg-white rounded-xs"
      style={{ minWidth: 200, maxWidth: 300, padding: 16, boxShadow: '0 6.4px 14.4px rgba(0,0,0,0.13), 0 1.2px 3.6px rgba(0,0,0,0.11)' }}
      role="tooltip"
    >
      <div className="flex flex-col" style={{ gap: CALLOUT_CONTENT_GAP }}>
        {items.map((item, i) =>
          item.type === 'title' ? (
            <span key={i} className="text-[#323130] font-semibold leading-tight" style={{ fontSize: titleSize(item.size) }}>{item.value}</span>
          ) : (
            <span key={i} className="text-[#323130]" style={{ fontSize: FONT_SIZE.BodyText }}>{item.value}</span>
          ),
        )}
      </div>
      {/* Beak */}
      <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px" style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #ffffff', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.08))' }} aria-hidden />
    </div>
  );
}

/**
 * Forme interactive — port DOM fidèle des shapes Konva (PinPoint / Rectangle /
 * Ellipse) : positionnement centré en %, couleurs/contours exacts, survol 50 %,
 * infobulle au survol, clic → ouverture du lien.
 */
export function Shape({ shape, isEditMode = false, isSelected = false, onSelect, onDragStart }: ShapeProps) {
  const [hovered, setHovered] = useState(false);
  const color = shape.fillColor ?? 'var(--sp-theme-primary)';
  const opacity = hovered ? HOVER_OPACITY : 1;

  const baseStyle: CSSProperties = {
    position: 'absolute',
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    transform: 'translate(-50%, -50%)',
    cursor: isEditMode ? 'move' : shape.url ? 'pointer' : 'default',
    // Cercle de sélection — port du selected-circle (contour pointillé décalé de 4)
    outline: isSelected ? `2px dashed ${color}` : undefined,
    outlineOffset: isSelected ? 4 : undefined,
  };

  const onClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      onSelect?.();
      return;
    }
    if (!shape.url) return;
    window.open(shape.url, shape.openInNewTab ? '_blank' : '_self');
  };

  const tooltip = hovered && shape.showTooltip && (shape.tooltipItems?.length ?? 0) > 0 && (
    <ShapeTooltip items={shape.tooltipItems ?? []} />
  );

  if (shape.type === 'pinpoint') {
    return (
      <button
        type="button"
        style={{ ...baseStyle, width: PINPOINT_SIZE, height: PINPOINT_SIZE, opacity: PINPOINT_OPACITY }}
        onClick={onClick}
        onPointerDown={(e) => { if (isEditMode) { e.stopPropagation(); onDragStart?.(); } }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={shape.tooltipItems?.[0]?.value ?? 'Zone interactive'}
        data-testid="image-map-pinpoint"
      >
        {/* Cercle extérieur r=9, contour 2 */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: OUTER_CIRCLE_RADIUS * 2, height: OUTER_CIRCLE_RADIUS * 2, border: `${SHAPE_STROKE_WIDTH}px solid ${color}`, opacity }} />
        {/* Cercle intérieur r=5, plein */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: INNER_CIRCLE_RADIUS * 2, height: INNER_CIRCLE_RADIUS * 2, background: color, opacity }} />
        {tooltip}
      </button>
    );
  }

  // Rectangle / Ellipse — dimensions en % du stage
  return (
    <button
      type="button"
      style={{
        ...baseStyle,
        width: `${shape.width ?? 10}%`,
        height: `${shape.height ?? 10}%`,
        border: `${SHAPE_STROKE_WIDTH}px solid ${color}`,
        borderRadius: shape.type === 'ellipse' ? '50%' : 0,
        opacity,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={shape.tooltipItems?.[0]?.value ?? 'Zone interactive'}
      data-testid={`image-map-${shape.type}`}
    >
      <span className="absolute inset-0" style={{ background: color, opacity: SHAPE_FILL_OPACITY, borderRadius: shape.type === 'ellipse' ? '50%' : 0 }} />
      {tooltip}
    </button>
  );
}
