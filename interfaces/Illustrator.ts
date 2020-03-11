import { CardSimple } from "./Card";

export type IllustratorSingle = {
	id: number,
	name: string,
	cards: Array<CardSimple>
}

export interface IllustratorSimple {
	id: number
	name: string
}

export interface IllustratorsList {
	count: number
	list: Array<IllustratorSimple>
}

interface Illustrator {
	id: number
	name: string
}

export default Illustrator
