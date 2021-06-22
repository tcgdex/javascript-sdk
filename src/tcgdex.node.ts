import TCGdex from './tcgdex'
import fetch from 'isomorphic-unfetch'

TCGdex.fetch = fetch as any

export default TCGdex
export * from './tcgdex'
