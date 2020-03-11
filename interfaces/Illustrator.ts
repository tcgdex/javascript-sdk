import { CardSimple } from "./Card";
import { List } from "./General";

export type IllustratorSingle = {
	id: number,
	name: string,
	cards: Array<CardSimple>
}

export interface IllustratorSimple {
	id: number
	name: string
}

export type IllustratorsList = List<IllustratorSimple>

interface Illustrator {
	id: number
	name: string
}

export default Illustrator
