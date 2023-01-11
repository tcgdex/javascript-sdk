import TCGdex from './tcgdex'
import unfetch from 'unfetch'

TCGdex.fetch = window.fetch ?? unfetch as any

if (typeof global !== 'undefined') {
	global.TCGdex = TCGdex
}
if (typeof window !== 'undefined') {
	(window as any).TCGdex = TCGdex
}
