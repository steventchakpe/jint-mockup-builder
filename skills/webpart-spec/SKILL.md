---
name: webpart-spec
description: How to read and apply webpart specifications for Jint Builder.
---

## Role
You understand how to read webpart documentation files and translate them into code.

## Task
Guide agents in reading `docs/webparts/{type-id}.md` files and applying the spec correctly.

## Webpart doc structure

Each webpart doc follows the template in `docs/webparts/_template.md`:

1. **Identity** — Type ID, name, category, Figma node reference, wave priority
2. **Purpose** — What the webpart does in an intranet
3. **Anatomy** — Visual zones (header, content, footer)
4. **Variants** — Visual variations (from Figma component properties)
5. **Props (Configuration)** — Configurable properties exposed in Edit mode sidebar
6. **Content Schema** — TypeScript interface for the content this webpart consumes
7. **AI Content Rules** — Instructions for the content-generator agent
8. **Design Tokens** — Reference/fallback values (Bridge extracts live values from Figma)
9. **Usage Guidelines** — Do/Don't rules

## How to apply

- Props → become the `config` prop type in the React component
- Content Schema → becomes the `content` prop type
- Variants → correspond to Figma component properties, read via Bridge
- AI Content Rules → used only by the content-generator agent, not by figma-to-react
- Design Tokens → fallback reference only; Bridge provides live values from Figma

## Quality bar

- Every prop in the doc must exist in the TypeScript type
- Every content field must be typed (no `any`, no `Record<string, unknown>`)
- Variants must match Figma component properties exactly
