'use client';

import { getAllWebparts } from '@/config/webpart-registry';

interface WebpartCatalogProps {
  onPick: (typeId: string) => void;
  onClose: () => void;
}

/**
 * Catalogue visuel des webparts (US-08) — liste depuis le registry.
 * Affiché au clic sur « + Ajouter un webpart » dans une colonne.
 */
export function WebpartCatalog({ onPick, onClose }: WebpartCatalogProps) {
  const webparts = getAllWebparts();

  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute z-30 mt-sm left-1/2 -translate-x-1/2 w-[320px] max-h-[360px] overflow-auto bg-white rounded-md shadow-xl border border-gray-200 p-sm">
        <p className="text-caption text-gray-400 px-sm pb-xs">Catalogue de webparts</p>
        <div className="grid grid-cols-2 gap-xs">
          {webparts.map((wp) => (
            <button
              key={wp.typeId}
              type="button"
              onClick={() => onPick(wp.typeId)}
              className="flex items-center gap-sm p-sm rounded-md text-left hover:bg-sp-lighter-alt transition-colors"
            >
              <span className="w-8 h-8 shrink-0 rounded-sm bg-sp-lighter-alt text-sp-primary flex items-center justify-center text-caption font-bold uppercase">
                {wp.name.slice(0, 2)}
              </span>
              <span className="text-caption text-sp-darker leading-tight">{wp.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
