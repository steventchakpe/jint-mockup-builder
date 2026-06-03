import type { FocusContentImage } from '../Focus.types';

interface FocusImageContentProps {
  image: FocusContentImage;
  /** Hauteur calculée par FocusCard (px). */
  imageHeight: number;
  radius: number;
}

/**
 * Port fidèle de `FocusImageContent`. Conteneur non-rétractable
 * (disableShrink), arrondi + overflow hidden, image dimensionnée par sa HAUTEUR
 * (imageSize type:'height') — la largeur suit le ratio naturel.
 */
export function FocusImageContent({ image, imageHeight, radius }: FocusImageContentProps) {
  const { altText = '', url } = image;
  return (
    <div className="shrink-0 overflow-hidden" style={{ borderRadius: radius }}>
      <img
        src={url}
        alt={altText}
        style={{ height: imageHeight, width: 'auto', objectFit: 'cover' }}
        className="block max-w-full"
        loading="lazy"
      />
    </div>
  );
}
