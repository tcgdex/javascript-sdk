import { List } from "./General"
import { CardSimple } from "./Card"

enum Tag {
	BASIC,
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
	STAGE1,
	STAGE2,
	SUPPORTER,
	TAGTEAM,
	TECHNICALMACHINE,
	TOOL,
	V,
	VMAX,
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
