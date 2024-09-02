import type CardResume from './CardResume'
import Model from './Model'

export default class StringEndpoint extends Model {
	public name!: string
	public cards!: Array<CardResume>
}
