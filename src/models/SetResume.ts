import Model from './Model'
import type TCGdexSet from './Set'

export default class SetResume extends Model {
	public id!: string
	public name!: string
	public logo?: string
	public symbol?: string
	public cardCount!: {

		/**
		 * total of number of cards
		 */
		total: number

		/**
		  * number of cards officialy (on the bottom of each cards)
		  */
		official: number
	}

	public async getSet(): Promise<TCGdexSet> {
		return (await this.sdk.set.get(this.id))!
	}
}
