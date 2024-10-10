import type { Extension } from '../interfaces'
import Model from './Model'
import type Serie from './Serie'

export default class SerieResume extends Model {
	public id!: string
	public name!: string
	public logo?: string

	/**
	 * the the Card Image full URL
	 *
	 * @param {Quality} quality the quality you want your image to be in
	 * @param {Extension} extension extension you want you image to be
	 * @return the full card URL
	 */
	public getImageURL(extension: Extension = 'png'): string {
		return `${this.logo}.${extension}`
	}

	public async getSerie(): Promise<Serie> {
		return (await this.sdk.serie.get(this.id))!
	}
}
