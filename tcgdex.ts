import RequestWrapper from './Request'
import { Serie, Set, Card, CardResume, SerieList, SetList, SupportedLanguages } from './interfaces'

export default class TCGdex {
	public static defaultLang: SupportedLanguages = "en"

	public constructor(public lang?: SupportedLanguages) {}

	public getLang() {
		return this.lang || TCGdex.defaultLang
	}

	private getBaseUrl() {
		return `https://api.tcgdex.net/v2/${this.getLang()}`
	}

	public async fetchCard(id: string | number, set?: string): Promise<Card | undefined> {
		const path = `/${set ? `sets/${set}` : 'cards'}/${id}/`
		return this.rwgr<Card>(path).get()
	}

	public async fetchCards(set?: string): Promise<Array<CardResume> | undefined> {
		if (set) {
			const setSingle = await this.fetchSet(set)
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

	public async fetchSet(set: string): Promise<Set | undefined> {
		const req = this.rwgr<Set>(`/sets/${set}/`)
		const resp = await req.get()
		if (!resp) {
			return undefined
		}
		return resp
	}

	public async fetchSerie(expansion: string): Promise<Serie | undefined> {
		const req = this.rwgr<Serie>(`/series/${expansion}/`)
		return req.get()
	}

	public async fetchSeries(): Promise<SerieList | undefined> {
		const req = this.rwgr<SerieList>(`/series/`)
		return req.get()
	}

	public async fetchSets(expansion?: string): Promise<SetList | undefined> {
		if (expansion) {
			const expansionSingle = await this.fetchSerie(expansion)
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
		return RequestWrapper.getRequest<T>(`${this.getBaseUrl()}${url}`)
	}
}
