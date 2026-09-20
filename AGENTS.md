# Basalt child theme

## Scope

Basalt Child contains site-specific templates, styles, scripts, and branding. Keep reusable parent-theme behavior in `../basalt` and do not modify the parent during a child-only task.

This directory is a separate Git repository. It has a local npm and Sass pipeline for the compiled CSS proof of concept, but no Gulp or JavaScript build pipeline.

## Assets

- `dist/css/child.css` and `dist/css/compiled.css` are generated; never edit them directly.
- Keep all site-specific styles in `src/scss/_child.scss`. The public `child.scss` entry builds additive CSS without Basalt or Bootstrap, while `compiled.scss` builds the complete CSS with Basalt and Bootstrap.
- Run `npm run build` to generate both CSS variants, or use `npm run build:additive` and `npm run build:compiled` for one variant.
- `dist/js/child.js` is manually maintained and shared by both CSS modes.
- Keep build dependencies in this repository's `node_modules`. Resolve parent SCSS only from `../basalt/src/scss`; never use `../basalt/node_modules` or `NODE_PATH`.
- The build may write only the two generated CSS files and must not remove or replace JavaScript or other files in `dist/`.
- Exactly one main stylesheet must be loaded: parent `style.css` in additive mode or generated child `compiled.css` in compiled mode. Never load them together, and never load `child.css` in compiled mode.
- Do not run the Basalt parent build for child-theme asset changes.
- Keep the additive `child.css` and `child.js` names. Do not create child files matching parent asset paths such as `dist/css/style.css` or `dist/js/script.js` unless complete replacement is explicitly intended.

## Inheritance

- Preserve the child-first, Basalt-second theme stream in `basalt-child.yaml`, the `BasaltChild extends Basalt` class, and the Basalt dependency in `blueprints.yaml`.
- Extend parent templates through the `@basalt` Twig namespace.
- Preserve `parent()` calls when extending parent blocks unless intentional replacement is required.
- Override only the smallest necessary blocks or partials. Avoid copying complete parent templates because copied templates stop receiving upstream changes.
- After parent-theme updates, review local template overrides for compatibility.

## Git boundary

Run Git checks and commits from this directory. Do not assume changes here are tracked by the neighboring Basalt repository, and do not commit from `../basalt` for child-theme work.
