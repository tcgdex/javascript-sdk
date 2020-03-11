import { CardSimple } from "./Card";

export type RetreatSimple = number

export interface RetreatSingle {
	id: RetreatSimple
	cards: Array<CardSimple>
}

export interface RetreatList {
	count: number,
	list: Array<RetreatSimple>
}
