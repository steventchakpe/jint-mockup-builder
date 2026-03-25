#!/bin/bash
# Run this script to generate stub .md docs for all webparts
# Each stub references the template and is ready to be filled in

WEBPARTS=(
  "news:News:actualites:1"
  "focus:Focus:hero:1"
  "events:Événements:evenements:1"
  "employee-directory:Annuaire des employés:annuaire:1"
  "search:Recherche:navigation:1"
  "newcomers:Nouveaux arrivants:annuaire:1"
  "anniversary:Anniversaires:annuaire:1"
  "separator:Séparateur:layout:1"
  "my-apps:Mes applications:productivite:2"
  "org-chart:Organigramme:annuaire:2"
  "profile:Profil:profil:2"
  "newshub:Newshub:actualites:2"
  "my-tasks:Mes tâches:productivite:2"
  "docs:Documents:documents:2"
  "my-emails:Mes emails:productivite:2"
  "my-meetings:Mes réunions:productivite:2"
  "viva-engage:Viva Engage:social:2"
  "text:Texte:layout:2"
  "news-v2:News V2:actualites:3"
  "focus-v3:Focus V3:hero:3"
  "image-interactive:Image interactive:medias:3"
  "my-resume:Mon CV:profil:3"
  "action-button:Bouton d'action:layout:3"
  "search-bar:Barre de recherche:navigation:3"
  "poll:Sondage:formulaires:3"
  "idea-box:Boîte à idées:formulaires:3"
  "video:Vidéo:medias:3"
  "embed:Incorporation:medias:3"
  "weather:Météo:widgets:3"
  "world-clock:Horloge mondiale:widgets:3"
)

for entry in "${WEBPARTS[@]}"; do
  IFS=':' read -r id name category wave <<< "$entry"
  
  cat > "docs/webparts/${id}.md" << EOF
# ${name}

> Webpart documentation — see \`docs/webparts/_template.md\` for the full template.
> Fill in each section as the webpart is designed and developed.

---

## Identity

| Champ | Valeur |
|-------|--------|
| **Type ID** | \`${id}\` |
| **Nom affiché** | ${name} |
| **Catégorie** | \`${category}\` |
| **Figma node** | *À renseigner — sélectionner dans Figma avant génération* |
| **Wave** | wave-${wave} |
| **Source** | Jint |

---

## Purpose

*À documenter*

---

## Props (Configuration)

*Extraites automatiquement par Bridge depuis les Figma component properties.*

---

## Content Schema

*À documenter — interface TypeScript du contenu consommé par ce webpart.*

---

## AI Content Rules

*À documenter — règles pour le content-generator agent.*

---

## Design Tokens

*Référence/fallback — les valeurs live viennent de Figma via Bridge.*
EOF

  echo "Created docs/webparts/${id}.md"
done
