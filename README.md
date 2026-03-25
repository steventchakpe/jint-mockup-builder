# Jint Builder

AI-first SharePoint intranet demo generator for Jint sales teams, CSMs, and partner integrators.

## What is this?

Jint Builder generates interactive, pixel-perfect SharePoint intranet demos. Users can create demos via AI prompts or manually, customize them with drag & drop, and share navigable preview links with prospects.

## Quick start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Project structure

```
jint-builder/
├── CLAUDE.md                 ← Instructions for Claude Code agents
├── docs/
│   ├── PRD.md                ← Full product requirements document
│   └── webparts/             ← Spec for each webpart
├── agents/                   ← Claude Code agent definitions
├── skills/                   ← Claude Code skill definitions
├── commands/                 ← Claude Code slash commands
├── templates/                ← Template knowledge base (screenshots + index cards)
├── specs/                    ← Bridge specs (Figma → Code tracking)
└── src/
    ├── components/
    │   ├── webparts/         ← 31 webpart components (1 folder each)
    │   ├── structural/       ← Header, Footer, UEX, Top nav, Sections
    │   ├── flows/            ← Newsletter, Article, Sharing, Translation
    │   ├── screens/          ← Configurator, Microsoft Login, Dashboard
    │   ├── canvas/           ← Main canvas renderer
    │   ├── chat/             ← Copilot chat panel (Phase 3)
    │   └── sidebar/          ← Edit mode sidebar
    ├── lib/
    │   ├── state/            ← Zustand project store
    │   ├── storage/          ← StorageProvider (local → Azure)
    │   ├── ai/               ← Claude API integration (Phase 3)
    │   ├── theme/            ← Theme engine (CSS custom properties)
    │   ├── brand-detection/  ← Website scraping (Phase 3)
    │   ├── profiles/         ← Profile management + switching
    │   └── i18n/             ← Internationalization (Phase 4)
    ├── types/                ← TypeScript type definitions
    └── config/               ← Webpart registry, app config
```

## Tech stack

- **Framework**: Next.js + React
- **Styling**: Tailwind CSS + shadcn/ui + SharePoint theme
- **State**: Zustand
- **Design source**: Figma via Bridge (noemuch/bridge)
- **AI**: Claude API (Phase 3)
- **Storage**: Local filesystem (MVP) → Vercel Blob → Azure Blob Storage
- **Images**: Unsplash API + manual upload

## Development with Claude Code

This project is structured as a Claude Code plugin. Agents can generate webparts, content, and themes.

```bash
# Generate a webpart (select component in Figma first!)
/jint:generate-webpart events

# Apply prospect branding
/jint:apply-theme "Hydro-Québec" https://www.hydroquebec.com

# Analyze template screenshots
/jint:analyze-templates templates/screenshots/bancaire/
```

See `CLAUDE.md` for full agent instructions and conventions.

## Phases

1. **Foundation** — App setup + 8 Wave 1 webparts + structural components + dashboard
2. **Manual Edit** — Sidebar + drag & drop + 10 Wave 2 webparts + flows + translations
3. **AI Engine** — Chat Copilot + brand detection + content generation + layout generation
4. **Scale** — 13 Wave 3 webparts + Configurator/Analytics + persistence + i18n
