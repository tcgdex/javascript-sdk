/// <reference types="jest" />

const { default: MemoryCache } = require("../src/Psr/SimpleCache/MemoryCache")

const TCGdex = require("../src/tcgdex").default

test('that cache store and get one element', async () => {
	const cache = new MemoryCache()
	cache.set('a', 'b')
	expect(cache.get('a')).toBe('b')
})

test('that cache store and get multiple elements', async () => {
	const cache = new MemoryCache()
	cache.setMultiple({
		'a': 'b',
		'c': 'd'
	})
	expect(cache.getMultiple(['a', 'c'])).toStrictEqual({
		a: 'b',
		c: 'd'
	})
})

test('cache expiration', async () => {
	const cache = new MemoryCache()
	cache.set('a', 'b', 1)
	// wait 2 secs
	await new Promise((res) => setTimeout(res, 2000))
	expect(cache.get('a')).toBeUndefined()
})

test('cache deletion', async () => {
	const cache = new MemoryCache()
	cache.set('a', 'b')
	expect(cache.get('a')).toBe('b')
	cache.delete('a')
	expect(cache.get('a')).toBeUndefined()
})

test('cache cleared', async () => {
	const cache = new MemoryCache()
	cache.set('a', 'b')
	expect(cache.get('a')).toBe('b')
	cache.clear()
	expect(cache.get('a')).toBeUndefined()
})

test('cache exists', async () => {
	const cache = new MemoryCache()
	expect(cache.has('a')).toBe(false)
	cache.set('a', 'b')
	expect(cache.has('a')).toBe(true)
})
