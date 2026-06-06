import { frFR } from './demo-strings.fr-FR';
import type { DemoStrings } from './demo-strings.types';

/**
 * Chaînes du chrome — Français (Canada).
 * Hérite du fr-FR ; ne surcharge QUE les différences régionales réelles
 * (infolettre/newsletter, clavardage, formats de dates fr-CA, etc.).
 */
export const frCA: DemoStrings = {
  ...frFR,
  dateLocale: 'fr-CA',
  uex: {
    ...frFR.uex,
    newsletter: 'Infolettre',
  },
  footer: {
    groupHeader: 'Succursales',
    link: (n: number) => `Succursale ${n}`,
  },
  webparts: {
    ...frFR.webparts,
    noEmail: 'Aucun courriel',
  },
};
