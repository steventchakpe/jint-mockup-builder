# Template Index Card — {filename}

> Fiche générée automatiquement par l'agent `template-analyzer` à partir d'un screenshot de template.
> Ces fiches servent de base de connaissance pour l'IA lors de la génération de nouveaux intranets.

---

## Identification

| Champ | Valeur |
|-------|--------|
| **Fichier source** | `{chemin vers le screenshot}` |
| **Secteur** | `{bancaire \| municipal \| retail-pharmacie \| energie \| assurance \| tech \| sante \| education \| general}` |
| **Type de page** | `{accueil \| espace-perso \| rh \| documentation \| it \| metier \| annuaire}` |
| **Langue** | `{fr \| en \| bilingue}` |
| **Ambiance** | `{corporate-sobre \| moderne-dynamique \| chaleureux-communautaire \| technique-fonctionnel}` |

---

## Layout Analysis

### Structure globale

```
{Représentation ASCII du layout détecté}

Exemple :
┌─────────────────────────────────────┐
│         [navigation-top]            │
├─────────────────────────────────────┤
│         [hero-banner: full-width]   │
├───────────────┬─────────────────────┤
│ [news-feed]   │ [quick-links]       │
│ 2/3 width     │ 1/3 width           │
├───────────────┴─────────────────────┤
│         [events: full-width]        │
└─────────────────────────────────────┘
```

### Sections détectées

| Ordre | Webpart(s) | Layout | Notes |
|-------|-----------|--------|-------|
| 1 | `{type-id}` | `full-width` | {observation} |
| 2 | `{type-id}` + `{type-id}` | `two-col (2/3 + 1/3)` | {observation} |
| 3 | `{type-id}` | `full-width` | {observation} |

---

## Webparts Detected

{Liste de tous les webparts identifiés dans le screenshot avec leur configuration apparente.}

| Webpart | Variant | Items visibles | Observations |
|---------|---------|---------------|-------------|
| `hero-banner` | `with-search` | — | Image de fond corporate, barre de recherche centrée |
| `news-feed` | `grid-3-col` | 3 articles | Avec vignettes, dates, catégories |
| `quick-links` | `icon-list` | 6 liens | Icônes + labels, disposition verticale |
| `...` | ... | ... | ... |

---

## Content Observations

{Ce que l'IA observe sur le type de contenu présent — utile pour calibrer le content-generator.}

| Aspect | Observation |
|--------|-------------|
| **Ton éditorial** | {Ex: "Formel, RH institutionnel" ou "Décontracté, vie d'équipe"} |
| **Types de news** | {Ex: "Nominations, résultats financiers, conformité"} |
| **Types de liens rapides** | {Ex: "Paie, congés, IT support, organigramme"} |
| **Imagerie** | {Ex: "Photos corporate posées" ou "Photos candides d'employés"} |
| **Palette dominante** | {Ex: "Bleu marine + blanc + accents dorés"} |

---

## Design Patterns

{Patterns de design notables qui pourraient être réutilisés.}

- {Ex: "Le hero utilise un gradient overlay sur la photo pour garantir la lisibilité du texte"}
- {Ex: "Les cards news ont un hover effect avec élévation d'ombre"}
- {Ex: "La navigation utilise un mega-menu avec icônes par section"}

---

## Reuse Score

{Évaluation de la réutilisabilité de ce template.}

| Critère | Score (1-5) | Justification |
|---------|-------------|---------------|
| **Polyvalence sectorielle** | {1-5} | {Ce layout fonctionne-t-il pour d'autres secteurs ?} |
| **Complétude** | {1-5} | {Le template couvre-t-il assez de use cases ?} |
| **Qualité visuelle** | {1-5} | {Le design est-il au niveau attendu pour une démo ?} |
| **Score global** | {moyenne} | — |

---

## Tags

`#{secteur}` `#{type-page}` `#{webpart-1}` `#{webpart-2}` `#{ambiance}` `#{langue}`
