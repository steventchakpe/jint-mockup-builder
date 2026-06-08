import type { AnalyticsProvider } from '@/types/providers';
import { LocalAnalyticsProvider } from './local-provider';
import { PosthogAnalyticsProvider } from './posthog-provider';

/**
 * Provider d'analytics selon l'env.
 *
 * ANALYTICS_PROVIDER=local   → LocalAnalyticsProvider (self-hosted, filesystem)
 * ANALYTICS_PROVIDER=posthog → PosthogAnalyticsProvider (capture + Query API)
 *
 * Fallback sur local si PostHog est demandé mais mal configuré (ne casse pas la démo).
 */
export function createAnalyticsProvider(): AnalyticsProvider {
  const provider = process.env.ANALYTICS_PROVIDER || 'local';
  if (provider === 'posthog') {
    try {
      return new PosthogAnalyticsProvider();
    } catch (e) {
      console.warn(`[analytics] PostHog indisponible, fallback local : ${(e as Error).message}`);
      return new LocalAnalyticsProvider();
    }
  }
  return new LocalAnalyticsProvider();
}
