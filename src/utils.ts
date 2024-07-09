import { objectLoop } from '@dzeio/object-util'
import { Query, QueryPagination, QuerySort } from './interface'

export function parseQuery<T extends object>(
	query?: Query<T>,
	sort?: QuerySort<T>,
	pagination?: QueryPagination
): Record<string, string | number | boolean> {
	const final: Record<string, string | number | boolean> = {}
	if (query) {
		objectLoop(query as any, (v, k) => {
			// special case, skip lang attribute
			if (k === 'lang') {
				return
			}
			final[k] = v
		})
	}
	if (sort) {
		objectLoop(sort, (v, k) => {
			final[`sort:${k}`] = v as string
		})
	}
	if (pagination) {
		objectLoop(pagination, (v, k) => {
			final[`pagination:${k}`] = v as string
		})
	}

	return final
}
