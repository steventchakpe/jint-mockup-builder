import { useEffect, useRef, useState } from 'react';

/**
 * Port de `useSize` (@mozzaik365) : observe la taille d'un élément via
 * ResizeObserver. Utilisé pour calculer le nombre de lignes de description
 * qui tiennent dans la hauteur disponible (comportement identique à l'original).
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ width: rect.width, height: rect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
