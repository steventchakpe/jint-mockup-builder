# Analytics & tracking des liens partagés

> Tracking du mode Présentation (US-22/23). Émis **uniquement** depuis le lien
> prospect `/view/{token}` — jamais en édition ni en preview Sales (PRD §6.7).

## Architecture — provider abstrait

Le tracking passe par une interface `AnalyticsProvider` (`src/types/providers.ts`),
sélectionnée par la variable d'env `ANALYTICS_PROVIDER` :

| Valeur | Implémentation | Usage |
|--------|----------------|-------|
| `local` (défaut) | `LocalAnalyticsProvider` — events dans `data/projects/{id}/analytics.json` | dev / démo interne |
| `posthog` | `PosthogAnalyticsProvider` — capture + Query API PostHog | prod |

Fichiers : `src/lib/analytics/{index,local-provider,posthog-provider,posthog-client,visitor-key}.ts`.
Le contrat (`ShareAnalytics`, `GlobalMetrics`) est identique pour les deux → le
dashboard et la vue présentation ne changent pas selon le provider.

## Mode hybride PostHog (server-side + client-side)

Deux flux complémentaires, **sans double comptage** :

1. **Server-side = la vérité des métriques** (ce qui alimente le dashboard)
   - Route `/api/view/{token}/track` → `recordVisit` → capture des events
     `demo_view` / `demo_pageview` / `demo_heartbeat` / `demo_end`.
   - Propriétés : `project_id`, `share_token`, `company`, `page_id`, `page_title`.
   - `distinct_id` = hash(IP+UA) (`visitor-key.ts`) — pas d'IP en clair.
   - **Increvable face aux ad-blockers** (postes corporate prospects).

2. **Client-side = la richesse** (`PosthogReplay.tsx`, monté seulement sur `/view`)
   - `posthog-js` : **session replay** + autocapture + enrichissement (device/géo/referrer).
   - Même `distinct_id` que le server (récupéré via `/api/view/{token}/identify`)
     → un visiteur = une seule personne.
   - Réseau via **reverse-proxy `/jint-relay`** (`next.config.ts`) → anti ad-blocker + masque le domaine PostHog. Chemin volontairement neutre : `/ingest` (défaut PostHog) est sur les blocklists uBlock.

Les requêtes dashboard ne lisent **que** les events `demo_*` (server-side) → l'autocapture
et les `$pageview` du client ne polluent pas les compteurs.

### Dashboard PostHog auto-créé par maquette

Au **premier partage** (`/api/projects/{id}/share`), `ensureDashboard` provisionne
un dashboard PostHog filtré sur `project_id` (3 insights : visiteurs uniques, vues par
page, pages vues) et stocke son URL dans `metadata.json` (`posthogDashboardUrl`,
idempotent). Ouvrable depuis la carte du dashboard.

## Conformité (RGPD / Loi 25)

- Pas d'IP stockée en clair (hash uniquement).
- Session replay : **`maskAllInputs`** activé (on ne capture pas la saisie).
- **Mention légale discrète** dans le footer du lien partagé
  (« Navigation analysée à des fins de démonstration » — `src/app/view/[token]/page.tsx`).

## Configuration

`.env.local` (dev) / env vars de la plateforme (prod) :

```
ANALYTICS_PROVIDER=posthog          # local | posthog
POSTHOG_HOST=https://eu.posthog.com # app host (eu/us) ; l'ingestion eu.i / us.i est dérivée
POSTHOG_PROJECT_API_KEY=phc_…       # capture (publique)
POSTHOG_PERSONAL_API_KEY=phx_…      # Query API + dashboards ; scopes : Query(read), Insight(write), Dashboard(write)
POSTHOG_PROJECT_ID=119943
```

> ⚠️ Le **session replay** doit aussi être activé côté PostHog (Project settings →
> Session Recording) — ce n'est pas piloté par le code.

## ⚠️ Prérequis prod — indépendant de l'analytics

L'analytics PostHog est **prête pour la prod** (service cloud, portable tel quel :
poser les env vars sur la plateforme + `ANALYTICS_PROVIDER=posthog`).

**Le vrai blocage prod est le STOCKAGE**, pas l'analytics. Aujourd'hui
`STORAGE_PROVIDER=local` = filesystem `./data/` → ne fonctionne pas sur serverless
(pas de FS persistant partagé entre instances : maquettes et liens perdus).
Il faut d'abord implémenter un `StorageProvider` cloud (Vercel Blob ou Azure Blob,
commentés dans `src/lib/storage/index.ts`, non codés à ce jour — PRD §7.1).
