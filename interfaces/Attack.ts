import Type from "./Type";
import LangList from "./LangList";

export interface AttackSingle extends AttackSimple {
	cost?: Array<string>
	text?: string
	damage?: string|number
}

export interface AttackSimple {
	// id: number
	name: string
}

export default interface Attack {
	cost?: Array<Type>
	name: LangList<string>
	text?: LangList<string>
	damage?: string|number
}
