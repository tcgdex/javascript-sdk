import fetch from 'isomorphic-unfetch'

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
	public url: string // url is public for quick url test

	public constructor(url: string) {
		this.url = url
	}

	public async get(): Promise<T | undefined> {
		const now = new Date()
		if (
			this.fetched &&
			this.response &&
			now.getTime() - this.fetched.getTime() < Request.ttl
		) {
			return this.response
		}

		// Fetch Response
		const resp = await fetch(this.url, {
			headers: {
				"Content-Type": "text/plain"
			}
		})
		if (resp.status !== 200) {
			return undefined
		}
		const response = await resp.json()
		this.response = response
		this.fetched = now
		return response
	}
}
