import { SetSingle, SetSimple, SetList, SetSingleRaw } from './interfaces/Set'
import { CardSingle, CardList, CardSimple } from './interfaces/Card'
import { ExpansionSingle, ExpansionList } from './interfaces/Expansion'
import RequestWrapper from './Request'
import { Langs } from './interfaces/LangList'

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
		return `https://api.tcgdex.net/v1/${this.getLang()}`
	}

	private gbu() {
		return this.getBaseUrl()
	}

	public async getCard(id: string|number, set: string): Promise<CardSingle | undefined>
	public async getCard(id: string): Promise<CardSingle | undefined>
	public async getCard(id: string|number, set?: string): Promise<CardSingle | undefined> {
		const txt = set ? `sets/${set}` : "cards"
		const req = this.rwgr<CardSingle>(`${this.gbu()}/${txt}/${id}/`)
		return req.get()
	}

	public async getCards(set?: string): Promise<Array<CardSimple> | undefined> {
		if (set) {
			const setSingle = await this.getSet(set)
			if (!setSingle) {
				return undefined
			}
			return setSingle.list
		}
		console.warn("note: while it's possible to fetch every cards at once it's not recommended as it take much more time than any other requests")
		const req = this.rwgr<CardList>(`${this.gbu()}/cards/`)
		const resp = await req.get()
		if (!resp) {
			return undefined
		}
		return resp.list
	}

	public async getSet(set: string, transformDate: false): Promise<SetSingleRaw | undefined>
	public async getSet(set: string, transformDate?: true): Promise<SetSingle | undefined>
	public async getSet(set: string, transformDate?: boolean): Promise<SetSingle | SetSingleRaw | undefined> {
		const req = this.rwgr<SetSingle>(`${this.gbu()}/sets/${set}/`)
		const resp = await req.get()
		if (!resp) {
			return undefined
		}
		if (!transformDate) {
			return resp as SetSingleRaw
		}
		return Object.assign(resp, {releaseDate: new Date(resp.releaseDate)}) as SetSingle
	}

	public async getExpansion(expansion: string): Promise<ExpansionSingle | undefined> {
		const req = this.rwgr<ExpansionSingle>(`${this.gbu()}/expansions/${expansion}/`)
		return req.get()
	}

	public async getExpansions(): Promise<ExpansionList | undefined> {
		const req = this.rwgr<ExpansionList>(`${this.gbu()}/expansions/`)
		return req.get()
	}

	public async getSets(expansion?: string): Promise<Array<SetSimple> | undefined> {
		if (expansion) {
			const expansionSingle = await this.getExpansion(expansion)
			if (!expansionSingle) {
				return undefined
			}
			return expansionSingle.sets
		}
		const req = this.rwgr<SetList>(`${this.gbu()}/sets/`)
		const list = await req.get()
		if (!list) {
			return undefined
		}
		return list.list
	}

	private rwgr<T = any>(url: string) {
		return RequestWrapper.getRequest<T>(url)
	}
}
