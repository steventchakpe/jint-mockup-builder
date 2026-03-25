# /jint:analyze-templates

Analyze template screenshots and generate structured index cards.

## Usage

```
/jint:analyze-templates <folder>
```

Example: `/jint:analyze-templates templates/screenshots/bancaire/`

## What it does

1. Uses the `template-analyzer` agent to process each screenshot in the folder
2. For each image, generates an index card in `templates/cards/<sector>/<filename>.md`
3. Produces a batch report with: templates analyzed, webparts detected, common layouts, average reuse score

## Batch processing

Processes all images in the folder. One index card per image.
