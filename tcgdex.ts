import fetch from 'isomorphic-unfetch'
import { Langs } from './interfaces/Langs'
import { SetSingle, SetRequest, SetList, SetSimple } from './interfaces/Set'
import { CardSingle } from './interfaces/Card'
import { ExpansionSingle, ExpansionList } from './interfaces/Expansion'

export default class TCGdex {
	public lang: Langs = "en"

	public constructor(lang?: Langs) {
		if (lang) this.lang = lang
	}

	private getBaseUrl() {
		return `https://api.tcgdex.net/${this.lang}`
	}

	private gbu() {
		return this.getBaseUrl()
	}

	public async getCard(id: string|number, set: string): Promise<CardSingle>;
	public async getCard(id: string): Promise<CardSingle>;
	public async getCard(id: string|number, set?: string): Promise<CardSingle> {
		try {
			const txt = set ? `sets/${set}` : "cards"
			const resp = await fetch(`${this.gbu()}/${txt}/${id}/`)
			if (resp.status !== 200) throw new Error("Card not found")
			try {
				return await resp.json()
			} catch (e) {
				throw e
			}
		} catch (e) {
			throw e
		}
	}

	public async getCards(set?: string) {
		if (set) {
			try {
				const setSingle = await this.getSet(set)
				return setSingle.list
			} catch (e) {
				throw e
			}
		}
		try {
			console.warn("note: while it's possible to fetch every cards at once it's not recommended as it take much more time than any other requests")
			const resp = await fetch(`${this.gbu()}/cards/`)
			if (resp.status !== 200) {
				throw new Error("Could not fetch cards")
			}
			try {
				return resp.json()
			} catch (e) {
				throw e
			}
		} catch (e) {
			throw e
		}
	}

	public async getSet(set: string): Promise<SetSingle> {
		try {
			const resp = await fetch(`${this.gbu()}/sets/${set}/`)
			console.log(resp.status)
			if (resp.status !== 200) throw new Error("Set not found")
			try {
				const setTmp: SetRequest = await resp.json();
				return Object.assign(setTmp, {releaseDate: new Date(setTmp.releaseDate)}) as SetSingle
			} catch (e) {
				throw e
			}
		} catch (e) {
			throw e
		}
	}

	public async getExpansion(expansion: string): Promise<ExpansionSingle> {
		try {
			const resp = await fetch(`${this.gbu()}/expansions/${expansion}/`)
			if (resp.status !== 200) throw new Error("Expansion not found")
			try {
				return await resp.json()
			} catch (e) {
				throw e
			}
		} catch (e) {
			throw e
		}
	}

	public async getExpansions(): Promise<ExpansionList> {
		try {
			const resp = await fetch(`${this.gbu()}/expansions/`)
			if (resp.status !== 200) throw new Error("Could not fetch expansions")
			try {
				return await resp.json()
			} catch (e) {
				throw e
			}
		} catch (e) {
			throw e
		}
	}

	public async getSets(expansion?: string): Promise<Array<SetSimple>> {
		if (expansion) {
			try {
				const expansionSingle = await this.getExpansion(expansion)
				return expansionSingle.sets
			} catch (e) {
				throw e
			}
		} else {
			try {
				const resp = await fetch(`${this.gbu()}/sets/`)
				if (resp.status !== 200) {
					throw new Error("Could not fetch sets")
				}
				try {
					return resp.json()
				} catch (e) {
					throw e
				}

			} catch (e) {
				throw e
			}
		}
	}
}
