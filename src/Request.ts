import TCGdex from './tcgdex'

export default class Request {

	// 1 hour of TTL by default
	public static ttl = 1000 * 60 * 60

	private static cache: Record<string, {response: any, time: number}> = {}

	public static async fetch<T>(url: string): Promise<T | undefined> {
		let request = this.cache[url]
		const now = new Date().getTime()
		if (!request || now - request.time > this.ttl) {
			const unfetch = TCGdex.fetch
			const resp = await unfetch(url, {
				headers: {
					'user-agent': `@tcgdex/javascript-sdk/${TCGdex.VERSION}`
				}
			})
			if (resp.status !== 200) {
				return undefined
			}

			this.cache[url] = { response: await resp.json(), time: now }
			request = this.cache[url]
		}
		return request.response
	}

}
