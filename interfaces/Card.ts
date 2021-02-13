import Type, { TypeSimple } from "./Type";
import Tag, { TagSimple } from "./Tag";
import { RaritySimple, Rarity } from "./Rarity";
import { CategorySimple, Category } from "./Category";
import { IllustratorSimple } from "./Illustrator";
import Ability, { AbilitySingle } from "./Ability";
import Attack, { AttackSingle } from "./Attack";
import { List } from "./General";
import LangList from "./LangList";
import Set from "./Set";

export interface CardSimple {
	id: string
	localId: string|number
	name: string
	image: string
}

export interface CardSingle {
	// General
	id: string

	/**
	 * The Set Card ID
	 */
	localId: number | string

	/**
	 * The card Name
	 */
	name: string

	/**
	 * The Card Picture
	 * it doesn't contains the ext as it is available as .png, .jpg, .webp (HINT: use .webp then .png then .jpg)
	 */
	image?: {
		low: string
		high?: string
	}

	/**
	 * Card Tags
	 */
	tags?: Array<TagSimple>

	/**
	 * Card illustrator informations
	 */
	illustrator?: IllustratorSimple

	/**
	 * Card Rarity
	 */
	rarity: RaritySimple

	/**
	 * Card Category
	 */
	category: CategorySimple

	/**
	 * Card Set
	 */
	set: {
		/**
		 * Set Display name
		 */
		name: string

		/**
		 * Set code/id
		 */
		code: string
	}

	/**
	 * This will be set for each cards
	 * define all the variants for a specific card
	 */
	variants: {
		normal: boolean
		reverse: boolean
		holo: boolean
		firstEd: boolean
	}

	/**
	 * Some Pokémons have item like a berry
	 */
	item?: {
		name: string
		effect: string
	}

	// Pokémon only
	hp?: number
	dexId?: number
	lvl?: number
	type?: Array<TypeSimple>
	evolveFrom?: string
	evolveTo?: Array<string>
	abilities?: Array<AbilitySingle>
	attacks?: Array<AttackSingle>
	weaknesses?: Array<WeakRes>

	resistances?: Array<WeakRes>
	retreat?: number

	// Trainer/Energy only
	effect?: string
}

export type CardList = List<CardSimple>

type WeakRes = {
	type: TypeSimple
	value?: string
}

type Card = {

	// global id made of setid and localId
	id: string

	// set id
	localId: string|number

	dexId?: number

	// Card informations (from top to bottom of card)
	name: LangList<string>
	hp?: number //optionnal because energy/trainer cards might have not any hp
	type?: Array<Type> // ex for multiple https://www.tcgdex.net/database/ex/ex13/17

	image?: {
		low: LangList<string>
		high?: LangList<string>
	}

	evolveFrom?: LangList<string>
	evolveTo?: Array<LangList<string>>
	tags?: Array<Tag> // made after
	illustrator?: string

	abilities?: Array<Ability>

	attacks?: Array<Attack>

	// If card is trainer or energy effect is here
	effect?: LangList<string>

	item?: {
		name: LangList<string>
		effect: LangList<string>
	}

	weaknesses?: Array<{
		type: Type
		value?: string
	}>

	resistances?: Array<{
		type: Type
		value?: string
	}>

	retreat?: number

	rarity: Rarity

	// Other elements
	category: Category
	set: {
		name: string
		code: string
	}| Set

	/**
	 * Override Set defaults
	 */
	cardTypes?: {
		normal: boolean
		reverse: boolean
		holo: boolean
		firstEd: boolean
	}
}

export default Card
