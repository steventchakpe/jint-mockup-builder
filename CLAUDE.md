# CLAUDE.md — Jint Builder

Jint Builder is an AI-first web app that generates interactive SharePoint intranet demos. Sales/CSM/partners create pixel-perfect, navigable demo sites branded for prospects.

## Tech stack

Next.js + React · Tailwind + shadcn/ui + SharePoint theme · Zustand · Claude API · Réplication depuis `jintan` (code Mozzaik/Jint existant)

## Architecture

Two input modes (AI chat + sidebar), one state. Every modification updates the same `Project` state. The canvas re-renders from this state. Never create separate state paths.

## IMPORTANT — Critical rules

1. **Source de vérité = code jintan (réplication conforme OBLIGATOIRE)** — Pour TOUT webpart, la source de vérité est le code existant du monorepo `jintan` (`~/Projets/jintan`). On réplique **à l'identique** : structure DOM, flex/responsive, gaps/paddings, radius, tailles de police, poids, couleurs, ombres, défauts du manifest. **Rien d'approximatif.**
   - Webparts à vrai code local : `jintan/deprecated/oldparts/src/layouts/{wp}/*.tsx`.
   - Webparts "wrapper" (`<X Layout {...props}/>`) : la source réelle est le package compilé `node_modules/.bun/@mozzaik365+components@*/.../dist/{wp}.js` (lisible) + `.d.ts` pour les types.
   - Primitives visuelles (`Text`, `Tag`, `StyledButton`, `Elevation`, fonts) : `node_modules/.bun/@mozzaik365+mozzaik-ui@*/.../dist` — porter token par token.
   - Défauts du webpart : `preconfiguredEntries` du `*.manifest.json` ; mappings selection→px (height S=208/M=416/L=832, radius pill=12/rounded=8/semiRounded=4) dans `@mozzaik365/components/dist/layouts`.
   - **Figma n'est plus utilisé** dans le process. `jintan` est la seule source.

2. **Sauvegarde manuelle** — "Sauvegarder" button, no auto-save. Store has `isDirty` flag. Warn on unsaved quit.

3. **PostHog tracking** — Only on shared links (`/view/{token}`), never in Edit mode.

4. **Mode Présentation ≠ Édition** — Shared link = read-only strict (no edit access). Sales edits via `/edit/{id}`, can preview via button (invisible easter egg to return).

5. **Never hardcode colors** — Use `sp-*` Tailwind classes or `var(--sp-theme-*)`. Never hex values.

6. **Use token classes** — `text-body`, `gap-md`, `p-lg`, `rounded-sm` (4=xs, 8=sm, 12=md, 16=lg…) — NEVER Tailwind defaults (`text-sm`, `gap-3`, `p-4`). Exception: structural utilities (flex, grid, hidden, w-full) + valeurs dynamiques en inline style (height, radius, flex-basis).

7. **Never modify `generateThemePalette.ts`** — Frozen. Tested port of Fluent UI.

8. **`tokens.ts`** — Tokens du DS (spacing, typography, radius). Valeurs alignées sur jintan/Fluent.

9. **SVG icons must come from jintan** — Never approximate or hand-write icon paths. Extraire le SVG exact depuis `@fluentui/react-icons` dans jintan (`createFluentIcon('XRegular', "1em", ["M…"])`, viewBox 20×20) — voir `docs/WEBPART-PORTING.md` §2.7.

## Theme palette — 9 slots

`bg-sp-primary` · `bg-sp-lighter-alt` · `bg-sp-lighter` · `bg-sp-light` · `bg-sp-tertiary` · `bg-sp-secondary` · `bg-sp-dark-alt` · `bg-sp-dark` · `bg-sp-darker`

Quick ref: primary button = `bg-sp-primary hover:bg-sp-dark-alt active:bg-sp-dark` · link = `text-sp-primary` · subtle bg = `bg-sp-lighter-alt` · dark header = `bg-sp-darker text-white`

## Webpart workflow (réplication depuis jintan)

1. Localiser la source dans `jintan` : layout local `.tsx` OU bundle compilé `dist/{wp}.js` si wrapper.
2. Lire les **défauts** dans le `*.manifest.json` (`preconfiguredEntries`) + les mappings selection→px.
3. Porter les **primitives** nécessaires depuis `@mozzaik365/mozzaik-ui/dist` (Text/Tag/Button/Elevation/fonts) — valeurs exactes.
4. Répliquer le composant : 1 dossier par webpart, props `config`+`content` typées, structure/responsive/valeurs **identiques** à jintan.
5. Register dans `src/config/webpart-registry.ts` (1 ligne).
6. Vérifier visuellement (page démo + screenshot) contre le rendu jintan.

## Content rules

- NEVER lorem ipsum — realistic sector-appropriate content
- Names from 20 editable profiles (referenced by ID, culturally appropriate)
- Dates within last 30 days, spaced 2-5 days apart
- Images via Unsplash search queries (not URLs)
- Cross-webpart coherence (same company, people, events)

## Coding conventions

- TypeScript strict, max 200 lines/file
- Components: PascalCase, one per file
- Webparts receive `config` + `content` as props, never fetch own data
- French comments OK, English identifiers

## Key references

See @docs/PRD.md for full product requirements
See @skills/sharepoint-theme/SKILL.md for theme system details and slot cheat sheet
See @skills/content-rules/SKILL.md for sector-specific content rules
See @skills/webpart-spec/SKILL.md for webpart documentation format
See @docs/WEBPART-PORTING.md for the jintan → React porting method
See @agents/webpart-porter.md for the webpart porting workflow
See @agents/content-generator.md for content generation workflow
See @agents/theme-builder.md for brand detection workflow
