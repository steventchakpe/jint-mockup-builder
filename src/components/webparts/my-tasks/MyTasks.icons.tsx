import type { SVGProps } from 'react';
import type { TaskListKind } from './MyTasks.types';
import { LIST_ICON_COLOR } from './MyTasks.mozzaik';

/* SVG exacts — @fluentui/react-icons (createFluentIcon, viewBox 20×20). */

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.1 2.9a1 1 0 0 1 1.8 0l1.93 3.91 4.31.63a1 1 0 0 1 .56 1.7l-3.12 3.05.73 4.3a1 1 0 0 1-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 0 1-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 0 1 .56-1.7l4.31-.63L9.1 2.9Z" />
    </svg>
  );
}

export function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-5 9a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Z" />
    </svg>
  );
}

export function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 13h11.5a.5.5 0 0 0 .42-.78L14.1 8l2.82-4.22A.5.5 0 0 0 16.5 3h-12a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 1 0V13Z" />
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11 2.39a1.5 1.5 0 0 0-2 0L3.5 7.33c-.32.28-.5.69-.5 1.12v7.05c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v4c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5V8.45c0-.43-.18-.84-.5-1.12L11 2.39Z" />
    </svg>
  );
}

export function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h2.48c.47 0 .91.18 1.24.51L9.5 4.8 7.44 6.85a.5.5 0 0 1-.35.15H2V5.5ZM2 8v6.5A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 5h-4.8L8.16 7.56A1.5 1.5 0 0 1 7.09 8H2Z" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z" />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.73 4.2a.75.75 0 0 1 1.06.03l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 1 1-1.08-1.04L12.2 10l-4.5-4.73a.75.75 0 0 1 .02-1.06Z" />
    </svg>
  );
}

/** Checkmark20Filled — coche du checkbox. */
export function CheckmarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.03 13.9 3.56 10a.75.75 0 0 0-1.12 1l4 4.5c.29.32.79.34 1.09.03l10.5-10.5a.75.75 0 0 0-1.06-1.06l-9.94 9.94Z" />
    </svg>
  );
}

/** Icône de liste (useConvertedLists) : couleur si active, neutralTertiaryAlt sinon. */
export function ListKindIcon({ kind, active, size = 16 }: { kind: TaskListKind; active: boolean; size?: number }) {
  const colorSpec = LIST_ICON_COLOR[kind];
  const color = !active ? '#c8c6c4' : colorSpec === 'theme' ? 'var(--sp-theme-primary)' : colorSpec;
  const style = { width: size, height: size, color };
  switch (kind) {
    case 'important': return <StarIcon style={style} />;
    case 'planned':
    case 'assigned': return <PersonIcon style={style} />;
    case 'flagged': return <FlagIcon style={style} />;
    case 'default': return <HomeIcon style={style} />;
    default: return <FolderIcon style={style} />;
  }
}
