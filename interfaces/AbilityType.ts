export interface AbilityTypeSimple {
	id: AbilityType
	name: string
}

enum AbilityType {
	POKEBODY,
	POKEPOWER,
	TALENT,
	ANCIENTTRAIT
}

export default AbilityType
