'use client';

import type { CSSProperties } from 'react';
import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FileKindIcon, MoreHorizontalIcon } from '../Docs.icons';
import {
  CARD_BORDER_RADIUS,
  CARD_BORDER_WIDTH,
  CARD_GAP,
  CARD_HOVER_SHADOW,
  CARD_IMAGE_RADIUS,
  CARD_INFORMATIONS_GAP,
  CARD_MAX_HEIGHT,
  CARD_PADDING,
  FADE_GRADIENT,
  FADE_HEIGHT,
  FADE_PADDING,
  FONT_SIZE,
  NEUTRAL_LIGHTER,
  NEUTRAL_LIGHTER_ALT,
  fileKindFromExtension,
} from '../Docs.mozzaik';
import type { DocFile } from '../Docs.types';

interface DocCardProps {
  file: DocFile;
  index: number;
  isEditMode?: boolean;
  onFileClick?: (file: DocFile) => void;
}

/**
 * DocCard — port fidèle de MyFilesCard (my-files.js) :
 * Card mozzaik-ui (bg blanc, bordure 1px neutralLighter, radius 8, padding 8,
 * maxHeight 400, ombre Medium au survol), zone image radius 8 (cover) ou icône 48
 * centrée sur fond neutralLighterAlt, fade haut 48px avec bouton « … » à droite,
 * ligne infos : icône 16 + titre SubjectTitle (16) semibold sur 1 ligne.
 */
export function DocCard({ file, index, isEditMode = false, onFileClick }: DocCardProps) {
  const kind = fileKindFromExtension(file.extension);

  const cardStyle: CSSProperties = {
    maxHeight: CARD_MAX_HEIGHT,
    padding: CARD_PADDING,
    gap: CARD_GAP,
    borderRadius: CARD_BORDER_RADIUS,
    border: `solid ${CARD_BORDER_WIDTH}px ${NEUTRAL_LIGHTER}`,
  };

  const imageStyle: CSSProperties = file.previewUrl
    ? {
        borderRadius: CARD_IMAGE_RADIUS,
        backgroundImage: `url("${file.previewUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { borderRadius: CARD_IMAGE_RADIUS, backgroundColor: NEUTRAL_LIGHTER_ALT };

  return (
    <div
      className="flex flex-col h-full w-full bg-white cursor-pointer transition-shadow"
      style={cardStyle}
      onClick={() => { if (!isEditMode) onFileClick?.(file); }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = CARD_HOVER_SHADOW ?? ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
      data-testid="doc-card"
    >
      <div className="relative grow overflow-hidden" style={imageStyle}>
        {/* Fade + bouton more (MoreButton, IconButton ghost small tertiaryLight) */}
        <div
          className="absolute inset-x-0 top-0 flex justify-end"
          style={{ height: FADE_HEIGHT, background: FADE_GRADIENT, padding: FADE_PADDING }}
        >
          <button
            type="button"
            aria-label="Plus d'actions"
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 inline-flex items-center justify-center rounded-sm text-white hover:bg-white/20 transition-colors"
          >
            <MoreHorizontalIcon style={{ width: 16, height: 16 }} />
          </button>
        </div>
        {!file.previewUrl && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FileKindIcon kind={kind} size={48} />
          </div>
        )}
      </div>

      <div className="flex items-center shrink-0" style={{ gap: CARD_INFORMATIONS_GAP }}>
        <FileKindIcon kind={kind} size={16} />
        <InlineText
          as="span"
          path={['files', index, 'title']}
          value={file.title}
          placeholder="Nom du fichier"
          className="font-semibold truncate text-[#323130]"
          style={{ fontSize: FONT_SIZE.SubjectTitle }}
        />
      </div>
    </div>
  );
}
