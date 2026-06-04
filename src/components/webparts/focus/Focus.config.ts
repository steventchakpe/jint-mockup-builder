import type { FocusConfig } from './Focus.types';

/**
 * Défauts repris du manifest focusV2 (preconfiguredEntries) :
 * height "S" = 208px, radius "pill" = 12px, shadow "Strong",
 * background image plein cadre (cover, center center).
 */
export const focusDefaultConfig: FocusConfig = {
  title: '',
  height: 208,
  radius: 12,
  shadow: 'Strong',
  background: {
    type: 'image',
    url: '/focus-banner-default.jpg',
    position: 'center center',
    adjustment: 'cover',
  },
};

export const focusConfigMeta = {
  typeId: 'focus',
  displayName: 'Focus',
  category: 'hero',
  wave: 1,
  icon: 'sparkles',
  description: 'Met en avant un contenu prioritaire (hero) avec image, titre et appel à action.',
  configurableProps: [
    {
      key: 'title',
      label: 'Titre de section',
      type: 'string' as const,
      defaultValue: '',
    },
    // Hauteur : presets S/M/L (mapping jintan, valeurs px). Pas de hauteur libre.
    {
      key: 'height',
      label: 'Hauteur',
      type: 'select' as const,
      defaultValue: 208,
      options: [
        { value: '208', label: 'Petite (S)' },
        { value: '416', label: 'Moyenne (M)' },
        { value: '832', label: 'Grande (L)' },
      ],
    },
    // Arrondis : presets uniquement (semiRounded/rounded/pill). Pas de radius personnalisé.
    {
      key: 'radius',
      label: 'Arrondis',
      type: 'select' as const,
      defaultValue: 12,
      options: [
        { value: '4', label: 'Léger' },
        { value: '8', label: 'Arrondi' },
        { value: '12', label: 'Pilule' },
      ],
    },
    {
      key: 'shadow',
      label: 'Ombre',
      type: 'select' as const,
      defaultValue: 'Strong',
      options: [
        { value: 'None', label: 'Aucune' },
        { value: 'Light', label: 'Légère' },
        { value: 'Medium', label: 'Moyenne' },
        { value: 'Strong', label: 'Forte' },
      ],
    },
    // Position du contenu (texte) — vit dans le contenu.
    {
      key: 'contentPosition',
      label: 'Position du contenu',
      type: 'select' as const,
      target: 'content' as const,
      path: ['card', 'position'],
      defaultValue: 'fill',
      options: [
        { value: 'fill', label: 'Plein' },
        { value: 'top', label: 'Haut' },
        { value: 'bottom', label: 'Bas' },
        { value: 'left', label: 'Gauche' },
        { value: 'right', label: 'Droite' },
      ],
    },
    // Toggles d'affichage (fidèles aux .visible du manifest jintan) — dans le contenu.
    { key: 'showTag', label: 'Afficher le tag', type: 'boolean' as const, target: 'content' as const, path: ['card', 'tag', 'visible'], defaultValue: true },
    { key: 'showTitle', label: 'Afficher le titre', type: 'boolean' as const, target: 'content' as const, path: ['card', 'title', 'visible'], defaultValue: true },
    { key: 'showDescription', label: 'Afficher la description', type: 'boolean' as const, target: 'content' as const, path: ['card', 'description', 'visible'], defaultValue: true },
    { key: 'showButton', label: 'Afficher le bouton', type: 'boolean' as const, target: 'content' as const, path: ['redirection', 'buttonProps', 'visible'], defaultValue: true },
    // Style du bouton (Primary / Secondary)
    {
      key: 'buttonType',
      label: 'Style du bouton',
      type: 'select' as const,
      target: 'content' as const,
      path: ['redirection', 'buttonProps', 'type'],
      defaultValue: 'primary',
      options: [
        { value: 'primary', label: 'Primaire' },
        { value: 'secondary', label: 'Secondaire' },
      ],
    },
    // Image de contenu (URL + position + portrait) — vit dans le contenu.
    { key: 'imageUrl', label: 'Image (URL)', type: 'string' as const, target: 'content' as const, path: ['card', 'image', 'url'], defaultValue: '' },
    {
      key: 'imagePosition',
      label: "Position de l'image",
      type: 'select' as const,
      target: 'content' as const,
      path: ['card', 'image', 'position'],
      defaultValue: 'right',
      options: [
        { value: 'right', label: 'Droite' },
        { value: 'left', label: 'Gauche' },
      ],
    },
    { key: 'imagePortrait', label: 'Image en portrait', type: 'boolean' as const, target: 'content' as const, path: ['card', 'image', 'portrait'], defaultValue: false },
    // Fond de carte apparent (contentFrame) — toggle qui pose une couleur neutre.
    {
      key: 'cardBackground',
      label: 'Fond de carte apparent',
      type: 'boolean' as const,
      target: 'content' as const,
      path: ['card', 'backgroundColor'],
      defaultValue: undefined,
      onValue: '#e1dfdd', // neutralQuaternaryAlt (Fluent)
      offValue: undefined,
    },
    // Glassmorphism (flou) — toggle qui pose une intensité de flou (px).
    {
      key: 'glassmorphism',
      label: 'Glassmorphism (flou)',
      type: 'boolean' as const,
      target: 'content' as const,
      path: ['card', 'glassmorphism'],
      defaultValue: undefined,
      onValue: 8,
      offValue: undefined,
    },
  ],
};
