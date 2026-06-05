import type { SVGProps } from 'react';
import type { DocFileKind } from './Docs.types';

/* SVG exacts — @fluentui/react-icons (createFluentIcon, viewBox 20×20). */

/** Document20Regular */
export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V7.41c0-.4-.16-.78-.44-1.06l-3.91-3.91A1.5 1.5 0 0 0 10.59 2H6ZM5 4a1 1 0 0 1 1-1h4v3.5c0 .83.67 1.5 1.5 1.5H15v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4Zm9.8 3h-3.3a.5.5 0 0 1-.5-.5V3.2L14.8 7Z" />
    </svg>
  );
}

/** DocumentPdf20Regular */
export function DocumentPdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.17h.33a1.17 1.17 0 0 0 0-2.33H6.5Zm.83 1.33H7V12h.33a.17.17 0 0 1 0 .33ZM12 11.5c0-.28.23-.5.5-.5h1a.5.5 0 0 1 0 1H13v.33h.5a.5.5 0 1 1 0 1H13v.17a.5.5 0 0 1-1 0v-2ZM9.5 11a.5.5 0 0 0-.5.5v2c0 .28.22.5.5.5h.5a1.5 1.5 0 0 0 0-3h-.5Zm.5 2v-1a.5.5 0 0 1 0 1ZM4 4c0-1.1.9-2 2-2h4.59c.4 0 .78.16 1.06.44l3.91 3.91c.28.28.44.67.44 1.06v1.67c.58.2 1 .76 1 1.42v4c0 .65-.42 1.2-1 1.41V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.09c-.58-.2-1-.76-1-1.41v-4c0-.66.42-1.21 1-1.42V4Zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v5h10V8ZM5 16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1H5Zm6-12.8v3.3c0 .28.22.5.5.5h3.3L11 3.2ZM4.5 10a.5.5 0 0 0-.5.5v4c0 .28.23.5.5.5h11a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-11Z" />
    </svg>
  );
}

/** MoreHorizontal20Regular */
export function MoreHorizontalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
    </svg>
  );
}

/**
 * Icônes de fichiers brandées (Word/Excel/PowerPoint) — SVG mozzaik-ui rendus
 * statiquement depuis le bundle (Text-ac92a623.js, couleurs Office officielles),
 * servis depuis /public/icons/files/. PDF/défaut = icônes Fluent monochromes.
 */
export function FileKindIcon({ kind, size }: { kind: DocFileKind; size: number }) {
  if (kind === 'word' || kind === 'excel' || kind === 'powerpoint') {
    return <img src={`/icons/files/${kind}.svg`} alt="" width={size} height={size} aria-hidden />;
  }
  const Icon = kind === 'pdf' ? DocumentPdfIcon : DocumentIcon;
  return <Icon style={{ width: size, height: size, color: '#323130' }} aria-hidden />;
}
