# News Webpart — Spec

**Type:** Component (Webpart)
**Type ID:** `news`
**Wave:** 1 — High priority
**Date:** 2026-03-26

---

## Description

Le webpart **News** affiche un fil d'actualités interne à l'intranet SharePoint. Il présente des articles avec image, titre, auteur, date et statistiques d'engagement. C'est le premier composant vu par le prospect en démo — il doit être visuellement impactant et fidèle pixel-perfect au design Figma.

**Design principle:** Layout-first — la mise en page (Top Story, Hero, Tiles, Carousel) est le facteur de différenciation principal. Le contenu s'adapte à la mise en page, pas l'inverse.

| Level | Component | Rôle | Props |
|-------|-----------|------|-------|
| 1 — Item | `NewsArticleCard` | Rendu d'un article individuel | ~8 |
| 2 — Layout | `NewsTopStory`, `NewsHero`, `NewsTiles`, `NewsCarousel` | Mise en page des articles | ~4 |
| 3 — Composition | `News` | Wrapper principal, dispatch par layout | ~6 |

**Figma component sets:**
- `News` — key `9babcb0b9d846bc4ed6bd0c80c089d2579daa042` (18 variantes)
- `Top story - Items` — key `6da929a95833a016f60a5f829a5836a1b1a17bba` (4 variantes)
- `Hero - Items` — key `44ab33c215f4d6b9d47ebaed1629f89650ca4f19` (3 variantes)

---

## Visual Reference

| | |
|---|---|
| **Closest pattern** | News feed / article list — pattern standard intranet SharePoint |
| **Screenshots** | `● News 🟠` page Figma — screenshot complet des 18 variantes |
| **Composition notes** | Top Story : article featured (large gauche) + liste compacte (droite). Hero : plein-largeur avec overlay. Tiles : grille de cartes égales. Carousel : défilement horizontal. |

---

## Architecture Overview

```
┌─ News (wrapper) ─────────────────────────────────────────────┐
│  config: { layout, format, radius }                          │
│  content: { title?, articles[] }                             │
│                                                              │
│  ┌─ NewsTopStory ──────────────────────────────────────┐    │
│  │  ┌── TopStoryFeatured ────┐ ┌── TopStoryList ──────┐ │   │
│  │  │  Large article card   │ │  2-3 smaller items   │ │   │
│  │  └───────────────────────┘ └──────────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘    │
│                           OR                                 │
│  ┌─ NewsHero ──────────────────────────────────────────┐    │
│  │  ┌── HeroFull (full-width overlay) ───────────────┐  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌── HeroItems (below, 2-3 cards) ────────────────┐  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘    │
│                           OR                                 │
│  ┌─ NewsTiles ─────────────────────────────────────────┐    │
│  │  [card] [card] [card]   (format 3/3)                │    │
│  │  [card-large] [card] [card]  (format 1/2)           │    │
│  └─────────────────────────────────────────────────────┘    │
│                           OR                                 │
│  ┌─ NewsCarousel ──────────────────────────────────────┐    │
│  │  ← [card] [card] [card] [card] →                   │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## Props API

### Config (layout + design)

```typescript
export type NewsLayout = 'top-story' | 'hero' | 'tiles-verticales' | 'carousel';
export type NewsFormat = '3/3' | '1/2' | 'responsive';
export type NewsRadius = 'default' | 'normal' | 'large' | 'none';

export interface NewsConfig {
  /** Mise en page principale — correspond aux variantes Figma */
  layout: NewsLayout;
  /** Format de la grille — nombre et proportion des articles */
  format: NewsFormat;
  /** Arrondis des cards */
  radius: NewsRadius;
  /** Titre optionnel de la section */
  title?: string;
  /** Nombre max d'articles à afficher */
  maxItems?: number; // défaut: 3 pour 3/3, 3 pour 1/2
}
```

### Content Schema

```typescript
export interface NewsArticle {
  /** ID unique de l'article */
  id: string;
  /** Titre de l'article */
  title: string;
  /** Extrait / chapô (optionnel) */
  excerpt?: string;
  /** URL image résolue (blob storage ou Unsplash déjà résolu). Le webpart ne touche pas à l'API Unsplash. */
  imageUrl: string;
  /** Catégorie / tag */
  category?: string;
  /**
   * Auteur pré-résolu par le parent depuis Project.profiles.
   * Le webpart reçoit un snapshot — il ne lit pas le store directement.
   * Le parent maintient la cohérence quand un profil change.
   */
  author: {
    profileId: string;        // pour référence cross-webpart
    name: string;             // prénom + nom
    avatarUrl: string;        // URL avatar déjà résolue
    jobTitle?: string;
  };
  /** Date de publication (ISO string) */
  publishedAt: string;
  /** Temps de lecture estimé en minutes */
  readTimeMinutes?: number;
  /** Statistiques d'engagement (valeurs simulées en démo) */
  engagement?: {
    likes: number;
    comments: number;
    views: number;
  };
  /** ID page article dans le projet (résolution par le router de l'app) */
  articlePageId?: string;
}

