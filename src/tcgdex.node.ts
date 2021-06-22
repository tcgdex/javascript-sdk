import TCGdex from './tcgdex'
import fetch from 'node-fetch'

TCGdex.fetch = fetch as any

export default TCGdex
export * from './tcgdex'
