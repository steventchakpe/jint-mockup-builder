import { IMAGE_BOX, CARD_MARGIN_RIGHT, CARD_MARGIN_BOTTOM } from './MesDocuments.mozzaik';

/** Skeleton — cartes document (carré icône + titre + footer). */
export function MesDocumentsSkeleton({ nbItems = 5 }: { nbItems?: number }) {
  return (
    <div className="@container flex flex-wrap">
      {Array.from({ length: Math.min(nbItems, 3) }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden basis-full @[640px]:basis-[calc(50%-16px)] @[1024px]:basis-[calc(33%-16px)]"
          style={{ marginRight: CARD_MARGIN_RIGHT, marginBottom: CARD_MARGIN_BOTTOM }}
        >
          <div className="flex flex-row">
            <div className="bg-sp-lighter-alt animate-pulse shrink-0" style={{ width: IMAGE_BOX, height: IMAGE_BOX }} />
            <div className="flex flex-col flex-1" style={{ margin: '8px 0 8px 16px' }}>
              <div className="h-4 w-3/4 bg-sp-lighter-alt animate-pulse" />
              <div className="h-3 w-1/2 bg-sp-lighter-alt animate-pulse" style={{ marginTop: 'auto' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
