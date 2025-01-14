import type { Endpoints } from './interfaces'

/**
 * detect the current running context ofthe program
 */
export function detectContext(): 'browser' | 'server' {
	try {
		const isBrowser = !!window
		return isBrowser ? 'browser' : 'server'
	} catch {
		return 'server'
	}
}

export const ENDPOINTS: ReadonlyArray<Endpoints> = [
	'cards', 'categories', 'dex-ids', 'energy-types',
	'hp', 'illustrators', 'rarities', 'regulation-marks',
	'retreats', 'series', 'sets', 'stages', 'suffixes',
	'trainer-types', 'types', 'variants', 'random'
] as const
