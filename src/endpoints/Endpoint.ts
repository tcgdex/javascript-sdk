import { Query } from '../interface'
import Model from '../models/Model'
import TCGdex from '../tcgdex'
import { parseQuery } from '../utils'

type BaseEndpoint = 'cards' | 'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'series' | 'sets' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'

export default class Endpoint<Item extends Model, List extends Model> {
	public constructor(
		protected readonly tcgdex: TCGdex,
		protected readonly itemModel: new (sdk: TCGdex) => Item,
		protected readonly listModel: new (sdk: TCGdex) => List,
		protected readonly endpoint: BaseEndpoint

	) {}

	public async get(id: string | number): Promise<Item> {
		const res = await this.tcgdex.fetch(this.endpoint as any, id as string)
		return Model.build(new this.itemModel(this.tcgdex), res)
	}

	public async list(query: Query<Item>): Promise<Array<List>> {
		const res = await this.tcgdex.fetchWithQuery([this.endpoint as any], parseQuery(query))
		return (res as Array<any> ?? []).map((it) => Model.build(new this.listModel(this.tcgdex), it))
	}
}
