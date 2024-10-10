import { objectLoop } from '@dzeio/object-util'
import CardResume from './CardResume'
import Model from './Model'

export default class StringEndpoint extends Model {
	public name!: string
	public cards!: Array<CardResume>

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
