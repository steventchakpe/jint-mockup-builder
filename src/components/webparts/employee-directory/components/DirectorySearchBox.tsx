'use client';

import { SearchIcon } from '../EmployeeDirectory.icons';
import { useDemoStrings } from '@/lib/i18n';
import { ROUNDED_PX } from '../EmployeeDirectory.mozzaik';
import type { DirectoryRounded } from '../EmployeeDirectory.types';

interface DirectorySearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  rounded: DirectoryRounded;
  placeholder?: string;
}

/**
 * Barre de recherche du Trombinoscope (SearchBoxClassic).
 * En démo : filtrage CÔTÉ CLIENT sur les profils du state (pas de Graph,
 * pas de suggestions live ni de filtres avancés — ceux-ci dépendent de Graph).
 */
export function DirectorySearchBox({ value, onChange, rounded, placeholder }: DirectorySearchBoxProps) {
  const tw = useDemoStrings().webparts;
  return (
    <div
      className="flex items-center gap-sm w-full bg-white border border-gray-300 px-md py-sm focus-within:border-sp-primary transition-colors"
      style={{ borderRadius: ROUNDED_PX[rounded] }}
    >
      <SearchIcon className="w-5 h-5 shrink-0 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? tw.searchPerson}
        className="flex-1 min-w-0 outline-none bg-transparent text-body text-sp-darker placeholder:text-gray-400"
      />
    </div>
  );
}
