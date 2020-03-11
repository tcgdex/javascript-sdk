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
