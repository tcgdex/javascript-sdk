# TCGdex JavaScript/TypeScript SDK

This is the SDK used to communicate with the Open source [TCGdex API](https://www.github.com/tcgdex/cards-database)

Full API/SDK documentation in progress at https://www.tcgdex.net/docs

## Install

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
const tcgdex = new TCGdex('en') // Lang code (Optionnal) (See interfaces.d.ts line 1 for supported languages)

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
