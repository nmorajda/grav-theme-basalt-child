# Changelog

All notable changes to Basalt Child will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/nmorajda/grav-theme-basalt-child/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/nmorajda/grav-theme-basalt-child/releases/tag/v0.2.0
