/** Boutons Like + Share — 32×32, fond blanc, bordure grise, icône bleue */
export function NewsActionButtons() {
  return (
    <div className="flex items-center gap-[5px] shrink-0">
      <button
        className="w-8 h-8 flex items-center justify-center bg-white border border-[#e7e5e4] shrink-0"
        aria-label="J'aime"
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6H0v7h1M3 13h7.5a1 1 0 0 0 .95-.68l1.5-4A1 1 0 0 0 12 7H8V3a2 2 0 0 0-2-2L4 6v7H3Z"
            fill="#0078d4"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center bg-white border border-[#e7e5e4] shrink-0"
        aria-label="Partager"
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="2.5" r="1.5" stroke="#0078d4" strokeWidth="1.5"/>
          <circle cx="11" cy="11.5" r="1.5" stroke="#0078d4" strokeWidth="1.5"/>
          <circle cx="3" cy="7" r="1.5" stroke="#0078d4" strokeWidth="1.5"/>
          <path d="M4.5 6.2 9.5 3.3M4.5 7.8l5 2.9" stroke="#0078d4" strokeWidth="1.2"/>
        </svg>
      </button>
    </div>
  );
}
