import type CacheInterface from '@cachex/core'
import MemoryCache from '@cachex/memory'
import LocalStorageCache from '@cachex/web-storage'
import Query from './Query'
import Endpoint from './endpoints/Endpoint'
import SimpleEndpoint from './endpoints/SimpleEndpoint'
import type {
	Card,
	CardResume,
	Endpoints,
	Serie,
	SerieList,
	SetList,
	StringEndpoint,
	SupportedLanguages,
	Set as TCGdexSet
} from './interfaces'
import CardModel from './models/Card'
import CardResumeModel from './models/CardResume'
import Model from './models/Model'
import SerieModel from './models/Serie'
import SerieResume from './models/SerieResume'
import SetModel from './models/Set'
import SetResumeModel from './models/SetResume'
import StringEndpointModel from './models/StringEndpoint'
import { ENDPOINTS, detectContext } from './utils'
import { version } from './version'

export default class TCGdex {

	/**
	 * How the remote data is going to be fetched
	 */
	public static fetch: typeof fetch = fetch

	/**
	 * @deprecated to change the lang use {@link TCGdex.getLang} and {@link TCGdex.setLang}
	 */
	public static defaultLang: SupportedLanguages = 'en'

	/**
	 * the previously hidden caching system used by TCGdex to not kill the API
	 */
	public cache: CacheInterface =
		detectContext() === 'browser' ? new LocalStorageCache('tcgdex-cache') : new MemoryCache()

	/**
	 * the default cache TTL, only subsequent requests will have their ttl changed
	 */
	public cacheTTL = 60 * 60

	// random card/set/serie endpoints
	public readonly random = {
		card: async (): Promise<CardModel> => {
			const res = await this.fetch('random', 'card')
			return Model.build(new CardModel(this), res)
		},
		set: async (): Promise<SetModel> => {
			const res = await this.fetch('random', 'set')
			return Model.build(new SetModel(this), res)
		},
		serie: async (): Promise<SerieModel> => {
			const res = await this.fetch('random', 'serie')
			return Model.build(new SerieModel(this), res)
		}
	}

	public readonly card = new Endpoint(this, CardModel, CardResumeModel, 'cards')
	public readonly set = new Endpoint(this, SetModel, SetResumeModel, 'sets')
	public readonly serie = new Endpoint(this, SerieModel, SerieResume, 'series')

	public readonly type = new SimpleEndpoint(this, StringEndpointModel, 'types')
	public readonly retreat = new SimpleEndpoint(this, StringEndpointModel, 'retreats')
	public readonly rarity = new SimpleEndpoint(this, StringEndpointModel, 'rarities')
	public readonly illustrator = new SimpleEndpoint(this, StringEndpointModel, 'illustrators')
	public readonly hp = new SimpleEndpoint(this, StringEndpointModel, 'hp')
	public readonly categorie = new SimpleEndpoint(this, StringEndpointModel, 'categories')
	public readonly dexID = new SimpleEndpoint(this, StringEndpointModel, 'dex-ids')
	public readonly energyType = new SimpleEndpoint(this, StringEndpointModel, 'energy-types')
	public readonly regulationMark = new SimpleEndpoint(this, StringEndpointModel, 'regulation-marks')
	public readonly stage = new SimpleEndpoint(this, StringEndpointModel, 'stages')
	public readonly suffixe = new SimpleEndpoint(this, StringEndpointModel, 'suffixes')
	public readonly trainerType = new SimpleEndpoint(this, StringEndpointModel, 'trainer-types')
	public readonly variant = new SimpleEndpoint(this, StringEndpointModel, 'variants')

	private lang: SupportedLanguages = 'en'
	private endpointURL = 'https://api.tcgdex.net/v2'

	public constructor(lang: SupportedLanguages = 'en') {
		this.setLang(lang)
	}

	/**
	 * @deprecated use the constructor parameter or {@link TCGdex.setLang} when in an instance
	 */
	public static setDefaultLang(lang: SupportedLanguages) {
		TCGdex.defaultLang = lang
	}

	/**
	 * @deprecated use {@link TCGdex.setLang} when in an instance
	 */
	public static getDefaultLang(): SupportedLanguages {
		return TCGdex.defaultLang
	}

	/**
	 * the endpoint URL
	 * ex: `https://api.tcgdex.net/v2`
	 * @param endpoint the url
	 */
	public setEndpoint(endpoint: string) {
		this.endpointURL = endpoint
	}
	public getEndpoint(): string {
		return this.endpointURL
	}

