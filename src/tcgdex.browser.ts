import unfetch from 'unfetch'
import TCGdex from './tcgdex'

TCGdex.fetch = window.fetch ?? unfetch as any

export default TCGdex
