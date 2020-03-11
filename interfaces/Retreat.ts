import { CardSimple } from "./Card";
import { List } from "./General";

export type RetreatSimple = number

export interface RetreatSingle {
	id: RetreatSimple
	cards: Array<CardSimple>
}

export type RetreatList = List<RetreatSimple>
