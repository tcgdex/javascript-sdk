import { objectLoop } from '@dzeio/object-util'
import RequestWrapper from './Request'
import Endpoint from './endpoints/Endpoint'
import { Card, CardResume, Serie, SerieList, Set, SetList, StringEndpoint, SupportedLanguages } from './interfaces'
import CardModel from './models/Card'
import CardResumeModel from './models/CardResume'
import SetModel from './models/Set'
import SetResumeModel from './models/SetResume'
type Endpoint = 'cards' | 'categories' | 'dex-ids' | 'energy-types' | 'hp' | 'illustrators' | 'rarities' | 'regulation-marks' | 'retreats' | 'series' | 'sets' | 'stages' | 'suffixes' | 'trainer-types' | 'types' | 'variants'

const ENDPOINTS: Array<Endpoint> = ['cards', 'categories', 'dex-ids', 'energy-types', 'hp', 'illustrators', 'rarities', 'regulation-marks', 'retreats', 'series', 'sets', 'stages', 'suffixes', 'trainer-types', 'types', 'variants']

export default class TCGdex {

	public static fetch: typeof fetch = fetch

	/**
	 * @deprecated to change the lang use {@link TCGdex.getDefaultLanguage} and {@link TCGdex.setDefaultLanguage}
	 */
	public static defaultLang: SupportedLanguages = 'en'

	private static instance: Partial<Record<SupportedLanguages, TCGdex>> = {}

	private static endpointURL = 'https://api.tcgdex.net/v2'

	public card = new Endpoint(this, CardModel, CardResumeModel, 'cards')
	public set = new Endpoint(this, SetModel, SetResumeModel, 'sets')

	public constructor(public lang?: SupportedLanguages) {
		TCGdex.instance[lang ?? TCGdex.defaultLang] = this
	}

	public static getInstance(lang: SupportedLanguages = TCGdex.defaultLang): TCGdex {
		if (lang in this.instance && this.instance[lang]?.lang !== lang) {
			delete this.instance[lang]
		}
		if (!this.instance[lang]) {
			this.instance[lang] = new TCGdex(lang)
		}
		return this.instance[lang]!
	}

	public static setEndpoint(endpoint: string) {
		this.endpointURL = endpoint
	}
	public static getEndpoint(): string {
		return this.endpointURL
	}

	public static setDefaultLang(lang: SupportedLanguages) {
		this.defaultLang = lang
	}
	public static getDefaultLang(): SupportedLanguages {
		return this.defaultLang
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
	public async fetchSet(set: string): Promise<Set | undefined> {
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
	public async fetch(...endpoint: ['sets', string]): Promise<Set | undefined>

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
	public async fetch(...endpoint: Array<Endpoint | string>): Promise<any | undefined> {
		if (endpoint.length === 0) {
			throw new Error('endpoint to fetch is empty!')
		}
		// @ts-expect-error with the precedent check, we KNOW that type is not empty
		const baseEndpoint = endpoint.shift().toLowerCase() as Endpoint
		if (!ENDPOINTS.includes(baseEndpoint)) {
			throw new Error(`unknown endpoint to fetch! (${baseEndpoint})`)
		}
		return this.makeRequest(baseEndpoint, ...endpoint)
	}

	public async fetchWithQuery(endpoint: [Endpoint, ...Array<string>], query?: Record<string, string | number | boolean>) {
		if (endpoint.length === 0) {
			throw new Error('endpoint to fetch is empty!')
		}
		const baseEndpoint = endpoint[0].toLowerCase() as Endpoint
		if (!ENDPOINTS.includes(baseEndpoint)) {
			throw new Error(`unknown endpoint to fetch! (${baseEndpoint})`)
		}
		return this.makeRequest2(endpoint, query)
	}

	/**
	 * Function to make the request and normalize the whole path
	 */
	private makeRequest<T = any>(...url: Array<string | number>) {
		return this.makeRequest2<T>(url)
	}

	/**
	 * Function to make the request and normalize the whole path
	 */
	private makeRequest2<T = any>(url: Array<string | number>, searchParams?: Record<string, string | number | boolean>) {
		// Normalize path
		let path = url.map(this.encode).join('/')
		if (searchParams) {
			path += '?'
			objectLoop(searchParams, (value, key, index) => {
				if (index !== 0) {
					path += '&'
				}
				path += `${this.encode(key)}=${this.encode(value)}`
			})
		}
		return RequestWrapper.fetch<T>(`${TCGdex.endpointURL}/${this.getLang()}/${path}`)
	}

	private encode(str: string | number | boolean): string {
		return encodeURI(
			str
				// Transform numbers to string
				.toString()
				// replace this special character with an escaped one
				.replace('?', '%3F')
				// normalize the string
				.normalize('NFC')
				// remove some special chars by nothing
				// eslint-disable-next-line no-misleading-character-class
				.replace(/["'\u0300-\u036f]/gu, '')
		)
	}

}

// export * from './interfaces'
export * from './models/Card'
