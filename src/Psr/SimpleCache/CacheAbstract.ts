import { objectLoop } from '@dzeio/object-util'
import type CacheInterface from './CacheInterface'

export default abstract class CacheAsbract implements CacheInterface {

	public getMultiple<T>(keys: Array<string>, defaultValues?: Array<T> | undefined): Record<string, T> {
		const res: Record<string, T> = {}
		for (let idx = 0; idx < keys.length; idx++) {
			const key = keys[idx] as string
			const value = this.get(key, defaultValues?.[idx]) as T | undefined
			if (typeof value === 'undefined') {
				continue
			}
			res[key] = value
		}
		return res
	}

	public setMultiple<T>(values: Record<string, T>, ttl?: number | undefined): boolean {
		objectLoop(values, (v, k) => {
			this.set(k, v, ttl)
		})
		return true
	}

	public deleteMultiple(keys: Array<string>): boolean {
		for (const key of keys) {
			this.delete(key)
		}
		return true
	}

	public abstract get<T>(key: string, defaultValue?: T): T | undefined
	public abstract set<T>(key: string, value: T, ttl?: number): boolean
	public abstract delete(key: string): boolean
	public abstract clear(): boolean
	public abstract has(key: string): boolean
}
