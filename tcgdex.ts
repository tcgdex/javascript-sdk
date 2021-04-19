import RequestWrapper from './Request'
import { Serie, Set, Card, CardResume, SerieList, SetList, SupportedLanguages } from './interfaces'
export * from './interfaces'

export default class TCGdex {
	public static defaultLang: SupportedLanguages = "en"

	public constructor(public lang?: SupportedLanguages) {}

	public getLang() {
		return this.lang || TCGdex.defaultLang
	}


	private getBaseUrl() {
		return `https://api.tcgdex.net/v2/${this.getLang()}`
	}

	private gbu() {
		return this.getBaseUrl()
	}

	public async getCard(id: string|number, full: true, set?: string): Promise<Card<Set> | undefined>
	// @ts-expect-error Temporary while building it in the compiler
	public async getCard(id: string|number, full?: boolean, set?: string): Promise<Card | undefined> {
		const txt = set ? `sets/${set}` : "cards"
		const req = this.rwgr<Card>(`${this.gbu()}/${txt}/${id}/`)
		return req.get()
	}

	public async getCards(set?: string): Promise<Array<CardResume> | undefined> {
		if (set) {
			const setSingle = await this.getSet(set)
			if (!setSingle) {
				return undefined
			}
			return setSingle.cards
		}
		const req = this.rwgr<Array<CardResume>>(`/cards/`)
		const resp = await req.get()
		if (!resp) {
			return undefined
		}
		return resp
	}

	public async getSet(set: string): Promise<Set | undefined> {
		const req = this.rwgr<Set>(`/sets/${set}/`)
		const resp = await req.get()
		if (!resp) {
			return undefined
		}
		return resp
	}

	public async getSerie(expansion: string): Promise<Serie | undefined> {
		const req = this.rwgr<Serie>(`/expansions/${expansion}/`)
		return req.get()
	}

	public async getSeries(): Promise<SerieList | undefined> {
		const req = this.rwgr<SerieList>(`/expansions/`)
		return req.get()
	}

	public async getSets(expansion?: string): Promise<SetList | undefined> {
		if (expansion) {
			const expansionSingle = await this.getSerie(expansion)
			if (!expansionSingle) {
				return undefined
			}
			return expansionSingle.sets
		}
		const req = this.rwgr<SetList>(`/sets/`)
		const list = await req.get()
		if (!list) {
			return undefined
		}
		return list
	}

	private rwgr<T = any>(url: string) {
		return RequestWrapper.getRequest<T>(`${this.gbu()}${url}`)
	}
}