	/**
	 * set the current cache methodology
	 * @param cache the cache to use
	 */
	public setCache(cache: CacheInterface) {
		this.cache = cache
	}

	/**
	 * get the current cache methodology
	 * @param cache the cache to use
	 */
	public getCache(): CacheInterface {
		return this.cache
	}

	/**
	 * the endpoint URL
	 * ex: `https://api.tcgdex.net/v2`
	 * @param endpoint the url
	 */
	public setCacheTTL(seconds: number) {
		this.cacheTTL = seconds
	}
	/**
	 * get the current useed cache ttl in seconds
	 * @returns the cache ttl in seconds
	 */
	public getCacheTTL(): number {
		return this.cacheTTL
	}

	public getLang(): SupportedLanguages {
		return this.lang ?? TCGdex.defaultLang ?? 'en'
	}

	public setLang(lang: SupportedLanguages) {
		this.lang = lang
	}

	/**
	 * Shortcut to easily fetch a card using both it's global id and it's local ID
	 * @param id the card global/local ID
	 * @param set the card set name/ID (optionnal)
	 * @returns the card object
	 */
	public async fetchCard(id: string | number, set?: string): Promise<Card | undefined> {
		const path = set ? ['sets', set] : ['cards']
		// @ts-expect-error the base endpoint is 'sets' or 'cards'
		return this.fetch(...path, id)
	}

	/**
	 * Shortcut to easily fetch cards using an optionnal set name/ID
	 * @param set the card set name/ID (optionnal)
	 * @returns a card list
	 */
	public async fetchCards(set?: string): Promise<Array<CardResume> | undefined> {
		if (set) {
			const fSet = await this.fetch('sets', set)
			return fSet ? fSet.cards : undefined
		}
		return this.fetch('cards')
	}

	/**
	 * @deprecated use `this.fetch('sets', set)`
	 */
	public async fetchSet(set: string): Promise<TCGdexSet | undefined> {
		return this.fetch('sets', set)
	}

	/**
	 * @deprecated use `this.fetch('series', serie)`
	 */
	public async fetchSerie(serie: string): Promise<Serie | undefined> {
		return this.fetch('series', serie)
	}

	/**
	 * @deprecated use `this.fetch('series')`
	 */
	public async fetchSeries(): Promise<SerieList | undefined> {
		return this.fetch('series')
	}

	/**
	 * Shortcut to easily fetch sets using an optionnal serie name/ID
	 * @param serie the card set name/ID (optionnal)
	 * @returns a card list
	 */
	public async fetchSets(serie?: string): Promise<SetList | undefined> {
		if (serie) {
			const fSerie = await this.fetch('series', serie)
			return fSerie ? fSerie.sets : undefined
		}
		return this.fetch('sets')
	}

	/**
	 * Fetch a card using its global id
	 * @param endpoint_0 'cards'
	 * @param endpoint_1 {string} the card global ID
	 */
	public async fetch(...type: ['cards', string]): Promise<Card | undefined>

	/**
	 * Fetch every cards in the database
	 * @param endpoint_0 'cards'
	 */
	public async fetch(type: 'cards'): Promise<Array<CardResume> | undefined>

	/**
	 * Fetch a card using its local id and its set
	 * @param endpoint_0 'sets'
	 * @param endpoint_1 {string} the set name or ID
	 * @param endpoint_2 {string} the card local ID
	 */
	public async fetch(...endpoint: ['sets', string, string]): Promise<Card | undefined>

	/**
	 * Fetch a set
	 * @param endpoint_0 'sets'
	 * @param endpoint_1 {string} the set name or ID
	 */
	public async fetch(...endpoint: ['sets', string]): Promise<TCGdexSet | undefined>

	/**
	 * Fetch a random element
	 * @param endpoint_0 'random'
	 * @param endpoint_1 {'set' | 'card' | 'serie'} the type of random element you want to get
	 */
	public async fetch(...endpoint: ['random', 'set' | 'card' | 'serie']): Promise<Card | TCGdexSet | Serie | undefined>

	/**
	 * Fetch every sets
	 * @param endpoint_0 'sets'
	 */
	public async fetch(endpoint: 'sets'): Promise<SetList | undefined>

	/**
	 * Fetch a serie
	 * @param endpoint_0 'series'
	 * @param endpoint_1 {string} the serie name or ID
	 */
	public async fetch(...endpoint: ['series', string]): Promise<Serie | undefined>

