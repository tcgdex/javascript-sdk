import LangList, { Langs } from "./interfaces/LangList";

type possibilities = "abilityType" | "category" | "rarity" | "tag" | "type"

export default class TranslationUtil {
	public static translate(master: possibilities,a: number, lang: Langs): string|undefined {
		const trans = require(`./${master}`).default as translations
		const tmp = trans[lang]
		if (!tmp) return
		return tmp[a]
	}
}

export type translations = LangList<Array<string>>
