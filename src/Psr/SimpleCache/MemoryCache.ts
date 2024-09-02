import CacheAsbract from './CacheAbstract'

interface CacheItem<T> {
	data: T
	expire?: number | undefined
}

/**
 * Memory cache implementation that stores cached items in memory.
 * This class extends the abstract `CacheAbstract` and provides a basic in-memory caching mechanism.
 *
 * @class MemoryCache
 */
export default class MemoryCache extends CacheAsbract {
	private cache: Map<string, CacheItem<unknown>> = new Map()

	public get<T>(key: string, defaultValue?: T | undefined): T | undefined {
		const item = this.cache.get(key)

		if (!item) {
			return defaultValue ?? undefined
		}

		if (item.expire && item.expire < new Date().getTime()) {
			this.delete(key)
			return defaultValue ?? undefined
		}

		return item.data as T | undefined
	}

	public set<T>(key: string, value: T, ttl?: number | undefined): boolean {
		let expire: number | undefined
		if (ttl) {
			expire = new Date().getTime() + ttl * 1000
		}
		this.cache.set(key, {
			data: value,
			expire: expire
		})

		return true
	}

	public delete(key: string): boolean {
		this.cache.delete(key)
		return true
	}

	public clear(): boolean {
		this.cache.clear()
		return true
	}

	public has(key: string): boolean {
		return this.cache.has(key)
	}
}
