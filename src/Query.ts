export default class Query
{
	public params: Record<string | number, string | number> = {}

	public static create(): Query
	{
		return new Query()
	}

	public includes(key: string, value: string): this
	{
		return this.contains(key, value)
	}

	public contains(key: string, value: string): this
	{
		this.params[key] = value
		return this
	}

	public equal(key: string, value: string): this
	{
		this.params[key] = `eq:${value}`

		return this
	}

	public sort(key: string, order: string): this
	{
		this.params['sort:field'] = key
		this.params['sort:order'] = order

		return this
	}

	public paginate(page: number, itemsPerPage: number): this
	{
		this.params['pagination:page'] = page
		this.params['pagination:itemsPerPage'] = itemsPerPage

		return this
	}
}
