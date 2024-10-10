import type { Endpoints } from '../interfaces'
import Model from '../models/Model'
import type Query from '../Query'
import type TCGdex from '../tcgdex'

export default class Endpoint<Item extends Model, List extends Model> {
	public constructor(
		protected readonly tcgdex: TCGdex,
		protected readonly itemModel: new (sdk: TCGdex) => Item,
		protected readonly listModel: new (sdk: TCGdex) => List,
		protected readonly endpoint: Endpoints
	) { }

	public async get(id: string | number): Promise<Item | null> {
		const res = await this.tcgdex.fetch(this.endpoint as 'cards', id as string)
		if (!res) {
			return null
		}
		return Model.build(new this.itemModel(this.tcgdex), res)
	}

	public async list(query?: Query): Promise<Array<List>> {
		const res = await this.tcgdex.fetchWithQuery([this.endpoint], query?.params)
		return (res as Array<object> ?? []).map((it) => Model.build(new this.listModel(this.tcgdex), it))
	}
}
