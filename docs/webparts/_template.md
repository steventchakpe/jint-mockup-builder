# {Nom du Webpart}

> Template de documentation webpart pour Jint Builder.
> Chaque fichier dans `docs/webparts/` suit cette structure.

---

## Identity

| Champ | Valeur |
|-------|--------|
| **Type ID** | `{kebab-case-unique-id}` (ex: `news`, `employee-directory`) |
| **Nom affiché** | {Nom lisible en français} |
| **Catégorie** | `navigation` · `hero` · `actualités` · `événements` · `liens` · `annuaire` · `documents` · `médias` · `formulaires` · `widgets` · `social` · `layout` |
| **Figma node** | {Lien ou node ID du composant Figma source} |
| **Priorité MVP** | `wave-1` (top 10) · `wave-2` (11-20) · `wave-3` (21-30) |

---

## Purpose

{1-2 phrases décrivant à quoi sert ce webpart dans un intranet et pourquoi un prospect s'y intéresserait.}

---

## Anatomy

{Description des zones du composant. Nommer chaque zone pour référence dans le reste de la doc.}

Exemple de structure :

```
┌──────────────────────────────────────┐
│  [zone: header]                      │
│  Titre + lien "Voir tout"            │
├──────────────────────────────────────┤
│  [zone: content]                     │
│  Grille de cards / liste / média     │
├──────────────────────────────────────┤
│  [zone: footer] (optionnel)          │
│  Pagination / CTA                    │
└──────────────────────────────────────┘
```

---

## Variants

| Variant | Description | Quand l'utiliser |
|---------|-------------|------------------|
| `default` | {description} | {contexte d'usage} |
| `compact` | {description} | {contexte d'usage} |
| `...` | ... | ... |

---

## Props (Configuration)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Titre affiché dans le header |
| `showHeader` | `boolean` | `true` | Affiche/masque la zone header |
| `itemCount` | `number` | `4` | Nombre d'éléments affichés |
| `layout` | `"grid" \| "list"` | `"grid"` | Disposition des éléments |
| `...` | ... | ... | ... |

---

## Content Schema

{Structure des données de contenu que ce webpart consomme.}

```typescript
interface {WebpartName}Content {
  // Exemple pour un news :
  items: Array<{
    title: string          // max 80 caractères
    excerpt: string        // max 160 caractères
    image_url: string      // ratio 16:9, min 600x338px
    author: string
    date: string           // format ISO
    category: string
  }>
}
```

---

## AI Content Rules

> Ces règles guident l'agent `content-generator` pour remplir ce webpart avec du contenu crédible.

### Paramètres d'entrée IA

L'IA reçoit du context projet :

- `prospect.company` — Nom de l'entreprise
- `prospect.sector` — Secteur d'activité
- `prospect.employee_count` — Taille de l'organisation

### Règles de génération

| Champ | Règle |
|-------|-------|
| `title` | {Règle spécifique. Ex: "Utiliser des titres d'actualités RH réalistes liés au secteur. Ne jamais utiliser de lorem ipsum."} |
| `excerpt` | {Règle. Ex: "Résumé de 1-2 phrases, ton professionnel interne, pas marketing."} |
| `image_url` | {Règle. Ex: "Image libre de droits représentant le secteur. Rechercher sur Unsplash via l'API."} |
| `author` | {Règle. Ex: "Prénom + Nom réaliste francophone ou anglophone selon la langue du prospect."} |
| `date` | {Règle. Ex: "Dates dans les 30 derniers jours, espacées de 2-5 jours."} |
| `...` | ... |

### Exemples par secteur

| Secteur | Exemple de contenu généré |
|---------|--------------------------|
| Bancaire | {Exemple concret de titre/contenu pour ce secteur} |
| Municipal | {Exemple concret} |
| Retail / Pharmacie | {Exemple concret} |
| Énergie | {Exemple concret} |

### Contraintes

- Langue : Matcher la langue du prospect (FR par défaut)
- Ton : Interne, professionnel, pas marketing
- Crédibilité : Le contenu doit sembler réel (pas de "Lorem ipsum", pas de "Entreprise XYZ")
- Cohérence : Les dates, noms et références doivent être cohérents entre les webparts d'une même démo

---

## Design Tokens

{Tokens spécifiques à ce webpart, issus du design system Figma.}

| Token | Valeur | Variable CSS/Tailwind |
|-------|--------|-----------------------|
| `border-radius` | `8px` | `rounded-lg` |
| `padding` | `16px` | `p-4` |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1)` | `shadow-sm` |
| `gap` (entre items) | `16px` | `gap-4` |
| `...` | ... | ... |

---

## Responsive Behavior

| Breakpoint | Comportement |
|------------|-------------|
| Desktop (≥1024px) | {Disposition par défaut} |
| Tablet (768-1023px) | {Adaptation} |
| Mobile (<768px) | {Adaptation — P2, hors MVP} |

---

## Usage Guidelines

### Do

- {Bonne pratique d'utilisation}
- {Bonne pratique d'utilisation}

### Don't

- {Anti-pattern à éviter}
- {Anti-pattern à éviter}

---

## Dependencies

- **Composants enfants** : {Liste des sous-composants réutilisés}
- **Icons** : {Set d'icônes utilisé}
- **External** : {API ou service externe requis, si applicable}