export interface NewsContent {
  articles: NewsArticle[];
}
```

### Props du composant React

```typescript
export interface NewsProps {
  config: NewsConfig;
  content: NewsContent;
  /** Mode édition — active overlays d'édition inline */
  isEditMode?: boolean;
  /** Callback quand un article est cliqué (mode Présentation) */
  onArticleClick?: (articleId: string) => void;
}
```

---

## Layouts — Specs visuelles

### Layout: Top Story

```
┌─────────────────────────────────────────────────────────┐
│  TITRE (optionnel)                                      │
├───────────────────────────────┬─────────────────────────┤
│  Article featured (2/3)      │  Liste articles (1/3)   │
│  ┌─────────────────────────┐ │  ┌─────────────────────┐│
│  │      Image hero         │ │  │ [img] Titre art. 2  ││
│  │      (16:9 ratio)       │ │  │       Auteur • Date ││
│  ├─────────────────────────┤ │  ├─────────────────────┤│
│  │ Category                │ │  │ [img] Titre art. 3  ││
│  │ Titre article           │ │  │       Auteur • Date ││
│  │ Auteur • Date           │ │  ├─────────────────────┤│
│  │ ♥ 12  💬 3  👁 56     │ │  │ [img] Titre art. 4  ││
│  └─────────────────────────┘ │  │       Auteur • Date ││
│                              │  └─────────────────────┘│
└──────────────────────────────┴─────────────────────────┘
```

**Figma variants:** Type = "News" / "H - News" / "Hsmall - News" (Top story - Items)

### Layout: Hero

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────┐│
│  │             Image full-width (hero)                 ││
│  │   Category                                          ││
│  │   ████████████ Titre article                        ││
│  │   Auteur • Date                          ← overlay  ││
│  └─────────────────────────────────────────────────────┘│
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│  │ [img] Titre 2 │ │ [img] Titre 3 │ │ [img] Titre 4 │  │
│  │ Auteur • Date │ │ Auteur • Date │ │ Auteur • Date │  │
│  └───────────────┘ └───────────────┘ └───────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Figma variants:** Type = "Top News" / "H - News" / "Hsmall - News" (Hero - Items)

### Layout: Tiles verticales

```
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   Image       │ │   Image       │ │   Image       │
│   (16:9)      │ │   (16:9)      │ │   (16:9)      │
│ Category      │ │ Category      │ │ Category      │
│ Titre article │ │ Titre article │ │ Titre article │
│ Auteur • Date │ │ Auteur • Date │ │ Auteur • Date │
│ ♥ 12  💬 3   │ │ ♥ 8   💬 1   │ │ ♥ 20  💬 5   │
└───────────────┘ └───────────────┘ └───────────────┘
```

Format 3/3 : 3 colonnes égales | Format 1/2 : 1 large (50%) + 2 petites (25% chacune)

### Layout: Carousel

```
← [card] [card] [card] [card] →   (défilement horizontal)
```

Flèches de navigation gauche/droite. Indicateurs de position (dots) en bas.

---

## Design Tokens

### Spacing

| Zone | Token | Classe | Valeur |
|------|-------|--------|--------|
| Padding card | `lg` | `p-lg` | 16px |
| Gap entre cards | `lg` | `gap-lg` | 16px |
| Gap internal card | `sm` | `gap-sm` | 8px |
| Padding avatar-nom | `xs` | `gap-xs` | 4px |
| Gap catégorie-titre | `xs` `sm` | `gap-sm` | 8px |
| Gap titre-auteur | `sm` | `gap-sm` | 8px |

### Colors

| Élément | Classe | Usage |
|---------|--------|-------|
| Fond webpart | `bg-white` | Fond neutre |
| Catégorie tag | `text-sp-primary` | Couleur primaire thème |
| Titre article | `text-sp-darker` | Contraste max |
| Auteur / date | `text-gray-500` | Métadonnées secondaires |
| Overlay hero gradient | `from-black/60 to-transparent` | Lisibilité titre |
| Engagement icons | `text-gray-400` | Discret |
| Titre section | `text-sp-darker` | En-tête webpart |

### Typography

| Élément | Classe | Specs |
|---------|--------|-------|
| Titre article (featured) | `text-heading` | 24px / 32px — Segoe UI |
| Titre article (hero overlay) | `text-heading-lg` | 30px / 36px — Segoe UI |
| Titre article (tile/item) | `text-heading-sm` | 20px / auto — Segoe UI |
| Catégorie / tag | `text-caption font-semibold` | 10px — uppercase |
| Auteur, date | `text-caption` | 10px |
| Extrait / chapô | `text-body` | 14px / 20px |
| Stats engagement | `text-caption` | 10px |
| Titre section | `text-heading-sm` | 20px |

### Radius (selon prop `radius`)

| Valeur prop | Classe | Token |
|-------------|--------|-------|
| `default` | `rounded-md` | 4px — Medium |
| `normal` | `rounded-xl` | 8px — X-Large |
| `large` | `rounded-lg` | 6px — Large |
| `none` | `rounded-none` | 0px |

---

## Known Preferences

None — no applicable learnings (première session).

---

## Component Properties (Figma)

| Property | Type | Default | Contrôle |
|----------|------|---------|----------|
| `Layout` | VARIANT | `Top Story` | Type de mise en page |
| `Format` | VARIANT | `3/3` | Grille (nb colonnes) |
| `Radius` | VARIANT | `Default` | Arrondis des cards |
| `Type` (Top story - Items) | VARIANT | `News` | Style de l'item liste |
| `Type` (Hero - Items) | VARIANT | `Top News` | Style de l'item hero |

---

## Interaction States

| État | Visuel |
|------|--------|
| Default | Base card avec image, titre, auteur |
| Card hovered | `hover:shadow-md cursor-pointer` léger surbrillance |
| Image en erreur | Placeholder gris avec icône image |
| Contenu vide | Skeleton loader (3 cards avec animation pulse) |
| Mode édition | Overlay bleu au hover, icône crayon sur chaque champ éditable |

---

## Reused DS Components

| Composant | Disponible | Usage |
|-----------|------------|-------|
| `News` (COMPONENT_SET) | ✅ Figma key `9babcb0b9d846bc4ed6bd0c80c089d2579daa042` | Composant principal |
| `Top story - Items` | ✅ Figma key `6da929a95833a016f60a5f829a5836a1b1a17bba` | Items liste Top Story |
| `Hero - Items` | ✅ Figma key `44ab33c215f4d6b9d47ebaed1629f89650ca4f19` | Items under Hero |
| `Avatar` | ❓ Pas encore dans le registre | Affichage auteur |
| `Badge/Tag` | ❓ Pas encore dans le registre | Catégorie |

---

## Fichiers à créer

```
src/components/webparts/news/
├── index.ts
├── News.tsx                    ← Wrapper principal, dispatch par layout
├── News.types.ts               ← NewsConfig, NewsContent, NewsArticle, NewsProps
├── News.config.ts              ← Metadata, props par défaut, icône catalogue
├── News.editor.tsx             ← Overlay édition inline (Edit mode)
├── News.skeleton.tsx           ← Skeleton loader
├── News.test.tsx               ← Tests unitaires
├── layouts/
│   ├── NewsTopStory.tsx        ← Layout Top Story
│   ├── NewsHero.tsx            ← Layout Hero
│   ├── NewsTiles.tsx           ← Layout Tiles verticales
│   └── NewsCarousel.tsx        ← Layout Carousel
└── components/
    ├── NewsArticleCard.tsx     ← Card article réutilisable
    ├── NewsArticleItem.tsx     ← Item compact (liste Top Story)
    └── NewsEngagement.tsx      ← Bloc ♥ 💬 👁 (stats)
