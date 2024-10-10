import type { Endpoints } from '../interfaces'
import Model from '../models/Model'
import type Query from '../Query'
import type TCGdex from '../tcgdex'

export default class SimpleEndpoint<Item extends Model, List extends string | number> {
	public constructor(
		protected readonly tcgdex: TCGdex,
		protected readonly itemModel: new (sdk: TCGdex) => Item,
		protected readonly endpoint: Endpoints
	) {}

	public async get(id: string | number): Promise<Item | null> {
		const res = await this.tcgdex.fetch(this.endpoint as 'cards', id as string)
		if (!res) {
			return null
		}
		return Model.build(new this.itemModel(this.tcgdex), res)
	}

	public async list(query?: Query): Promise<Array<List>> {
		return await this.tcgdex.fetchWithQuery([this.endpoint], query?.params) ?? []
	}
}
