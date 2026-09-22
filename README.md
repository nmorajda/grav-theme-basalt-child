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
site-specific styles. The build removes a leading byte order mark (BOM) from
both generated stylesheets so they remain compatible with the Grav CSS
Pipeline.

Define child Sass variable overrides in `src/scss/_variables.scss`. They are
loaded before Basalt in compiled mode. Add site-specific rules to
`src/scss/_child.scss`; the same source is included in both CSS modes. Both
files may initially contain comments without active declarations or rules.

The child does not load its own JavaScript by default. The parent script remains
registered through the inherited `javascripts` block. Optional child JavaScript
is registered only when the generated asset manifest reports a corresponding
bundle.

## Requirements

- Basalt `>=0.5.0`, installed as the sibling `../basalt` theme with its SCSS
  sources;
- Node.js `22.23.2`, as declared in `.nvmrc` and constrained to Node.js 22 by
  `package.json`;
- npm `10.9.8`.

The child installs its own Bootstrap `5.3.8`, Sass `1.104.1`, Gulp `5.0.1` and
esbuild `0.28.2`. The build does not use `../basalt/node_modules` or
`NODE_PATH`.

## Build

Select the required Node.js version and install the exact locked dependencies:

```bash
nvm use
npm ci
```

Create all CSS and optional JavaScript bundles together with the asset
manifest:

```bash
npm run build
```

Start the default Gulp task to run a build and then watch the child SCSS,
JavaScript and vendor sources, together with the parent SCSS used by compiled
mode:

```bash
npm start
```

The available npm scripts map to these Gulp tasks:

- `npm run build:additive` runs `gulp additive` and generates `child.css`;
- `npm run build:compiled` runs `gulp compiled` and generates `compiled.css`;
- `npm run build:assets` runs `gulp assets` and generates optional asset
  bundles plus the manifest;
- `npm run build` runs `gulp build`, combining both stylesheet variants and
  optional assets;
- `npm start` runs the default Gulp task: an initial build followed by watch
  mode.

Gulp also exposes `styles` for both CSS variants and `watch` for watch mode
without the initial build. Run the relevant build before testing either CSS
mode. In particular, `compiled.css` must exist and be current before enabling
compiled mode.

## Child and vendor assets

Use these source locations:

- `src/vendor/css/*.css` contains optional third-party stylesheets;
- `src/vendor/js/*.js` contains optional third-party scripts;
- `src/js/script.js` contains site-specific initialization and behavior;
- `src/scss/_child.scss` remains the shared source of site-specific styles for
  additive and compiled modes.

Vendor files are concatenated in filename order. The build writes:

- `dist/css/child-plugins.css` when `src/vendor/css` contains non-empty CSS;
- `dist/js/child-plugins.js` when `src/vendor/js` contains non-empty
  JavaScript;
- `dist/js/child.js` when `src/js/script.js` exists;
- `dist/child-assets.json` with `css`, `js` and `script` flags controlling
  conditional Twig registration.

Empty vendor directories do not create empty bundles. With no optional vendor
files and no child script, the manifest is:

```json
{"css":false,"js":false,"script":false}
```

To add a library, place its distributed CSS and JavaScript files in the
corresponding `src/vendor` directories, add any required initialization to
`src/js/script.js`, and run `npm run build`. Do not add a child script solely to
load vendor files that initialize themselves.

The asset order is:

- CSS: child vendor CSS, the main stylesheet selected by the CSS mode, then
  `child.css` in additive mode;
- JavaScript: parent scripts, child vendor JavaScript, then `child.js`.

The manifest keeps missing optional bundles out of the page. The generated
files use ordinary Grav asset registration and remain compatible with the Grav
CSS and JavaScript pipelines.

The Sass compiler resolves imports only through the local `node_modules` and
`../basalt/src/scss`. Files in `dist/` are build outputs and must not be edited
manually. A rebuild removes obsolete optional bundles when their source files
are no longer present, while leaving unrelated distribution assets untouched.
