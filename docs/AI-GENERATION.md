# Génération IA — Jint Builder

> Décisions prises avec Steven (2026-06-08). Ce doc fait foi pour l'implémentation
> de la Phase 3 (IA). Il précise/restreint le PRD §6.3 sur plusieurs points.
> Voir aussi : [PRD.md](./PRD.md) §6.3, agent [theme-builder](../agents/theme-builder.md),
> agent [content-generator](../agents/content-generator.md), agent [template-analyzer](../agents/template-analyzer.md).

---

## 1. Principe — génération par **formulaire**, PAS par chat

Décision Steven : **pas de chat Copilot**. On abandonne la génération conversationnelle
et la modification incrémentale par prompt (PRD §6.2 / §6.3 étape 2 → **annulés**).

À la place : un **écran de brief structuré** (formulaire). L'utilisateur saisit des
données, l'IA génère l'intranet en une passe. Toute modification ultérieure se fait
**à la main** (sidebar, drag & drop, édition inline) — comme déjà en place.

Avantage : plus simple, plus fiable, moins cher, pas de gestion de contexte conversationnel.

---

## 2. Écran de brief — données d'entrée

| Champ | Type | Usage |
|-------|------|-------|
| Nom de l'entreprise | texte | header, Newshub, webparts qui le référencent |
| Secteur | liste fermée | oriente contenu + images + templates |
| **Pages attendues** | liste de `pageType` (voir §4) | définit la structure multi-pages ; chaque page pilote son contenu |
| Couleur(s) principale(s) | hex | → `generateThemePalette` (socle existant, frozen) |
| Typo principale | URL Google Fonts **ou** upload | → font prospect (socle existant `useProspectFont`) |
| Logo | SVG **ou** image | SVG → recoloration (socle existant `svgToCurrentColor`) |
| **Lien du site d'actualités** | URL | scrapé → alimente le widget News de la page Accueil avec de vraies actus |
| Langue du contenu | `fr-FR` / `fr-CA` / `en` | indépendante de la locale d'interface |
| Nombre d'employés | nombre | crédibilité org chart / annuaire / effectifs |
| Mots-clés métier (optionnel) | 2-3 tags | oriente les requêtes Unsplash |
| Ton éditorial (optionnel) | liste | nuance le style du contenu généré |

Le brief **remplace** le scraping « tout-en-un » du PRD : on ne devine plus la charte,
l'utilisateur la fournit. Seul le **lien d'actualités** est scrapé (pour le contenu News réel).

---

## 3. Pipeline de génération (une passe)

API routes Next.js, derrière le provider abstrait `ChatProvider` (PRD §7.3).

1. **Brand** — couleur → palette 9 slots (`generateThemePalette`, **déjà fait**) ;
   logo SVG recoloré (**déjà fait**) ; font appliquée (**déjà fait**). Quasi gratuit.
2. **Profils** — 20 profils cohérents secteur + langue, avatars genre-matchés (Unsplash).
   → action store `replaceProfiles` (**seam déjà en place**). Règles : voir content-generator.
3. **Layout** — pour chaque `pageType` demandé, choisir webparts + ordre + splits de colonnes
   en s'appuyant sur la **knowledge base** (§4). Compose **uniquement** avec les webparts
   réels du registry — jamais de webpart inventé.
4. **Contenu contextuel par page** — le cœur de la demande. Le widget News (et les autres
   webparts de contenu) génère selon le **`pageType`** :
   - `accueil` → contenu générique transverse (annonces, événements, RH léger)
   - `rh` → onboarding, congés, avantages, formation
   - `dsi` → sécurité, migrations, support, nouveaux outils
   - `espace-perso` → My tasks / My emails / My meetings / Profile (preset stable, voir §4)
   Claude reçoit `{secteur, pageType, profils, langue}` et renvoie le `content` typé du webpart.
