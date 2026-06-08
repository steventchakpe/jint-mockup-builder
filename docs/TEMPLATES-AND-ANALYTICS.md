# Templates & Analytiques — Spécifications

> Décisions Steven (2026-06-08). Deux features cadrées ici :
> 1. **Maquette → Template** + menu « Templates »
> 2. Menu **« Analytiques »** (dashboard global depuis PostHog)
>
> Voir aussi : [AI-GENERATION.md](./AI-GENERATION.md) §6, [ANALYTICS.md](./ANALYTICS.md).

---

## 1. Feature « Maquette → Template »

### 1.1 Décisions actées

| Point | Décision |
|-------|----------|
| **Nature** | **Copie figée (snapshot)** — le template est une copie indépendante au moment de la déclaration. Éditer la maquette d'origine ensuite **n'affecte pas** le template, et inversement. |
| **Contenu conservé** | **Tout** — branding (logo, couleurs, nom), contenu, profils, pages. Le template est un **point de départ pré-rempli** qu'on adapte ensuite. |
| **Portée** | **Bibliothèque partagée** — tous les utilisateurs (Sales/CSM/Designers) voient et réutilisent les templates déclarés. |
| **Déclaration** | Action **« Déclarer comme template »** dans le menu de la carte au dashboard (à côté de Dupliquer / Supprimer / Copier le lien). |
| **Utilisation** | À la création d'un nouveau projet : **3e choix « Partir d'un template »** (à côté de Vierge / IA) → galerie des templates → sélection → nouveau projet pré-rempli. |

### 1.2 ⚠️ Garde-fou branding

Le template garde **tout** le branding du prospect d'origine. Risque : créer une démo
pour un prospect B en partant d'un template issu du prospect A et **oublier de rebrander**
(logo/couleurs/nom de A livrés à B). Mitigation à implémenter :
- À la création depuis template : **bannière de rappel** « Ce template contient le branding
  de {entreprise d'origine} — pense à le remplacer » + accès direct au panneau Thème.
- (Option à valider plus tard) proposer un « nettoyage branding en 1 clic » non bloquant.

### 1.3 Modèle de données

Un template = **snapshot d'un `ProjectState`** + métadonnées, stocké via le `StorageProvider`
abstrait (mirroir des projets, mais **non scopé utilisateur** car partagé).

```
templates/                          ← bibliothèque partagée (à côté de projects/)
└── {template-id}/
    ├── template.json               ← ProjectState figé (copie au moment de la déclaration)
    │                                  + images embarquées/référencées
    ├── images/                     ← copie des images du projet source (logo, uploads)
    └── meta.json                   ← TemplateMeta (voir ci-dessous)
```

```ts
interface TemplateMeta {
  id: string;
  name: string;                 // nom du template (défaut = nom de la maquette source)
  sourceProjectId: string;      // traçabilité (la maquette d'origine peut être supprimée)
  sourceCompany: string;        // entreprise d'origine (pour le garde-fou branding)
  declaredBy: string;           // email de l'auteur de la déclaration
  declaredAt: string;           // ISO
  thumbnailUrl: string | null;  // miniature (réutilise le screenshot de carte si dispo)
  // tags optionnels pour filtrer la galerie (alignés sur la KB IA quand figée) :
  sector?: string | null;
}
```

### 1.4 Extensions `StorageProvider`

```ts
// Déclarer une maquette comme template (snapshot complet, copie images incluse)
declareTemplate(projectId: string, name?: string): Promise<string>;   // → templateId
listTemplates(): Promise<TemplateMeta[]>;                              // partagé, tous users
createProjectFromTemplate(templateId: string, newName: string): Promise<string>; // → projectId
deleteTemplate(templateId: string): Promise<void>;
```

- `declareTemplate` = `loadProject` + copie profonde (json + images) sous `templates/{id}/`.
- `createProjectFromTemplate` = comme `duplicateProject` mais source = template → nouveau `projectId`,
  nouveau `share-token` non généré tant que pas partagé, `metadata` réinitialisée (auteur/dates).
- Implémenter dans `LocalStorageProvider` maintenant ; `AzureBlobProvider` plus tard (même contrat).

### 1.5 UI

- **Dashboard** : item « Déclarer comme template » dans le menu `…` de chaque carte de maquette.
  → modal (confirmer le nom du template) → toast « Template créé ».
- **Nouveau projet** : l'écran de choix de mode passe de 2 à **3 options** :
  `Vierge` · `IA (formulaire)` · `Partir d'un template`.
  → « Partir d'un template » ouvre une **galerie** (cards : miniature, nom, entreprise d'origine,
  auteur, date) avec recherche/filtre. Sélection → modal nom du nouveau projet → ouverture en édition
  + bannière garde-fou branding.
- **Gestion** : un template se supprime depuis la galerie (menu `…`). Pas d'édition d'un template
  en place (snapshot figé) — pour le modifier, on crée un projet depuis lui, on ajuste, on re-déclare.

### 1.6 Template modifiable par l'IA (décision Steven 2026-06-08)

