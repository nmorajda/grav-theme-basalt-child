# Basalt Child Theme

Basalt Child is a site-specific Grav 2 theme used to validate inheritance from
the Basalt parent theme.

## CSS modes proof of concept

The current page continues to use the additive mode:

- Basalt loads the parent `dist/css/style.css`;
- the child template adds the manually maintained `dist/css/child.css`.

The proof of concept also builds a complete, independent stylesheet at:

```text
dist/css/compiled.css
```

This file includes Bootstrap and Basalt styles compiled with child-defined Sass
variables. It is generated from `src/scss/` and is not loaded by Twig yet.

Do not edit `compiled.css` directly. The existing `child.css` remains a
manually maintained asset until the CSS mode work is completed.

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
