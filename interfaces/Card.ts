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
	localId: number|string
	name: string
	image?: {
		low: string
		high?: string
	}
	tags: Array<TagSimple>
	illustrator?: IllustratorSimple
	rarity: RaritySimple
	category: CategorySimple
	set: {
		name: string
		code: string
	}
	cardTypes?: {
		/**
		 * normal card without anything special
		 *
		 *
		 * @type {boolean} consider `undefined` to true
		 */
		normal?: boolean
		/**
		 * Card which has a holographic background
		 * but not the picture
		 *
		 * @type {boolean} `undefined` === `true`
		 */
		reverse?: boolean
		/**
		 * Card which has a hologaphic picture
		 *
		 * @type {boolean} `undefined` === `false`
		 */
		holo?: boolean
		/**
		 * Card which can have a `1st ed` icon
		 *
		 * only the base expansion should received it
		 *
		 * @type {boolean} `undefined` === `false`
		 */
		firstEd?: boolean
	}

	// Pokémon only
	hp?: number
	dexId?: number
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
	type?: Array<Type> // ex for multiple https://api.pokemon.com/us/pokemon-tcg/pokemon-cards/ex-series/ex13/17/

	image?: {
		low: LangList<string>
		high?: LangList<string>
	}

	evolveFrom?: LangList<string>
	evolveTo?: Array<LangList<string>>
	tags: Array<Tag> // made after
	illustrator?: string

	abilities?: Array<Ability>

	attacks?: Array<Attack>

	// If card is trainer or energy effect is here
	effect?: LangList<string>

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
