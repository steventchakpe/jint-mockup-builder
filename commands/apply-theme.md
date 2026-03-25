# /jint:apply-theme

Detect a prospect's brand from their website and generate a SharePoint theme.

## Usage

```
/jint:apply-theme <company-name> <website-url>
```

Example: `/jint:apply-theme "Hydro-Québec" https://www.hydroquebec.com`

## What it does

1. Uses the `theme-builder` agent to scrape the website
2. Extracts: logo (SVG preferred), colors, sector
3. Presents a validation screen to Steven
4. Generates theme CSS custom properties
5. Updates the Project state with the theme + header configuration

## Fallback

If scraping fails, switches to manual input mode.
