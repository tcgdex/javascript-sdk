# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.4.3 - 2021-07-19

### Added

- ESM exports are back

## 2.4.2 2021-07-11

### Fixed

- Downgraded to ES2015 to have better suport browsers

### Changed

- Moved browser export from `Webpack` to `esbuild`

## 2.4.1 - 2021-07-11

## Deprecated

- Deprecated `Languages` Type

## 2.4.0 - 2021-06-29

## Added

- Support for new languages

## 2.3.1 - 2021-06-22

### Fixed

- Cleaned dist folder

## 2.3.0-2.3.1 - 2021-06-22

### Added

- Browser specialized build
- [#9](https://github.com/tcgdex/javascript-sdk/pull/9) Build/Unit/ESLint tests and coverage with Codecov using Github Action

### Changed

- [#10](https://github.com/tcgdex/javascript-sdk/pull/10) Simplified Request/Cache manager

## [2.2.0] - 2021-06-19

### Added

- Added new fields

## [2.1.1] - 2021-05-31

### Fixed

- Package building in the wrong version of ECMAScript

## [2.1.0] - 2021-05-31

### Added

- new `fetch` function that manage all the API endpoints

## [2.0.2-2.0.3] - 2021-05-28

### Fixed

- `rotationMark` should have been named `regulationMark`

## [2.0.1] - 2021-05-28

### Changed

- Hardcoded string values are now strings as they depends on the language

## [2.0.0] - 2021-05-28

### Added

- simple string endpoint typing
- Typing is exported through the main.d.ts file
- `cardCount` field in the set interface
- a `rotationMark` to the card interface

### Changed

- Support new incoming datas
- Point the SDK to the new V2
- Renamed `getExpansion(s)` to `getSerie(s)`
- Typing for the new SDK
- Functions now use `fetch` instead of `get` in their names
- URL Normalization is now done by the SDK

### Removed

- TranslationUtil as now translation are managed by the API
- the interfaces folder as every interfaces are now in `interfaces.d.ts`
- `this.gbu`
- Translation files as they are now in the Compiler

## [1.7.0] - 2021-01-31

### Added

- new Rarities

## [1.6.1] - 2021-01-31

### Changed

- tags are now optionnal

## [1.6.0] - 2021-01-08

### Changed

- Errors are now handled to return `undefined`

### Removed

- console.warn when using `getCards`

## [1.5.0] - 2021-01-08

### Added

- getSet can now not transform the API Date to a Javascript Date

## [1.4.2] - 2021-01-08

### Added

- new Tags

### Changed

- rarities to have less strange rarities
-

### Fixed

- CORS blocked


## [1.4.1] - 2020-04-24

### Changed

- Changed API url to the new one

## [1.4.0] - 2020-03-25

### Added

- a `defaultLang` static field to customize the default lang
- a `getLang` function to get the current lang for the SDK

### Fixed

- Warnings for translations

## [1.3.0] - 2020-03-18

### Added

- A cache system
- some informations about differents tags on a card
- lvl on the card interface

### Removed

- cardTypes on the card interface

## [1.2.1] - 2020-03-14

### Fixed

- Fix items datas not in the correct interface

## [1.2.0] - 2020-03-14

### Added

- Added The getCards endpoint to fetch the big list of card with an optionnal  filter on the set
- Added The getExpansions endpoint to fetch the list of expansions
- Added Some informations about cardTypes
- Updated DB to add support for items

### Fixed

- Fix translation not getting the correct file


## [1.0.8] - 2020-03-11

### Changed

- Changed typing for some interfaces

## [1.0.1-1.0.7] - 2020-03-11

### Changed

- Renamed the class Name from `TCGDex` to `TCGdex`
- lang argument is now public so it can be changed while the SDK is active

### Added

- some typing for getCard and translationUtil

## [1.0.0] - 2020-03-11

### Added

- the getCard function to use with the fetch a card with it's id
- the getSet function to use with the fetch a set with it's id
- the getExpansion function to use with the fetch an expansion with it's id
- Constructor arg support for multiple langs
- TranslationUtil to go from the SDK value to a text value

[Unreleased]: https://github.com/tcgdex/javascript-sdk/compare/v2.4.3...HEAD

[2.4.3]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.4.3
[2.4.2]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.4.2
[2.4.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.4.1
[2.4.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.4.0
[2.3.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.3.1
[2.3.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.3.0
[2.2.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.2.0
[2.1.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.1.1
[2.1.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.1.0
[2.0.2-2.0.3]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.0.3
[2.0.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.0.1
[2.0.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v2.0.0
[1.7.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v1.7.0
[1.6.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/v1.6.1
[1.6.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.6.0
[1.5.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.5.0
[1.4.2]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.4.2
[1.4.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.4.1
[1.4.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.4.0
[1.3.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.3.0
[1.2.1]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.2.1
[1.2.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.2.0
[1.0.8]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.0.8
[1.0.1-1.0.7]: https://github.com/tcgdex/javascript-sdk/releases/tag/1.0.7
[1.0.0]: https://github.com/tcgdex/javascript-sdk/releases/tag/v1.0.0