5. **Articles (1-2)** — contenu riche + image hero Unsplash.
6. **Images** — Claude renvoie des **requêtes Unsplash** (jamais d'URL) ; l'`ImageProvider`
   Unsplash résout en images réelles. Avatars genre-matchés.
7. **News depuis le lien fourni** — scraping titres/extraits réels du site d'actu →
   réinjectés dans le widget News de la page Accueil.

---

## 4. Template knowledge base — indexation à **2 axes**

Décision Steven : l'IA s'aide de **captures d'écran (PNG) de maquettes déjà réalisées**.
Mécanisme = la knowledge base du PRD (déjà esquissée, dossiers en place mais **vides**).

### L'IA ne lit PAS les PNG directement
Captures brutes en vision = lent, cher, peu fiable. À la place :
1. **Une fois** : les PNG déposés dans `templates/screenshots/{secteur}/{pageType}/`.
   L'agent `template-analyzer` les transforme en **index cards** texte (`templates/cards/`)
   décrivant la *structure* : webparts utilisés, ordre, splits de colonnes, type de page.
2. **À la génération** : l'IA lit les **cards** (texte léger), pas les PNG. Elle pioche les
   patterns qui matchent et compose avec les webparts réels. **Adapter, jamais copier.**

### Indexation sur `secteur × pageType` (PAS secteur seul)
Aujourd'hui les dossiers sont rangés par secteur uniquement → insuffisant. Chaque card
porte **deux** clés. Le `pageType` est le critère le plus structurant (une page RH se
ressemble d'un secteur à l'autre, plus que deux pages d'un même secteur).

```
templates/cards/bancaire/accueil-01.md      → {secteur: bancaire, pageType: accueil}
templates/cards/bancaire/rh-01.md           → {secteur: bancaire, pageType: rh}
templates/cards/tech/espace-perso-01.md     → {secteur: tech,     pageType: espace-perso}
```

### Matching avec dégradation propre
À la génération d'une page : requête `pageType=X` **+** `secteur=Y`. Si pas de match exact :
`même pageType, autre secteur` > `general/pageType`. → robuste même avec peu de templates.

### `pageType` — **LISTE FERMÉE (figée 2026-06-08)**
Liste fermée = matching beaucoup plus fiable. **7 valeurs**, c'est la liste de référence
(alignée dans `templates/cards/_index-card-template.md` et `agents/template-analyzer.md`) :

| `pageType` (slug) | Libellé | Description |
|------------|---------|-------------|
| `accueil` | Accueil | page d'accueil de l'intranet, contenu transverse |
| `espace-perso` | Espace personnel | espace de l'employé (My tasks/emails/meetings, Profile) — preset stable |
| `rh` | Espace RH | ressources humaines (onboarding, congés, avantages, formation) |
| `documentation` | Espace documentation | bibliothèques de documents, procédures, ressources |
| `it` | Espace IT | informatique (sécurité, support, outils, migrations) |
| `metier` | Espace métier | espace spécifique au métier/secteur du prospect |
| `annuaire` | Annuaire | trombinoscope / annuaire d'employés (Employee directory, Org chart) |

### Secteur — **déduit du chemin du dossier UNIQUEMENT** (décision Steven)
Le secteur n'est PAS déduit des indices visuels de la capture. Il vient **exclusivement**
du dossier où le PNG est rangé : `templates/screenshots/{secteur}/...`. L'analyzer ne
doit pas « deviner » le secteur depuis l'image.

### Notes
- **Pas besoin d'être exhaustif** : 2-3 bons templates par `pageType` suffisent pour démarrer.
  Le secteur affine surtout le *contenu* (content-rules), le template affine surtout le *layout*.
- **`espace-perso`** a une logique stable (My tasks/emails/meetings + Profile) → candidat à un
  **preset hardcodé** plutôt qu'à un template dépendant du secteur.
- Secteurs en place : `energie`, `sante`, `bancaire`, `tech`, `municipal`, `retail-pharmacie`,
  `education`, `assurance`, `general`.

---

## 5. À construire (état au 2026-06-08)

Rien de la couche IA n'est commencé. `src/lib/ai/` et `src/lib/brand-detection/` sont vides.

| Élément | État | Note |
|---------|------|------|
| `generateThemePalette` (couleur → 9 slots) | ✅ fait | frozen |
| Logo SVG recoloré | ✅ fait | `svgToCurrentColor` |
| Font prospect | ✅ fait | `useProspectFont` |
| Seam `replaceProfiles` | ✅ fait | action store |
| Dossiers knowledge base | ✅ en place | **vides** (`.gitkeep`) |
| Agent `template-analyzer` | ✅ existe | jamais lancé (pas de PNG) |
| Dép. `@anthropic-ai/sdk` | ⬜ à ajouter | |
| `lib/ai/` (pipeline + prompts par webpart) | ⬜ à faire | basé sur « AI Content Rules » des docs webparts |
| `lib/brand-detection/` (scraping site actus) | ⬜ à faire | uniquement le lien d'actus |
| `ImageProvider` Unsplash | ⬜ à faire | interface PRD §7.3 |
| Écran de brief (formulaire) | ⬜ à faire | remplace l'onboarding IA prompt |
| Re-indexation cards `secteur × pageType` | ⬜ à faire | + liste fermée `pageType` |

### Prérequis côté Steven
- **Clé API Anthropic** (génération contenu/layout).
- **Clé API Unsplash** (images + avatars).
- **Captures PNG** de maquettes, rangées `{secteur}/{pageType}/` (ou nommées `rh-banque-01.png`).

---

## 6. Features liées — **spécifiées** dans [TEMPLATES-AND-ANALYTICS.md](./TEMPLATES-AND-ANALYTICS.md)

- **Maquette → Template** (menu « Templates ») : snapshot figé, garde tout le branding/contenu,
  bibliothèque partagée, déclaré depuis la carte dashboard. **Réutilisable de 2 façons** :
  copie simple OU **adaptation par l'IA** (brief renseigné → l'IA garde la structure du template
  et régénère branding + contenu par `pageType`). Détail : voir le doc dédié §1.
- **Menu « Analytiques »** : dashboard **global agrégé** (toutes maquettes), familles
  **Consultation + Engagement**, source `AnalyticsProvider` (local|posthog). Détail : §2.

---

## 7. Ce qui est explicitement ABANDONNÉ / RESTREINT vs PRD

- ❌ **Chat Copilot** (PRD §6.2, §6.3 étape 2) — abandonné.
- ❌ **Modification incrémentale par prompt** — abandonnée (tout se fait à la main après génération).
- 🔁 **Brand detection « tout-en-un »** (PRD §6.3 flow scraping couleurs/logo/secteur) — restreint :
  la charte est **saisie** dans le brief, seul le **lien d'actualités** est scrapé.
