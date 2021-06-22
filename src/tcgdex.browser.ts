import TCGdex from './tcgdex'
import unfetch from 'unfetch'

TCGdex.fetch = unfetch as any

export default TCGdex
export * from './tcgdex'
