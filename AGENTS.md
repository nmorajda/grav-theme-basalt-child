# Basalt child theme

## Scope

Basalt Child contains site-specific templates, styles, scripts, and branding. Keep reusable parent-theme behavior in `../basalt` and do not modify the parent during a child-only task.

This directory is a separate Git repository and currently has no npm, Gulp, SCSS, or JavaScript build pipeline.

## Assets

- Edit `dist/css/child.css` and `dist/js/child.js` directly; they are the currently served child assets.
- Do not run the Basalt parent build for child-theme asset changes.
- Keep the additive `child.css` and `child.js` names. Do not create child files matching parent asset paths such as `dist/css/style.css` or `dist/js/script.js` unless complete replacement is explicitly intended.
- Do not compile or include a second copy of Bootstrap by default.

## Inheritance

- Preserve the child-first, Basalt-second theme stream in `basalt-child.yaml`, the `BasaltChild extends Basalt` class, and the Basalt dependency in `blueprints.yaml`.
- Extend parent templates through the `@basalt` Twig namespace.
- Preserve `parent()` calls when extending parent blocks unless intentional replacement is required.
- Override only the smallest necessary blocks or partials. Avoid copying complete parent templates because copied templates stop receiving upstream changes.
- After parent-theme updates, review local template overrides for compatibility.

## Git boundary

Run Git checks and commits from this directory. Do not assume changes here are tracked by the neighboring Basalt repository, and do not commit from `../basalt` for child-theme work.
