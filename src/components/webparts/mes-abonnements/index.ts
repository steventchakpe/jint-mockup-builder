/**
 * « Mes abonnements » = webpart News avec le paramètre my-feed (cf. jintan
 * `news/MyFeed`). On RÉUTILISE le composant News à l'identique ; seule la config
 * diffère (défauts MyFeed + bouton d'abonnement). Voir MesAbonnements.config.ts.
 */
export { News as MesAbonnements } from '@/components/webparts/news';
export { NewsSkeleton as MesAbonnementsSkeleton } from '@/components/webparts/news/News.skeleton';
export { mesAbonnementsDefaultConfig, mesAbonnementsConfigMeta } from './MesAbonnements.config';
