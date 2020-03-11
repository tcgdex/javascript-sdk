# TCGdex Javacript SDK

## Install

### Yarn/npm

```bash
yarn add @tcgdex/sdk
```
or with npm
```bash
npm install @tcgdex/sdk
```

## Usage

_Note: a complete documentation is in progress_

```javascript
import TCGdex from '@tcgdex/sdk'
import TranslationUtil from '@tcgdex/sdk/TranslationUtil'
import Tag from '@tcgdex/sdk/interfaces/Tag'

// init the class
const tcgdex = new TCGdex("en") // Lang code (Optionnal) (See TranslationUtil.ts line 3)

// change lang
tcgdex.lang = "fr"

// get Card object wih global id
await tcgdex.getCard("base1-1")

// get Card object with local id and set
await tcgdex.getCard(1, "base1")

// get Set informations
await tcgdex.getSet("base1")

// get Expansion
await tcgdex.getExpansion("base")

// Translate information from code to the lang
TranslationUtil.translate("tag", Tag.STAGE2, "en")
```
