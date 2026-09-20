# Basalt Child Theme

Basalt Child is a site-specific Grav 2 theme used to validate inheritance from
the Basalt parent theme.

## CSS modes proof of concept

Set `assets.css_mode` in `basalt-child.yaml` or the theme configuration:

- `additive` is the default and loads the parent `dist/css/style.css` followed
  by the manually maintained `dist/css/child.css`;
- `compiled` loads only `dist/css/compiled.css`, which contains Bootstrap,
  Basalt and child styles compiled with child-defined Sass variables.

Both modes keep the parent's optional `dist/css/icons.css`. The parent
`style.css` and child `compiled.css` must never be loaded together, and
`child.css` must not be loaded in compiled mode. Unknown mode values fall back
to additive behavior.

Run the build before enabling compiled mode. `compiled.css` is generated from
`src/scss/` and must not be edited directly; `child.css` remains a manually
maintained additive asset.

## Requirements

- the sibling `../basalt` parent theme with its SCSS sources;
- Node.js `22.23.2`;
- npm `10.9.8`.

The child installs its own Bootstrap `5.3.8` and Sass `1.104.1`. The build does
not use `../basalt/node_modules` or `NODE_PATH`.

## Build

Install the local dependencies and compile the proof-of-concept stylesheet:

```bash
nvm use
npm ci
npm run build
```

The Sass compiler resolves imports only through the local `node_modules` and
`../basalt/src/scss`. Building `compiled.css` does not remove or replace other
files in `dist/`.
