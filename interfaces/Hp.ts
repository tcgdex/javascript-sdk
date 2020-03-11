import { CardSimple } from "./Card";
import { List } from "./General";

export type HpSingle = {
	hp: number
	cards: Array<CardSimple>
}

export type HpSimple = number

export type HpList = List<HpSimple>
