import { Langs } from './interfaces/Langs'
import { SetSingle, SetSimple, SetList } from './interfaces/Set'
import { CardSingle, CardList, CardSimple } from './interfaces/Card'
import { ExpansionSingle, ExpansionList } from './interfaces/Expansion'
import RequestWrapper from './Request'

export default class TCGdex {
	public static defaultLang: Langs = "en"
	public lang?: Langs

	public constructor(lang?: Langs) {
		if (lang) this.lang = lang
	}

	public getLang() {
		return this.lang || TCGdex.defaultLang
	}


	private getBaseUrl() {
		return `https://api.tcgdex.net/${this.getLang()}`
	}

	private gbu() {
		return this.getBaseUrl()
	}

	public async getCard(id: string|number, set: string): Promise<CardSingle>;
	public async getCard(id: string): Promise<CardSingle>;
	public async getCard(id: string|number, set?: string): Promise<CardSingle> {
		const txt = set ? `sets/${set}` : "cards"
		const req = this.rwgr<CardSingle>(`${this.gbu()}/${txt}/${id}/`)
		return req.get()
	}

	public async getCards(set?: string): Promise<Array<CardSimple>> {
		if (set) {
			const setSingle = await this.getSet(set)
			return setSingle.list
		}
		console.warn("note: while it's possible to fetch every cards at once it's not recommended as it take much more time than any other requests")
		const req = this.rwgr<CardList>(`${this.gbu()}/cards/`)
		const resp = await req.get()
		return resp.list
	}

	public async getSet(set: string): Promise<SetSingle> {
		const req = this.rwgr<SetSingle>(`${this.gbu()}/sets/${set}/`)
		const resp = await req.get()
		return Object.assign(resp, {releaseDate: new Date(resp.releaseDate)}) as SetSingle
	}

	public async getExpansion(expansion: string): Promise<ExpansionSingle> {
		const req = this.rwgr<ExpansionSingle>(`${this.gbu()}/expansions/${expansion}/`)
		return req.get()
	}

	public async getExpansions(): Promise<ExpansionList> {
		const req = this.rwgr<ExpansionList>(`${this.gbu()}/expansions/`)
		return req.get()
	}

	public async getSets(expansion?: string): Promise<Array<SetSimple>> {
		if (expansion) {
			const expansionSingle = await this.getExpansion(expansion)
			return expansionSingle.sets
		}
		const req = this.rwgr<SetList>(`${this.gbu()}/sets/`)
		const list = await req.get()
		return list.list
	}

	private rwgr<T>(url: string) {
		return RequestWrapper.getRequest<T>(url)
	}
}
