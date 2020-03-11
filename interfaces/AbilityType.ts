export interface AbilityTypeSimple {
	id: AbilityType
	name: string
}

export type AbilityTypeSingle = {
	id: AbilityType
	name: string
	cards: string
}

enum AbilityType {
	POKEBODY,
	POKEPOWER,
	TALENT,
	ANCIENTTRAIT
}

export default AbilityType
