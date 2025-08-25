import { expect, test, vi } from 'vitest'
import TCGdex, { Query } from '../src/tcgdex'

// change timeout of execution
vi.setConfig({ testTimeout: 120000 })

const fakeFetch = (response: any, status = 200) => vi.fn(() =>
	Promise.resolve({
		status: status,
		json: () => Promise.resolve(response)
	})
)

test('Basic test', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch({ ok: true }) as any
	const res = await tcgdex.fetch('cards', 'basic-test')
	expect(res).toEqual({ ok: true })
	expect(TCGdex.fetch).toHaveBeenCalledTimes(1)
})

test('endpoint errors', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch({ ok: 'a' }) as any
	await expect(tcgdex.fetch('non existing endpoint')).rejects.toThrow()
	await expect(tcgdex.fetch()).rejects.toThrow()
})

test(`404 error`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await tcgdex.card.get('404-error')
	).toBeNull()
})

test(`test getting full set from list`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await (await tcgdex.set.list())[0].getSet()
	).toBeTruthy()
})

test(`test getting full serie from list`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await (await tcgdex.serie.list())[0].getSerie()
	).toBeTruthy()
})

test(`test getting full card from list`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await (await tcgdex.card.list())[0].getCard()
	).toBeTruthy()
})


test(`test get set from card`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await (await tcgdex.card.get('swsh1-136'))!.getSet()
	).toBeTruthy()
})

test(`test get serie from set`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		await (await tcgdex.set.get('swsh1'))!.getSerie()
	).toBeTruthy()
})

test(`advanced query system`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect(
		(await tcgdex.card.list(
			Query.create()
				.equal('name', 'Pikachu')
				.greaterOrEqualThan('hp', 60)
				.lesserThan('hp', 70)
				.contains('localId', '5')
				.not.contains('localId', 'tg')
				.not.equal('id', 'cel25-5')
				.sort('localId', 'ASC')
				.paginate(3, 2)
		)).length
	).toBe(2)
})

// TODO: re-enable after server answer faster
// const endpoints = [
// 	{ endpoint: 'card', params: ['swsh1-136'] },
// 	{ endpoint: 'set', params: ['swsh1'] },
// 	{ endpoint: 'serie', params: ['swsh'] },
// 	{ endpoint: 'type', params: ['fire'] },
// 	{ endpoint: 'retreat', params: ['1'] },
// 	{ endpoint: 'rarity', params: ['common'] },
// 	{ endpoint: 'illustrator', params: [''] },
// 	{ endpoint: 'hp', params: ['30'] },
// 	{ endpoint: 'categorie', params: ['energy'] },
// 	{ endpoint: 'dexID', params: ['1'] },
// 	{ endpoint: 'energyType', params: ['normal'] },
// 	{ endpoint: 'regulationMark', params: ['f'] },
// 	{ endpoint: 'stage', params: ['basic'] },
// 	{ endpoint: 'suffixe', params: ['ex'] },
// 	{ endpoint: 'trainerType', params: ['item'] },
// 	// { endpoint: 'variant', params: ['normal'] },
// ]

// for (const endpoint of endpoints) {
// 	test(`test real ${endpoint.endpoint} endpoint list`, async () => {
// 		const tcgdex = new TCGdex('en')
// 		TCGdex.fetch = fetch

// 		expect(
// 			await (tcgdex[endpoint.endpoint]).list()
// 		).toBeTruthy()
// 	})

// 	test(`test real ${endpoint.endpoint} endpoint item`, async () => {
// 		const tcgdex = new TCGdex('en')
// 		TCGdex.fetch = fetch

// 		expect(
// 			await (tcgdex[endpoint.endpoint]).get(endpoint.params[0])
// 		).toBeTruthy()
// 	})

// }


test(`random card/set/serie`, async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch

	expect((await tcgdex.random.card())).toBeTruthy()
	expect((await tcgdex.random.set())).toBeTruthy()
	expect((await tcgdex.random.serie())).toBeTruthy()
})
