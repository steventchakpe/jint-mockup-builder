# Components Overview

## Scope

This knowledge base is scoped to the **News webpart** components extracted from the "● News 🟠" page of the Figma library.

Additional components will be added as other pages are extracted.

## Available Components

### webparts-jint / News

| Component | Key | Variants | When to use |
|-----------|-----|----------|-------------|
| `News` | `9babcb0b9d846bc4ed6bd0c80c089d2579daa042` | 18 | Main news webpart — choose Layout + Format + Radius |
| `Top story - Items` | `6da929a95833a016f60a5f829a5836a1b1a17bba` | 4 | Sub-items inside Top Story layout |
| `Hero - Items` | `44ab33c215f4d6b9d47ebaed1629f89650ca4f19` | 3 | Sub-items inside Hero layout |

## News Component Props

### Layout
| Value | Description |
|-------|-------------|
| `Top Story` (default) | Featured article top + grid below |
| `Hero` | Full-width hero with overlay text |
| `Tiles verticales` | Vertical tile cards |
| `Carousel` | Horizontal carousel |

### Format
| Value | Description |
|-------|-------------|
| `3/3` (default) | 3 articles in a row |
| `1/2` | 1 large + 2 smaller |
| `Responsive` | Adapts to container width |

### Radius
| Value | Description |
|-------|-------------|
| `Default` | Radius from theme |
| `Normal` | Medium radius (rounded-md) |
| `Large` | Large radius (rounded-lg) |
| `None` | No radius (squared) |

## Import API

```js
// Import the main News component set
const newsSet = await figma.importComponentSetByKeyAsync("9babcb0b9d846bc4ed6bd0c80c089d2579daa042");

// Import Top Story Items
const topStoryItems = await figma.importComponentSetByKeyAsync("6da929a95833a016f60a5f829a5836a1b1a17bba");

// Import Hero Items
const heroItems = await figma.importComponentSetByKeyAsync("44ab33c215f4d6b9d47ebaed1629f89650ca4f19");
```

## Decision Tree

```
I need a news display webpart →
  ├── Full-width hero style? → Layout: Hero + Hero-Items
  ├── Featured top + grid? → Layout: Top Story + Top story-Items
  ├── Card tiles? → Layout: Tiles verticales
  └── Carousel/slider? → Layout: Carousel
```