	/**
	 * Fetch every series
	 * @param endpoint_0 'series'
	 */
	public async fetch(endpoint: 'series'): Promise<SerieList | undefined>

	/**
	 * Fetch cards depending on a specific filter
	 * @param endpoint_0 {'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'}
	 * Possible value 'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'
	 * @param endpoint_1 {string} the value set while fetching the index
	 */
	public async fetch(...endpoint: ['categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants', string]): Promise<StringEndpoint | undefined>

	/**
	 * Fetch cards depending on a specific filter
	 * @param endpoint_0 {'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'}
	 * Possible value 'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'
	 * @param endpoint_1 {string} Fetch the possible values to use depending on the endpoint
	 */
	public async fetch(endpoint: 'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'): Promise<Array<string> | undefined>

	/**
	 * Fetch The differents endpoints depending on the first argument
	 * @param endpoint_0 {'hp' | 'retreats' | 'categories' | 'illustrators' | 'rarities' | 'types'}
	 * Possible value 'cards' | 'categories' | 'hp' | 'illustrators' | 'rarities' | 'retreats' | 'series' | 'sets' | 'types'
	 * @param endpoint_1 {string} (Optionnal) some details to go from the index file to the item file (mostly the ID/name)
	 * @param endpoint_2 {string} (Optionnal) only for sets the card local ID to fetch the card through the set
	 */
	public async fetch<T = object>(...endpoint: Array<Endpoints | string>): Promise<T | undefined> {
		if (endpoint.length === 0) {
			throw new Error('endpoint to fetch is empty!')
		}
		// @ts-expect-error with the precedent check, we KNOW that type is not empty
		const baseEndpoint = endpoint.shift().toLowerCase() as Endpoint
		if (!ENDPOINTS.includes(baseEndpoint)) {
			throw new Error(`unknown endpoint to fetch! (${baseEndpoint})`)
		}
		return this.actualFetch<T>(this.getFullURL([baseEndpoint, ...endpoint]))
	}

	/**
	 * @param endpoint the endpoint to fetch
	 * @param query the query
	 */
	public async fetchWithQuery<T = object>(
		endpoint: [Endpoints, ...Array<string>],
		query?: Array<{ key: string, value: string | number | boolean }>
	): Promise<T | undefined> {
		if (endpoint.length === 0) {
			throw new Error('endpoint to fetch is empty!')
		}
		const baseEndpoint = endpoint[0].toLowerCase() as Endpoints
		if (!ENDPOINTS.includes(baseEndpoint)) {
			throw new Error(`unknown endpoint to fetch! (${baseEndpoint})`)
		}
		return this.actualFetch<T>(this.getFullURL(endpoint, query))
	}

	/**
	 * format the final URL
	 */
	private getFullURL(
		path: Array<string | number>,
		searchParams?: Array<{ key: string, value: string | number | boolean }>
	): string {
		// build base path
		const url = new URL(`${this.getEndpoint()}/${this.getLang()}`)

		// set url path
		url.pathname = `${url.pathname}/${path.join('/')}`

		// handle the Search Params
		for (const param of searchParams ?? []) {
			url.searchParams.append(param.key, param.value.toString())
		}

		// return with the endpoint and all the shit
		return url.toString()
	}

	private async actualFetch<T = object>(path: string): Promise<T | undefined> {
		// get and return the cached value if available
		const cached = this.cache.get(path)
		if (cached) {
			return cached as T
		}

		// the actual Fetch :D
		const resp = await TCGdex.fetch(path, {
			headers: {
				'user-agent': `@tcgdex/javascript-sdk/${version}`
			}
		})

		// throw if a server-side error is occured
		if (resp.status >= 500) {
			try {
				const json = JSON.stringify(await resp.json())
				throw new Error(json)
			} catch {
				throw new Error('TCGdex Server responded with an invalid error :(')
			}
		}

		// response is not valid :O
		if (resp.status !== 200) {
			return undefined
		}

		// parse, put to cache and return
		const json = await resp.json()

		this.cache.set(path, json, this.cacheTTL)
		return json as T
	}
}

// export the old interfaces
export type * from './interfaces.d.ts'

// export the new models items and the Query
export {
	CardModel, CardResumeModel, Endpoint, Model, Query, SerieModel,
	SerieResume as SerieResumeModel,
	SetModel,
	SetResumeModel, SimpleEndpoint
}
