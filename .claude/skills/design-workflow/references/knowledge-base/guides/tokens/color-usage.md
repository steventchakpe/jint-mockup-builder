# Color Usage Guide

## System

Colors follow a two-layer system:
1. **Theme colors (`sp-*`)** — 9 dynamic slots generated from a single primary hex by `generateThemePalette.ts`. Applied via Tailwind CSS vars.
2. **Semantic/neutral colors** — Not yet extracted (linked library). Use Tailwind defaults for now.

## SharePoint Theme Slots (sp-*)

| Class | CSS Var | Usage |
|-------|---------|-------|
| `bg-sp-primary` / `text-sp-primary` | `--sp-theme-primary` | Primary actions, links, selected states |
| `bg-sp-lighter-alt` | `--sp-theme-lighter-alt` | Subtlest tinted background |
| `bg-sp-lighter` | `--sp-theme-lighter` | Hover backgrounds |
| `bg-sp-light` | `--sp-theme-light` | Subtle fills, disabled states |
| `bg-sp-tertiary` | `--sp-theme-tertiary` | Secondary indicators, progress |
| `bg-sp-secondary` | `--sp-theme-secondary` | Secondary buttons |
| `bg-sp-dark-alt` | `--sp-theme-dark-alt` | Hover on primary button |
| `bg-sp-dark` | `--sp-theme-dark` | Active/pressed states |
| `bg-sp-darker` / `text-sp-darker` | `--sp-theme-darker` | Dark headers, high-contrast text |

## Decision Tree

```
Need a color?
├── Is it an action/link/selected state? → bg-sp-primary / text-sp-primary
├── Is it a button hover? → hover:bg-sp-dark-alt
├── Is it a button active/pressed? → active:bg-sp-dark
├── Is it a dark header background? → bg-sp-darker text-white
├── Is it a subtle page background tint? → bg-sp-lighter-alt
├── Is it a card hover? → hover:bg-sp-lighter
├── Is it a tag/badge/indicator? → bg-sp-tertiary
├── Is it a secondary button? → bg-sp-secondary
└── Is it a neutral (gray, white, black)? → Use Tailwind: gray-*, white, black
```

## Rules

- **NEVER hardcode hex values** in components
- **NEVER use Tailwind color defaults** (blue-500, indigo-600) for brand colors
- Always use `sp-*` classes for anything brand-colored
- For text on dark backgrounds: always `text-white`, never `text-sp-lighter-alt`
