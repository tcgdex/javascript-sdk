import { List } from "./General"
import { CardSimple } from "./Card"

export enum Category {
	POKEMON,
	TRAINER,
	ENERGY
}

export default Category

export type CategorySingle = {
	id: Category
	name: string
	cards: Array<CardSimple>
}


export type CategorySimple = {
	id: Category
	name: string
}

export type CategoryList = List<CategorySimple>
