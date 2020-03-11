import { List } from "./General"
import { CardSimple } from "./Card"

enum Type {
	COLORLESS,
	DARKNESS,
	DRAGON,
	FAIRY,
	FIGHTING,
	FIRE,
	GRASS,
	LIGHTNING,
	METAL,
	PSYCHIC,
	WATER,
}

export interface TypeSimple {
	id: Type
	name: string
}

export type TypeSingle = {
	id: Type
	name: string
	cards: Array<CardSimple>
}

export type TypeList = List<TypeSimple>

export default Type
