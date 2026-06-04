'use client';

import type { SectionLayout } from '@/types/project';
import type { SectionChoice } from '@/lib/state/section-ops';

export type { SectionChoice };

/** Icônes des 8 layouts de section (reprises du sélecteur SharePoint). */
const box = 'stroke-current fill-none';
function Ico({ children }: { children: React.ReactNode }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" strokeWidth="1.5" className={box}>
      <rect x="4" y="6" width="20" height="16" rx="1.5" />
      {children}
    </svg>
  );
}

const ICONS: Record<SectionLayout | 'vertical', React.ReactNode> = {
  flexible: <Ico><rect x="6.5" y="8.5" width="7" height="6" rx="1" /></Ico>,
  'one-column': <Ico>{null}</Ico>,
  'two-column': <Ico><line x1="14" y1="6" x2="14" y2="22" /></Ico>,
  'three-column': <Ico><line x1="11" y1="6" x2="11" y2="22" /><line x1="17" y1="6" x2="17" y2="22" /></Ico>,
  'one-third-left': <Ico><line x1="11" y1="6" x2="11" y2="22" /></Ico>,
  'one-third-right': <Ico><line x1="17" y1="6" x2="17" y2="22" /></Ico>,
  'full-width': <Ico><path d="M9 14h10M9 14l2-2M9 14l2 2M19 14l-2-2M19 14l-2 2" /></Ico>,
  vertical: (
    <svg width="28" height="28" viewBox="0 0 28 28" strokeWidth="1.5" className={box}>
      <rect x="4" y="6" width="13" height="16" rx="1.5" />
      <rect x="19" y="6" width="5" height="16" rx="1.5" strokeDasharray="2 2" />
    </svg>
  ),
};

const OPTIONS: { key: SectionChoice; label: string }[] = [
  { key: 'flexible', label: 'Flexible' },
  { key: 'one-column', label: 'Une colonne' },
  { key: 'two-column', label: 'Deux colonnes' },
  { key: 'three-column', label: 'Trois colonnes' },
  { key: 'one-third-left', label: 'Un tiers à gauche' },
  { key: 'one-third-right', label: 'Un tiers droit' },
  { key: 'full-width', label: 'Section pleine largeur' },
  { key: 'vertical', label: 'Section verticale' },
];

interface LayoutPickerProps {
  onPick: (choice: SectionChoice) => void;
}

/** Sélecteur de layout (popover 4×2) — réplique du picker SharePoint. */
export function LayoutPicker({ onPick }: LayoutPickerProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-sm z-30 bg-white rounded-md shadow-xl border border-gray-200 p-md grid grid-cols-4 gap-sm w-[420px]">
      {OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onPick(key)}
          className="flex flex-col items-center gap-xs p-sm rounded-md text-[#605e5c] hover:bg-sp-lighter-alt hover:text-sp-primary transition-colors"
        >
          {ICONS[key]}
          <span className="text-caption text-center leading-tight">{label}</span>
        </button>
      ))}
    </div>
  );
}
