'use client';

import { InlineText } from '@/components/canvas/edit/inline-edit';
import { FileKindIcon } from '@/components/webparts/docs/Docs.icons';
import { fileKindFromExtension } from '@/components/webparts/docs/Docs.mozzaik';
import {
  IMAGE_BOX,
  IMAGE_BG,
  ICON_SIZE,
  CARD_MARGIN_RIGHT,
  CARD_MARGIN_BOTTOM,
  ITEM_MARGIN,
  TITLE_HEIGHT,
  FONT_SIZE,
  FOOTER_BORDER,
  BODY_COLOR,
} from '../MesDocuments.mozzaik';
import type { MesDocumentsItem } from '../MesDocuments.types';

interface DocumentLinkCardProps {
  document: MesDocumentsItem;
  index: number;
  modifiedLabel: string;
  isEditMode: boolean;
}

/** Date déterministe JJ/MM/AAAA (évite les écarts d'hydratation locale). */
function formatDate(iso: string): string {
  const d = iso.slice(0, 10).split('-');
  return d.length === 3 ? `${d[2]}/${d[1]}/${d[0]}` : iso;
}

/**
 * Carte document — port fidèle de Link.L (visuel Links).
 * Carré 103×103 (fond #f4f4f4) avec l'icône type-fichier, puis colonne
 * titre (bold 16, 2 lignes) + footer bordé (date + auteur).
 */
export function DocumentLinkCard({ document, index, modifiedLabel, isEditMode }: DocumentLinkCardProps) {
  const kind = fileKindFromExtension(`.${document.fileType.replace(/^\./, '')}`);

  return (
    <div
      className="overflow-hidden basis-full @[640px]:basis-[calc(50%-16px)] @[1024px]:basis-[calc(33%-16px)]"
      style={{ marginRight: CARD_MARGIN_RIGHT, marginBottom: CARD_MARGIN_BOTTOM, color: BODY_COLOR }}
    >
      <a
        href={document.url || '#'}
        onClick={(e) => { if (isEditMode || !document.url) e.preventDefault(); }}
        className="no-underline"
        style={{ color: BODY_COLOR }}
      >
        <div className="flex flex-row">
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{ width: IMAGE_BOX, height: IMAGE_BOX, background: IMAGE_BG }}
          >
            <FileKindIcon kind={kind} size={ICON_SIZE} />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden" style={{ margin: ITEM_MARGIN }}>
            <div
              className="font-bold overflow-hidden"
              style={{
                height: TITLE_HEIGHT,
                fontSize: FONT_SIZE.title,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              <InlineText as="span" path={['documents', index, 'title']} value={document.title} placeholder="Nom du document" />
            </div>
            <div
              className="whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ borderTop: `2px solid ${FOOTER_BORDER}`, fontSize: FONT_SIZE.footer, paddingTop: 8, marginTop: 'auto' }}
            >
              {modifiedLabel} {formatDate(document.modifiedDate)} · {document.modifiedBy}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
