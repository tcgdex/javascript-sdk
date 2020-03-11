import AbilityType, { AbilityTypeSimple } from "./AbilityType";
import LangList from "./LangList";

export interface AbilitySingle extends AbilitySimple {
	type: AbilityTypeSimple
	text: string
}

export interface AbilitySimple {
	// id: number // WIP
	name: string
}

export default interface Ability {
	id?: number
	type: AbilityType
	name: LangList<string>
	text: LangList<string>
}
