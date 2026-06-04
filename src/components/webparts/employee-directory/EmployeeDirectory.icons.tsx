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

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.492 6.91A.5.5 0 0 0 7.5 7v4.502l.008.09a.5.5 0 0 0 .992-.09V7l-.008-.09ZM8.8 4.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z" />
    </svg>
  );
}

export function PeopleInfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 17 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 4a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.009 9A2.001 2.001 0 0 0 0 11c0 1.691.833 2.966 2.135 3.797C3.417 15.614 5.145 16 7 16c.41 0 .816-.019 1.21-.057a5.503 5.503 0 0 1-.618-.957C7.398 14.995 7.2 15 7 15c-1.735 0-3.257-.364-4.327-1.047C1.623 13.283 1 12.31 1 11c0-.553.448-1 1.009-1h5.59c.184-.358.405-.693.658-1H2.01Zm9.866 1.5a.625.625 0 1 1 1.25 0 .625.625 0 0 1-1.25 0Zm1.125 4a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 1 0v2Zm-5-2a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm1 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z" />
    </svg>
  );
}

export function TreeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 0a3 3 0 0 0-.5 5.96V7.5h-3A1.5 1.5 0 0 0 3 9v1.042a3.001 3.001 0 1 0 1 0V9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.042a3.001 3.001 0 1 0 1 0V9a1.5 1.5 0 0 0-1.5-1.5h-3V5.96A3.001 3.001 0 0 0 8 0ZM6 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM1.5 13a2 2 0 1 1 4.001 0A2 2 0 0 1 1.5 13Zm11-2a2 2 0 1 1 0 4.001 2 2 0 0 1 0-4.001Z" />
    </svg>
  );
}

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.5 1.36A1.5 1.5 0 0 0 1 2.86v6a1.5 1.5 0 0 0 1.5 1.5H4v1H2.5A2.5 2.5 0 0 1 0 8.86v-6A2.5 2.5 0 0 1 2.5.36h6a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5H7v-1h1.5a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h-6Zm5 4H9v1H7.5A1.5 1.5 0 0 0 6 7.86v6a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H12v-1h1.5a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5h-6a2.5 2.5 0 0 1-2.5-2.5v-6a2.5 2.5 0 0 1 2.5-2.5Z" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.5 4A2.5 2.5 0 0 1 18 6.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-8A2.5 2.5 0 0 1 4.5 4h11ZM17 7.96l-6.75 3.97a.5.5 0 0 1-.42.04l-.08-.04L3 7.96v6.54c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5V7.96ZM15.5 5h-11C3.67 5 3 5.67 3 6.5v.3l7 4.12 7-4.12v-.3c0-.83-.67-1.5-1.5-1.5Z" />
    </svg>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 2a8 8 0 1 1-3.61 15.14l-.12-.07-3.65.92a.5.5 0 0 1-.62-.45v-.08l.01-.08.92-3.64-.07-.12a7.95 7.95 0 0 1-.83-2.9l-.02-.37L2 10a8 8 0 0 1 8-8Zm0 1a7 7 0 0 0-6.1 10.42.5.5 0 0 1 .06.28l-.02.1-.75 3.01 3.02-.75a.5.5 0 0 1 .19-.01l.09.02.09.04A7 7 0 1 0 10 3Zm.5 8a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h3.09Zm2-3a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h5.09Z" />
    </svg>
  );
}
