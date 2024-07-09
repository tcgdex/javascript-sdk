import { Extension, Quality } from '../interface'
import Card from './Card'
import Model from './Model'

export default class CardResume extends Model {
	/**
	 * Globally unique card ID based on the set ID and the cards ID within the set
	 */
	public id!: string

	/**
	 * Card image url without the extension and quality
	 *
	 * @see {@link getImageURL}
	 */
	public image?: string

	/**
	 * ID indexing this card within its set, usually just its number
	 */
	public localId!: string

	/**
	 * Card Name (Including the suffix if next to card name)
	 */
	public name!: string

	/**
	 * the the Card Image full URL
	 *
	 * @param {Quality} quality the quality you want your image to be in
	 * @param {Extension} extension extension you want you image to be
	 * @return the full card URL
	 */
	public getImageURL(quality: Quality = 'high', extension: Extension = 'png'): string {
		return `${this.image}/${quality}.${extension}`
	}

	/**
	 * Get the full Card
	 *
	 * @return the full card if available
	 */
	public async getFullCard(): Promise<Card | undefined> {
		return this.sdk.card.get(this.id)
	}
}
