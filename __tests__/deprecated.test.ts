import { expect, test, vi } from 'vitest'
import TCGdex from '../src/tcgdex'

const fakeFetch = (response, status = 200) => vi.fn(() =>
	Promise.resolve({
		status: status,
		json: () => Promise.resolve(response),
	})
)

test('Basic test', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch({ ok: true }) as any
	const res = await tcgdex.fetch('cards', 'basic-test')
	expect(res).toEqual({ ok: true })
	expect(TCGdex.fetch).toHaveBeenCalledTimes(1)
})

test('Cache test', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch({ ok: 'a' }) as any
	const res1 = await tcgdex.fetch('cards', 'cache-test')
	expect(res1).toEqual({ ok: 'a' })
	TCGdex.fetch = fakeFetch({ ok: 'b' }) as any
	const res2 = await tcgdex.fetch('cards', 'cache-test')
	expect(res2).toEqual({ ok: 'a' })
})

test('endpoint errors', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch({ ok: 'a' }) as any
	await expect(tcgdex.fetch('non existing endpoint')).rejects.toThrow()
	await expect(tcgdex.fetch()).rejects.toThrow()
})

test('404 test', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fakeFetch(undefined, 404) as any
	expect(
		await tcgdex.fetch('cards', '404-test')
	).not.toBeDefined()
})

test('test real endpoints', async () => {
	const tcgdex = new TCGdex('en')
	TCGdex.fetch = fetch
	const endpoints = [
		{ endpoint: 'fetchCard', params: ['swsh1-1'] },
		{ endpoint: 'fetchCard', params: ['1', 'Sword & Shield'] },
		{ endpoint: 'fetchCards', params: ['swsh1'] },
		{ endpoint: 'fetchCards', params: [] },
		{ endpoint: 'fetchSet', params: ['swsh1'] },
		{ endpoint: 'fetchSets', params: ['swsh'] },
		{ endpoint: 'fetchSets', params: [] },
		{ endpoint: 'fetchSeries', params: [] },
		{ endpoint: 'fetchSerie', params: ['swsh'] },
	]

	for await (const item of endpoints) {
		expect(
			await tcgdex[item.endpoint](...item.params)
		).toBeDefined()
	}
})
