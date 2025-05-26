import { objectLoop } from '@dzeio/object-util'
import CardResume from './CardResume'
import Model from './Model'
import type { Booster, Variants } from './Other'
import type SerieResume from './SerieResume'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default class Set extends Model {
	public id!: string
	public name!: string
	public logo?: string
	public symbol?: string
	public serie!: SerieResume
	public tcgOnline?: string
	public variants?: Variants

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

	public boosters?: Array<Booster>

	public async getSerie() {
		return this.sdk.serie.get(this.serie.id)
	}

	protected fill(obj: object): void {
		objectLoop(obj, (value, key) => {
			switch (key) {
				case 'cards':
					this.cards = (value as Array<any>).map((it) => Model.build(new CardResume(this.sdk), it))
					break
				default:
					this[key] = value
					break
			}
		})
	}
}
