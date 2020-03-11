import { SetSimple } from "./Set";
import { List } from "./General";
import LangList from "./LangList";

export type ExpansionSingle = {
	code: string
	name: string
	sets: Array<SetSimple>
}

export type ExpansionSimple = {
	code: string
	name: string
}

export type ExpansionList = List<ExpansionSimple>

export default interface Expansion {
	name: LangList<string> | string
	code: string
	sets?: Array<string>
}
