# Basalt Child Theme

Basalt Child is a clean starter for site-specific Grav 2 themes that inherit
from the Basalt parent theme.

## Branding

`images/logo.png` identifies the Basalt Child theme but is not automatically
used as the website logo. The default website brand is `site.title`. A site can
customize the displayed brand by overriding the public
`partials/brand.html.twig` partial.

## CSS modes

Set `assets.css_mode` in `basalt-child.yaml` or the theme configuration:

- `additive` is the default and loads the parent `dist/css/style.css` followed
  by the generated `dist/css/child.css`;
- `compiled` loads only `dist/css/compiled.css`, which contains Bootstrap,
  Basalt and child styles compiled with child-defined Sass variables.

Both modes keep the parent's optional `dist/css/icons.css`. The parent
`style.css` and child `compiled.css` must never be loaded together, and
`child.css` must not be loaded in compiled mode. Unknown mode values fall back
to additive behavior.

Both stylesheets are generated and must not be edited directly. The public
`src/scss/child.scss` entry builds the additive stylesheet without importing
Bootstrap or Basalt. The `src/scss/compiled.scss` entry adds Basalt and
Bootstrap. Both entries import `src/scss/_child.scss` as the single source of
site-specific styles.

Define child Sass variable overrides in `src/scss/_variables.scss`. They are
loaded before Basalt in compiled mode. Add site-specific rules to
`src/scss/_child.scss`; the same source is included in both CSS modes. Both
files may initially contain comments without active declarations or rules.

The child does not load its own JavaScript by default. The parent script remains
registered through the inherited `javascripts` block. Add and register a child
script only when the site requires one.

## Requirements

- Basalt `>=0.5.0`, installed as the sibling `../basalt` theme with its SCSS
  sources;
- Node.js `22.23.2`;
- npm `10.9.8`.

The child installs its own Bootstrap `5.3.8` and Sass `1.104.1`. The build does
not use `../basalt/node_modules` or `NODE_PATH`.

## Build

Install the local dependencies and compile both stylesheets:

```bash
nvm use
npm ci
npm run build
```

Build only one variant when required:

```bash
npm run build:additive
npm run build:compiled
```

Run the relevant build before testing either mode. In particular,
`compiled.css` must exist and be current before enabling compiled mode.

The Sass compiler resolves imports only through the local `node_modules` and
`../basalt/src/scss`. The build writes only `dist/css/child.css` and
`dist/css/compiled.css`; it does not remove or replace JavaScript or other
assets in `dist/`.
