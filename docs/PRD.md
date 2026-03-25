# Jint Builder — Product Requirements Document

**Version** : 1.0
**Date** : 2026-03-22
**Auteur** : Steven (Product & UX, Mozzaik / Jint)
**Statut** : Draft

---

## 1. Overview

**Jint Builder** est une application web AI-first qui permet aux équipes Sales, CSM et partenaires intégrateurs de générer des démos d'intranets SharePoint interactives et pixel-perfect en quelques secondes via un prompt conversationnel, avec possibilité d'ajustement manuel complet.

L'outil remplace le processus actuel de création manuelle de maquettes Figma par une interface d'auto-génération qui produit des liens partageables vers des démos navigables multi-pages.

---

## 2. Problem

### Situation actuelle

Les équipes Sales dépendent d'un designer (Steven) pour créer des maquettes Figma personnalisées pour chaque prospect. Ce processus :

- Crée un goulot d'étranglement sur une seule personne
- Allonge le cycle de vente (délai entre la demande et la livraison de la démo)
- Produit des livrables statiques et parfois des démos interactives

### Problème à résoudre

Les utilisateurs internes et partenaires n'ont aucun moyen autonome de produire une démo d'intranet SharePoint personnalisée, crédible et navigable pour un prospect donné.

---

## 3. Goals & Metrics

### Objectifs

| Objectif | Description |
|----------|-------------|
| Autonomie | Les Sales/CSM/partenaires créent des démos sans intervention design |
| Vitesse | Passer de plusieurs jours à quelques minutes pour une démo personnalisée |
| Qualité | Les démos sont pixel-perfect par rapport au design system Jint/SharePoint |
| Crédibilité | Le contenu généré est réaliste et adapté au secteur du prospect |

### Success metrics

| Metric | Baseline | Target MVP |
|--------|----------|------------|
| Temps de création d'une démo | 2-5 jours | < 10 minutes |
| Interventions design requises | 100% des démos | < 10% des démos |
| Taux d'adoption par les Sales | 0% (outil inexistant) | 80% utilisent l'outil |
| Satisfaction qualité perçue par le prospect | N/A | ≥ 4/5 |

---

## 4. Users

### Personas

#### Sales Jint

- **JTBD** : Impressionner un prospect avec une démo personnalisée qui ressemble à *leur* futur intranet
- **Contexte** : Peu ou pas de compétences design/technique, travaille sous pression temporelle
- **Besoin clé** : Rapidité + personnalisation (logo, couleurs, contenu sectoriel)

#### CSM (Customer Success Manager)

- **JTBD** : Montrer aux clients existants de nouvelles possibilités pour leur intranet (upsell, renouvellement)
- **Contexte** : Connaît bien le client, veut montrer des cas d'usage spécifiques
- **Besoin clé** : Flexibilité dans le choix des webparts + contenu contextuel

#### Partenaire intégrateur SharePoint

- **JTBD** : Vendre les solutions Jint à ses propres clients en montrant des démos co-brandées
- **Contexte** : Compétence SharePoint technique, mais pas de compétence design Jint
- **Besoin clé** : Catalogue complet de webparts + avoir de l'inspiration design

---

## 5. User Stories

### Génération par IA (Mode prompt)

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-01 | En tant que Sales, je veux saisir le nom de l'entreprise et coller l'URL de son site web pour obtenir un intranet complet avec le bon logo, les bonnes couleurs et du contenu sectoriel crédible | P0 | 3 |
| US-02 | En tant que Sales, je veux affiner la démo via le chat ("ajoute une page RH", "change le hero banner") sans tout reconstruire | P0 | 3 |
| US-03 | En tant que CSM, je veux générer une démo qui met en avant des webparts spécifiques pour un use case client | P1 | 3 |
| US-04 | En tant que partenaire, je veux appliquer le branding de mon prospect | P2 | 4 |

### Édition manuelle (Mode sidebar)

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-05 | En tant qu'utilisateur, je veux réorganiser les webparts en drag & drop sur le canvas | P0 | 1 |
| US-06 | En tant qu'utilisateur, je veux modifier le contenu texte directement dans la preview (édition inline) | P0 | 1 |
| US-07 | En tant qu'utilisateur, je veux uploader un logo ou changer les couleurs manuellement | P0 | 2 |
| US-08 | En tant qu'utilisateur, je veux ajouter/supprimer des webparts depuis un catalogue visuel | P0 | 1 |
| US-09 | En tant qu'utilisateur, je veux ajouter/supprimer/renommer des pages dans la navigation | P0 | 1 |
| US-10 | En tant qu'utilisateur, je veux remplacer une image dans un webpart (upload ou recherche Unsplash) | P0 | 2 |
| US-11 | En tant qu'utilisateur, je veux configurer les propriétés visuelles d'un webpart (height, width, padding, etc.) via le panneau de configuration | P0 | 2 |

### Sections & layout

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-12 | En tant qu'utilisateur, je veux ajouter une section sur une page et choisir son layout (1 col, 2 col, 3 col, 1/3 gauche, 1/3 droit, full-width, flexible) | P0 | 1 |
| US-13 | En tant qu'utilisateur, je veux changer le fond d'une section (aucun, neutre, soft, strong) ou y ajouter une image de fond | P1 | 2 |
| US-14 | En tant qu'utilisateur, je veux ajouter une section verticale (sidebar droite) à une page | P2 | 2 |

### Theme & branding

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-15 | En tant qu'utilisateur, je veux choisir une couleur primaire et voir le thème se propager instantanément à tous les webparts (9 slots palette) | P0 | 1 |
| US-16 | En tant qu'utilisateur, je veux choisir la variante de header (extended/compact × neutral/soft/strong/mixed) | P0 | 1 |
| US-17 | En tant qu'utilisateur, je veux que le logo SVG s'adapte au thème du header (blanc sur fond sombre, couleur sur fond clair) | P1 | 2 |

### Partage & livrable

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-18 | En tant que Sales, je veux partager un lien de preview live avec le prospect | P0 | 2 |
| US-19 | En tant que Sales, je veux que la démo soit navigable (cliquer entre les pages, UEX, flows) | P0 | 2 |
| US-20 | En tant que Sales, je veux retrouver mes démos précédentes et les dupliquer | P1 | 2 |
| US-21 | En tant que Sales, je veux voir combien de fois un prospect a consulté le lien de démo partagé (nombre de vues, dernière consultation) | P1 | 4 |
| US-22 | En tant que Sales, je veux savoir quelles pages de la démo le prospect a visitées et combien de temps il a passé | P2 | 4 |

### Dashboard & gestion de projets

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-23 | En tant qu'utilisateur, je veux voir la liste de tous mes projets de démo sur un dashboard | P0 | 1 |
| US-24 | En tant qu'utilisateur, je veux créer un nouveau projet depuis le dashboard (mode IA ou manuel) | P0 | 1 |
| US-25 | En tant qu'utilisateur, je veux dupliquer un projet existant pour l'adapter à un autre prospect | P1 | 2 |
| US-26 | En tant qu'utilisateur, je veux supprimer un projet dont je n'ai plus besoin | P1 | 2 |

### Profils & personnalisation

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-27 | En tant que Sales, je veux switcher entre 3 profils (1 contributeur + 2 utilisateurs) via un écran de login Microsoft simulé | P0 | 2 |
| US-28 | En tant qu'utilisateur, je veux éditer les noms, photos et postes des 20 profils de la démo | P1 | 2 |
| US-29 | En tant que Sales, je veux que les webparts personnalisés (My tasks, My emails, My meetings) changent de contenu quand je switch de profil | P0 | 2 |
| US-30 | En tant que Sales, je veux que la toolbar contributeur n'apparaisse que lorsque le profil actif est le contributeur | P0 | 2 |