En plus de la duplication brute, **partir d'un template peut passer par l'IA** : on renseigne
des **paramètres** (comme à la création IA, voir AI-GENERATION.md §2), et l'IA **met à jour le
template** pour le nouveau prospect au lieu de générer de zéro.

- **Différence avec la génération from-scratch** : la **structure du template est conservée**
  (pages, sections, layouts, choix de webparts = l'expertise design figée). L'IA ne ré-invente
  pas le layout — elle **re-brande + régénère le contenu** dans ce squelette.
- **Ce que l'IA met à jour à partir du brief** : branding (couleurs → palette, logo, font, nom),
  contenu de chaque webpart **selon le `pageType` de la page** où il se trouve, profils, articles,
  images Unsplash, news depuis le lien d'actus fourni. → règle d'or : **garder la structure du
  template, remplacer la matière.**
- **Garde-fou branding (§1.2)** : levé automatiquement dans ce flux puisque l'IA rebrande pour
  le nouveau prospect.

**Deux modes de réutilisation d'un template**, donc :
1. **Copie simple** — duplication brute (branding/contenu d'origine conservés, on adapte à la main).
2. **Adaptation IA** — brief renseigné → l'IA met à jour le template pour le nouveau prospect
   (structure gardée, contenu/branding régénérés).

Le brief d'adaptation IA réutilise les mêmes champs que la création IA (AI-GENERATION.md §2),
**sauf** « pages attendues » : les pages viennent du template (modifiables ensuite à la main).

### 1.7 Distinction avec la knowledge base IA

À ne pas confondre (voir AI-GENERATION.md §4) :
- **Template (ici)** = vraie maquette réutilisable (un `ProjectState` complet dupliqué).
- **Knowledge base IA** = captures PNG → index cards texte, **inspiration de layout** pour l'IA,
  jamais un état réutilisable.

---

## 2. Feature « Menu Analytiques »

### 2.1 Décisions actées

| Point | Décision |
|-------|----------|
| **Portée** | **Global agrégé uniquement** — un seul dashboard d'ensemble, toutes maquettes partagées confondues. (Le détail par maquette reste sur la **carte du dashboard**, déjà en place — « stats au dos de la carte ».) |
| **Familles de métriques** | **Consultation** + **Engagement**. (Performance commerciale et Insights design **écartés** pour l'instant.) |
| **Source** | `AnalyticsProvider` abstrait (`local` \| `posthog`) — déjà en place, voir ANALYTICS.md. |
| **Audience** | Sales, CSM, Designers. |

### 2.2 Métriques du dashboard global

**Consultation** (« le prospect a-t-il ouvert les démos ? ») :
- Total de vues (toutes maquettes partagées)
- Visiteurs uniques
- Nombre de liens partagés actifs
- Dernière consultation, tous projets confondus (date + entreprise)
- (Tendance) vues sur les 30 derniers jours

**Engagement** (« à quel point ils ont creusé ? ») :
- Durée moyenne de session (global)
- Pages vues par session (moyenne / profondeur de navigation)
- Pages les plus consultées (agrégées toutes maquettes)

> Note : tout est **agrégé**. Le « ma démo à moi a-t-elle été ouverte » (par maquette) n'est
> **pas** dans ce menu — il vit sur la carte de la maquette au dashboard.

### 2.3 Modèle de données — extension `GlobalMetrics`

Le `GlobalMetrics` actuel est minimal (`totalViews`, `lastView`). À étendre :

```ts
interface GlobalMetrics {
  // existant
  totalViews: number;
  lastView: { at: string | null; company: string | null };
  // ajout — Consultation
  uniqueVisitors: number;
  activeSharedLinks: number;
  viewsLast30Days: { date: string; views: number }[];   // série pour mini-graph
  // ajout — Engagement
  avgSessionSeconds: number;
  avgPagesPerSession: number;
  topPages: { title: string; views: number }[];          // agrégé toutes maquettes
}
```

- Les events bruts existent déjà (`view` / `pageview` / `heartbeat` / `end`) → l'engagement
  est calculable sans nouveau tracking.
- `local` : agrégation des `analytics.json` de tous les projets.
- `posthog` : requêtes Query API (mode hybride déjà en place).

### 2.4 UI

- Nouvelle entrée **« Analytiques »** dans la navigation de l'app (au niveau du dashboard,
  pas dans l'éditeur). Place exacte dans la nav : à caler.
- Layout : ligne de **KPIs** (Consultation) + section **Engagement** (durée, pages/session,
  top pages) + mini-graph vues 30 jours. Réutiliser le style des cards dashboard.
- Vide gracieux : si aucune maquette partagée, message « Partage une démo pour voir des
  statistiques ici ».

### 2.5 Hors périmètre (pour mémoire)

Écartés à ce stade (réactivables plus tard) :
- **Performance commerciale** : taux d'ouverture des liens, délai envoi → 1ère consultation,
  comparaison entre maquettes.
- **Insights design** : webparts / templates les plus consultés à travers les démos.
