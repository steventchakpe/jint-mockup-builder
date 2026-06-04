import type { NewsConfig } from './News.types';

/**
 * Défauts repris du manifest News Gallery (preconfiguredEntries) :
 * layout TopStory, newsAmount 6, rounded "normal", shadow "none",
 * showPin true, customContent (tous les flags à true).
 * Pas de hauteur : la hauteur dépend des actualités (on règle le NOMBRE d'actus).
 */
export const newsDefaultConfig: NewsConfig = {
  layout: 'topStory',
  newsAmount: 6,
  rounded: 'normal',
  shadow: 'None',
  showPin: true,
  title: '',
  customContent: {
    showViewCount: true,
    showLikeCount: true,
    showLikeButton: true,
    showShareButton: true,
    showTags: true,
    showDate: true,
    showAuthor: true,
  },
};

export const newsConfigMeta = {
  typeId: 'news',
  displayName: 'Actualités',
  category: 'actualites',
  wave: 1,
  icon: 'newspaper',
  description: "Fil d'actualités (News Gallery) — réplique jintan, plusieurs mises en page.",
  configurableProps: [
    {
      key: 'layout',
      label: 'Mise en page',
      type: 'select' as const,
      defaultValue: 'topStory',
      // Layouts portés progressivement depuis jintan.
      options: [{ value: 'topStory', label: 'Top Story' }],
    },
    {
      key: 'newsAmount',
      label: "Nombre d'actualités",
      type: 'number' as const,
      defaultValue: 6,
    },
    {
      key: 'rounded',
      label: 'Arrondis',
      type: 'select' as const,
      defaultValue: 'normal',
      options: [
        { value: 'none', label: 'Aucun' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Grand' },
      ],
    },
    {
      key: 'shadow',
      label: 'Ombre',
      type: 'select' as const,
      defaultValue: 'None',
      options: [
        { value: 'None', label: 'Aucune' },
        { value: 'Light', label: 'Légère' },
        { value: 'Medium', label: 'Moyenne' },
        { value: 'Strong', label: 'Forte' },
      ],
    },
    // customContent — toggles d'affichage (fidèles au manifest jintan).
    { key: 'showAuthor', label: "Afficher l'auteur", type: 'boolean' as const, path: ['customContent', 'showAuthor'], defaultValue: true },
    { key: 'showDate', label: 'Afficher la date', type: 'boolean' as const, path: ['customContent', 'showDate'], defaultValue: true },
    { key: 'showTags', label: 'Afficher les tags', type: 'boolean' as const, path: ['customContent', 'showTags'], defaultValue: true },
    { key: 'showViewCount', label: 'Afficher les vues', type: 'boolean' as const, path: ['customContent', 'showViewCount'], defaultValue: true },
    { key: 'showLikeCount', label: "Afficher le nombre de j'aime", type: 'boolean' as const, path: ['customContent', 'showLikeCount'], defaultValue: true },
    { key: 'showLikeButton', label: "Afficher le bouton j'aime", type: 'boolean' as const, path: ['customContent', 'showLikeButton'], defaultValue: true },
    { key: 'showShareButton', label: 'Afficher le bouton partager', type: 'boolean' as const, path: ['customContent', 'showShareButton'], defaultValue: true },
    { key: 'showPin', label: 'Afficher les épingles', type: 'boolean' as const, defaultValue: true },
  ],
};
