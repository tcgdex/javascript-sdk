import { objectLoop } from '@dzeio/object-util'
import TCGdex from '../tcgdex'

export default abstract class Model {

	public constructor(
		protected readonly sdk: TCGdex
	) {}

	/**
	 * build a model depending on the data given
	 * @param model the model to build
	 * @param data the data to fill it with
	 */
	public static build<T extends Model>(model: T, data?: any): T {
		if (!data) {
			throw new Error('data is necessary.')
		}
		model.fill(data)
		return model
	}

	protected fill(obj: any) {
		objectLoop(obj, (value, key) => {
			(this as any)[key] = value
		})
	}
}
