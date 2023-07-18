<p align="center">
	<a href="https://www.tcgdex.net">
		<img src="https://www.tcgdex.net/assets/og.png" width="90%" alt="TCGdex Main Image">
	</a>
</p>
<p align="center">
	<a href="http://npmjs.com/@tcgdex/sdk">
		<img src="https://img.shields.io/npm/v/@tcgdex/sdk?style=flat-square" alt="NOM Version">
	</a>
	<a href="http://npmjs.com/@tcgdex/sdk">
		<img src="https://img.shields.io/npm/dm/@tcgdex/sdk?style=flat-square" alt="NPM Downloads">
	</a>
	<a href="https://app.codecov.io/gh/tcgdex/javascript-sdk/">
		<img src="https://img.shields.io/codecov/c/github/tcgdex/javascript-sdk?style=flat-square&token=FR4BI94N4Q" alt="npm version">
	</a>
		<a href="https://github.com/tcgdex/javascript-sdk/stargazers">
		<img src="https://img.shields.io/github/stars/tcgdex/javascript-sdk?style=flat-square" alt="Github stars">
	</a>
	<a href="https://github.com/tcgdex/javascript-sdk/actions/workflows/build.yml">
		<img src="https://img.shields.io/github/workflow/status/tcgdex/javascript-sdk/Build%20&%20Test?style=flat-square" alt="the TCGdex JAvascript SDK is released under the MIT license." />
	</a>
	<a href="https://discord.gg/NehYTAhsZE">
		<img src="https://img.shields.io/discord/857231041261076491?color=%235865F2&label=Discord&style=flat-square" alt="Discord Link">
	</a>
</p>

# TCGdex JavaScript/TypeScript SDK

The Javascript/Typescript SDK provides a convenient access with the Open Source TCGdex API.

The SDK is available in ESM and CommonJS and should be automaticly chosen.

## Documentation

_The full API/SDK documentation in progress at [API Documentation - TCGdex](https://www.tcgdex.dev)_

### Getting Started

#### How To install

**In the browser**

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

```html
<script src="https://cdn.jsdelivr.net/npm/@tcgdex/sdk@2/dist/tcgdex.browser.js"></script>
```

You cna also download the script from [JSDelivr](https://cdn.jsdelivr.net/npm/@tcgdex/sdk@2/dist/tcgdex.browser.js) by right clicking the link and selecting save link as.

**In Node.js**

Simply type the following into a terminal window:

```bash
npm install @tcgdex/sdk
```

#### Usage

_Note: a complete documentation is available at [TCGdex.dev](https://www.tcgdex.dev)_

**Example: Fetch a Card**

_in Browser_

```html
<script src="https://cdn.jsdelivr.net/npm/@tcgdex/sdk@2.4.9/dist/tcgdex.browser.js"></script>
<script>
	// Instantiate the SDK
	const tcgdex = new TCGdex('en');

	// go into an async context
	;(async () => {
		// Card will be Furret from the Darkness Ablaze Set
		const card = await tcgdex.fetch('cards', 'swsh3-136');
	})();
</script>
```

_in NodeJS (in an async context)_

```typescript
// Import the SDK in Typescript or moduleJS
import TCGdex from '@tcgdex/sdk'

// import the SDK in commonJS
const TCGdex = require('@tcgdex/sdk').default

// Instantiate the SDK
const tcgdex = new TCGdex('en');

// go into an async context
(async () => {
	// Card will be Furret from the Darkness Ablaze Set
	const card = await tcgdex.fetch('cards', 'swsh3-136');

	// You can also get the same result using
	const card = await tcgdex.fetch('sets', 'Darkness Ablaze', 136);
})();

```

**Other Examples**

```javascript
// fetch a Set's informations using the set's name or ID
await tcgdex.fetch('sets', 'Darkness Ablaze')

// Fetch a serie using the serie's name or ID
await tcgdex.fetch('series', 'Sword & Shield')

// Fetch cards possible pokemon cards HP
await tcgdex.fetch('hp');

// Fetch Cards with the specific number of HP
await tcgdex.fetch('hp', 110);

// Fetch cards possible illustrators
await tcgdex.fetch('illustrators');

// Fetch Cards with the specific illustrator
await tcgdex.fetch('illustrators', 'tetsuya koizumi');
```

**Other Endpoints**

_They work like the two (`hp` and `illustrators`) abose_

- categories: the the different cards categories
- energy-types: Fetch different types of energies
- hp: fetch the different cards possible HPs
- illustrators: fetch all the cards illustrators
- rarities: fetch the cards rarities
- retreats: fetch the cards using the retreat count
- stages: fetch differents cards stages
- suffixes: fetch differents cards suffixes
- trainer-types: fetch trainer cards types
- dex-ids: fetch pokemon Global Pokédex IDS
- types: fetch the cards using the Pokémon type(s)

## Contributing

See [CONTRIBUTING.md](https://github.com/tcgdex/javascript-sdk/blob/master/CONTRIBUTING.md)

TL::DR

- Fork

- Commit your changes

- Pull Request on this Repository

## License

This project is licensed under the IT License. A copy of the license is available at [LICENSE.md](https://github.com/tcgdex/javascript-sdk/blob/master/LICENSE.md)
