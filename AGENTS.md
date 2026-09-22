# Basalt child theme

## Scope

Basalt Child contains site-specific templates, styles, scripts, and branding. Keep reusable parent-theme behavior in `../basalt` and do not modify the parent during a child-only task.

This directory is a separate Git repository. It has a local npm, Gulp, Sass and esbuild pipeline for both CSS modes and optional child assets.

## Assets

- Files generated in `dist/`, including both main stylesheets, optional bundles and `child-assets.json`, must never be edited directly.
- Define child Sass variable overrides in `src/scss/_variables.scss` before Basalt is imported. The file may initially contain only commented examples.
- Keep all site-specific styles in `src/scss/_child.scss`. The public `child.scss` entry builds additive CSS without Basalt or Bootstrap, while `compiled.scss` builds the complete CSS with Basalt and Bootstrap.
- `src/scss/_child.scss` may initially contain only a comment and no active rules.
- Run `npm run build` to generate both CSS variants, optional asset bundles and `dist/child-assets.json`. Use the narrower build scripts only when their limited output is intentional.
- Put optional third-party CSS in `src/vendor/css/` and JavaScript in `src/vendor/js/`. Keep both directories as empty extension points with `.gitkeep` until assets are required.
- Put site-specific JavaScript initialization in `src/js/script.js`. Its presence generates `dist/js/child.js`; do not register that file unconditionally.
- Preserve manifest-controlled loading and asset order: child vendor CSS before the selected main stylesheet, additive `child.css` after it, and parent JavaScript before child vendor JavaScript and `child.js`.
- Keep the BOM removal in the stylesheet build because Grav CSS Pipeline compatibility depends on it.
- Keep build dependencies in this repository's `node_modules`. Resolve parent SCSS only from `../basalt/src/scss`; never use `../basalt/node_modules` or `NODE_PATH`.
- Empty optional source directories must remove their corresponding stale bundle and set the manifest flag to `false`. Do not delete unrelated files from `dist/`.
- Exactly one main stylesheet must be loaded: parent `style.css` in additive mode or generated child `compiled.css` in compiled mode. Never load them together, and never load `child.css` in compiled mode.
- Do not run the Basalt parent build for child-theme asset changes.
- Keep the additive `child.css` name. Do not create child files matching parent asset paths such as `dist/css/style.css` or `dist/js/script.js` unless complete replacement is explicitly intended.

## Inheritance

- Preserve the child-first, Basalt-second theme stream in `basalt-child.yaml`, the `BasaltChild extends Basalt` class, and the Basalt dependency in `blueprints.yaml`.
- Extend parent templates through the `@basalt` Twig namespace.
- Preserve `parent()` calls when extending parent blocks unless intentional replacement is required.
- Override only the smallest necessary blocks or partials. Avoid copying complete parent templates because copied templates stop receiving upstream changes.
- After parent-theme updates, review local template overrides for compatibility.

## Git boundary

Run Git checks and commits from this directory. Do not assume changes here are tracked by the neighboring Basalt repository, and do not commit from `../basalt` for child-theme work.
