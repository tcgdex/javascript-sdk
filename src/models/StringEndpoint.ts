import { CardResume } from '../interfaces'
import Model from './Model'
const ENDPOINTS = ['dex-ids', 'energy-types', 'hp', 'illustrators', 'rarities', 'regulation-marks', 'retreats', 'stages', 'suffixes', 'trainer-types', 'types', 'variants'] as const

export default class StringEndpoint extends Model {
	public name!: string
	public cards!: Array<CardResume>

	public constructor(
		private readonly endpoint: (typeof ENDPOINTS)[number]
	) {super()}
}
