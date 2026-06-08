import type { NextConfig } from 'next';

/**
 * Reverse-proxy PostHog (`/ingest/*`) — contourne les ad-blockers et masque le
 * domaine PostHog côté prospect. Le client posthog-js pointe sur `/ingest`.
 * Dérive la région depuis POSTHOG_HOST (eu/us) ; défaut eu.
 */
const appHost = (process.env.POSTHOG_HOST || 'https://eu.posthog.com').replace(/\/$/, '');
const region = /us\.posthog\.com/.test(appHost) ? 'us' : 'eu';
const ingestionHost = `https://${region}.i.posthog.com`;
const assetsHost = `https://${region}-assets.i.posthog.com`;

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      // Chemin neutre (pas `/ingest`, qui est le défaut PostHog → sur les blocklists).
      { source: '/jint-relay/static/:path*', destination: `${assetsHost}/static/:path*` },
      { source: '/jint-relay/:path*', destination: `${ingestionHost}/:path*` },
    ];
  },
  // posthog-js envoie un trailing slash sur certains endpoints du proxy.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
