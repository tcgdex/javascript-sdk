export enum Rarity {
	Common,
	Uncommon,
	Rare,

	// Rare holo
	RareHolo,
	RareHoloEX,
	RareHoloGX,
	RareHoloLvX,

	// Rare other
	RareUltra,
	RarePrime,
	RareACE,
	RareBREAK,
	RareRainbow,

	// Other
	LEGEND,

	// V & Vmax
	RareV,
	RareVMAX,
}

export default Rarity

export interface RaritySimple {
	id: Rarity
	name: string
}
