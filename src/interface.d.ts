export type Quality = 'low' | 'high'

export type Extension = 'jpg' | 'webp' | 'png'

export interface QueryPagination {
	page?: number
	itemsPerPage?: number
}

export interface QuerySort<T extends object> {
	field: keyof PropertiesExtract<T>
	order: 'DESC' | 'ASC'
}

/**
 * Remove the methods from an object and give the remaining
 */
export type ExcludeMethods<T> = {
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

/**
 * extract the properties from an object
 */
export type PropertiesExtract<T> = {
	[K in ExcludeMethods<T>]: T[K]
}

// Helper type to extract properties and flatten nested objects
export type MergeProperties<T> = {
	[K in keyof T]: T[K] extends object ? `${K & string}.${MergeProperties<T[K]>}` : K;
}[keyof T]

// Main type to flatten the class properties
export type Query<T extends object> = {
	[K in MergeProperties<T> as K extends string ? K : never]?: K extends `${infer Prefix}.${infer Rest}`
	? Prefix extends keyof T
		? Rest extends MergeProperties<T[Prefix]>
			? T[Prefix][Rest & keyof T[Prefix]]
			: never
		: never
	: K extends keyof T
		? T[K]
		: never
}
