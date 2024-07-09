import { CardResume, SupportedLanguages } from '../interfaces'
import TCGdex from '../tcgdex'
import Model from './Model'
import SetResume from './SetResume'

export default class Set extends SetResume {
	public serie!: SerieResume
	public tcgOnline?: string
	public variants?: variants

	public releaseDate!: string

	/**
	 * Designate if the set is usable in tournaments
	 *
	 * Note: this is specific to the set and if a
	 * card is banned from the set it will still be true
	 */
	public legal!: {

		/**
		 * Ability to play in standard tournaments
		 */
		standard: boolean

		/**
		 * Ability to play in expanded tournaments
		 */
		expanded: boolean
	}

	public cardCount!: {

		/**
		 * total of number of cards
		 */
		total: number

		/**
		 * number of cards officialy (on the bottom of each cards)
		 */
		official: number

		/**
		 * number of cards having a normal version
		 */
		normal: number

		/**
		 * number of cards having an reverse version
		 */
		reverse: number

		/**
		 * number of cards having an holo version
		 */
		holo: number

		/**
		 * Number of possible cards
		 */
		firstEd?: number
	}

	public cards!: Array<CardResume>
}
