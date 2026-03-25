# /jint:generate-webpart

Generate a React component for a Jint Builder webpart from its Figma design.

## Usage

```
/jint:generate-webpart <type-id>
```

Example: `/jint:generate-webpart events`

## Prerequisites

1. Steven has selected the webpart component in Figma Desktop
2. The webpart spec exists at `docs/webparts/<type-id>.md`
3. Bridge is initialized (`/design-workflow setup` has been run)

## What it does

1. Reads the webpart spec from `docs/webparts/<type-id>.md`
2. Checks that `src/components/webparts/<type-id>/` doesn't already exist
3. Uses the `figma-to-react` agent to read the selected Figma component via Bridge
4. Generates all files: component, types, config, editor, skeleton, tests
5. Registers the webpart in `src/config/webpart-registry.ts`
6. Reports what was created

## If the webpart already exists

Asks for confirmation before overwriting. Alternatively, edit specific files manually.