```

---

## Acceptance Criteria

- [ ] Les 4 layouts (Top Story, Hero, Tiles, Carousel) sont rendus correctement
- [ ] Les 3 formats de grille (3/3, 1/2, Responsive) fonctionnent en mode Tiles et Top Story
- [ ] Les 4 valeurs de radius s'appliquent à toutes les cards
- [ ] Zéro couleur hex hardcodée — uniquement `sp-*` et Tailwind neutres
- [ ] Zéro valeur spacing hardcodée — uniquement classes token (`p-lg`, `gap-md`)
- [ ] Les articles référencent les profils par `authorProfileId`, pas de données inline
- [ ] Le composant accepte `config` + `content` en props, ne fetch pas ses données
- [ ] Mode édition : clic sur titre → edit inline ; clic sur image → remplacement
- [ ] Skeleton loader affiché quand `content.articles` est vide
- [ ] Error boundary : si un article est invalide, les autres continuent de s'afficher
- [ ] Test : render sans crash avec props par défaut
- [ ] Test : render des 4 layouts
- [ ] Test : contenu vide → skeleton visible
- [ ] Changement de couleur primaire → toutes les catégories se mettent à jour en < 100ms

---

## Décisions de conception — Réponses aux open questions

| # | Question | Décision |
|---|----------|----------|
| 1 | **Avatar** | `<img className="rounded-full">` standard. Avatar URL + nom résolus depuis `Project.profiles` par `authorProfileId`. Pas de composant Figma dédié pour cet usage. |
| 2 | **Carousel** | CSS scroll snap natif + flèches custom. Zéro dépendance externe. |
| 3 | **Images** | Le webpart reçoit `imageUrl` déjà résolue dans les props `content`. Il ne touche jamais à l'API Unsplash — c'est le content generator / image picker qui gère ça en amont. |
| 4 | **Format Responsive** | Container query sur la largeur du webpart (`@container`). Le webpart prend toute la largeur disponible de sa zone de section (1 col = pleine largeur, 2 col = 50%, etc.). |
| 5 | **Clic article** | Géré dans `News.tsx` via `isEditMode` : Edit mode → clic sélectionne/édite le webpart. Présentation mode → clic navigue vers la page article via `onArticleClick`. |

## Open Questions

Aucune — toutes les questions ont été résolues.
