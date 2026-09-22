# Changelog

All notable changes to Basalt Child will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.3.0] - 2026-09-22

### Added

- Complete Gulp pipeline for additive and compiled CSS builds.
- Optional vendor CSS and JavaScript bundles plus optional `child.js` built with esbuild.
- Generated `dist/child-assets.json` manifest controlling conditional asset registration.
- GitHub Actions workflow validating builds against Basalt `v0.7.0`.

### Changed

- Stylesheet builds remove leading BOM characters for Grav CSS Pipeline compatibility.
- Watch mode covers child sources and the parent Basalt SCSS used by compiled mode.
- Raised the minimum supported Basalt version to `0.7.0`.

## [0.2.1] - 2026-09-22

### Changed

- Rebuilt `compiled.css` from the Basalt 0.6.0 sources.

## [0.2.0] - 2026-09-20

### Added

- Selectable `additive` and `compiled` CSS modes with a safe additive fallback.
- Separate additive and compiled Sass entry points using local build dependencies.
- Shared `_variables.scss` and `_child.scss` sources for child customization.

### Changed

- Converted the theme into a clean child-theme starter.
- Moved the child theme branding asset to `images/logo.png`.
- Documented CSS modes, Sass customization and inherited JavaScript behavior.
- Raised the minimum supported Basalt version to `0.5.0`.

### Removed

- Test content, styles and JavaScript.
- Redundant page, JavaScript and `bottom` block overrides.

[Unreleased]: https://github.com/nmorajda/grav-theme-basalt-child/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/nmorajda/grav-theme-basalt-child/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/nmorajda/grav-theme-basalt-child/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/nmorajda/grav-theme-basalt-child/releases/tag/v0.2.0
