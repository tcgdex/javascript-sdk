import fetch from 'isomorphic-unfetch'
import { Langs } from './interfaces/Langs'
import { SetSingle, SetRequest } from './interfaces/Set'
import { CardSingle } from './interfaces/Card'
import { ExpansionSingle } from './interfaces/Expansion'

export default class TCGDex {
	private lang: Langs = "en"

	public constructor(lang?: Langs) {
		if (lang) this.lang = lang
	}

	private getBaseUrl() {
		return `https://api.tcgdex.net/${this.lang}`
	}

	private gbu() {
		return this.getBaseUrl()
	}

	public async getCard(id: string, set?: string): Promise<CardSingle> {
		try {
			const txt = set ? `sets/${set}` : "cards"
			const resp = await fetch(`${this.gbu()}/${txt}/${id}`)
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

	public async getSet(set: string): Promise<SetSingle> {
		try {
			const resp = await fetch(`${this.gbu()}/sets/${set}`)
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
			const resp = await fetch(`${this.gbu()}/expansions/${expansion}`)
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
}
