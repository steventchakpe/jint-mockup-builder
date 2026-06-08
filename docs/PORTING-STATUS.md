# État d'avancement & roadmap — Jint Builder

_Mis à jour : 2026-06-08 (vérif code réelle). Voir la méthode dans [WEBPART-PORTING.md](./WEBPART-PORTING.md)._

> **Webparts : 20 faits / 31.** Vérifié dans `src/components/webparts/` : 11 dossiers
> sont encore des stubs (`index.ts` "not generated yet"). Voir tableaux ci-dessous.
> IA (Phase 3) : voir [AI-GENERATION.md](./AI-GENERATION.md) — génération par formulaire, pas de chat.

## Légende disponibilité source jintan
- 🟢 **package** : module compilé dispo (`@mozzaik365/components/dist/{x}`)
- 🔵 **local** : vrai `.tsx` dans `oldparts/src/layouts/{x}`
- 🔴 **absent** : pas dans jintan → **EN ATTENTE. On n'invente rien**, aucune fabrication. Décision ultérieure de Steven.
- ⚪ **natif SP** : composant SharePoint natif simple → build direct

## Statut : ✅ codé · 🟡 stub · ⬜ à faire

---

## Webparts (31)

### Wave 1 — High-impact démo
| # | Webpart | Statut | Source jintan |
|---|---------|--------|---------------|
| 1 | News | ✅ | 🔵 local `news` |
| 2 | Focus | ✅ | 🟢 `focus` (focusV2) |
| 3 | Events | ✅ | 🟢 `events` |
| 4 | Employee directory (Trombinoscope) | ✅ A+B | 🔵 `whoiswho/classic` (mzkWhoIsWho). Annuaire + recherche + fiche profil détaillée (organigramme statique, zoom/pan en option) |
| 5 | Search | ✅ | 🔵 `searchBox` (mzkSearchBox) — bannière glassmorphism/classic |
| 6 | Newcomers | ✅ | 🟢 `people` mode `Newcomers` (composant partagé) |
| 7 | Anniversary | ✅ | 🟢 `people` mode `Anniversaries` (anniversaires pro, même composant) |
| 8 | Separator | ✅ | 🟢 `separator` |

### Wave 2 — Productivité & engagement
| # | Webpart | Statut | Source jintan |
|---|---------|--------|---------------|
| 9 | My apps | ✅ | 🟢 `links` mode myApps |
| 10 | Org chart | ✅ | 🟢 `organization-chart` |
| 11 | Profile | ✅ | 🟢 `profile` |
| 12 | Newshub | ✅ | 🟢 `news-hub` |
| 13 | My tasks | ✅ | 🟢 `my-tasks` |
| 14 | Docs | ✅ | 🟢 `my-files` / `file-explorer` |
| 15 | My emails | ✅ | 🟢 `my-emails` |
| 16 | My meetings | ✅ | 🟢 `my-meetings` |
| 17 | Viva engage | 🟡 stub | 🔴 absent → **modèle requis** |
| 18 | Text | 🟡 stub | ⚪ natif SP → **modèle requis** |

### Wave 3 — Compléments & widgets
| # | Webpart | Statut | Source jintan |
|---|---------|--------|---------------|
| 19 | News V2 | 🟡 stub | 🟢 `news-feed` (package) → **portable** |
| 20 | Focus V3 | 🟡 stub | 🟢 `focus` / `focusV2` → **portable** (V2=V3 ? à confirmer) |
| 21 | Image interactive | ✅ | 🟢 `image-map` |
| 22 | My resume | ✅ | 🟢 `my-summary` |
| 23 | Action button | ✅ | 🟢 `action-button` |
| 24 | Barre de recherche | 🟡 stub | 🔵 `searchBox` → **portable** |
| 25 | Sondage | 🟡 stub | 🔴 absent → **modèle requis** |
| 26 | Boîte à idées | 🟡 stub | 🔴 absent → **modèle requis** |
| 27 | Vidéo | 🟡 stub | ⚪ natif SP → **modèle requis** |
| 28 | Incorporation (embed) | 🟡 stub | 🟢 `embed` (package) → **portable** |
| 29 | Weather | 🟡 stub | ⚪ natif SP → **modèle requis** |
| 30 | World Clock | 🟡 stub | ⚪ natif SP → **modèle requis** |

> Note : `search-filters` + `search-results` (Recherche connectée) sont **faits** en plus
> des 31 du PRD (issus de `searchFilters`/`searchResults` jintan).

**Bilan webparts : 20 faits / 31.**
- **4 stubs portables maintenant** (source jintan dispo) : `search-bar` (`searchBox`),
  `news-v2` (`news-feed`), `focus-v3` (`focusV2`), `embed` (package).
- **7 stubs en attente de modèle** : `viva-engage`, `poll`, `idea-box` (absents de jintan)
  + natifs SP `text`, `video`, `weather`, `world-clock` (jintan ≠ natifs SharePoint).

---

## Composants structurels (shell)
| Composant | Statut | Note |
|-----------|--------|------|
| SuiteHeader / SiteBar (UEX) / SiteHeader / SiteFooter | 🟡 partiels | présents dans `src/components/shell` — à fiabiliser |
| Section system (8 types) | ✅ | `src/components/canvas/` — SectionRenderer + FlexibleSectionRenderer + VerticalSectionRenderer + PageRenderer + WebpartHost. Specs grille SharePoint (12-col, gouttières 16/24/32, breakpoints, flexible 2D, vertical reflow < 1024px). |
| Top navigation | 🟡 | dans SiteHeader |

---

## Vision d'ensemble (rappel PRD)

```
Dashboard (/) → Onboarding (IA ou manuel)
   → Mode Édition (/edit/{id}) : Canvas + Sidebar + (Chat IA en P3+)
   → Mode Présentation (/view/{token}) : lecture seule, tracké PostHog
État unique = Project (theme · pages · sections · webparts · profils · uex · flows)
```

### Phasage
- **Phase 1** — Foundation + Wave 1 (8 webparts), shell, sections, dashboard, drag&drop, édition inline. ← _on est ici_
- **Phase 2** — Wave 2 (10), config avancée, profils switchables, flows (Newsletter, Article), traduction à la volée, mode Présentation + partage.
- **Phase 3** — IA : génération one-shot (brand detection, content, profils, layout), puis chat Copilot.
- **Phase 4** — Wave 3 (13), Configurateur/Analytics, écrans simulés, persistance Vercel Blob, i18n, perf.

---

## Prochaines steps recommandées

**Court terme (finir Wave 1)** — toutes ont une source jintan sauf Newcomers/Anniversary :
1. **Separator** (🟢, trivial) — rodage rapide.
2. **Employee directory** (🟢+🔵) — fort impact démo.
3. **Search** (🟢+🔵).
4. **Newcomers / Anniversary** (🔴) — **EN ATTENTE**, pas de source jintan → on ne fait rien, décision ultérieure.

**En parallèle (fondations)** :
5. Fiabiliser le **Section system** (7 layouts) + le **shell** — sans ça les webparts ne se composent pas en page réelle.
6. Mettre en place le **catalogue + drag&drop** sidebar (US-05/08) pour assembler les webparts codés.

**Webparts 🔴 absents de jintan** : **EN ATTENTE — on n'invente rien**, aucune fabrication. Décision ultérieure de Steven (ces webparts n'existent pas dans jintan, donc rien à répliquer pour l'instant).

> Note : **Figma n'est plus utilisé**. On **réplique uniquement** ce qui existe dans `jintan` — jamais de webpart fictif.
