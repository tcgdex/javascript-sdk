import { objectLoop } from '@dzeio/object-util'
import Model from './Model'
import SerieResume from './SerieResume'
import SetResume from './SetResume'

export default class Serie extends SerieResume {
	public sets!: Array<SetResume>

	protected fill(obj: object): void {
		objectLoop(obj, (value, key) => {
			switch (key) {
				case 'sets':
					this.sets = (value as Array<any>).map((it) => Model.build(new SetResume(this.sdk), it))
					break
				default:
					this[key] = value
					break
			}
		})
	}
}
