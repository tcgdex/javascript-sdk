import { objectLoop } from '@dzeio/object-util'
import Model from './Model'
import SerieResume from './SerieResume'
import SetResume from './SetResume'

export default class Serie extends SerieResume {
	public sets!: Array<SetResume>
	public firstSet?: SetResume
	public lastSet?: SetResume

	protected fill(obj: object): void {
		objectLoop(obj, (value, key) => {
			switch (key) {
				case 'sets':
					this.sets = (value as Array<any>).map((it) => Model.build(new SetResume(this.sdk), it))
					break
				case 'firstSet':
					this.firstSet = Model.build(new SetResume(this.sdk), value)
					break
				case 'lastSet':
					this.lastSet = Model.build(new SetResume(this.sdk), value)
					break
				default:
					this[key] = value
					break
			}
		})
	}
}
