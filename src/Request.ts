import TCGdex from './tcgdex'

export default class RequestWrapper {
	private static cache: Array<Request<any>> = []

	public static getRequest<T>(url: string) {
		let req = this.cache.find((req) => req.url === url) as Request<T>|undefined
		if (!req) {
			req = new Request<T>(url)
			this.cache.push(req)
		}
		return req
	}
}

export class Request<T = any> {
	public static ttl = 1000 * 60 * 60 // 1 hour

	private response?: T
	private fetched?: Date

	public constructor(
		public url: string // url is public for quick url test
	) {}

	public async get(): Promise<T | undefined> {
		const now = new Date()
		// if reponse was already fetched and TTL was not passed
		if (
			this.fetched &&
			this.response &&
			now.getTime() - this.fetched.getTime() < Request.ttl
		) {
			return this.response
		}

		// Fetch Response
		const unfetch = TCGdex.fetch
		const resp = await unfetch(this.url, {
			headers: {
				'user-agent': `@tcgdex/javascript-sdk/${TCGdex.VERSION}`
			}
		})
		if (resp.status !== 200) {
			return undefined
		}
		this.response = await resp.json()
		this.fetched = now
		return this.response
	}
}
