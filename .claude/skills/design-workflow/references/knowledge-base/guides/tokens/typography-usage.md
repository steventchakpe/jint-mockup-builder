# Typography Usage Guide

## Token Values (extracted from News component usage)

| Token | Size | Line Height | Weight | Figma Name | Class |
|-------|------|-------------|--------|------------|-------|
| `caption` | 10px | 1 (100%) | Regular | text-xxs/leading-none/medium | `text-caption` |
| `caption` semibold | 10px | 1 (100%) | Semibold | text-xxs/leading-none/semibold | `text-caption font-semibold` |
| `body` | 14px | 20px | Regular | text-sm/leading-normal/medium | `text-body` |
| `heading-sm` | 20px | 1 (100%) | Regular | text-xl/leading-none/medium | `text-heading-sm` |
| `heading` | 24px | 32px | Regular | text-2xl/leading-normal/medium | `text-heading` |
| `heading-lg` | 30px | 36px | Regular | text-3xl/leading-normal/medium | `text-heading-lg` |

## Font Family

- **Segoe UI** — Default for all SharePoint UI (header, nav, labels, buttons)
- **Prospect font** (optional) — Applied to webpart content, titles, footer, local nav when loaded

## UI Hierarchy Mapping

| Use case | Class |
|----------|-------|
| News card title (large hero) | `text-heading-lg` |
| News card title (standard) | `text-heading` |
| News card title (small/tile) | `text-heading-sm` |
| News card description / body | `text-body` |
| Tag, label, date, metadata | `text-caption` |
| Category tag (bold) | `text-caption font-semibold` |
| Webpart section title | `text-heading` |
| Author name | `text-caption font-semibold` |

## Rules

- **NEVER use Tailwind size defaults**: ~~`text-sm`~~ → use `text-body`; ~~`text-xl`~~ → use `text-heading-sm`
- **Note**: `text-sm` is a Figma size name AND a Tailwind default — always be explicit with the token class (`text-body`)
- Font weight: use `font-semibold` or `font-bold` as modifiers when needed
- Text color: use `text-sp-darker` for headings on light backgrounds, `text-white` on dark backgrounds, `text-gray-500` for metadata
