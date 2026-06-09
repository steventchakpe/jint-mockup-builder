import type { NewsConfig } from '@/components/webparts/news';

/**
 * « Mes abonnements » = webpart News avec le paramètre my-feed (jintan
 * `news/MyFeed/MyFeedWebPart` extends NewsBaseWebPart). Rendu News à l'identique.
 * Défauts repris du manifest MyFeedWebPart : newsAmount 6, rounded "normal",
 * shadow "none", customContent (tous flags true), PAS d'épingle (componentCanPinNews=false),
 * + bouton d'abonnement « Choisir mes abonnements ».
 * Layouts MyFeed = layouts News SAUF le carousel (hero, topStory, verticalTiles, feed).
 */
export const mesAbonnementsDefaultConfig: NewsConfig = {
  layout: 'feed',
  newsAmount: 6,
  rounded: 'normal',
  shadow: 'None',
  showPin: false,
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
  subscriptionButton: { show: true, text: 'Choisir mes abonnements' },
};

export const mesAbonnementsConfigMeta = {
  typeId: 'mes-abonnements',
  displayName: 'My feed',
  category: 'actualites',
  wave: 3,
  icon: 'rss',
  description: 'Mes abonnements — News filtré sur les thèmes auxquels l’utilisateur est abonné.',
  configurableProps: [
    {
      key: 'layout',
      label: 'Mise en page',
      type: 'select' as const,
      defaultValue: 'feed',
      // Layouts MyFeed = News sans le carousel.
      options: [
        { value: 'feed', label: 'Feed' },
        { value: 'topStory', label: 'Top Story' },
        { value: 'hero', label: 'Hero' },
        { value: 'verticalTiles', label: 'Tuiles verticales' },
      ],
    },
    { key: 'newsAmount', label: "Nombre d'actualités", type: 'number' as const, defaultValue: 6 },
    {
      key: 'subscriptionButtonText',
      label: 'Texte du bouton d’abonnement',
      type: 'string' as const,
      target: 'config' as const,
      path: ['subscriptionButton', 'text'],
      defaultValue: 'Choisir mes abonnements',
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
    { key: 'showAuthor', label: "Afficher l'auteur", type: 'boolean' as const, path: ['customContent', 'showAuthor'], defaultValue: true },
    { key: 'showDate', label: 'Afficher la date', type: 'boolean' as const, path: ['customContent', 'showDate'], defaultValue: true },
    { key: 'showTags', label: 'Afficher les tags', type: 'boolean' as const, path: ['customContent', 'showTags'], defaultValue: true },
    { key: 'showViewCount', label: 'Afficher les vues', type: 'boolean' as const, path: ['customContent', 'showViewCount'], defaultValue: true },
    { key: 'showLikeCount', label: "Afficher le nombre de j'aime", type: 'boolean' as const, path: ['customContent', 'showLikeCount'], defaultValue: true },
    { key: 'showLikeButton', label: "Afficher le bouton j'aime", type: 'boolean' as const, path: ['customContent', 'showLikeButton'], defaultValue: true },
    { key: 'showShareButton', label: 'Afficher le bouton partager', type: 'boolean' as const, path: ['customContent', 'showShareButton'], defaultValue: true },
  ],
};
