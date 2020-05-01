import { List } from "./General"
import { CardSimple } from "./Card"

export enum Rarity {
	NONE,
	COMMON,
	UNCOMMON,
	RARE,

	// Both RAREULTRA and ULTRARARE are the same until I know the correct name
	RAREULTRA = 4,
	ULTRARARE = 4

}

export default Rarity

export interface RaritySimple {
	id: Rarity
	name: string
}

export type RaritySingle = {
	id: Rarity
	name: string
	cards: Array<CardSimple>
}

export type RarityList = List<RaritySimple>
