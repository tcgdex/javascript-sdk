<p align="center">
	<a href="http://npmjs.com/@tcgdex/sdk">
		<img src="https://img.shields.io/npm/v/@tcgdex/sdk?style=flat-square" alt="NOM Version">
	</a>
	<a href="http://npmjs.com/@tcgdex/sdk">
		<img src="https://img.shields.io/npm/dw/@tcgdex/sdk?style=flat-square" alt="NPM Downloads">
	</a>
	<a href="https://app.codecov.io/gh/tcgdex/javascript-sdk/">
		<img src="https://img.shields.io/codecov/c/github/tcgdex/javascript-sdk?style=flat-square&token=FR4BI94N4Q" alt="npm version">
	</a>
	<a href="https://github.com/tcgdex/javascript-sdk/blob/master/LICENSE.md">
		<img src="https://img.shields.io/github/license/tcgdex/javascript-sdk?style=flat-square" alt="the TCGdex JAvascript SDK is released under the MIT license." />
	</a>
	<a href="https://github.com/tcgdex/javascript-sdk/blob/master/LICENSE.md">
		<img src="https://img.shields.io/github/workflow/status/tcgdex/javascript-sdk/Build%20&%20Test?style=flat-square" alt="the TCGdex JAvascript SDK is released under the MIT license." />
	</a>

</p>

# TCGdex JavaScript/TypeScript SDK

Communicate with the Open Source TCGdex API in Javascript/Typescript using the SDK

Full API/SDK documentation in progress at https://www.tcgdex.net/docs

## Getting Started

Install the SDK using:
```bash
yarn add @tcgdex/sdk
# or
npm install @tcgdex/sdk
```

## Usage

_Note: a complete documentation is in progress_

```javascript
import TCGdex from '@tcgdex/sdk'

// initialize the SDK
const tcgdex = new TCGdex('en') // Lang code (Optionnal) (See interfaces.ts line 1 for supported languages)

// if you need to change the language
tcgdex.lang = 'fr'

// get a Card using its global ID
await tcgdex.fetch('cards', 'base1-1')

// fetch a Card using it's local id and set name/ID
await tcgdex.fetch('sets', 'Base Set', 1)

// fetch a Set's informations using the set's name/ID
await tcgdex.fetch('sets', 'Sword & Shield')

// Fetch a serie using the serie's name/ID
await tcgdex.fetch('series', 'Black & White')

// Fetch cards using other endpoints
/**
 * categories => the the different cards categories
 * hp => fetch the different cards possible HPs
 * illustrators => fetch all the cards illustrators
 * rarities => fetch the cards rarities
 * retreats => fetch the cards using the retreat count
 * types => fetch the cards using the Pokémon type(s)
 **/
await tcgdex.fetch('categories')
```
