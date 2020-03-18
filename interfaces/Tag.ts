import { List } from "./General"
import { CardSimple } from "./Card"
/**
 * Anum of "Tags" each card can contains
 *
 * @enum {number}
 */
enum Tag {
	/**
	 * basic pokémon
	 */
	BASIC,

	/**
	 * Basic Energy
	 */
	BASICENERGY,
	BREAK,
	EX,
	GX,
	ITEM,
	LEGEND,
	LEVELUP,
	MEGA,
	RESTORED,
	ROCKETSECRETMACHINE,
	SP,
	SPECIAL,
	STADIUM,
	/**
	 * Stage 1 pokémon
	 */
	STAGE1,

	/**
	 * Stage 2 Pokémon
	 */
	STAGE2,
	SUPPORTER,
	TAGTEAM,
	TECHNICALMACHINE,
	TOOL,

	/**
	 * V Pokémon
	 */
	V,

	/**
	 * VMAX Pokémon
	 */
	VMAX,

	/**
	 * The card is available with the holographic picture
	 */
	HASHOLO,

	/**
	 * Card can have a 1st badge
	 */
	HAS1ST,

	/**
	 * Card is full art (art is not in the frame)
	 */
	ISFULLART,
}

export default Tag

export interface TagSimple {
	id: Tag
	name: string
}

export type TagSingle = {
	id: Tag
	name: string
	cards: Array<CardSimple>
}

export type TagList = List<TagSimple>
