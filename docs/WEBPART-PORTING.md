# Méthode de portage des webparts (jintan → Jint Builder)

> **Règle fondatrice** : `jintan` est la source de vérité. On **réplique à l'identique**, rien d'approximatif. Voir CLAUDE.md règle #1.

Cette méthode a été validée sur **News, Events, Focus**. Elle est reproductible pour tous les webparts.

---

## 1. Localiser la source dans `jintan` (`~/Projets/jintan`)

Deux cas :

| Cas | Où | Comment reconnaître |
|-----|----|----|
| **Code local** | `jintan/deprecated/oldparts/src/layouts/{wp}/*.tsx` (+ `.styles.ts`, `.tokens.ts`) | Le `.tsx` contient du vrai JSX/styles |
| **Wrapper package** | bundle compilé `jintan/node_modules/.bun/@mozzaik365+components@*/.../dist/{wp}.js` (+ `.d.ts`) | Le `.tsx` local fait ~8 lignes : `<XLayout {...props}/>` |

Pour savoir : ouvrir `layouts/{wp}/*.tsx`. S'il importe `@mozzaik365/components/{wp}` → c'est un wrapper, la source réelle est le **bundle compilé** (lisible, JSX transpilé en `_jsx`).

Les **primitives visuelles** (`Text`, `Tag`, `StyledButton`, `Icon`, `Elevation`, fonts) vivent dans `@mozzaik365/mozzaik-ui/dist` — à porter token par token.

---

## 2. Extraire les valeurs exactes (checklist)

1. **Défauts** : `{wp}.manifest.json` → `preconfiguredEntries[0].properties`.
2. **Mappings selection → px** dans `@mozzaik365/components/dist/layouts` :
   - Hauteurs : `StandardLayoutHeight` S=**208** · M=**416** · L=**832**
   - Radius : `StandardRadius` semiRounded=**4** · rounded=**8** · pill=**12**
3. **Structure & constantes** : le bundle `{wp}.js` (gaps, paddings, flex, flex-basis, breakpoints…).
4. **Typo** (`mozzaik-ui` Text) : `FontSizes` MetaData=12 · BodyText=14 · SubjectTitle=16 · Header=18 · PaneHeader=20 · PageTitle=28… `FontWeights` Regular=400 · Semibold=600 · Bold=700.
5. **Couleurs** (`mozzaik-ui` ThemeProvider `semanticColors`) — mapper sur nos slots :
   - `themePrimary` → `bg-sp-primary` / `text-sp-primary`
   - `themeLighterAlt` → `sp-lighter-alt` · `themeDarkAlt` → `sp-dark-alt` · `themeDarker` → `sp-darker`
   - **Neutres Fluent (fixes, hors thème)** : neutralDark `#201f1e` · neutralPrimary `#323130` · neutralSecondary `#605e5c` · neutralTertiary `#a19f9d` · neutralLighter `#f3f2f1`
   - `bodyText = neutralPrimary` · `elevation = black`
6. **Ombre** (`getElevation`) : depth16=4. `boxShadow = "0 (0.3·d)px (0.9·d)px α1, 0 (1.6·d)px (3.6·d)px α2"`.
   α par intensité : Light 7/5 · Medium 12/10 · Strong 17/15. → Strong = `0 1.2px 3.6px rgba(0,0,0,.17), 0 6.4px 14.4px rgba(0,0,0,.15)`.
7. **Icônes** : `@fluentui/react-icons` (`bundleIcon(XFilled, XRegular)`). Extraire le **path SVG exact** (`createFluentIcon('XRegular', "1em", ["M…"])`, viewBox 20×20). Ne jamais redessiner à la main.

---

## 3. Répliquer (structure de fichiers)

```
src/components/webparts/{type-id}/
├── {Wp}.types.ts        — config (visuel) + content + props
├── {Wp}.config.ts       — defaultConfig (= défauts manifest) + configMeta
├── {Wp}.mozzaik.ts      — constantes extraites, SOURCES CITÉES (gaps, neutres, shadow, font sizes)
├── {Wp}.icons.tsx       — SVG Fluent exacts (si icônes)
├── {Wp}.tsx             — composant principal (layout)
├── components/…         — sous-composants fidèles (card, etc.)
├── hooks/…              — si logique (ex: useElementSize pour lignes dynamiques)
├── {Wp}.skeleton.tsx    — skeleton (même structure)
├── {Wp}.editor.tsx      — overlay édition inline
├── {Wp}.test.tsx        — tests (render, props, variants)
└── index.ts             — exports
```
+ **1 ligne** dans `src/config/webpart-registry.ts`.
+ page démo temporaire `src/app/{wp}-demo/page.tsx` pour vérif visuelle.

### Règles de réplication
- **Valeurs structurelles** (px, gaps, flex, radius, breakpoints) : classes tokens si correspondance exacte (16=lg, 12=md, 8=sm, 4=xs), sinon **inline style** avec la valeur exacte (height, flex-basis calc, radius dynamique…).
- **Couleurs thème** → toujours via `sp-*` (re-theming marque prospect). **Ne jamais figer une couleur de thème en dur.**
- **Neutres Fluent** → constantes dans `{Wp}.mozzaik.ts` (fixes, indépendants du thème).
- **Responsive** : reproduire les breakpoints du `GridCarousel`/layout via container queries `@container` + `@[Npx]:`.
- `config` + `content` en props. Zéro service/fetch. Profils référencés par ID.

---

## 4. Vérifier

1. `npx tsc --noEmit` → 0 erreur sur les fichiers du webpart + registry.
2. Page démo + screenshot (`npx capture-website-cli http://localhost:3000/{wp}-demo --output=/tmp/x.png --width=1440 --delay=3`).
3. Si dispo : comparer à une **capture du rendu jintan réel** (jintan est SPFx, non lançable en local) et aligner au pixel.

---

## 5. Pièges rencontrés

- Le **manifest** peut déclarer des props **non utilisées** par le layout (ex: `tag.type:"Primary"` ignoré, le code force `Secondary`). → Toujours suivre le **code de rendu**, pas seulement le manifest.
- `onRedirect`/handlers ne se passent pas d'un Server Component à un Client Component Next → fallback `<a>`/laisser undefined dans les pages démo.
- Beaucoup de couleurs sont **runtime theme** (`semanticColors`) : les mapper sur `sp-*` (thème) ou neutres Fluent (fixes), pas inventer.
