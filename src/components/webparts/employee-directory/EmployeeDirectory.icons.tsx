import type { SVGProps } from 'react';

/**
 * Icônes extraites À L'IDENTIQUE de jintan :
 * - PeopleIcon / PlaceIcon : `oldparts/src/icons` (custom Mozzaik)
 * - SearchRegular : @fluentui/react-icons (viewBox 20×20)
 * `currentColor` pour respecter la couleur fournie.
 */

export function PeopleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={15} height={14} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.2 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm6.779 1.584.042.032a2 2 0 1 0-.042-.032ZM5.468 5A2 2 0 1 1 8.93 6.998 2 2 0 0 1 5.468 5ZM1.7 5h2.67c-.11.313-.17.65-.17 1 0 .768.289 1.47.764 2H4.7a2.501 2.501 0 0 0-2.355 1.658 3.734 3.734 0 0 1-.933-.543C.66 8.51.2 7.616.2 6.5A1.5 1.5 0 0 1 1.7 5Zm8 3c1.085 0 2.009.691 2.355 1.658.34-.139.654-.32.933-.543C13.74 8.51 14.2 7.616 14.2 6.5A1.5 1.5 0 0 0 12.7 5h-2.67c.11.313.17.65.17 1 0 .768-.289 1.47-.764 2H9.7Zm1.387 1.928c.073.176.113.37.113.572 0 1.116-.459 2.01-1.212 2.615C9.247 13.71 8.253 14 7.2 14c-1.053 0-2.047-.29-2.788-.885C3.66 12.51 3.2 11.616 3.2 10.5A1.496 1.496 0 0 1 4.7 9h5a1.5 1.5 0 0 1 1.387.928Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.2.5A4.5 4.5 0 0 1 9.7 5c0 1.863-1.42 3.815-4.2 5.9a.5.5 0 0 1-.6 0C2.12 8.815.7 6.863.7 5A4.5 4.5 0 0 1 5.2.5Zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.5 3a5.5 5.5 0 0 1 4.23 9.02l4.12 4.13a.5.5 0 0 1-.63.76l-.07-.06-4.13-4.12A5.5 5.5 0 1 1 8.5 3Zm0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
    </svg>
  );
}
