'use client';

import { useState } from 'react';
import { Uex, type UexSection } from './Uex';
import { UexPanel } from './UexPanel';

/**
 * UEX complète (barre + panneau) — wrapper client.
 * Clic sur une icône → ouvre/ferme le panneau pleine hauteur correspondant.
 */
export function UexBar() {
  const [active, setActive] = useState<UexSection | null>(null);
  const toggle = (s: UexSection) => setActive((cur) => (cur === s ? null : s));
  return (
    <>
      <Uex active={active} onSelect={toggle} />
      {active && <UexPanel section={active} onClose={() => setActive(null)} />}
    </>
  );
}
