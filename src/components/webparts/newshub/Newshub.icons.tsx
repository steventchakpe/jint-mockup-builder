import type { SVGProps } from 'react';
import type { PostSource } from './Newshub.types';

/* SVG exacts — @fluentui/react-icons (viewBox 20×20) + mozzaik-ui (sources brandées). */

/** Open20Regular */
export function OpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-2.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h2.5a.5.5 0 0 1 0 1H6Zm5-.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0V4.7l-4.15 4.15a.5.5 0 0 1-.7-.7L15.29 4H11.5a.5.5 0 0 1-.5-.5Z" />
    </svg>
  );
}

/** Share20Regular */
export function ShareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m13.33 12.84 4.5-4.42.05-.07a.59.59 0 0 0-.05-.77l-4.5-4.42-.06-.05c-.36-.27-.9-.01-.9.47V5.7l-.22.01C8.6 6.01 6.5 8.26 6 12.35c-.06.53.54.85.93.5a9.64 9.64 0 0 1 4.45-2.38c.24-.06.5-.1.74-.12l.26-.02v2.17c.06.46.61.67.95.34Zm-1.1-6.12 1.15-.08V4.61L16.82 8l-3.44 3.39V9.23l-1.36.12c-1.7.19-3.32.87-4.83 2 .3-1.33.8-2.34 1.47-3.06a5.2 5.2 0 0 1 3.57-1.57ZM5.5 4A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 4 14.5v-8C4 5.67 4.67 5 5.5 5h3a.5.5 0 0 0 0-1h-3Z" />
    </svg>
  );
}

/** Play20Filled — calque vidéo. */
export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.22 8.68a1.5 1.5 0 0 1 0 2.63l-10 5.5A1.5 1.5 0 0 1 5 15.5v-11A1.5 1.5 0 0 1 7.22 3.2l10 5.5Z" />
    </svg>
  );
}

/** RetweetRegular — mozzaik-ui (viewBox 24×24), recoloré currentColor. */
export function RetweetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor">
        <path d="M8.425 19.5a2.736 2.736 0 0 1-1.998-.877 3.087 3.087 0 0 1-.826-2.12V7.445L4 9.147a.544.544 0 0 1-.814 0 .635.635 0 0 1-.173-.432c0-.157.062-.327.173-.432l2.564-2.749s.124-.104.198-.144c.074-.026.148-.052.234-.052.086 0 .16.013.234.052a.516.516 0 0 1 .197.144L9.19 8.27a.612.612 0 0 1 .173.432.687.687 0 0 1-.16.432.544.544 0 0 1-.407.183.619.619 0 0 1-.432-.183l-1.59-1.689v9.058c0 .471.172.916.493 1.243.308.328.727.51 1.171.51h4.414c.16 0 .296.066.406.184a.635.635 0 0 1 .173.432.612.612 0 0 1-.172.432.564.564 0 0 1-.407.183H8.449l-.024.013ZM17.82 18.662a.508.508 0 0 1-.235-.052.516.516 0 0 1-.197-.144L14.81 15.73a.636.636 0 0 1-.173-.432c0-.157.062-.314.16-.431a.564.564 0 0 1 .407-.184c.148 0 .321.066.432.184l1.59 1.688V7.497c0-.47-.172-.916-.493-1.243-.32-.327-.727-.524-1.171-.524h-4.401a.544.544 0 0 1-.407-.183.635.635 0 0 1-.173-.432c0-.157.062-.314.173-.432a.564.564 0 0 1 .407-.183h4.401c.752 0 1.467.314 1.997.877s.826 1.322.826 2.12v9.058l1.603-1.702a.564.564 0 0 1 .407-.183c.148 0 .296.066.407.183a.635.635 0 0 1 .172.432.612.612 0 0 1-.172.432l-2.577 2.736s-.123.105-.197.144c-.074.026-.148.052-.235.052l.025.013Z" />
      </g>
    </svg>
  );
}

/**
 * Icônes de sources brandées (Twitter/LinkedIn/YouTube/Facebook/Instagram) —
 * SVG mozzaik-ui rendus statiquement depuis le bundle, servis depuis
 * /public/icons/sources/. Rss = pas d'icône brandée dédiée (None → rien).
 */
export function SourceIcon({ source, size }: { source: PostSource; size: number }) {
  const branded = ['Twitter', 'LinkedIn', 'YouTube', 'Facebook', 'Instagram'];
  if (branded.includes(source)) {
    return <img src={`/icons/sources/${source.toLowerCase()}.svg`} alt={source} width={size} height={size} />;
  }
  return null;
}