### UEX (Unified Experience Bar)

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-31 | En tant que Sales, je veux montrer la barre UEX latérale gauche avec ses 5 sections (naviguer, s'informer, rechercher, contribuer, partager) | P0 | 1 |
| US-32 | En tant que Sales, je veux ouvrir le centre de contribution (créer un article, créer une page, accéder aux paramètres) depuis la UEX | P0 | 2 |
| US-33 | En tant que Sales, je veux montrer le partage de contenu depuis la UEX (vers Teams, Engage, Newsletter) | P1 | 2 |
| US-34 | En tant que Sales, je veux montrer la recherche globale depuis la UEX | P1 | 2 |
| US-35 | En tant que Sales, je veux montrer le feed d'actualités et d'événements dans le panneau UEX | P1 | 2 |

### Newsletter

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-36 | En tant que Sales, je veux montrer le dashboard de gestion des newsletters (KPIs, tableau paginé avec statuts) | P0 | 2 |
| US-37 | En tant que Sales, je veux démontrer le flow complet de création d'une newsletter en 7 étapes (choix template → éditeur drag & drop → configuration → envoi → confirmation) | P0 | 2 |
| US-38 | En tant que Sales, je veux montrer l'éditeur de newsletter avec ses composants drag & drop (header, texte, image, bouton, séparateur, etc.) | P1 | 2 |

### Création d'article

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-39 | En tant que Sales, je veux démontrer le flow de création et publication d'un article intranet | P0 | 2 |
| US-40 | En tant que Sales, je veux montrer une page article complète avec hero image, auteur, contenu riche, barre d'engagement (likes, commentaires, vues) et section commentaires | P0 | 2 |

### Partage Teams & Engage

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-41 | En tant que Sales, je veux démontrer le partage de contenu vers Microsoft Teams depuis la UEX | P1 | 3 |
| US-42 | En tant que Sales, je veux démontrer le partage de contenu vers Viva Engage depuis la UEX | P1 | 3 |

### Traduction

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-43 | En tant que Sales, je veux montrer la traduction instantanée d'un article (panneau langues + modal sélection) | P1 | 2 |
| US-44 | En tant que Sales, je veux montrer la traduction automatique d'une page complète (panel latéral + ajout langues + navigation entre versions) | P2 | 3 |

### Configurateur / Analytics

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-45 | En tant que Sales, je veux montrer le back-office Configurateur Jint avec ses 7 écrans analytics (données statiques IA) | P2 | 4 |
| US-46 | En tant que Sales, je veux naviguer entre les onglets du Configurateur (Engagement : Utilisateurs, Sites, Pages, Actualités / Fonctionnalités : Licences, WebParts, Détails WebPart) | P2 | 4 |

### Images & médias

| ID | Story | Priorité | Phase |
|----|-------|----------|-------|
| US-47 | En tant qu'utilisateur, je veux rechercher et insérer des images depuis Unsplash directement dans un webpart | P1 | 2 |
| US-48 | En tant qu'utilisateur, je veux uploader mes propres images pour les utiliser dans les webparts | P0 | 2 |

---

## 6. Functional Requirements

### 6.1 Choix du mode de création (onboarding)

Au lancement d'un nouveau projet, l'utilisateur choisit entre deux modes :

**Mode IA (assisté)** — disponible à partir de la Phase 3 :
- L'utilisateur saisit le **nom de l'entreprise** (affiché dans le header, le Newshub et les webparts qui le référencent) et fournit un **lien web** (site corporate du prospect) qui sert de source pour la charte graphique
- L'IA scrape le site : extraction des couleurs dominantes, détection du logo (idéalement en SVG pour pouvoir gérer la couleur), identification du secteur d'activité
- L'utilisateur peut compléter/corriger : secteur, nombre d'employés, langue du contenu
- L'IA génère un intranet complet (thème, layout, pages, contenu) en une passe
- L'utilisateur arrive sur le canvas avec le chat panel ouvert pour affiner

**Mode manuel** :
- L'utilisateur arrive sur le **template SharePoint vide Jint** — pas un canvas totalement blanc, mais le shell de l'intranet déjà en place
- Il construit son intranet à partir de cette base : choisir un thème, uploader un logo, créer des pages, placer des sections et des webparts
- À partir de la Phase 3, le chat panel IA sera aussi disponible pour assister

Les deux modes convergent vers la même interface (canvas + sidebar, et chat à partir de la Phase 3) — la seule différence est le point de départ (intranet pré-rempli par l'IA vs template vide).

### Template SharePoint vide Jint

Le template vide est le point de départ de tout projet en mode manuel. Il reproduit la structure d'un site SharePoint vierge, avec les composants Jint à la place des composants natifs SharePoint :

```
┌─────────────────────────────────────────────────────┐
│ [UEX]  │  Header Jint (variante au choix)           │ ← sticky top
│ icônes │  Hub nav + Site nav + Logo + Titre          │
├────────┼────────────────────────────────────────────┤
│        │                                             │
│  UEX   │  ┌─── Section vide ────────────────────┐  │
│  panel │  │  + Ajouter un webpart                │  │
│  (au   │  └─────────────────────────────────────┘  │
│  clic) │                                             │
│        │  ┌─── Section vide ────────────────────┐  │
│        │  │  + Ajouter un webpart                │  │
│        │  └─────────────────────────────────────┘  │
│        │                                             │
│        │  Footer Jint                                │
│        │                                             │
└────────┴────────────────────────────────────────────┘
```

Le template inclut :
- **UEX Jint** à gauche (pas la sidebar SharePoint native) — icônes dans le header, panneau pleine hauteur au clic
- **Header Jint** configurable (8 variantes) avec le titre du site en placeholder
- **1 page "Accueil"** pré-créée avec 2-3 sections vides prêtes à recevoir des webparts
- **Footer Jint** avec contenu placeholder
- **Thème par défaut** (SharePoint bleu) — modifiable immédiatement via le color picker ou via brand detection

Ce template est un modèle Figma fourni par Steven et codé via Bridge comme tous les autres composants visuels.

### 6.2 Interface — Chat panel latéral (style Copilot) — Phase 3 avancée / Phase 4

- Panel de chat ancré à droite de l'écran
- Le canvas (preview de l'intranet) occupe l'espace restant
- Le chat supporte le langage naturel en français et en anglais
- Les modifications IA sont appliquées en temps réel sur le canvas
- Historique de conversation persistant par projet
- **Note** : Le chat Copilot est la **dernière brique IA** à être implémentée. En Phase 1-2 l'interface est 100% manuelle. En Phase 3 (début), seule la génération one-shot est disponible. Le chat pour modifications incrémentales arrive en dernière priorité de la Phase 3 ou en Phase 4.

### 6.3 IA — Génération intelligente

L'IA intervient en **2 étapes distinctes**, pas en même temps :

**Étape 1 — Génération one-shot (Phase 3)** :
L'utilisateur fournit un unique prompt (nom d'entreprise + URL + secteur) et l'IA génère l'espace complet en une seule passe. Après cette génération, **toutes les modifications se font à la main** via la sidebar, le drag & drop, l'édition inline. Pas de chat IA pour modifier.

La génération one-shot inclut :
- **Brand detection (URL-based)** : scrape du site → couleurs, logo (SVG si disponible), secteur, ton éditorial
- **Logo SVG handling** : logo blanc sur fond sombre, couleur sur fond clair (si SVG). PNG/JPG utilisé tel quel
- **Theme generation** : application automatique des couleurs/logo sur le thème SharePoint
- **Content generation** : remplissage de tous les webparts avec du contenu réaliste adapté au secteur (via Unsplash API pour les images)
- **Profile generation** : 20 profils éditables (noms, postes, avatars genre-matchés)
- **Layout generation** : proposition d'un layout multi-pages (max 10 pages + 2 articles) basé sur la template knowledge base

**Étape 2 — Chat Copilot pour modifications (Phase 3 avancée / Phase 4)** :
Ajouté en dernière priorité. Le chat latéral permet de modifier des éléments d'interface par prompt ("change la couleur en vert", "ajoute une page RH", "remplace le hero"). Chaque prompt modifie le state existant sans tout recréer. API Claude directe, contexte filtré (pas le JSON complet).

**Flow détaillé de brand detection (côté serveur — Next.js API route) :**

```
1. FETCH    → Récupérer le HTML + CSS de l'URL fournie
2. LOGO     → Chercher le logo dans cet ordre :
               - <link rel="icon"> en SVG
               - Image dans <header>/<nav> contenant "logo" (alt, class, filename)
               - /favicon.svg ou /logo.svg
               → Privilégier SVG pour recoloration
3. COULEURS → Parser les CSS :
               - CSS custom properties (--primary, --brand-color...)
               - Couleurs du header, nav, liens, boutons
               - Analyse colorimétrique du logo
               → En déduire : primary, secondary, accent, background
4. SECTEUR  → Envoyer le contenu textuel de la page à Claude :
               "Identifie : nom entreprise, secteur, taille, langue principale"
               → Réponse structurée JSON
5. VALIDATION → Présenter un écran récap à l'utilisateur :
               Logo détecté, palette proposée, secteur identifié
               → L'utilisateur confirme ou corrige
6. FALLBACK → Si le site bloque le scraping : saisie manuelle
```

### 6.4 Édition manuelle — Sidebar

- Catalogue visuel des webparts disponibles (31 webparts au total, livrés en 3 waves)
- Drag & drop des webparts sur le canvas (à la SharePoint)
- Panneau de configuration par webpart (contenu, design, comportement)
- Color picker pour le thème global
- Upload de logo
- Gestion des pages (ajout, suppression, renommage, réorganisation)

**Propriétés configurables par webpart :**

Chaque webpart expose des propriétés visuelles configurables qui correspondent directement aux **variants du composant Figma**. Ces propriétés sont propres à chaque webpart — il n'y a pas de set universel.

Exemple pour le webpart Newcomers :
- **Height** : 1 row / 2 rows
- **Width** : Full / 1/3
- **Padding** : True / False

Ces propriétés sont :
- Définies dans Figma comme des component properties/variants
- Extraites automatiquement par Bridge lors de la génération du composant
- Exposées dans le panneau de configuration de la sidebar en mode Édition
- Stockées dans le `config` du webpart dans le Project state (ex: `{ height: "1-row", width: "full", padding: true }`)
- Le rendu du webpart sur le canvas s'adapte en temps réel quand l'utilisateur change une propriété

Le panneau de configuration est **généré dynamiquement** à partir des props déclarées dans le webpart registry — pas de UI hardcodée par webpart.

### 6.5 Édition inline du contenu (requirement transversal)

Tous les webparts supportent l'édition directe de leur contenu, que celui-ci ait été généré par l'IA ou saisi manuellement :

- **Textes** : Clic sur un texte → édition inline (titres, descriptions, labels, boutons)
- **Images** : Clic sur une image → remplacement par upload ou recherche d'image
- **Liens** : Édition des URLs et labels de liens
- **Listes** : Ajout, suppression, réorganisation d'éléments (news, événements, liens rapides...)

L'édition inline est disponible **uniquement en mode Édition**. Le mode Présentation est en lecture seule.

### 6.6 Les deux modes de l'application

L'application a deux modes distincts avec des URLs séparées :

#### Mode Édition (`/edit/{project-id}`)

Réservé aux Sales/CSM/partenaires. Pas d'authentification — l'accès se fait via l'URL directe (`/edit/{project-id}`).

| Zone | Description |
|------|-------------|
| **Canvas** (centre) | Preview live de l'intranet, avec édition inline des contenus |
| **Chat panel** (droite) | Prompt IA conversationnel via API Claude (style Copilot) |
| **Sidebar** (gauche, contextuelle) | Catalogue webparts, configuration, gestion des pages |

Fonctionnalités exclusives au mode Édition : drag & drop, édition inline, chat IA, configuration des webparts, gestion des pages/sections, upload de logo/images (Unsplash API + upload manuel), choix du thème.

Un **bouton "Présentation"** permet au Sales de basculer en mode Présentation depuis le mode Édition pour prévisualiser la démo telle que le prospect la verra. Un **bouton invisible** (easter egg) sur la maquette en mode Présentation permet au Sales de revenir en mode Édition.

#### Mode Présentation (`/view/{share-token}`)

Deux accès possibles :
- **Depuis le mode Édition** — Le Sales bascule via le bouton "Présentation" pour prévisualiser. Il peut revenir en Édition via le bouton invisible.
- **Via le lien partagé** (`/view/{share-token}`) — C'est ce que le prospect reçoit. **Lecture seule stricte** — aucun bouton invisible, aucun accès au mode Édition. Le prospect ne peut que naviguer.

| Élément | Interactif ? |
|---------|-------------|
| Navigation entre pages (max 10 pages) | Oui — clic sur les liens de navigation |
| Pages articles (2 pages) avec traduction | Oui — bouton de traduction à la volée + traduction de pages |
| UEX complète (sidebar gauche) | Oui — navigation, recherche, centre de contribution |
| Flows interactifs (newsletter, article, partage) | Oui — parcours étape par étape |
| Configurateur / Analytics | Oui — navigation entre onglets |
| Boutons/CTA dans les webparts | Oui — clics simulés (liens, "Lire l'article", etc.) |
| Footer | Oui — liens cliquables |
| Modification de contenu | **Non — lecture seule** |
| Chat IA | Non — invisible |
| Sidebar d'édition | Non — invisible |
| Bouton invisible → Édition | **Uniquement depuis le mode Édition** — absent sur le lien partagé au prospect |

Le mode Présentation utilise le même renderer que le canvas du mode Édition, mais sans les overlays d'édition. Le prospect ne sait pas qu'il est dans un outil de génération — il voit "un intranet".

### 6.7 Partage & persistance

- Génération d'un lien de preview partageable (mode Présentation, lecture seule)
- Le lien est un `share-token` unique, différent du `project-id` (sécurité)
- Sauvegarde des projets par utilisateur
- Duplication de projets existants

**Tracking des liens partagés (via PostHog) :**

Chaque lien de partage généré est tracké via **PostHog** (analytics open-source, auto-hébergeable) pour permettre aux Sales de savoir si le prospect a consulté la démo. Seuls les liens générés via l'interface sont trackés — les accès directs à l'URL en mode Édition ne le sont pas (pas de consommation de sessions inutiles).

Données trackées par lien :
- **Date de création** du lien
- **Nombre de vues** (sessions uniques par IP/user-agent)
- **Dernière consultation** (timestamp)
- **Durée moyenne** de session
- **Pages visitées** (quelles pages de l'intranet le prospect a consultées)

L'utilisateur voit ces métriques dans le dashboard multi-projets, à côté de chaque projet qui a un lien actif. Phase cible : Phase 2 (génération du lien) + Phase 4 (métriques avancées).

### 6.8 Architecture de stockage (sans BDD)

Voir section 8 — Architecture conceptuelle.

**Sauvegarde manuelle :** La sauvegarde est déclenchée par un **bouton "Sauvegarder"** visible en mode Édition (pas d'auto-save). Le bouton indique visuellement quand il y a des modifications non sauvegardées (état `isDirty` dans le Zustand store). Un avertissement s'affiche si l'utilisateur tente de quitter la page avec des modifications non sauvegardées.

**Progression du storage :**

| Phase | Provider | Description |
|-------|----------|-------------|
| Phase 1 | `LocalStorageProvider` | Filesystem local du serveur Next.js (dev uniquement) |
| Phase 2 | `VercelBlobProvider` | Vercel Blob Storage — persistance en production, liens partageables viables |
| Phase 4 | `AzureBlobProvider` | Azure Blob Storage — alignement avec l'infra Mozzaik/Jint |

Changer de provider = changer la variable d'environnement `STORAGE_PROVIDER`. Le code applicatif ne change pas grâce à l'interface `StorageProvider` abstraite.

### 6.9 Gestion des profils utilisateurs

Les profils sont un élément transversal référencé par de nombreux webparts (Newcomers, Anniversary, Employee directory, Org chart, Profile, auteurs de News, expéditeurs de Newsletter, etc.).

**3 profils switchables (simulation de login Microsoft) :**

Parmi les 20 profils éditables, 3 sont des **profils actifs switchables** qui simulent le changement d'utilisateur connecté :

| Rôle | Description | Interface affichée |
|------|-------------|-------------------|
| **Contributeur** (1) | Profil avec droits de création/édition | Toolbar d'actions visible (+ Créer, Promouvoir, Augmenter, Traduction), accès aux flows de création (newsletter, article) |
| **Utilisateur** (2) | Profils employés standard | Pas de toolbar d'actions, vue "lecture employé", webparts personnalisés (My tasks, My emails, My meetings) affichent le contenu du profil |

**Mécanique de switch :**
- Clic sur l'avatar en haut à droite du header → dropdown avec nom, email, photo, liens "Afficher le compte" / "Mon profil Microsoft 365" + "Se connecter avec un autre compte"
- Au clic sur "Se connecter avec un autre compte" → page simulée Microsoft "Choisir un compte" avec les 3 profils listés (emails @prospect.com)
- Au clic sur un profil → l'interface se met à jour : avatar/nom dans le header, toolbar visible ou non, contenu des webparts personnalisés adapté
- Pas de réelle authentification — c'est un switch de contexte visuel dans le state du projet

**Les 3 profils switchables sont éditables** par le Sales/CSM (nom, photo, email, poste) et font partie des 20 profils éditables de l'annuaire.

**20 profils éditables :**
- Centralisés au niveau du Project, pas dupliqués dans chaque webpart
- Éditables manuellement (nom, poste, département, photo, bio...) ou générés/modifiés par l'IA
- Chaque webpart référence les profils par ID → modifier un profil met à jour tous les webparts qui l'utilisent
- L'IA génère des profils réalistes adaptés au secteur et à la langue du prospect (noms culturellement appropriés, postes pertinents au secteur)

**Règles IA pour la génération de profils :**
- Les avatars doivent correspondre au genre du prénom (prénom masculin → avatar masculin, et inversement)
- Diversité : mix de genres, origines et âges apparents dans les avatars
- Noms culturellement cohérents avec la langue du prospect (francophones pour fr-CA/fr-FR, anglophones pour en, mix pour entreprises internationales)
- Postes adaptés au secteur (bancaire : Analyste conformité, VP Risques / municipal : Directeur urbanisme, Greffière)
- Hiérarchie crédible dans les 20 profils : 1-2 direction, 4-5 managers, le reste contributeurs individuels
- Le profil Contributeur doit avoir un rôle crédible pour la création de contenu (ex: Responsable communications, Chargée de projet RH)
- Si l'utilisateur change le prénom d'un profil, l'IA doit proposer de mettre à jour l'avatar pour matcher le nouveau genre

**Profils générés (non éditables) :**
- Pour les webparts qui affichent plus de 20 personnes (Employee directory paginé, Org chart large)
- Auto-générés par l'IA, cohérents avec les 20 profils éditables (même entreprise, mêmes départements)
- Non modifiables — si le Sales veut personnaliser un profil généré, il le "promote" en profil éditable (dans la limite de 20)

### 6.10 Dashboard multi-projets

L'utilisateur accède à un dashboard à l'ouverture de l'app (`/`). C'est le point d'entrée principal.

- Liste de tous les projets de l'utilisateur (cards avec nom du projet, nom du prospect, date de dernière modification, miniature/screenshot)
- Bouton "Nouveau projet" → choix du mode (IA ou manuel) → onboarding
- Actions par projet : Ouvrir (mode Édition), Dupliquer, Supprimer, Copier le lien de partage
- Tri par date de modification (plus récent en premier)
- Recherche/filtre par nom de projet ou prospect

**Note** : Le design du dashboard sera potentiellement créé via Gemini (pas via Figma/Bridge). C'est une exception à la règle "tout composant = modèle Figma". Le dashboard est une page d'app, pas un composant d'intranet SharePoint — il n'a pas besoin de respecter le DS SharePoint.

Aucune base de données. Chaque projet est stocké comme un ensemble de fichiers dans un blob storage, derrière une interface `StorageProvider` abstraite pour permettre une migration future vers Azure.

```
StorageProvider (interface)
├── saveProject(id, json) → URL
├── loadProject(id) → json
├── uploadImage(projectId, file) → imageURL
├── deleteImage(url) → void
├── getShareUrl(projectId) → shareToken
│
├── Implémentation MVP : Vercel Blob / Cloudflare R2 / S3
└── Implémentation future : Azure Blob Storage
```

**Structure de stockage par projet :**

```
{project-id}/
├── project.json              ← State complet du projet (data model)
├── images/
│   ├── logo.svg              ← Logo du prospect (SVG pour recoloration)
│   ├── {uuid}.jpg            ← Images uploadées / swappées dans les webparts
│   └── ...
└── metadata.json             ← Share token, dates, propriétaire
```

**Principes :**
- Le `project.json` contient tout le state (thème, pages, sections, webparts, contenu, flows)
- Les images uploadées sont stockées dans le blob storage, le JSON référence leurs URLs
- Le `StorageProvider` est une interface — changer d'implémentation (R2 → Azure Blob) ne change pas le format de données
- Pas de BDD, pas d'ORM, pas de migrations — juste du JSON + des fichiers

### 6.6 Webparts — Inventaire complet (31 composants)

Chaque webpart est documenté individuellement dans `docs/webparts/{type-id}.md` (voir template webpart).

#### Wave 1 — High-impact démo (8 composants)

Les webparts qui font vendre. Priorité absolue, implémentés en premier.

| # | Webpart | Type ID | Source | Rôle en démo |
|---|---------|---------|--------|-------------|
| 1 | News | `news` | Jint | Fil d'actualités principal — premier élément vu par le prospect |
| 2 | Focus | `focus` | Jint | Mise en avant de contenus prioritaires (hero-like) |
| 3 | Events | `events` | Jint | Calendrier d'événements internes |
| 4 | Employee directory | `employee-directory` | Jint | Annuaire d'employés — très demandé en démo |
| 5 | Search | `search` | Jint | Barre de recherche — attendue sur toute page d'accueil |
| 6 | Newcomers | `newcomers` | Jint | Nouveaux arrivants — fort impact RH |
| 7 | Anniversary | `anniversary` | Jint | Anniversaires — engagement social |
| 8 | Separator | `separator` | Jint | Séparateur visuel — nécessaire au layout, rapide à implémenter |

#### Wave 2 — Productivité & engagement (10 composants)

Les webparts qui montrent la profondeur fonctionnelle de Jint.

| # | Webpart | Type ID | Source | Rôle en démo |
|---|---------|---------|--------|-------------|
| 9 | My apps | `my-apps` | Jint | Lanceur d'applications — personnalisation utilisateur |
| 10 | Organization chart | `org-chart` | Jint | Organigramme — wow effect en démo |
| 11 | Profile | `profile` | Jint | Fiche profil employé |
| 12 | Newshub | `newshub` | Jint | Agrégateur de news multi-sources |
| 13 | My tasks | `my-tasks` | Jint | Liste de tâches personnelles |
| 14 | Docs | `docs` | Jint | Bibliothèque de documents |
| 15 | My emails | `my-emails` | Jint | Widget email Outlook intégré |
| 16 | My meetings | `my-meetings` | Jint | Widget agenda/réunions |
| 17 | Viva engage | `viva-engage` | Jint | Fil social Viva Engage |
| 18 | Text | `text` | SharePoint natif | Bloc de texte riche — utilitaire de base |

#### Wave 3 — Compléments, variantes & widgets (13 composants)

Les webparts qui finissent le catalogue, incluant les variantes et les nouveaux ajouts.

| # | Webpart | Type ID | Source | Rôle en démo |
|---|---------|---------|--------|-------------|
| 19 | News V2 | `news-v2` | Jint | Variante modernisée du fil d'actualités |
| 20 | Focus V3 | `focus-v3` | Jint | Variante enrichie du Focus |
| 21 | Image interactive | `image-interactive` | Jint | Image cliquable avec zones interactives |
| 22 | My resume | `my-resume` | Jint | CV / compétences employé |
| 23 | Action button | `action-button` | Jint | Bouton CTA configurable |
| 24 | Barre de recherche | `search-bar` | Jint | Barre de recherche stylisée (distinct de Search webpart) |
| 25 | Sondage | `poll` | Jint | Sondage interactif pour l'engagement employé |
| 26 | Boîte à idées | `idea-box` | Jint | Soumission et vote d'idées par les employés |
| 27 | Vidéo | `video` | SharePoint natif | Lecteur vidéo intégré |
| 28 | Incorporation | `embed` | SharePoint natif | Contenu externe intégré (iframe) |
| 29 | Weather | `weather` | SharePoint natif | Widget météo |
| 30 | World Clock | `world-clock` | SharePoint natif | Horloge multi-fuseaux |
| 31 | — | — | — | Slot réservé pour un nouveau webpart identifié en cours de projet |

#### Composants structurels (hors webparts)

Ces composants ne sont pas des webparts — ils forment le shell de l'intranet et se configurent au niveau du projet, pas de la page.

| Composant | Description | Phase |
|-----------|-------------|-------|
| **UEX (Unified Experience Bar)** | Barre latérale gauche persistante : navigation rapide, feed d'actualités/événements, recherche globale, centre de contribution (création articles/pages/paramètres), partage de contenu (Teams, Engage, Newsletter). Les interactions détaillées seront spécifiées ultérieurement. | Phase 1 |
| **Top navigation bar** | Barre de navigation horizontale supérieure avec onglets de pages/sites | Phase 1 |
| **Header / Branding zone** | Zone logo + titre du site + contrôles globaux (langue, accès sites, paramètres) | Phase 1 |
| **Page section system** | Système de sections avec 7 layouts : Flexible, Une colonne, Deux colonnes, Trois colonnes, Un tiers gauche, Un tiers droit, Pleine largeur + Section verticale (sidebar droite). Chaque section peut avoir un fond : aucun, couleur (neutre/soft/strong dérivée du thème), ou image de fond. Comme dans SharePoint. | Phase 1 |
| **Footer** | Footer générique présent sur toutes les pages. Liens cliquables en mode Présentation. Contenu éditable (logo, liens, copyright, réseaux sociaux). | Phase 1 |

#### Pages articles & features de traduction

En plus des pages d'intranet classiques (max 10 pages par projet), chaque démo inclut **2 pages articles** qui servent à démontrer des features clés de Jint :

| Page | Feature démontrée | Phase |
|------|-------------------|-------|
| **Article 1** | Traduction à la volée | Phase 2 |
| **Article 2** | Traduction automatique de pages | Phase 3 |

Ces pages articles sont des pages à part entière dans la navigation, avec leur propre layout. Le contenu est généré par l'IA et adapté au secteur du prospect.

**Template de page article (modèle Figma fourni par Steven) :**

```
┌─────────────────────────────────────────────────────┐
│  Header Jint (sticky)                                │
├─────────────────────────────────────────────────────┤
│  Toolbar d'actions contributeur (visible si profil   │
│  contributeur actif) :                               │
│  + Créer · Promouvoir · Traduction · Détails de la   │
│  page · Version préliminaire · Lecteur immersif ·    │
│  Analyse                                             │
│  [droite] Publié le JJ/MM/AAAA · Partager · Modifier│
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────── Hero image (full-width) ───────────┐ │
│  │                                                  │ │
│  │  Titre de l'article                             │ │
│  │                                                  │ │
│  │  [Avatar] Auteur · Poste                        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                      │
│  ┌──────────── Contenu (max 1204px) ──────────────┐ │
│  │  ## Sous-titre H2                               │ │
│  │  Paragraphe de contenu...                       │ │
│  │                                                  │ │
│  │  ## Sous-titre H2                               │ │
│  │  Paragraphe de contenu...                       │ │
│  │                                                  │ │
│  │  [Images inline, chiffres clés, citations...]   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                      │
│  Footer                                              │
└─────────────────────────────────────────────────────┘
```

Éléments de la page article :
- **Hero image** : pleine largeur, image sectorielle (Unsplash ou uploadée)
- **Titre** : titre de l'article, affiché en overlay sur le hero
- **Auteur** : avatar + nom + poste (référence un profil éditable par ID)
- **Toolbar contributeur** : visible uniquement si le profil switchable actif est le contributeur. Inclut les boutons Traduction (pour les features de traduction) et les actions de gestion de contenu
- **Métadonnées** : date de publication, boutons Partager/Modifier
- **Contenu riche** : sous-titres H2, paragraphes, texte formaté (gras, italique), listes à puces, images inline, chiffres clés, citations — tout éditable inline en mode Édition
- **Barre d'engagement** (en bas du contenu) : bouton J'aime, bouton Commentaire, compteur de vues (ex: "56 vues"), bouton "Enregistrer pour plus tard" (bookmark)
- **Section commentaires** : avatar de l'utilisateur connecté (profil switchable actif) + champ de saisie "Ajoutez un commentaire. Tapez @ pour mentionner une personne" + bouton "Publier". En démo : les compteurs (vues, likes) sont pré-remplis avec des valeurs simulées. Le champ commentaire est visible mais non fonctionnel en mode Présentation.
- **Panneau langues** (article 1) : en haut à droite, pour la traduction à la volée

**Feature 1 — Traduction à la volée (article-level)**

Panneau "Langues disponibles" affiché en haut à droite de l'article :
- Affiche la langue actuelle (ex: "Français")
- Lien "Traduire dans d'autres langues" → ouvre une modal "Sélection de la langue"
- Modal avec barre de recherche + liste de langues (Anglais, Allemand, Français, Russe, Arabe, Chinois, Espagnol)
- Au clic sur une langue → l'article se traduit instantanément, le panneau se met à jour

En démo : la traduction est pré-générée par l'IA (le contenu traduit est stocké dans le project.json). Pas d'appel API en temps réel — c'est instantané.

**Feature 2 — Traduction automatique de pages (page-level)**

Accessible via le bouton "Traduction" dans la toolbar d'actions de la page (à côté de "+ Créer", "Promouvoir", "Augmenter"). Ouvre un panel latéral droit "Traduction automatique" :

- **État initial** : Langue par défaut (Français — Publié) + bouton "+ Ajouter une nouvelle traduction"
- **Ajout de langues** : Au clic sur "+ Ajouter", liste de langues avec drapeaux, checkboxes et badge "Traduction automatique" (Anglais, Allemand, Espagnol, Portugais, Chinois, Japonais). Boutons Annuler/Confirmer.
- **Après ajout** : Les langues apparaissent sous "Langues disponibles" avec statut "Brouillon" et date de publication. Un clic sur une langue traduite redirige vers la version traduite de la page.

En démo : même principe — les traductions sont pré-générées par l'IA et stockées dans le state. Le flow est interactif (panel, checkboxes, redirection) mais les traductions ne sont pas calculées en live.

#### Images & médias

- **Source des images** : Unsplash API (recherche par mots-clés sectoriels) + upload manuel par l'utilisateur
- **Source des avatars** : Unsplash API (portraits) + upload manuel — les avatars doivent correspondre au genre du prénom
- **Formats supportés** : JPG, PNG, SVG (SVG pour les logos uniquement, pour recoloration)
- **Stockage** : Vercel Blob (MVP) → Azure Blob Storage (futur)

#### Écrans applicatifs & flows interactifs

L'intranet ne se limite pas aux pages de contenu. La UEX donne accès à des **écrans applicatifs** qui sont essentiels en démo pour montrer au prospect les capacités de gestion de contenu.

**Deux niveaux de fidélité :**

- **Flow interactif** — Le prospect parcourt un vrai parcours étape par étape (création → configuration → envoi/publication). Le contenu est pré-rempli par l'IA mais chaque étape est navigable.
- **Écran simulé** — Vue statique visuellement fidèle avec contenu généré, mais sans navigation entre étapes.

| Écran | Type | Accès depuis | Description | Phase |
|-------|------|-------------|-------------|-------|
| **Infolettre (Newsletter)** | Flow interactif | UEX → Partage → Newsletter | Dashboard de gestion (KPIs, tableau paginé, statuts) + flow complet de création d'une newsletter étape par étape | Phase 2 |
| **Création d'article** | Flow interactif | UEX → Centre de contribution → Article | Parcours de création et publication d'un article intranet | Phase 2 |
| **Partage Teams / Engage** | Flow interactif | UEX → Partage → Teams / Engage | Parcours de partage de contenu vers Teams et Viva Engage | Phase 3 |
| **Création de page** | Écran simulé | UEX → Centre de contribution → Page | Vue statique de l'interface de création de page | Phase 4 |
| **Paramètres du site** | Écran simulé | UEX → Centre de contribution → Paramètres | Vue statique des paramètres du site | Phase 4 |

#### Configurateur Jint (back-office admin)

Le Configurateur Jint est l'interface d'administration de la plateforme. En démo, il est **navigable entre onglets avec données statiques générées par l'IA** — les filtres (période, sites) ne sont pas fonctionnels. Point d'entrée à déterminer.

**Navigation latérale :** Utilisateurs, Installation et mises à jour, Expérience unifiée, Usine à sites, Multilinguisme, Traducteur automatique, Mur de réseaux sociaux, Métriques.

**Métriques → Engagement et collaboration** (4 onglets) :

| Onglet | KPIs | Graphiques | Phase |
|--------|------|------------|-------|
| **Utilisateurs** | Utilisateurs Uniques, Quotidiens Moyens, Taux d'adhérence | Bar chart quotidien, Donut dernière activité, Donut appareil, Tableau par pays | Phase 4 |
| **Sites** | Sites Actifs, Visites, Durée Moyenne | Bar charts sites les plus visités, durée moyenne, actualités/pages publiées par site | Phase 4 |
| **Pages** | Pages Publiées, Pages Actives, Vues, Vues Moyennes | Line chart publications, Bar charts pages visitées + temps moyen, Section Engagement (likes, commentaires) | Phase 4 |
| **Actualités** | Actualités Publiées, Vues, Actives, Vues Actives | Line chart, Bar charts actualités les plus vues + temps moyen, Section Engagement | Phase 4 |

**Métriques → Utilisation des fonctionnalités** (3 onglets) :

| Onglet | KPIs | Graphiques | Phase |
|--------|------|------------|-------|
| **Licences** | Licences contractuelles, utilisées, taux utilisation | Alerte limite, Line chart licences annuelles, CTA "Nous contacter" | Phase 4 |
| **WebParts** | Total composants, distincts, ajoutés, sites actifs | Progress bar adoption, Bar charts composants les plus affichés / interactions | Phase 4 |
| **Détails WebPart** | Impressions, Interactions, Taux, Composants ajoutés (par webpart sélectionné) | Line chart, Bar charts affichages + interactions par site | Phase 4 |

---

---

### Dynamic SharePoint Theme Palette

**Status:** Ready for implementation | **Priority:** P0 (bloque tous les composants visuels) | **Wave:** Foundation

Chaque intranet SharePoint utilise une couleur de marque qui se décline en 9 slots de palette (themePrimary → themeDarker). Jint Builder doit refléter les vraies couleurs du prospect, pas un bleu générique.

**Module : `src/theme/`** — Pure TypeScript, zéro dépendance. Porte l'algorithme exact de Fluent UI (`@fluentui/react` — `packages/react/src/utilities/color/shades.ts`).

**Algorithme** : Conversion hex → RGB → HSV, détermination du bracket de luminance, application de tables de facteurs spécifiques par slot (soften pour les teintes claires, strongen pour les teintes sombres), conversion retour HSV → RGB → hex.

**9 slots générés depuis une seule couleur :**

| Slot | Usage SharePoint |
|------|-----------------|
| `themePrimary` | Actions primaires, liens, états sélectionnés |
| `themeLighterAlt` | Fond teinté le plus léger |
| `themeLighter` | Fonds de hover |
| `themeLight` | Remplissages subtils, états désactivés |
| `themeTertiary` | Indicateurs secondaires |
| `themeSecondary` | Boutons secondaires |
| `themeDarkAlt` | Hover sur boutons primaires |
| `themeDark` | États actifs / pressed |
| `themeDarker` | Headers sombres, texte haut contraste |

**Points d'intégration :**
- **Color picker** (mode Édition) → `generateThemePalette(hex)` → injection CSS vars
- **Chat IA** (Phase 3) → l'IA retourne un `primaryColor` → même pipeline
- **Mode Présentation** → thème chargé depuis le project config à l'init
- **Tailwind** → CSS vars mappées vers des classes utilitaires `bg-sp-primary`, `text-sp-darker`, etc.

**Fichiers :**
```
src/theme/
├── generateThemePalette.ts   # Algorithme pur (0 deps, <1ms par appel)
├── useThemePalette.ts         # React hook (mémoïsé, injection CSS vars)
└── index.ts                   # Barrel export
```

**Critères d'acceptation :**
- `generateThemePalette('#0078d4')` retourne 9 couleurs hex valides
- `generateThemePalette('#000000')` et `'#ffffff'` ne crashent pas
- Changement de couleur → mise à jour visuelle de tous les webparts en < 100ms
- Classes Tailwind `bg-sp-primary`, `text-sp-darker`, etc. fonctionnent correctement
- Support dark mode : `generateThemePalette(color, true)` inverse la logique soften/strongen

**Performance :** `generateThemePalette()` < 1ms, injection CSS vars < 5ms, propagation visuelle < 16ms (1 frame).

---

### Intégration du Design System Figma

Le design system de Jint vit dans Figma sous forme de **collections de variables séparées** (spacing, colors, typography, radius, shadows...). Ces tokens sont la source de vérité unique — ils doivent se retrouver dans le code sans aucun hardcoding.

**Les modes light/dark existent dans Figma mais seul le mode par défaut (light) est utilisé.**

**Architecture en 3 couches :**

```
Couche 1 — shadcn/ui        Base de composants UI (boutons, inputs, dialogs...)
                             Logique intacte, styling overridé par les tokens Figma
                             ↓
Couche 2 — Tokens Figma      Extraits par Bridge (/design-workflow setup)
                             Fichier généré : src/theme/tokens.ts
                             Collections : spacing, colors, typography, radius, shadows
                             ↓
Couche 3 — Tailwind config   Consomme les tokens via tailwind.tokens.ts
                             Classes custom : text-body, gap-md, rounded-sm, sp-primary...
                             Les agents utilisent ces classes, JAMAIS les defaults Tailwind
```

**Fichiers :**

```
src/theme/
├── generateThemePalette.ts     # 9 slots couleur dynamiques (FROZEN)
├── useThemePalette.ts           # Hook injection CSS vars couleur
├── tokens.ts                    # ← GÉNÉRÉ PAR BRIDGE — tokens Figma (spacing, typography, radius, shadows)
└── index.ts

src/config/
├── tailwind.theme-palette.ts    # Mapping sp-* colors → CSS vars
└── tailwind.tokens.ts           # ← Mapping tokens Figma → classes Tailwind extend
```

**`tokens.ts`** est généré automatiquement par Bridge lors du `/design-workflow setup`. Il contient toutes les variables Figma organisées par collection. Exemple de structure :

```ts
// GÉNÉRÉ PAR BRIDGE — NE PAS MODIFIER MANUELLEMENT
// Relancer /design-workflow setup pour mettre à jour

export const figmaTokens = {
  spacing: {
    'xs': '4px', 'sm': '8px', 'md': '12px', 'lg': '16px',
    'xl': '24px', '2xl': '32px', '3xl': '48px',
  },
  fontSize: {
    'caption': ['12px', { lineHeight: '16px' }],
    'body': ['14px', { lineHeight: '20px' }],
    'body-lg': ['16px', { lineHeight: '24px' }],
    'heading-sm': ['20px', { lineHeight: '28px' }],
    'heading': ['24px', { lineHeight: '32px' }],
    'heading-lg': ['32px', { lineHeight: '40px' }],
    'display': ['40px', { lineHeight: '48px' }],
  },
  borderRadius: { 'sm': '4px', 'md': '8px', 'lg': '12px' },
  // ... autres collections Figma
} as const;
```

**`tailwind.tokens.ts`** mappe ces tokens dans Tailwind :

```ts
import { figmaTokens } from '@/theme/tokens';

export const figmaTailwindExtend = {
  spacing: figmaTokens.spacing,        // → class="p-md gap-xl m-sm"
  fontSize: figmaTokens.fontSize,      // → class="text-body text-heading-lg"
  borderRadius: figmaTokens.borderRadius, // → class="rounded-sm rounded-md"
} as const;
```

**Règles pour les agents :**
- Utiliser les classes Figma (`text-body`, `gap-md`, `rounded-sm`) — **jamais** les defaults Tailwind (`text-sm`, `gap-3`, `rounded`)
- Exception : les utilitaires Tailwind qui n'ont pas d'équivalent Figma (flex, grid, hidden, etc.) restent autorisés
- Si un token Figma manque pour un cas spécifique, signaler le manque plutôt que d'inventer une valeur

---

## 7. Non-Functional Requirements

| Catégorie | Exigence |
|-----------|----------|
| Performance | Le canvas doit se mettre à jour en < 2s après une modification |
| Performance | La génération IA initiale doit prendre < 30s pour un intranet complet |
| Fidélité | Les composants rendus doivent être identiques aux designs Figma (marges, arrondis, ombres, typographie) |
| Design system | Basé sur shadcn/ui avec le thème SharePoint custom de Jint |
| Figma source | **Tous les composants visuels** sont fournis comme modèles Figma par Steven et servent de source de vérité absolue via Bridge. Cela inclut : les 31 webparts, les composants structurels (header, footer, UEX, sections, top nav), les pages articles, les flows interactifs (newsletter, traduction), les écrans applicatifs (configurateur, login Microsoft simulé, dashboard multi-projets), et tout élément UI visible. Aucun composant ne doit être développé sans son modèle Figma correspondant. |
| Stack | App standalone Next.js ou Vite + React + Tailwind |
| Auth | Pas d'authentification. Mode Édition accessible via `/edit/{id}`. Le Sales peut basculer en mode Présentation (bouton invisible pour revenir). Le lien partagé au prospect (`/view/{token}`) est en lecture seule stricte — aucun accès au mode Édition. |
| Analytics / Tracking | PostHog pour le tracking des liens de partage (sessions, pages visitées, durée). Intégré uniquement en mode Présentation sur les liens générés — pas de tracking en mode Édition. |
| I18n — Interface | 3 locales : `en` (English), `fr-FR` (Français de France), `fr-CA` (Français canadien). L'utilisateur choisit sa langue d'interface. Les différences fr-FR / fr-CA doivent être respectées (ex: "courriel" vs "e-mail", "infolettre" vs "newsletter") |
| I18n — Contenu généré | Le contenu IA généré pour les démos s'adapte à la langue du prospect. La langue est indépendante de la locale de l'interface |
| Édition inline | Tous les webparts supportent l'édition directe du contenu (textes, descriptions, images) sur le canvas — que le contenu ait été généré par l'IA ou saisi manuellement. L'édition se fait en cliquant sur l'élément dans la preview |
| Figma → Code | Bridge (`noemuch/bridge`) connecte Claude Code à Figma Desktop via WebSocket + MCP. Les tokens (couleurs, spacing, radius, fonts) vivent dans Figma et sont extraits automatiquement — jamais hardcodés dans le code |
| Layout | Header : pleine largeur (100vw), **sticky top** — reste fixé en haut lors du scroll. La UEX (barre d'icônes) fait partie du header et est sticky avec lui ; quand un panneau UEX est ouvert, il prend toute la hauteur de la page. Zone de contenu (sections + webparts) : centrée, max-width 1204px, scrollable sous le header. Footer : pleine largeur (100vw), en bas du contenu scrollé. Exception : les sections de type `full-width` ignorent le max-width 1204px et s'étendent sur toute la largeur. |

### 7.1 Performance — Objectif zéro ralentissement

L'outil est utilisé en démo devant des prospects. Tout ralentissement visible tue la crédibilité. L'optimisation est un requirement de premier ordre, pas un nice-to-have.

**Budgets de performance :**

| Action | Budget max | Stratégie |
|--------|-----------|-----------|
| Chargement initial de l'app | < 3s | Code splitting, lazy loading des webparts, SSR/SSG pour la première page |
| Navigation entre pages | < 300ms | Toutes les pages sont dans le state en mémoire, pas de fetch serveur |
| Switch de profil | < 500ms | Changement de contexte côté client, pas de rechargement |
| Ouverture d'un flow (newsletter, etc.) | < 500ms | Composants pré-chargés, contenu déjà dans le state |
| Édition inline (clic → mode édition) | < 100ms | Pas de modal, transformation directe du composant |
| Drag & drop d'un webpart | 60fps | Pas de re-render du canvas entier, juste le webpart déplacé |
| Traduction à la volée | < 200ms | Contenu traduit pré-stocké dans le JSON, pas d'appel API |
| Ouverture de la UEX | < 300ms | Sidebar toujours montée dans le DOM, toggle de visibilité |
| Génération IA (prompt initial) | < 30s | Streaming de la réponse avec affichage progressif |
| Modification IA (prompt incrémental) | < 10s | Mise à jour partielle du state, pas de régénération complète |

**Stratégies d'optimisation :**

- **State en mémoire** : Le `project.json` est chargé une seule fois au démarrage et maintenu en mémoire. Toutes les interactions (navigation, switch profil, édition) sont des mutations du state côté client — aucun round-trip serveur
- **Lazy loading des webparts** : Chaque webpart est un chunk séparé, chargé à la demande. Les webparts hors viewport ne sont pas rendus (virtualisation)
- **Images optimisées** : Toutes les images servies en WebP/AVIF, avec des dimensions adaptées (`srcset`). Les images hors viewport sont lazy-loaded avec `loading="lazy"`
- **Pas de re-render inutile** : React.memo sur tous les webparts, état normalisé pour éviter les cascades de re-renders. Utiliser `useMemo` / `useCallback` stratégiquement
- **Animations** : Toutes les transitions en CSS (transform/opacity uniquement) pour rester sur le GPU. Pas d'animation JavaScript sur le thread principal
- **Canvas renderer** : Le canvas ne re-render que les webparts modifiés, jamais la page entière
- **Génération progressive** : Pendant la génération IA initiale, afficher un skeleton de l'intranet qui se remplit progressivement (hero → sections → webparts → contenu)
- **Pré-chargement** : En mode Présentation, pré-charger les pages adjacentes dans la navigation pour que les transitions soient instantanées

### 7.2 Gestion des erreurs — Affichage clair et gracieux

L'app ne doit jamais afficher un écran blanc, un crash, ou un message d'erreur technique incompréhensible. Chaque erreur a un traitement UX dédié.

**Principes :**
- Toujours afficher un message humain, jamais une stack trace ou un code HTTP
- Toujours proposer une action de recovery (réessayer, fallback, saisie manuelle)
- Ne jamais bloquer toute l'interface — une erreur sur un webpart n'affecte pas les autres
- Logger toutes les erreurs silencieusement côté client pour le debug

**Scénarios d'erreur et traitement :**

| Scénario | Traitement UX |
|----------|---------------|
| **Brand detection échoue** (site bloque le scraping) | Toast d'info + fallback vers saisie manuelle (nom, couleurs, logo upload). Pas de blocage. |
| **Image Unsplash non trouvée** | Placeholder avec icône + message "Image non disponible — cliquez pour uploader". Le webpart reste fonctionnel. |
| **API Claude timeout** (génération IA) | Toast d'erreur "La génération prend plus de temps que prévu" + bouton "Réessayer" + option "Continuer en mode manuel". |
| **API Claude erreur** (rate limit, 500) | Toast d'erreur avec message clair + retry automatique après 3s (max 2 retries) + fallback manuel. |
| **Upload d'image échoue** | Toast d'erreur "L'upload a échoué" + bouton "Réessayer". L'image précédente reste en place. |
| **Sauvegarde échoue** | Banner persistant en haut "Modifications non sauvegardées" + retry automatique toutes les 10s + bouton "Sauvegarder maintenant". Ne pas perdre le state en mémoire. |
| **Lien de partage invalide** | Page 404 friendly : "Cette démo n'existe plus ou le lien est incorrect" + CTA vers la page d'accueil. |
| **Webpart en erreur** (composant crashe) | Error boundary React par webpart : affiche un placeholder "Ce composant n'a pas pu être affiché" avec un bouton "Recharger". Les autres webparts continuent de fonctionner. |
| **Profil switch échoue** | Toast d'erreur + rester sur le profil actuel. Jamais de state incohérent. |
| **Project.json corrompu** | Tentative de récupération auto (dernier state valide). Si impossible, message clair avec option de repartir d'un projet neuf. |

**Composants d'erreur UI :**
- **Toast** (notifications temporaires) : Pour les erreurs récupérables (upload, API timeout). Disparaît après 5s ou au dismiss.
- **Banner** (notification persistante) : Pour les erreurs qui nécessitent une action (sauvegarde échouée). Reste visible jusqu'à résolution.
- **Placeholder inline** : Pour les erreurs de composants individuels (image non chargée, webpart crashé). Remplace le contenu sans casser le layout.
- **Page d'erreur** : Pour les erreurs fatales uniquement (projet introuvable, state corrompu). Design soigné, jamais un écran blanc.

### 7.3 Code quality — Propre, structuré, scalable

L'app est amenée à évoluer significativement : nouvelles webparts, remplacement de features (UEX, Newsletter), nouvelles intégrations. Le code doit être conçu pour que ces évolutions soient simples et sans effet de bord.

**Principes architecturaux :**

- **Plugin architecture pour les webparts** : Chaque webpart est un module autonome (dossier avec composant, types, config, tests). Ajouter un nouveau webpart = créer un dossier et l'enregistrer dans un registry. Aucune modification du code existant requise.
- **Feature modules isolés** : Chaque feature majeure (UEX, Newsletter, Traduction, Configurateur, Chat IA) est un module indépendant avec ses propres composants, hooks et types. Remplacer une feature = swapper un module, pas réécrire l'app.
- **Dependency inversion** : Les modules dépendent d'interfaces, jamais d'implémentations concrètes. Le StorageProvider en est l'exemple — le même principe s'applique au ChatProvider (Claude aujourd'hui, potentiellement autre chose demain), à l'ImageProvider (Unsplash aujourd'hui, autre API demain), etc.
- **State normalisé** : Le state du projet est une source de vérité unique et normalisée (pas de duplication de données entre webparts). Les webparts consomment le state via des selectors, jamais en accès direct.

**Structure de code par webpart :**

```
src/components/webparts/{type-id}/
├── index.ts                  ← Export public
├── {TypeId}.tsx               ← Composant principal
├── {TypeId}.types.ts          ← Types (props, config, content)
├── {TypeId}.config.ts         ← Metadata du webpart (nom, icône, catégorie, props par défaut)
├── {TypeId}.editor.tsx        ← Composant d'édition inline (mode Édition uniquement)
├── {TypeId}.skeleton.tsx      ← Skeleton loader pour le chargement progressif
├── {TypeId}.test.tsx          ← Tests unitaires
└── {TypeId}.stories.tsx       ← Storybook stories (optionnel)
```

**Webpart registry :**

```typescript
// Ajouter un webpart = 1 ligne dans le registry
const webpartRegistry: Record<string, WebpartDefinition> = {
  'news': { component: lazy(() => import('./news')), config: newsConfig },
  'focus': { component: lazy(() => import('./focus')), config: focusConfig },
  // Ajouter un nouveau webpart ici — rien d'autre à modifier
}
```

**Structure de code par feature module :**

```
src/features/{feature-name}/
├── index.ts                  ← Export public (API du module)
├── components/               ← Composants internes au module
├── hooks/                    ← Hooks spécifiques au module
├── types.ts                  ← Types internes
├── store.ts                  ← Slice de state si nécessaire
└── utils.ts                  ← Fonctions utilitaires
```

**Conventions de code :**

- TypeScript strict mode (`strict: true`, `noImplicitAny`, `noUnusedLocals`)
- Nommage : PascalCase pour les composants, camelCase pour les fonctions/variables, kebab-case pour les fichiers et dossiers
- Un composant par fichier, max ~200 lignes — au-delà, décomposer
- Props typées explicitement (pas de `any`, pas de `Record<string, unknown>` sauf dans les generics)
- Hooks custom pour la logique réutilisable (`useWebpartConfig`, `useActiveProfile`, `useProjectState`)
- Pas de logique métier dans les composants — déléguée aux hooks et utils
- Imports absolus via path aliases (`@/components`, `@/features`, `@/lib`)
- ESLint + Prettier avec config stricte, enforced en pre-commit

**Interfaces d'abstraction (prêtes pour le remplacement) :**

```typescript
// Chaque service externe est derrière une interface
interface ChatProvider {
  sendMessage(messages: Message[], state: ProjectState): AsyncGenerator<string>
}

interface ImageProvider {
  search(query: string, count: number): Promise<ImageResult[]>
  getAvatars(gender: 'male' | 'female', count: number): Promise<string[]>
}

interface BrandDetector {
  detect(url: string): Promise<BrandInfo>
}

interface TranslationProvider {
  translate(content: string, from: string, to: string): Promise<string>
}

// Implémentations concrètes injectées via config
// Claude → ChatProvider, Unsplash → ImageProvider, etc.
// Changer de provider = changer une ligne de config
```

**Tests :**

- Tests unitaires sur chaque webpart (render, props, édition)
- Tests d'intégration sur les flows critiques (génération IA, switch profil, sauvegarde)
- Tests visuels de régression (screenshot comparison) sur les webparts pour garantir la fidélité pixel-perfect
- Pas de tests end-to-end dans le MVP — à ajouter en Phase 4

### 7.1 Architecture de stockage (sans BDD)

Aucune base de données. Le stockage repose sur un **StorageProvider abstrait** avec deux implémentations : filesystem local pour le MVP (gratuit), Azure Blob Storage pour la production.

```typescript
interface StorageProvider {
  // Projets
  saveProject(id: string, data: ProjectState): Promise<void>
  loadProject(id: string): Promise<ProjectState>
  listProjects(userId: string): Promise<ProjectMeta[]>
  deleteProject(id: string): Promise<void>
  duplicateProject(id: string, newName: string): Promise<string>

  // Images (logos, photos uploadées, images swappées dans les webparts)
  uploadImage(projectId: string, file: File): Promise<string>  // returns URL
  deleteImage(url: string): Promise<void>

  // Partage
  getShareUrl(projectId: string): Promise<string>
  loadSharedProject(shareToken: string): Promise<ProjectState>  // lecture seule
}
```

**Implémentation MVP — LocalStorageProvider (gratuit, zéro infra)**

```
./data/
├── users/
│   └── {user-id}.json                  ← Profil + liste de projets
└── projects/
    └── {project-id}/
        ├── project.json                 ← State complet du projet
        └── images/
            ├── logo.svg                 ← Logo prospect (SVG pour recoloration)
            ├── {uuid}.jpg              ← Images uploadées/swappées
            └── {uuid}.png
```

- L'app Next.js tourne en local (`localhost:3000`)
- Fichiers lus/écrits via `fs/promises` de Node.js
- Lien de partage local : `localhost:3000/share/{project-id}` (réseau local uniquement)
- Idéal pour développement, tests et démos internes

**Implémentation production — AzureBlobStorageProvider**

```
Azure Blob Storage Container: jint-builder
├── users/
│   └── {user-id}.json
└── projects/
    └── {project-id}/
        ├── project.json
        └── images/
            ├── logo.svg
            └── {uuid}.jpg
```

- Même structure de fichiers, seul le transport change (Azure SDK au lieu de `fs`)
- URLs d'images via Azure CDN
- Lien de partage : `https://builder.jint.com/share/{project-id}` avec token d'accès
- Authentification via Azure AD (cohérent avec l'écosystème Microsoft/SharePoint)
- Optionnel : Azure CDN devant le blob storage pour la performance

**Basculement MVP → Production**

```env
# .env.local (MVP)
STORAGE_PROVIDER=local
DATA_DIR=./data

# .env.production (Azure)
STORAGE_PROVIDER=azure
AZURE_STORAGE_CONNECTION_STRING=...
AZURE_STORAGE_CONTAINER=jint-builder
AZURE_CDN_URL=https://cdn.builder.jint.com
```

Le code applicatif passe toujours par `StorageProvider`, jamais directement par `fs` ou le SDK Azure. Le switch est une variable d'environnement.

**Migration des données MVP → Azure :**

```bash
npx jint-migrate --from local --to azure
```

Script one-shot qui copie `./data/` vers Azure Blob Storage et met à jour les URLs d'images dans les JSON.

---

## 8. Architecture conceptuelle

```
┌──────────────────────────────────────────────────────────┐
│                      JINT BUILDER                         │
│                                                           │
│  ┌──────────────┐    ┌─────────────────────────────────┐ │
│  │  Chat Panel   │    │         Canvas (Preview)         │ │
│  │  (Copilot)    │    │   Inline editing on all content  │ │
│  │               │    │   ┌───────────────────────────┐ │ │
│  │  Prompt IA ───┼────┼──►│   SharePoint Render        │ │ │
│  │               │    │   │   (React + Tailwind + DS)  │ │ │
│  │               │    │   └───────────────────────────┘ │ │
│  └──────────────┘    └─────────────────────────────────┘ │
│          │                          ▲                      │
│          ▼                          │                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │               Unified State (Project Model)           │ │
│  │   { theme, pages[], webparts[], content, nav, uex }   │ │
│  └──────────────────────────────────────────────────────┘ │
│          │                          ▲                      │
│          ▼                          │                      │
│  ┌──────────────┐    ┌─────────────────────────────────┐ │
│  │   AI Engine   │    │      Manual Edit Sidebar         │ │
│  │  (Claude API) │    │   (drag & drop, config, inline)  │ │
│  └──────────────┘    └─────────────────────────────────┘ │
│          │                          │                      │
│          ▼                          ▼                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │   StorageProvider (abstrait)                          │ │
│  │   save/load Project · upload/delete Images · share    │ │
│  │   ┌──────────────────┐  ┌──────────────────────────┐ │ │
│  │   │  MVP: Local FS    │  │  Prod: Azure Blob Storage│ │ │
│  │   │  ./data/{id}/     │  │  + Azure CDN             │ │ │
│  │   └──────────────────┘  └──────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────┘ │
│          │                                                 │
│          ▼                                                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              External Services                        │ │
│  │  • Web scraping (brand detection from prospect URL)   │ │
│  │  • Bridge + Figma MCP (DS tokens, components)         │ │
│  │  • Claude API (content + layout generation)           │ │
│  │  • Image APIs (Unsplash, Pexels)                      │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Data Model — Project

```
Project {
  id: string
  name: string
  creationMode: "ai" | "manual"       // Mode choisi à l'onboarding
  prospect: {
    company: string
    sector: string
    sourceUrl: string | null           // Lien web fourni par l'utilisateur (mode IA)
    logo: {
      url: string
      format: "svg" | "png" | "jpg"   // SVG permet le contrôle de couleur
      svgContent: string | null        // Contenu SVG brut si format SVG (pour recoloration)
    } | null
    employee_count: number
    contentLanguage: "en" | "fr-FR" | "fr-CA"  // Langue du contenu généré pour la démo
  }
  theme: {
    primary_color: string
    secondary_color: string
    accent_color: string
    background_color: string
    font_family: string
    logo: string (URL or uploaded)
    sharepoint_theme_overrides: {}
  }
  header: {
    layout: "extended" | "compact"
    // extended = hub nav bar + local site nav (Home, Documents, Pages...)
    // compact  = hamburger menu + logo + title only
    theme: "neutral" | "soft" | "strong" | "mixed"
    // neutral = fond blanc, texte sombre
    // soft    = fond teinté clair, texte sombre
    // strong  = fond couleur primaire, texte blanc
    // mixed   = fond blanc avec hub bar en couleur primaire
    siteLogo: {
      type: "initials" | "image"
      initials: string | null        // ex: "CS" — auto-generated from site title
      image_url: string | null       // uploaded or detected logo
      background_color: string       // couleur de fond du badge (ex: bleu SharePoint)
    }
    siteTitle: string                // "SharePoint site title"
    labels: string[]                 // ex: ["Confidential", "Corporate Advisory +2"]
    hubNavigation: {                 // Hub bar (top row) — only shown in "extended" layout
      hubLogo: { initials: string, background_color: string }
      hubTitle: string               // "Hub site title"
      links: [
        { label: string, url: string }  // "Primary link", "Primary link"...
      ]
      groups: [
        { label: string, children: [] } // "Primary group" with dropdown
      ]
    }
    localNavigation: {               // Site nav (second row) — only shown in "extended" layout
      items: [
        { label: string, url: string, isActive: boolean }
        // ex: Home, Documents, Pages, Site contents, Edit
      ]
    }
    actions: {                       // Right-side actions
      showFollowButton: boolean      // "Not following" / "Following"
      showShareButton: boolean       // "Share"
    }
  }
  profiles: {
    activeProfileId: string            // ID du profil actuellement "connecté"
    switchable: [                      // 3 profils switchables (subset des 20 éditables)
      // IDs des 3 profils qui apparaissent dans la page de login Microsoft simulée
      // ex: ["profile-001", "profile-002", "profile-003"]
    ]
    editable: [                        // 20 profils éditables — les "personnages" de la démo
      {
        id: string                     // ex: "profile-001"
        firstName: string
        lastName: string
        role: "contributor" | "user"   // contributor = toolbar visible, accès création
                                       // user = vue lecture employé
        jobTitle: string               // ex: "Directrice des communications"
        department: string             // ex: "Communications"
        email: string                  // ex: "claire.dupont@prospect.com"
        phone: string | null
        location: string | null        // ex: "Montréal, QC"
        avatar: string                 // URL vers l'image de profil (blob storage)
        manager: string | null         // ID d'un autre profil (pour l'org chart)
        startDate: string | null       // Date d'embauche (pour Newcomers)
        birthDate: string | null       // Date d'anniversaire (mois/jour, pour Anniversary)
        bio: string | null             // Courte description
        skills: string[]               // Compétences (pour My resume)
        // Contenu personnalisé pour les webparts "My *" (affiché quand ce profil est actif)
        personalContent: {
          tasks: [] | null             // My tasks
          emails: [] | null            // My emails
          meetings: [] | null          // My meetings
        } | null
      }
    ]                                  // max 20 — éditables manuellement ou via IA
    generated: [                       // Profils auto-générés, non éditables
      // Même structure que editable (sans personalContent)
      // Utilisés pour remplir les webparts qui affichent plus de 20 personnes
      // (ex: Employee directory avec pagination, Org chart large)
      // Générés automatiquement par l'IA, cohérents avec le secteur et la langue
    ]
  }
  // Les webparts référencent les profils par ID (ex: news.author → "profile-003")
  // Un même profil peut apparaître dans plusieurs webparts (auteur de news + newcomer + org chart)
  // Modifier un profil éditable met à jour automatiquement tous les webparts qui le référencent
  // Switcher de profil actif met à jour : avatar/nom dans le header, toolbar visible/non,
  // contenu des webparts "My *" (tasks, emails, meetings)
  pages: [
    {
      id: string
      title: string
      slug: string
      icon: string
      order: number
      sections: [
        {
          id: string
          order: number
          layout: SectionLayout (see below)
          background: "none" | "neutral" | "soft" | "strong" | "image"
          backgroundImage: string | null   // URL de l'image de fond (quand background === "image")
          collapsible: boolean
          title: string | null (optional section title)
          columns: [
            {
              id: string
              index: number (0-based, left to right)
              webparts: [
                {
                  id: string
                  type: string (webpart type identifier)
                  config: {} (webpart-specific configuration)
                  content: {} (generated or manual content)
                  order: number (vertical position within column)
                }
              ]
            }
          ]
        }
      ]
      verticalSection: {          // Optional — sidebar persistante à droite
        webparts: [
          {
            id: string
            type: string
            config: {}
            content: {}
            order: number
          }
        ]
      } | null
    }
  ]
  navigation: {
    type: "left" | "top" | "mega-menu"
    items: [] (auto-derived from pages)
  }
  uex: {                              // Unified Experience Bar — shell global
    enabled: boolean
    sections: {
      navigate: {                     // Liens de navigation rapide
        links: [
          { label: string, url: string, icon: string }
        ]
      }
      inform: {                       // Feed d'événements + actualités
        showEvents: boolean
        showNews: boolean
        maxItems: number
      }
      search: {                       // Barre de recherche globale
        enabled: boolean
        placeholder: string
      }
      contribute: {                   // Centre de contribution
        enabled: boolean              // Accès création articles, pages, paramètres
        // Détail des interactions à définir ultérieurement
      }
      share: {                        // Partage de contenu
        channels: ["teams", "engage", "newsletter"]
        // Détail des interactions à définir ultérieurement
      }
    }
  }
  flows: {                             // Flows interactifs démontrables
    newsletter: {                      // Flow création de newsletter
      enabled: boolean
      steps: [
        {
          id: "nl-01-choose-template"
          title: "Créez votre infolettre"
          screen: "NewsletterCreateModal"
          // Modal overlay sur le dashboard
          // Options : "Page vide" OU modèle (Actualités, Annonce, Événements, Onboarding)
          // Actions : Annuler, Sélectionner
        },
        {
          id: "nl-02-editor-empty"
          title: "Éditeur — Canvas vide"
          screen: "NewsletterEditor"
          // 3 zones : sidebar composants (gauche) + canvas (centre) + panneau Page (droite)
          // Sidebar composants : Titre, Texte, Actualités, Séparateur, Image, Bouton d'action
          // Panneau Page : Objet de l'email, Police, Couleur du thème, Espacements (padding 8px)
          // Section Outline (bas gauche) : arbre des composants placés
          // Canvas : état vide "Commencez à construire votre infolettre en ajoutant des composants"
          // Actions : Retour, Continuer
        },
        {
          id: "nl-03-drag-component"
          title: "Éditeur — Drag composant"
          screen: "NewsletterEditor"
          // L'utilisateur drag un composant (ex: Actualités) depuis la sidebar vers le canvas
          // Le composant apparaît en placeholder sur le canvas
        },
        {
          id: "nl-04-component-placed"
          title: "Éditeur — Composant déposé"
          screen: "NewsletterEditor"
          // Le composant est en place sur le canvas
          // L'Outline se met à jour (ex: "News")
        },
        {
          id: "nl-05-component-configured"
          title: "Éditeur — Composant avec contenu"
          screen: "NewsletterEditor"
          // Le composant affiche son contenu : image, tags, titre d'article, auteur, date, CTA
          // Le panneau droit bascule en contexte du composant sélectionné
          //   ex: breadcrumb "Page > Actualités", bouton "Ajouter des actualités", compteur
          // Actions : Retour, Continuer
        },
        {
          id: "nl-06-send"
          title: "Éditeur — Informations & envoi"
          screen: "NewsletterSendForm"
          // Split view : formulaire (gauche) + prévisualisation du modèle (droite)
          // Formulaire : Objet de l'email, Expéditeur (chip user), Destinataires (chip groupe),
          //   Résumé (textarea), Toggle "Infolettre planifiée", Lien "Envoyer un mail test"
          // Prévisualisation : rendu final brandé (logo prospect, titre, articles, CTA)
          // Toast de confirmation "Un mail test a bien été envoyé" si test envoyé
          // Actions : Retour, Envoyer
        },
        {
          id: "nl-07-confirmation"
          title: "Dashboard — Confirmation"
          screen: "NewsletterDashboard"
          // Retour au dashboard avec toast "La infolettre a été planifiée"
          // Le tableau est mis à jour (statut changé, ex: Brouillon → Planifié)
        }
      ]
      editorComponents: [              // Composants disponibles dans l'éditeur de newsletter
        "titre", "texte", "actualites", "separateur", "image", "bouton-action"
      ]
      editorConfig: {                  // Configuration globale de l'éditeur
        layouts: ["single-column", "two-column"]  // Icônes de layout en haut à gauche
        pageSettings: {
          subject: string              // Objet de l'email
          font: string                 // Police (default: Segoe UI)
          themeColor: string           // Couleur du thème
          spacing: number              // Espacements en px (default: 8)
        }
      }
      dashboardContent: {              // Contenu du dashboard principal (KPIs + tableau)
        kpis: {
          openRate: number
          clickRate: number
          engagementRate: number
          avgReadTime: string
        }
        newsletters: [
          {
            subject: string
            modifiedDate: string
            status: "sent" | "draft" | "scheduled"
            sentDate: string | null
            scheduledDate: string | null
            sender: { name: string, avatar: string }
            author: { name: string, avatar: string }
          }
        ]
      }
    }
    article: {                         // Flow création d'article
      enabled: boolean
      steps: []                        // À documenter
    }
    sharing: {                         // Flow partage Teams / Engage
      enabled: boolean
      channels: ["teams", "engage"]
      steps: []                        // À documenter
    }
  }
  metadata: {
    created_by: string
    created_at: datetime
    updated_at: datetime
    share_url: string
  }
}

// La UEX (Unified Experience Bar) est le shell global de l'intranet.
// Elle persiste sur toutes les pages et vit en dehors du système de
// sections/webparts. Elle se configure au niveau du Project, pas de la Page.
// Les interactions détaillées (création d'article, partage Teams, etc.)
// seront spécifiées dans une phase ultérieure.

SectionLayout = 
  | "flexible"         // Layout libre (nouveau)
  | "one-column"       // 1 colonne — full width dans la zone de contenu
  | "two-column"       // 2 colonnes — 50% / 50%
  | "three-column"     // 3 colonnes — 33% / 33% / 33%
  | "one-third-left"   // 2 colonnes — 33% / 66%
  | "one-third-right"  // 2 colonnes — 66% / 33%
  | "full-width"       // Pleine largeur — sans marges latérales (bleed)

// Note : "vertical section" n'est pas un layout de section mais une sidebar
// persistante à droite de la page. Elle est modélisée séparément dans
// page.verticalSection car elle coexiste avec les sections normales.

// Chaque SectionLayout détermine le nombre de columns dans la section :
// flexible      → 1+ columns (dynamique)
// one-column    → 1 column
// two-column    → 2 columns (50/50)
// three-column  → 3 columns (33/33/33)
// one-third-left  → 2 columns (33/66)
// one-third-right → 2 columns (66/33)
// full-width    → 1 column (sans marges page)
```

---

## 9. Out of Scope (MVP)

- Export vers SharePoint réel (déploiement automatique)
- Export code déployable sur SharePoint
- Preview mobile responsive
- Collaboration multi-utilisateurs en temps réel
- Intégration avec un CRM
- Analytics sur les démos partagées (tracking visiteurs)
- Co-branding partenaire (P2)
- I18n interface (en, fr-FR, fr-CA) — hors MVP, prévu en Phase 4. Le MVP est en français uniquement

---

## 10. Risques & mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Fidélité pixel-perfect difficile à atteindre | La démo ne convainc pas le prospect | Bridge + Figma MCP comme source de vérité + tests visuels de régression |
| Brand detection incomplète (logo/couleurs non trouvés) | Expérience IA dégradée | Fallback vers upload manuel + palette par défaut |
| 31 webparts en 3 waves = scope large | Retard de livraison | Prioriser les 8 webparts Wave 1, livrer en 3 waves progressives |
| Contenu IA non crédible | Le prospect détecte le "fake" | Règles de contenu par secteur + template knowledge base (100+ templates) + possibilité d'override manuel |
| Performance de génération | UX lente, frustration utilisateur | Génération progressive (skeleton → contenu), streaming, state en mémoire |
| Scraping bloqué par le site prospect | Brand detection impossible | Fallback saisie manuelle immédiat, pas de blocage du flow |
| Évolution des webparts Jint (nouvelles versions, deprecations) | Code à réécrire | Plugin architecture : 1 webpart = 1 dossier + 1 ligne registry. Ajouter/remplacer sans toucher au reste |

---

## 11. Phasing

### Phase 1 — Foundation + Wave 1 webparts

- Setup app Next.js + Zustand + design system shadcn + thème SP
- Data model (Project state)
- Canvas renderer (render statique des webparts)
- **Sidebar avec catalogue webparts + drag & drop sur le canvas**
- **Édition inline de tous les contenus (textes, images, descriptions)**
- **Gestion des pages et navigation (ajout, suppression, renommage)**
- Composants structurels : Header (8 variantes, sticky), Footer, Top nav, UEX (icônes + panneau), Section system (7 layouts)
- Layout : header/footer full-width, contenu centré max 1204px
- **Wave 1 (8 webparts)** : News, Focus, Events, Employee directory, Search, Newcomers, Anniversary, Separator
- Dashboard multi-projets (liste + création)
- Ingestion de la template knowledge base (screenshots → index cards via agent template-analyzer)

### Phase 2 — Wave 2 webparts + Flows + Profils

- Panneau de configuration avancé par webpart (propriétés visuelles)
- Upload logo, color picker, remplacement d'images (Unsplash + upload)
- 3 profils switchables (login Microsoft simulé, switch de contexte)
- **Wave 2 (10 webparts)** : My apps, Organization chart, Profile, Newshub, My tasks, Docs, My emails, My meetings, Viva engage, Text
- Flow Newsletter (7 étapes) + Flow Création d'article
- Traduction à la volée (article-level)
- Mode Présentation (lien partageable lecture seule pour le prospect + bouton preview depuis le mode Édition pour le Sales)

### Phase 3 — AI Engine

**Étape 1 — Génération one-shot (priorité haute) :**
- Brand detection URL-based (scraping → logo/couleurs/secteur → écran de validation)
- Content generation par webpart (basé sur les AI Content Rules + template knowledge base)
- Profile generation (20 profils éditables, avatars genre-matchés)
- Layout generation (basé sur la template knowledge base, max 10 pages)
- Après la génération, toutes les modifications se font à la main (sidebar, drag & drop, édition inline)

**Autres features Phase 3 :**
- Traduction automatique de pages (page-level)
- Flow Partage Teams / Engage

**Étape 2 — Chat Copilot (dernière priorité, Phase 3 avancée ou Phase 4) :**
- Chat panel latéral (Copilot, API Claude)
- Modification incrémentale d'éléments d'interface par prompt
- Contexte filtré envoyé à l'API (pas le JSON complet)

### Phase 4 — Scale + Wave 3 webparts + Analytics

- **Wave 3 (13 webparts)** : News V2, Focus V3, Image interactive, My resume, Action button, Barre de recherche, Sondage, Boîte à idées, Vidéo, Incorporation, Weather, World Clock
- Configurateur Jint / Analytics (7 écrans, navigation entre onglets, données statiques IA)
- Écrans simulés (Création de page, Paramètres du site)
- Persistance et sauvegarde (Vercel Blob)
- Optimisation performance
- I18n interface (en, fr-FR, fr-CA)

---

## 12. Agent Workflow (Claude Code Plugin)

Pour permettre le développement assisté par IA, le projet est structuré comme un plugin Claude Code avec Bridge (noemuch/bridge) pour la connexion Figma :

```
jint-builder/
├── .claude-plugin/
│   └── plugin.json
├── CLAUDE.md                          ← Context global du projet
├── agents/
│   ├── figma-to-react.md             ← Utilise Bridge pour générer les composants depuis Figma
│   ├── content-generator.md          ← Génère le contenu sectoriel
│   ├── theme-builder.md              ← Applique la charte prospect
│   └── template-analyzer.md          ← Analyse les screenshots de templates → index cards
├── skills/
│   ├── webpart-spec/SKILL.md         ← Comment lire les specs webparts
│   ├── sharepoint-theme/SKILL.md     ← Règles du design system
│   └── content-rules/SKILL.md        ← Règles de contenu par secteur
├── commands/
│   ├── generate-webpart.md           ← /jint:generate-webpart <type-id>
│   ├── apply-theme.md                ← /jint:apply-theme <prospect>
│   ├── analyze-templates.md          ← /jint:analyze-templates <folder>
│   └── preview.md                    ← /jint:preview
├── .claude/
│   └── skills/
│       └── design-workflow/          ← Bridge design workflow (auto-scaffolded)
├── specs/                             ← Bridge specs (active, shipped, dropped)
├── templates/
│   ├── screenshots/                   ← 100+ screenshots organisés par secteur
│   └── cards/                         ← Index cards générées par template-analyzer
└── docs/
    └── webparts/
        ├── _template.md              ← Template standardisé
        └── {type-id}.md              ← Un fichier par webpart
```

### Comment les agents se coordonnent

Les agents ne se parlent pas entre eux en temps réel. Ce sont des sessions Claude Code indépendantes que Steven lance avec une commande ou un prompt. Ils communiquent via **3 mécanismes** :

**1. Le filesystem = l'état d'avancement**

Un agent n'a pas besoin qu'on lui dise "le webpart News est fait". Il regarde le dossier `src/components/webparts/news/` — s'il existe et contient du code, c'est fait. S'il n'existe pas, c'est à faire. Le code est le tracking.

**2. Les GitHub Issues = le backlog structuré**

Chaque tâche est une GitHub Issue (via le MCP GitHub). Les agents peuvent lire les issues pour savoir quoi faire, et les fermer quand c'est terminé. Les issues sont labellisées par phase, wave, et type (webpart, flow, structural, bugfix).

```
Exemples d'issues :
- [Wave 1] Webpart: News (#12) — assignée à figma-to-react
- [Wave 1] Webpart: Events (#15) — assignée à figma-to-react
- [Phase 2] Flow: Newsletter step 1-3 (#28) — assignée à figma-to-react
- [Phase 3] Content: Secteur bancaire (#45) — assignée à content-generator
```

**3. Les specs Bridge = le suivi Figma → Code**

Bridge maintient ses propres specs dans `specs/` :
- `specs/active/` → composant en cours de génération
- `specs/shipped/` → composant livré et vérifié
- `specs/dropped/` → composant abandonné ou reporté

**Workflow type d'une session agent (human-in-the-loop OBLIGATOIRE) :**

Bridge nécessite une sélection manuelle dans Figma avant chaque génération. Le workflow n'est jamais full auto — Steven est toujours dans la boucle.

```
Pour chaque composant (webpart, flow, écran, structural) :

  Steven (action humaine — OBLIGATOIRE) :
    1. Ouvre Figma Desktop
    2. Sélectionne le composant à coder (webpart, écran, etc.)
    3. Lance la commande dans Claude Code : "/jint:generate-webpart events"

  Agent figma-to-react (automatique) :
    4. Lit CLAUDE.md → comprend le contexte global
    5. Lit docs/webparts/events.md → comprend la spec fonctionnelle
    6. Vérifie src/components/webparts/events/ → n'existe pas → à créer
    7. Utilise Bridge → lit le noeud Figma SÉLECTIONNÉ par Steven (tokens, structure, variables)
    8. Génère le code React/Tailwind avec tokens DS
    9. Crée le dossier + fichiers (composant, types, config, editor, skeleton)
    10. Ajoute 1 ligne dans le webpart registry
    11. Bridge déplace la spec dans specs/shipped/

  Steven (vérification humaine) :
    12. Vérifie le résultat visuel
    13. Valide ou demande des ajustements
    14. Ferme la GitHub Issue correspondante
```

**Ce workflow s'applique à TOUT ce qui est visuel** : les 31 webparts, les composants structurels (header, footer, UEX...), les flows (newsletter, traduction...), les écrans applicatifs (configurateur, login...). Sans sélection Figma préalable par Steven, l'agent ne peut pas générer de code fidèle au design.

**Règles de parallélisme (si plusieurs agents en même temps) :**

- Chaque agent travaille sur un périmètre isolé (un webpart, un flow, un écran)
- Jamais deux agents sur le même fichier en même temps
- Les fichiers partagés (registry, project types, CLAUDE.md) ne sont modifiés que par un seul agent à la fois
- En cas de doute : un seul agent à la fois, c'est plus sûr
