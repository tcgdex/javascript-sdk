import TCGdex from './tcgdex'
import unfetch from 'unfetch'

TCGdex.fetch = window.fetch ?? unfetch as any

module.exports = TCGdex
