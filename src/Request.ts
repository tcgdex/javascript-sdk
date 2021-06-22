// Temporary disable this as it will be rebuilt to make it like the php-sdk one
// eslint-disable-next-line max-classes-per-file
import TCGdex from './tcgdex'

export class Request<T = any> {

	// 1 hour of TTL by default
	public static ttl = 1000 * 60 * 60

	private response?: T

	private fetched?: Date

	public constructor(
		// url is public for quick url test
		public url: string
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

export default class RequestWrapper {

	private static cache: Array<Request<any>> = []

	public static getRequest<T>(url: string): Request<T> {
		let request = this.cache.find((req) => req.url === url) as Request<T>|undefined
		if (!request) {
			request = new Request<T>(url)
			this.cache.push(request)
		}
		return request
	}

}
