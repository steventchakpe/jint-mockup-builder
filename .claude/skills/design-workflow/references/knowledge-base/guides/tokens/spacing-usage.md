# Spacing Usage Guide

## Token Values (from tokens.ts)

| Token | Value | Figma Name | Tailwind Class |
|-------|-------|------------|----------------|
| `none` | 0px | None | `p-none gap-none` |
| `2xs` | 2px | XXS | `p-2xs gap-2xs` |
| `xs` | 4px | XS | `p-xs gap-xs` |
| `sm-nudge` | 6px | SNudge | `p-sm-nudge` |
| `sm` | 8px | S | `p-sm gap-sm` |
| `md-nudge` | 10px | MNudge | `p-md-nudge` |
| `md` | 12px | M | `p-md gap-md` |
| `lg` | 16px | L | `p-lg gap-lg` |
| `xl` | 20px | XL | `p-xl gap-xl` |
| `2xl` | 24px | XXL | `p-2xl gap-2xl` |
| `3xl` | 32px | XXXL | `p-3xl gap-3xl` |

## UI Context Mapping

| Context | Token | Class |
|---------|-------|-------|
| Card inner padding | `lg` | `p-lg` |
| Card header padding | `lg` `xl` | `px-xl py-lg` |
| Webpart section padding | `2xl` `3xl` | `p-2xl` or `p-3xl` |
| Item gap in lists | `sm` `md` | `gap-sm` or `gap-md` |
| Between sections | `2xl` `3xl` | `gap-2xl` |
| Icon-to-text spacing | `xs` `sm` | `gap-xs` |
| Tag/badge padding | `xs` `sm` | `px-sm py-xs` |
| Button padding | `sm` `lg` | `px-lg py-sm` |
| Avatar margin | `sm` | `mr-sm` |

## Rules

- **NEVER use Tailwind defaults**: ~~`p-4`~~ → use `p-lg`; ~~`gap-3`~~ → use `gap-md`
- Exception: structural utilities without spacing equivalents (`w-full`, `flex`, `grid`)
- Use `gap-*` for flex/grid gaps, `p-*` / `px-*` / `py-*` for padding
