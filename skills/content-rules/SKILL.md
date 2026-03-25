---
name: content-rules
description: Rules for AI-generated content by sector in Jint Builder demos.
---

## Role
You know how to generate realistic intranet content adapted to specific industry sectors.

## Universal rules

- Never use lorem ipsum or placeholder text
- Tone: internal corporate communications, professional but human
- Dates: within the last 30 days, spaced 2-5 days apart
- Names: from the 20 editable profiles, referenced by profile ID
- Images: provide Unsplash search queries, not URLs
- Avatars: must match the first name's gender
- Coherence: same people, events, and departments referenced across all webparts
- Language: match prospect's `contentLanguage` (en, fr-FR, fr-CA)
- fr-FR vs fr-CA: respect regional differences (courriel/e-mail, infolettre/newsletter, etc.)

## Sector-specific guidelines

### Bancaire / Finance
- News: regulatory changes, quarterly results, compliance updates, ESG initiatives
- Events: town halls, training sessions, compliance workshops
- Quick links: HR portal, compliance center, risk management, internal audit
- Departments: Risques, Conformité, Marchés, Retail, RH, IT, Communication
- Titles: VP Risques, Analyste conformité, Directrice retail, Responsable IT

### Municipal / Government
- News: council decisions, infrastructure projects, citizen services, seasonal programs
- Events: council meetings, community events, public consultations
- Quick links: permits, urban planning, citizen portal, elected officials
- Departments: Urbanisme, Travaux publics, Greffe, Loisirs, Communications
- Titles: Directeur urbanisme, Greffière, Coordonnateur loisirs

### Retail / Pharmacie
- News: store openings, promotional campaigns, product launches, health tips
- Events: training, seasonal campaigns, team building
- Quick links: POS system, inventory, HR, store locator
- Departments: Opérations, Marketing, Pharmacie, RH, Formation
- Titles: Directeur opérations, Pharmacienne-chef, Responsable formation

### Énergie
- News: infrastructure projects, sustainability goals, safety reports, innovation
- Events: safety drills, sustainability workshops, innovation days
- Quick links: safety protocols, project tracker, environmental reports
- Departments: Production, Distribution, Environnement, Sécurité, R&D
- Titles: Ingénieur production, Directrice environnement, Chef sécurité

### Général (multi-sector fallback)
- News: company announcements, HR updates, IT news, social events
- Events: town halls, team building, training, celebrations
- Quick links: HR portal, IT support, directory, documents
- Departments: RH, IT, Communications, Finance, Opérations
- Titles: Directeur RH, Responsable IT, Chargée de communication

## Template knowledge base

100+ manually designed intranet templates (screenshots) serve as the AI's design reference — not rigid blueprints, but proven layout patterns.

**How it works:**
1. Raw screenshots in `templates/screenshots/{sector}/`
2. `template-analyzer` agent generates index cards in `templates/cards/{sector}/{filename}.md`
3. At generation time, query index cards by sector + page type
4. Top-matching templates inform layout decisions (which webparts, order, column splits)
5. AI adapts — never copies — the template to the prospect's context

**Rules:**
- Templates are inspiration, not blueprints — always adapt
- Blend best patterns from multiple matching templates
- Fallback to `general/` templates if no sector match
- Flag to Steven if a layout pattern is not covered by any template
- Reuse score in index cards helps prioritize references
