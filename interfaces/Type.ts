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

export default Type
