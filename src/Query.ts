export default class Query {
	public params: Array<{ key: string, value: string | number | boolean }> = []

	public not: {
		equal: (key: string, value: string) => Query
		contains: (key: string, value: string) => Query
		includes: (key: string, value: string) => Query
		like: (key: string, value: string) => Query
		isNull: (key: string) => Query
	} = {
			equal: (key: string, value: string) => {
				this.params.push({ key: key, value: `neq:${value}` })
				return this
			},
			contains: (key: string, value: string) => {
				this.params.push({ key: key, value: `not:${value}` })
				return this
			},
			includes: (key: string, value: string) => this.not.contains(key, value),
			like: (key: string, value: string) => this.not.contains(key, value),
			isNull: (key: string) => {
				this.params.push({ key: key, value: 'notnull:' })
				return this
			}
		}

	public static create(): Query {
		return new Query()
	}

	public includes(key: string, value: string): this {
		return this.contains(key, value)
	}

	public like(key: string, value: string): this {
		return this.contains(key, value)
	}

	public contains(key: string, value: string): this {
		this.params.push({ key: key, value: value })
		return this
	}

	public equal(key: string, value: string): this {
		this.params.push({ key: key, value: `eq:${value}` })

		return this
	}

	public sort(key: string, order: 'ASC' | 'DESC'): this {
		this.params.push({ key: 'sort:field', value: key })
		this.params.push({ key: 'sort:order', value: order })

		return this
	}

	public greaterOrEqualThan(key: string, value: number) {
		this.params.push({ key: key, value: `gte:${value}` })
		return this
	}

	public lesserOrEqualThan(key: string, value: number) {
		this.params.push({ key: key, value: `lte:${value}` })
		return this
	}

	public greaterThan(key: string, value: number) {
		this.params.push({ key: key, value: `gt:${value}` })
		return this
	}

	public lesserThan(key: string, value: number) {
		this.params.push({ key: key, value: `lt:${value}` })
		return this
	}

	public isNull(key: string) {
		this.params.push({ key: key, value: 'null:' })
		return this
	}

	public paginate(page: number, itemsPerPage: number): this {
		this.params.push({ key: 'pagination:page', value: page })
		this.params.push({ key: 'pagination:itemsPerPage', value: itemsPerPage })

		return this
	}
}
